'use strict';

var antisync = module.exports = {};

var timing = require( './timing' );
antisync.nextTick = timing.nextTick;
antisync.setImmediate = timing.setImmediate;

var control = require( './control' );
antisync.iterator = control.iterator;

var utils = require( './utils' );
antisync.log = utils.log;
antisync.dir = utils.dir;

antisync.each = antisync.forEach = require( './each' );
antisync.eachLimit = antisync.forEachLimit = require( './eachlimit' );
antisync.eachSeries = antisync.forEachSeries = require( './eachseries' );

antisync.map = require( './map' );
antisync.mapLimit = require( './maplimit' );
antisync.mapSeries = require( './mapseries' );

antisync.reduce = antisync.foldl = antisync.inject = require( './reduce' );
antisync.reduceRight = antisync.foldr = require( './reduceright' );

antisync.filter = antisync.select = require( './filter' );
antisync.filterSeries = antisync.selectSeries = require( './filterseries' );

antisync.reject = require( './reject' );
antisync.rejectSeries = require( './rejectseries' );

antisync.detect = require( './detect' );
antisync.detectSeries = require( './detectseries' );

antisync.some = antisync.any = require( './some' );
antisync.every = antisync.all = require( './every' );

antisync.sortBy = require( './sortby' );

antisync.auto = require( './auto' );

antisync.retry = require( './retry' );

antisync.waterfall = require( './waterfall' );

antisync.parallel = require( './parallel' );
antisync.parallelLimit = require( './parallellimit' );

antisync.series = require( './series' );

antisync.apply = require( './apply' );

antisync.concat = require( './concat' );
antisync.concatSeries = require( './concatseries' );

antisync.whilst = require( './whilst' );
antisync.doWhilst = require( './dowhilst' );
antisync.until = require( './until' );
antisync.doUntil = require( './dountil' );

antisync.queue = require( './queue' );
antisync.priorityQueue = require( './priorityqueue' );

antisync.cargo = require( './cargo' );

antisync.memoize = require( './memoize' );
antisync.unmemoize = require( './unmemoize' );

antisync.times = require( './times' );
antisync.timesSeries = require( './timesseries' );

antisync.seq = require( './seq' );
antisync.compose = require( './compose' );

antisync.applyEach = require( './applyeach' );
antisync.applyEachSeries = require( './applyeachseries' );

antisync.forever = require( './forever' );
