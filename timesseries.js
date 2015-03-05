'use strict';

var antisync = {
    mapSeries: require( './mapseries' )
};

module.exports = function timesSeries( count, iterator, callback ) {
    var counter = [];
    for ( var i = 0; i < count; i++ ) {
        counter.push( i );
    }
    return antisync.mapSeries( counter, iterator, callback );
};