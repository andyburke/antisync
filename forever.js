'use strict';

module.exports = function forever( fn, callback ) {
    function next( err ) {
        if ( err ) {
            if ( callback ) {
                return callback( err );
            }
            throw err;
        }
        fn( next );
    }
    next();
};