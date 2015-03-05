'use strict';


module.exports = function whilst( test, iterator, callback ) {
    if ( test() ) {
        iterator( function( err ) {
            if ( err ) {
                return callback( err );
            }
            whilst( test, iterator, callback );
        } );
    }
    else {
        callback();
    }
};
