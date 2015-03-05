'use strict';

var utils = require ( './utils' );

module.exports = function each( arr, iterator, callback ) {
    callback = callback || function() {};
    if ( !arr.length ) {
        return callback();
    }
    var completed = 0;
    utils.each( arr, function( x ) {
        iterator( x, utils.only_once( done ) );
    } );

    function done( err ) {
        if ( err ) {
            callback( err );
            callback = function() {};
        }
        else {
            completed += 1;
            if ( completed >= arr.length ) {
                callback();
            }
        }
    }
};
