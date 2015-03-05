'use strict';

var utils = require( './utils' );
var timing = require( './timing' );

module.exports = function auto( tasks, callback ) {
    callback = callback || function() {};
    var keys = utils.keys( tasks );
    var remainingTasks = keys.length;
    if ( !remainingTasks ) {
        return callback();
    }

    var results = {};

    var listeners = [];
    var addListener = function( fn ) {
        listeners.unshift( fn );
    };
    var removeListener = function( fn ) {
        for ( var i = 0; i < listeners.length; i += 1 ) {
            if ( listeners[ i ] === fn ) {
                listeners.splice( i, 1 );
                return;
            }
        }
    };
    var taskComplete = function() {
        remainingTasks--;
        utils.each( listeners.slice( 0 ), function( fn ) {
            fn();
        } );
    };

    addListener( function() {
        if ( !remainingTasks ) {
            var theCallback = callback;
            // prevent final callback from calling itself if it errors
            callback = function() {};

            theCallback( null, results );
        }
    } );

    utils.each( keys, function( k ) {
        var task = utils.isArray( tasks[ k ] ) ? tasks[ k ] : [ tasks[ k ] ];
        var taskCallback = function( err ) {
            var args = Array.prototype.slice.call( arguments, 1 );
            if ( args.length <= 1 ) {
                args = args[ 0 ];
            }
            if ( err ) {
                var safeResults = {};
                utils.each( utils.keys( results ), function( rkey ) {
                    safeResults[ rkey ] = results[ rkey ];
                } );
                safeResults[ k ] = args;
                callback( err, safeResults );
                // stop subsequent errors hitting callback multiple times
                callback = function() {};
            }
            else {
                results[ k ] = args;
                timing.setImmediate( taskComplete );
            }
        };
        var requires = task.slice( 0, Math.abs( task.length - 1 ) ) || [];
        var ready = function() {
            return utils.reduce( requires, function( a, x ) {
                return ( a && results.hasOwnProperty( x ) );
            }, true ) && !results.hasOwnProperty( k );
        };
        if ( ready() ) {
            task[ task.length - 1 ]( taskCallback, results );
        }
        else {
            var listener = function() {
                if ( ready() ) {
                    removeListener( listener );
                    task[ task.length - 1 ]( taskCallback, results );
                }
            };
            addListener( listener );
        }
    } );
};