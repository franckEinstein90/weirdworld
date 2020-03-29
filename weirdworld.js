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
  //  if( app.features.clock ) app.clock.start()
    app.say (`${app.nextState()} ${app.name}` ) 
    app.express = require('express')()
    const port = 3000
    app.express.get('/', (req, res) => res.send('Hello World!'))
    app.express.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
 
const appStages = (function(){

    let _statuses = ['initializing', 'booting', 'running']
    let _statusIndex = 0

    return {
        status  : _ =>_statuses[_statusIndex], 
        next    : _ =>_statusIndex === _statuses.length - 1 ? _statusIndex[-1] : _statuses[_statusIndex += 1]

    }
})()




const weirdWorld = {  

    name        :                          'weirdWorld', 
    data        :       require('@src/appData').appData, 
    root        :                             __dirname, 
    staticFolder:        path.join(__dirname, 'public'),
    faviconPath : __dirname + '/public/LOGO139x139.png', 
    state       :                      appStages.status, 
    nextState   :                        appStages.next, 

}


require('@src/common/features').mountFeatureSystem( weirdWorld ) 
require('@src/weirdworld').configApp( weirdWorld )
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

.then( weirdWorld => {
    return require('@src/apiFetch').mountRapidApiInterface( weirdWorld )
})

.then( weirdWorld => {   
    return require('@src/appClock').appClock( weirdWorld )
})

.then( weirdworld => {
//    if(weirdWorld.data.oktaClientID === null){
        return weirdworld
  /*  return require('@users/users').users({
        expressStack: weirdworld.expressStack, 
        app: weirdworld
    })*/
}) 

.then( weirdworld => {
    return require('@server/routingSystem').routingSystem( weirdworld )
})

.then( appPackage => {
    return require('@server/httpServer').httpServer( appPackage )
})

.then( app => {
    runApp( app )
})






