'use strict';

var antisync = {
    reduce: require( './reduce' )
};

module.exports = function seq( /* functions... */) {
    var fns = arguments;
    return function() {
        var that = this;
        var args = Array.prototype.slice.call( arguments );
        var callback = args.pop();
        antisync.reduce( fns, args, function( newargs, fn, cb ) {
            fn.apply( that, newargs.concat( [ function() {
                var err = arguments[ 0 ];
                var nextargs = Array.prototype.slice.call( arguments, 1 );
                cb( err, nextargs );
            } ] ) );
        },
        function( err, results ) {
            callback.apply( that, [ err ].concat( results ) );
        } );
    };
};