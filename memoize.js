'use strict';

var timing = require( './timing' );

module.exports = function memoize( fn, hasher ) {
    var memo = {};
    var queues = {};
    hasher = hasher || function( x ) {
        return x;
    };
    var memoized = function() {
        var args = Array.prototype.slice.call( arguments );
        var callback = args.pop();
        var key = hasher.apply( null, args );
        if ( key in memo ) {
            timing.nextTick( function() {
                callback.apply( null, memo[ key ] );
            } );
        }
        else if ( key in queues ) {
            queues[ key ].push( callback );
        }
        else {
            queues[ key ] = [ callback ];
            fn.apply( null, args.concat( [ function() {
                memo[ key ] = arguments;
                var q = queues[ key ];
                delete queues[ key ];
                for ( var i = 0, l = q.length; i < l; i++ ) {
                    q[ i ].apply( null, arguments );
                }
            } ] ) );
        }
    };
    memoized.memo = memo;
    memoized.unmemoized = fn;
    return memoized;
};