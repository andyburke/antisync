'use strict';

var nonsync = module.exports = {};

var timing = require( './timing' );
nonsync.nextTick = timing.nextTick;
nonsync.setImmediate = timing.setImmediate;

var control = require( './control' );
nonsync.iterator = control.iterator;

var utils = require( './utils' );
nonsync.log = utils.log;
nonsync.dir = utils.dir;

nonsync.each = nonsync.forEach = require( './each' );
nonsync.eachLimit = nonsync.forEachLimit = require( './eachlimit' );
nonsync.eachSeries = nonsync.forEachSeries = require( './eachseries' );

nonsync.map = require( './map' );
nonsync.mapLimit = require( './maplimit' );
nonsync.mapSeries = require( './mapseries' );

nonsync.reduce = nonsync.foldl = nonsync.inject = require( './reduce' );
nonsync.reduceRight = nonsync.foldr = require( './reduceright' );

nonsync.filter = nonsync.select = require( './filter' );
nonsync.filterSeries = nonsync.selectSeries = require( './filterseries' );

nonsync.reject = require( './reject' );
nonsync.rejectSeries = require( './rejectseries' );

nonsync.detect = require( './detect' );
nonsync.detectSeries = require( './detectseries' );

nonsync.some = nonsync.any = require( './some' );
nonsync.every = nonsync.all = require( './every' );

nonsync.sortBy = require( './sortby' );

nonsync.auto = require( './auto' );

nonsync.retry = require( './retry' );

nonsync.waterfall = require( './waterfall' );

nonsync.parallel = require( './parallel' );
nonsync.parallelLimit = require( './parallellimit' );

nonsync.series = require( './series' );

nonsync.apply = require( './apply' );

nonsync.concat = require( './concat' );
nonsync.concatSeries = require( './concatseries' );

nonsync.whilst = require( './whilst' );
nonsync.doWhilst = require( './dowhilst' );
nonsync.until = require( './until' );
nonsync.doUntil = require( './dountil' );

nonsync.queue = require( './queue' );
nonsync.priorityQueue = require( './priorityqueue' );

nonsync.cargo = require( './cargo' );

nonsync.memoize = require( './memoize' );
nonsync.unmemoize = require( './unmemoize' );

nonsync.times = require( './times' );
nonsync.timesSeries = require( './timesseries' );

nonsync.seq = require( './seq' );
nonsync.compose = require( './compose' );

nonsync.applyEach = require( './applyeach' );
nonsync.applyEachSeries = require( './applyeachseries' );

nonsync.forever = require( './forever' );
