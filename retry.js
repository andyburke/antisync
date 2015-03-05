'use strict';

var antisync = {
    series: require( './series' )
};

module.exports = function retry( times, task, callback ) {
    var DEFAULT_TIMES = 5;
    var attempts = [];
    // Use defaults if times not passed
    if ( typeof times === 'function' ) {
        callback = task;
        task = times;
        times = DEFAULT_TIMES;
    }
    // Make sure times is a number
    times = parseInt( times, 10 ) || DEFAULT_TIMES;
    var wrappedTask = function( wrappedCallback, wrappedResults ) {
        var retryAttempt = function( task, finalAttempt ) {
            return function( seriesCallback ) {
                task( function( err, result ) {
                    seriesCallback( !err || finalAttempt, {
                        err: err,
                        result: result
                    } );
                }, wrappedResults );
            };
        };
        while ( times ) {
            attempts.push( retryAttempt( task, !( times -= 1 ) ) );
        }
        antisync.series( attempts, function( done, data ) {
            data = data[ data.length - 1 ];
            ( wrappedCallback || callback )( data.err, data.result );
        } );
    };
    // If a callback is passed, run this as a controll flow
    return callback ? wrappedTask() : wrappedTask;
};