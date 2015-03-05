'use strict';

var antisync = {
    seq: require( './seq' )
};

module.exports = function compose( /* functions... */) {
    return antisync.seq.apply( null, Array.prototype.reverse.call( arguments ) );
};
