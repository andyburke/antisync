'use strict';

var control = require( './control' );
var mapper = require( './mapper' );

function _mapLimit( limit ) {
    return control.parallelLimit( limit, mapper );
}

module.exports = function mapLimit( arr, limit, iterator, callback ) {
    return _mapLimit( limit )( arr, iterator, callback );
};