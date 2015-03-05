'use strict';

var antisync = {
    each: require( './each' ),
    eachSeries: require( './eachseries' )
};
var utils = require( './utils' );

var control = module.exports = {};

control.limited = function limited( limit ) {
    return function( arr, iterator, callback ) {
        callback = callback || function() {};
        if ( !arr.length || limit <= 0 ) {
            return callback();
        }
        var completed = 0;
        var started = 0;
        var running = 0;

        ( function replenish() {
            if ( completed >= arr.length ) {
                return callback();
            }

            function iterate( err ) {
                if ( err ) {
                    callback( err );
                    callback = function() {};
                }
                else {
                    completed += 1;
                    running -= 1;
                    if ( completed >= arr.length ) {
                        callback();
                    }
                    else {
                        replenish();
                    }
                }
            }            

            while ( running < limit && started < arr.length ) {
                started += 1;
                running += 1;
                iterator( arr[ started - 1 ], iterate );
            }
        } )();
    };
};

control.parallel = function parallel( fn ) {
    return function() {
        var args = Array.prototype.slice.call( arguments );
        return fn.apply( null, [ antisync.each ].concat( args ) );
    };
};

control.parallelLimit = function parallelLimit( limit, fn ) {
    return function() {
        var args = Array.prototype.slice.call( arguments );
        return fn.apply( null, [ control.limited( limit ) ].concat( args ) );
    };
};

control.series = function series( fn ) {
    return function() {
        var args = Array.prototype.slice.call( arguments );
        return fn.apply( null, [ antisync.eachSeries ].concat( args ) );
    };
};

control.iterator = function iterator( tasks ) {
    var makeCallback = function( index ) {
        var fn = function() {
            if ( tasks.length ) {
                tasks[ index ].apply( null, arguments );
            }
            return fn.next();
        };
        fn.next = function() {
            return ( index < tasks.length - 1 ) ? makeCallback( index + 1 ) : null;
        };
        return fn;
    };
    return makeCallback( 0 );
};

control.parallelApply = function parallelApply( eachfn, tasks, callback ) {
    callback = callback || function() {};
    if ( utils.isArray( tasks ) ) {
        eachfn.map( tasks, function( fn, callback ) {
            if ( fn ) {
                fn( function( err ) {
                    var args = Array.prototype.slice.call( arguments, 1 );
                    if ( args.length <= 1 ) {
                        args = args[ 0 ];
                    }
                    callback.call( null, err, args );
                } );
            }
        }, callback );
    }
    else {
        var results = {};
        eachfn.each( utils.keys( tasks ), function( k, callback ) {
            tasks[ k ]( function( err ) {
                var args = Array.prototype.slice.call( arguments, 1 );
                if ( args.length <= 1 ) {
                    args = args[ 0 ];
                }
                results[ k ] = args;
                callback( err );
            } );
        }, function( err ) {
            callback( err, results );
        } );
    }
};

control.applyEach = function applyEach( eachfn, fns /*args...*/ ) {
    var go = function() {
        var that = this;
        var args = Array.prototype.slice.call( arguments );
        var callback = args.pop();
        return eachfn( fns, function( fn, cb ) {
            fn.apply( that, args.concat( [ cb ] ) );
        },
                      callback );
    };
    if ( arguments.length > 2 ) {
        var args = Array.prototype.slice.call( arguments, 2 );
        return go.apply( this, args );
    }
    else {
        return go;
    }
};

control.concat = function concat( eachfn, arr, fn, callback ) {
    var r = [];
    eachfn( arr, function( x, cb ) {
        fn( x, function( err, y ) {
            r = r.concat( y || [] );
            cb( err );
        } );
    }, function( err ) {
        callback( err, r );
    } );
};