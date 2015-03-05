'use strict';

var control = require( './control' );
var mapper = require( './mapper' );

module.exports = control.series( mapper );
