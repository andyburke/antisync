'use strict';

var utils = require( './utils' );

module.exports = function mapper( eachfn, arr, iterator, callback ) {
    arr = utils.map( arr, function( x, i ) {
        return {
            index: i,
            value: x
        };
    } );
    if ( !callback ) {
        eachfn( arr, function( x, callback ) {
            iterator( x.value, function( err ) {
                callback( err );
            } );
        } );
    }
    else {
        var results = [];
        eachfn( arr, function( x, callback ) {
            iterator( x.value, function( err, v ) {
                results[ x.index ] = v;
                callback( err );
            } );
        }, function( err ) {
            callback( err, results );
        } );
    }
};