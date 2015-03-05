'use strict';

var control = require( './control' );
var nonsync = {
    each: require( './each' ),
    map: require( './map' )
};

module.exports = function parallel( tasks, callback ) {
    control.parallelApply( {
        map: nonsync.map,
        each: nonsync.each
    }, tasks, callback );
};