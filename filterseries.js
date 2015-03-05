'use strict';

var control = require( './control' );
var filterer = require( './filterer' );

module.exports = control.series( filterer );
