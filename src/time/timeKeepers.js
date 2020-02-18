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

        Clock : class extends TimeKeeper ({
            cout, 
            events
        }){
              
            this.isOn   = false 
            this.events = events || []
            _clockRegister.push(this)
        }
    }
})()

clock.Clock.prototype.start = function(){
        this.cout(`Clock ${this.id} starting with ${this.events.length} events`)
        this.isOn = true
}

clock.Clock.prototype.update = function( appTime ){
    this.cout( appTime + " min(s)")
}

clock.Clock.prototype.addEvent = function( event ){


}

class Clock {

    constructor({
         cout, 
         events
     }){
        this.events = events || []
        this.cout  = cout
        this.update = function(){
            cout('hello')
        }
        cout(`clock init with ${this.events.length} events`)
    }

    start(){
        this.cout('clock starting')
    }
}

module.exports = {
    clock
}


