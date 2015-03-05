'use strict';

module.exports = function doWhilst( iterator, test, callback ) {
    iterator( function( err ) {
        if ( err ) {
            return callback( err );
        }
        var args = Array.prototype.slice.call( arguments, 1 );
        if ( test.apply( null, args ) ) {
            doWhilst( iterator, test, callback );
        }
        else {
            callback();
        }
    } );
};