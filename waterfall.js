'use strict';

var control = require( './control' );
var timing = require( './timing' );
var utils = require( './utils' );

module.exports = function waterfall( tasks, callback ) {
    callback = callback || function() {};
    if ( !utils.isArray( tasks ) ) {
        var err = new Error( 'First argument to waterfall must be an array of functions' );
        return callback( err );
    }
    if ( !tasks.length ) {
        return callback();
    }
    var wrapIterator = function( iterator ) {
        return function( err ) {
            if ( err ) {
                callback.apply( null, arguments );
                callback = function() {};
            }
            else {
                var args = Array.prototype.slice.call( arguments, 1 );
                var next = iterator.next();
                if ( next ) {
                    args.push( wrapIterator( next ) );
                }
                else {
                    args.push( callback );
                }
                timing.setImmediate( function() {
                    iterator.apply( null, args );
                } );
            }
        };
    };
    wrapIterator( control.iterator( tasks ) )();
};