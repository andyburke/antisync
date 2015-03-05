'use strict';

var utils = require( './utils' );
var antisync = {
    mapSeries: require( './mapseries' ),
    eachSeries: require( './eachseries' )
};

module.exports = function series( tasks, callback ) {
    callback = callback || function() {};
    if ( utils.isArray( tasks ) ) {
        antisync.mapSeries( tasks, function( fn, callback ) {
            if ( fn ) {
                fn( function( err ) {
                    var args = Array.prototype.slice.call( arguments, 1 );
                    if ( args.length <= 1 ) {
                        args = args[ 0 ];
                    }
                    callback.call( null, err, args );
                } );
            }
        }, callback );
    }
    else {
        var results = {};
        antisync.eachSeries( utils.keys( tasks ), function( k, callback ) {
            tasks[ k ]( function( err ) {
                var args = Array.prototype.slice.call( arguments, 1 );
                if ( args.length <= 1 ) {
                    args = args[ 0 ];
                }
                results[ k ] = args;
                callback( err );
            } );
        }, function( err ) {
            callback( err, results );
        } );
    }
};