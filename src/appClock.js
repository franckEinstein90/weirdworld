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

    let _clock = new clock.Clock({
            cout    : app.say, 
            events  : app.events
    })

    app.addComponent({label: 'time'})
    app.time.addFeature({
        label: 'clock', 
        method: _clock
    })
    return app
}

module.exports = {
    appClock
}
