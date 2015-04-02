'use strict';

var utils = module.exports = {};

utils.toString = Object.prototype.toString;

utils.isArray = Array.isArray || function isArray( obj ) {
    return utils.toString.call( obj ) === '[object Array]';
};

utils.each = function each( arr, iterator ) {
    for ( var i = 0; i < arr.length; i += 1 ) {
        iterator( arr[ i ], i, arr );
    }
};

utils.map = function map( arr, iterator ) {
    if ( arr.map ) {
        return arr.map( iterator );
    }
    var results = [];
    utils.each( arr, function( x, i, a ) {
        results.push( iterator( x, i, a ) );
    } );
    return results;
};

utils.reduce = function reduce( arr, iterator, memo ) {
    if ( arr.reduce ) {
        return arr.reduce( iterator, memo );
    }
    utils.each( arr, function( x, i, a ) {
        memo = iterator( memo, x, i, a );
    } );
    return memo;
};

utils.keys = function keys( obj ) {
    if ( Object.keys ) {
        return Object.keys( obj );
    }
    var _keys = [];
    for ( var k in obj ) {
        if ( obj.hasOwnProperty( k ) ) {
            _keys.push( k );
        }
    }
    return _keys;
};

utils.only_once = function only_once( fn ) {
    var called = false;
    return function() {
        if ( called ) throw new Error( "Callback was already called." );
        called = true;
        fn.apply( null, arguments );
    };
};

function _console_fn( name ) {
    return function( fn ) {
        var args = Array.prototype.slice.call( arguments, 1 );
        fn.apply( null, args.concat( [ function( err ) {
            var args = Array.prototype.slice.call( arguments, 1 );
            if ( typeof console !== 'undefined' ) {
                if ( err ) {
                    if ( console.error ) {
                        console.error( err );
                    }
                }
                else if ( console[ name ] ) {
                    utils.each( args, function( x ) {
                        console[ name ]( x );
                    } );
                }
            }
        } ] ) );
    };
}
utils.log = _console_fn( 'log' );
utils.dir = _console_fn( 'dir' );
/*
utils.info = _console_fn('info');
utils.warn = _console_fn('warn');
utils.error = _console_fn('error');
*/
