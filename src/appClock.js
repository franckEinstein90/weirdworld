/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"

/*****************************************************************************/
const clock = require('@src/time/timeKeepers').clock
/*****************************************************************************/

const appClock = function( app ){

    app.clock = new clock.Clock({
            cout    : app.say, 
            events  : app.events
    })
    app.features.clock = true
    return app
}

module.exports = {
    appClock
}
