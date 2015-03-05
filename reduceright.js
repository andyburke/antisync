'use strict';

var utils = require( './utils' );
var nonsync = {
    reduce: require( './reduce' )
};

module.exports = function reduceRight( arr, memo, iterator, callback ) {
    var reversed = utils.map( arr, function( x ) {
        return x;
    } ).reverse();
    nonsync.reduce( reversed, memo, iterator, callback );
};