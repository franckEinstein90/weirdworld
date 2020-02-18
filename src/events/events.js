/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 * 
 * ***************************************************************************/
"use strict"

 /****************************************************************************/

 /****************************************************************************/


class Event {

    constructor({
        name, 
        frequency
    }){
        this.name = name
        this.frequency = frequency
    }
}

const addEventFeature = function( app ){

    app.events = []
    app.features.events = true
    app.addEvent = eventDescription => {
            app.events.push( new Event( eventDescription ) )
    }
     app.listEvents  = () => app.events.forEach(ev => console.log(ev.name))
	return app

}


module.exports = {
	addEventFeature
}
