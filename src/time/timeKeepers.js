/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"

/*****************************************************************************/
const uuidv4    = require('uuid/v4')
const cronJob   = require('node-cron')
const moment    = require('moment')
/*****************************************************************************/
class TimeKeeper  {

    constructor({
        now, 
        cout
    }){
        this.id     = uuidv4()
        this.now    = now
        this.cout   = cout
    }
}

class Clock extends TimeKeeper {
            constructor({
            cout, 
            events
            }) {              
                super({
                    now : moment(), 
                    cout: cout
                })
                this.isOn   = false 
                this.events = events || []
            }
}
 
const clock = (function(){

    let _clockRegister = [] 
    let _appTime    = 0     //mins
    let _cout       = null
    let _timeStr    = minTime => `${minTime} minute${minTime === 1 ? '' : 's'}`
    let _update     = () => {
        _appTime += 1
        _clockRegister.forEach(cl => {
            if (cl.isOn) cl.update( _appTime )
        })
    }
    cronJob.schedule('* * * * *', _update)

    return {

        Clock:  Clock

    }
})()



module.exports = {
    clock
}


