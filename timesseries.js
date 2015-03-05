'use strict';

var nonsync = {
    mapSeries: require( './mapseries' )
};

module.exports = function timesSeries( count, iterator, callback ) {
    var counter = [];
    for ( var i = 0; i < count; i++ ) {
        counter.push( i );
    }
    return nonsync.mapSeries( counter, iterator, callback );
};