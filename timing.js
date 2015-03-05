'use strict';

var timing = module.exports = {};

//// nextTick implementation with browser-compatible fallback ////
if ( typeof process === 'undefined' || !( process.nextTick ) ) {
    if ( typeof setImmediate === 'function' ) {
        timing.nextTick = function( fn ) {
            // not a direct alias for IE10 compatibility
            setImmediate( fn );
        };
        timing.setImmediate = timing.nextTick;
    }
    else {
        timing.nextTick = function( fn ) {
            setTimeout( fn, 0 );
        };
        timing.setImmediate = timing.nextTick;
    }
}
else {
    timing.nextTick = process.nextTick;
    if ( typeof setImmediate !== 'undefined' ) {
        timing.setImmediate = function( fn ) {
            // not a direct alias for IE10 compatibility
            setImmediate( fn );
        };
    }
    else {
        timing.setImmediate = timing.nextTick;
    }
}
