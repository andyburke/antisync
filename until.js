'use strict';

module.exports = function until( test, iterator, callback ) {
    if ( !test() ) {
        iterator( function( err ) {
            if ( err ) {
                return callback( err );
            }
            until( test, iterator, callback );
        } );
    }
    else {
        callback();
    }
};
