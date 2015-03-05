'use strict';

var utils = require( './utils' );
var nonsync = {
    map: require( './map')
};

module.exports = function sortBy( arr, iterator, callback ) {
    nonsync.map( arr, function( x, callback ) {
        iterator( x, function( err, criteria ) {
            if ( err ) {
                callback( err );
            }
            else {
                callback( null, {
                    value: x,
                    criteria: criteria
                } );
            }
        } );
    }, function( err, results ) {
        if ( err ) {
            return callback( err );
        }
        else {
            var fn = function( left, right ) {
                var a = left.criteria,
                    b = right.criteria;
                return a < b ? -1 : a > b ? 1 : 0;
            };
            callback( null, utils.map( results.sort( fn ), function( x ) {
                return x.value;
            } ) );
        }
    } );
};