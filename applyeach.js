'use strict';

var control = require( './control' );

module.exports = control.parallel( control.applyEach );
