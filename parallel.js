'use strict';

var control = require( './control' );
var antisync = {
    each: require( './each' ),
    map: require( './map' )
};

module.exports = function parallel( tasks, callback ) {
    control.parallelApply( {
        map: antisync.map,
        each: antisync.each
    }, tasks, callback );
};