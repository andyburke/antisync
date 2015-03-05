'use strict';

var nonsync = {
    each: require( './each' )
};

module.exports = function every( arr, iterator, main_callback ) {
    nonsync.each( arr, function( x, callback ) {
        iterator( x, function( v ) {
            if ( !v ) {
                main_callback( false );
                main_callback = function() {};
            }
            callback();
        } );
    }, function() {
        main_callback( true );
    } );
};
