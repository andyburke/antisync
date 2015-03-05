'use strict';

module.exports = function eachSeries( arr, iterator, callback ) {
    callback = callback || function() {};
    if ( !arr.length ) {
        return callback();
    }
    var completed = 0;
    (function iterate() {
        iterator( arr[ completed ], function( err ) {
            if ( err ) {
                callback( err );
                callback = function() {};
            }
            else {
                completed += 1;
                if ( completed >= arr.length ) {
                    callback();
                }
                else {
                    iterate();
                }
            }
        } );
    })();
};
