'use strict';

var timing = require( './timing' );
var utils = require( './utils' );

module.exports = function cargo( worker, payload ) {
    var working = false,
        tasks = [];

    var _cargo = {
        tasks: tasks,
        payload: payload,
        saturated: null,
        empty: null,
        drain: null,
        drained: true,
        push: function( data, callback ) {
            if ( !utils.isArray( data ) ) {
                data = [ data ];
            }
            utils.each( data, function( task ) {
                tasks.push( {
                    data: task,
                    callback: typeof callback === 'function' ? callback : null
                } );
                _cargo.drained = false;
                if ( _cargo.saturated && tasks.length === payload ) {
                    _cargo.saturated();
                }
            } );
            timing.setImmediate( _cargo.process );
        },
        process: function process() {
            if ( working ) return;
            if ( tasks.length === 0 ) {
                if ( _cargo.drain && !_cargo.drained ) _cargo.drain();
                _cargo.drained = true;
                return;
            }

            var ts = typeof payload === 'number' ? tasks.splice( 0, payload ) : tasks.splice( 0, tasks.length );

            var ds = utils.map( ts, function( task ) {
                return task.data;
            } );

            if ( _cargo.empty ) _cargo.empty();
            working = true;
            worker( ds, function() {
                working = false;

                var args = arguments;
                utils.each( ts, function( data ) {
                    if ( data.callback ) {
                        data.callback.apply( null, args );
                    }
                } );

                process();
            } );
        },
        length: function() {
            return tasks.length;
        },
        running: function() {
            return working;
        }
    };
    return _cargo;
};