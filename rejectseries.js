'use strict';

var control = require( './control' );
var rejecter = require( './rejecter' );

module.exports = control.series( rejecter );
