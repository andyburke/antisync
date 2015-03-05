'use strict';

var antisync = {
    map: require( './map' )
};

module.exports = function times( count, iterator, callback ) {
    var counter = [];
    for ( var i = 0; i < count; i++ ) {
        counter.push( i );
    }
    return antisync.map( counter, iterator, callback );
};