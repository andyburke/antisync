'use strict';

var nonsync = {
    each: require( './each' )
};

module.exports = function some( arr, iterator, main_callback ) {
    nonsync.each( arr, function( x, callback ) {
        iterator( x, function( v ) {
            if ( v ) {
                main_callback( true );
                main_callback = function() {};
            }
            callback();
        } );
    }, function() {
        main_callback( false );
    } );
};
