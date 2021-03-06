'use strict';

var antisync = {
    queue: require( './queue' )
};
var timing = require( './timing' );
var utils = require( './utils' );

module.exports = function priorityQueue( worker, concurrency ) {

    function _compareTasks( a, b ) {
        return a.priority - b.priority;
    }

    function _binarySearch( sequence, item, compare ) {
        var beg = -1,
            end = sequence.length - 1;
        while ( beg < end ) {
            var mid = beg + ( ( end - beg + 1 ) >>> 1 );
            if ( compare( item, sequence[ mid ] ) >= 0 ) {
                beg = mid;
            }
            else {
                end = mid - 1;
            }
        }
        return beg;
    }

    function _insert( q, data, priority, callback ) {
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
                priority: priority,
                callback: typeof callback === 'function' ? callback : null
            };

            q.tasks.splice( _binarySearch( q.tasks, item, _compareTasks ) + 1, 0, item );

            if ( q.saturated && q.tasks.length === q.concurrency ) {
                q.saturated();
            }
            timing.setImmediate( q.process );
        } );
    }

    // Start with a normal queue
    var q = antisync.queue( worker, concurrency );

    // Override push to accept second parameter representing priority
    q.push = function( data, priority, callback ) {
        _insert( q, data, priority, callback );
    };

    // Remove unshift function
    delete q.unshift;

    return q;
};