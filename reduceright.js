'use strict';

var utils = require( './utils' );
var antisync = {
    reduce: require( './reduce' )
};

module.exports = function reduceRight( arr, memo, iterator, callback ) {
    var reversed = utils.map( arr, function( x ) {
        return x;
    } ).reverse();
    antisync.reduce( reversed, memo, iterator, callback );
};