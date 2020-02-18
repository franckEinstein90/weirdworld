/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 * 
 * ***************************************************************************/
"use strict"

/*****************************************************************************/
require('module-alias/register')
const path = require('path')
/*****************************************************************************/
const runApp = app => {
    if( app.features.clock ) app.clock.start()
    app.say (`${app.nextState()} ${app.name}` ) 
}
 
const appStages = (function(){

    let _statuses = ['initializing', 'booting', 'running']
    let _statusIndex = 0

    return {
        status  : _ =>_statuses[_statusIndex], 
        next    : _ =>_statusIndex === _statuses.length - 1 ? _statusIndex[-1] : _statuses[_statusIndex += 1]

    }
})()


const weirdWorld = {  //the whole app is in this object

    name        :                          'weirdWorld', 

    data        :       require('@src/appData').appData, 

    features    : {

            authentication      :                 false, 
            clock               :                 false, 
            calendar            :                 false, 
            events              :                 false, 
            userManagement      :                 false, 
            messages            :                 false, 
            settingsDb          :                 false, 
            security            :                 false,                   
            versioning          :                 false, 
    },

    root        :                             __dirname, 
    staticFolder:        path.join(__dirname, 'public'),
    faviconPath : __dirname + '/public/LOGO139x139.png', 

    state       :                      appStages.status, 
    nextState   :                        appStages.next, 

}

//i love this so much
require('@src/weirdworld').configApp( weirdWorld )

.then( require('@events/events').addEventFeature( weirdWorld ) )

.then( weirdWorld => {
/*    weirdWorld.addEvent({
        name: testEvent,
        frequency: 4 
    })
    weirdWorld.listEvents() */
    return weirdWorld
})

.then( weirdWorld => {
    require('@server/expressStack').configExpress( weirdWorld ) 
    return require('@src/appEvents').appEvents( weirdWorld )
})

.then( app => {   
    return require('@src/appClock').appClock( app )
})

.then( weirdworld => {
    return require('@users/users').users({
        expressStack: weirdworld.expressStack, 
        app: weirdworld
    })
}) 

.then( weirdworld => {
    return require('@server/routingSystem').routingSystem({
        expressStack    : weirdworld.expressStack, 
        app             : weirdworld.app 
    })
})

.then( appPackage => {
    return require('@server/httpServer').httpServer( appPackage )
})

.then( app => {
    runApp( app )
})






