'use strict';

var control = require( './control' );
var mapper = require( './mapper' );

module.exports = function parallelLimit( tasks, limit, callback ) {
    control.parallelApply( {
        map: control.parallelLimit( limit, mapper ),
        each: control.limited( limit )
    }, tasks, callback );
};