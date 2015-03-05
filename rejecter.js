'use strict';

var utils = require( './utils' );

module.exports = function rejecter( eachfn, arr, iterator, callback ) {
    var results = [];
    arr = utils.map( arr, function( x, i ) {
        return {
            index: i,
            value: x
        };
    } );
    eachfn( arr, function( x, callback ) {
        iterator( x.value, function( v ) {
            if ( !v ) {
                results.push( x );
            }
            callback();
        } );
    }, function() {
        callback( utils.map( results.sort( function( a, b ) {
            return a.index - b.index;
        } ), function( x ) {
            return x.value;
        } ) );
    } );
};