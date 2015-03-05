'use strict';

var timing = require( './timing' );
var utils = require( './utils' );

module.exports = function queue( worker, concurrency ) {
    if ( concurrency === undefined ) {
        concurrency = 1;
    }

    function _insert( q, data, pos, callback ) {
        if ( !q.started ) {
            q.started = true;
        }
        if ( !utils.isArray( data ) ) {
            data = [ data ];
        }
        if ( data.length === 0 ) {
            // call drain immediately if there are no tasks
            return timing.setImmediate( function() {
                if ( q.drain ) {
                    q.drain();
                }
            } );
        }
        utils.each( data, function( task ) {
            var item = {
                data: task,
                callback: typeof callback === 'function' ? callback : null
            };

            if ( pos ) {
                q.tasks.unshift( item );
            }
            else {
                q.tasks.push( item );
            }

            if ( q.saturated && q.tasks.length === q.concurrency ) {
                q.saturated();
            }
            timing.setImmediate( q.process );
        } );
    }

    var workers = 0;
    var q = {
        tasks: [],
        concurrency: concurrency,
        saturated: null,
        empty: null,
        drain: null,
        started: false,
        paused: false,
        push: function( data, callback ) {
            _insert( q, data, false, callback );
        },
        kill: function() {
            q.drain = null;
            q.tasks = [];
        },
        unshift: function( data, callback ) {
            _insert( q, data, true, callback );
        },
        process: function() {
            if ( !q.paused && workers < q.concurrency && q.tasks.length ) {
                var task = q.tasks.shift();
                if ( q.empty && q.tasks.length === 0 ) {
                    q.empty();
                }
                workers += 1;
                var next = function() {
                    workers -= 1;
                    if ( task.callback ) {
                        task.callback.apply( task, arguments );
                    }
                    if ( q.drain && q.tasks.length + workers === 0 ) {
                        q.drain();
                    }
                    q.process();
                };
                var cb = utils.only_once( next );
                worker( task.data, cb );
            }
        },
        length: function() {
            return q.tasks.length;
        },
        running: function() {
            return workers;
        },
        idle: function() {
            return q.tasks.length + workers === 0;
        },
        pause: function() {
            if ( q.paused === true ) {
                return;
            }
            q.paused = true;
        },
        resume: function() {
            if ( q.paused === false ) {
                return;
            }
            q.paused = false;
            // Need to call q.process once per concurrent
            // worker to preserve full concurrency after pause
            for ( var w = 1; w <= q.concurrency; w++ ) {
                timing.setImmediate( q.process );
            }
        }
    };
    return q;
};