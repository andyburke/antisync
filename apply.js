'use strict';

module.exports = function apply( fn ) {
    var args = Array.prototype.slice.call( arguments, 1 );
    return function _apply() {
        return fn.apply(
            null, args.concat( Array.prototype.slice.call( arguments ) )
        );
    };
};