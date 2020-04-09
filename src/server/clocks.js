/*******************************************************************************
* -----------------------------------------------------------------------------
 *  clock.js : sets the clocks that run various app events 
 *
 *****************************************************************************/
"use strict"
/*****************************************************************************/
const Event = require('@common/clock/events').Event

/* clock ticks every minute */
const setAliveClock = function( app ){

   let showLife = function(){
      app.processStats.update() 
      .then( _ => {

         app.server.io.emit('updateBottomStatusInfo', {
            serverStatus: `app alive time: ${app.processStats.elapsed}` 
         })

         app.tools.say([
            `time: ${app.processStats.elapsed}`,
            `memory: ${app.processStats.memory}`,
            `cpu: ${app.processStats.cpu}`
            ])
      })
   }

   app.tools.createNewClock("app status", 
   [  new Event({
         name      : 'app status', 
         frequency : 1, 
         run       : showLife 
      })
   ])
}

const setClocks = function( app ){
   setAliveClock(app)
}
	
module.exports = {
   setClocks
}
