'use strict';

var nonsync = {
    seq: require( './seq' )
};

module.exports = function compose( /* functions... */) {
    return nonsync.seq.apply( null, Array.prototype.reverse.call( arguments ) );
};
