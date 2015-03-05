'use strict';

var control = require( './control' );

module.exports = function eachLimit( arr, limit, iterator, callback ) {
    var fn = control.limited( limit );
    fn.apply( null, [ arr, iterator, callback ] );
};

