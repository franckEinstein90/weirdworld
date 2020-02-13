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
    if( app.features.versioning ) {
        app.say(`${app.name} is starting`)
    } else {
     app.say(`weirdworld booting`)
     }
     if( app.features.clock ){
      app.clock.start()
      }
}
 

const weirdWorld = {
    name        : 'weirdWorld', 
    data        :  require('@src/appData').appData, 
    faviconPath : __dirname + '/public/LOGO139x139.png', 
    features    : {
            userManagement      : false, 
            messages            : false, 
            settingsDb          : false, 
            clock               : false, 
            authentication      : false, 
            security            : false, 
            versioning          : false, 
            calendar            : false
    },
    root    : __dirname, 
    staticFolder: path.join(__dirname, 'public')
}

require('@src/weirdworld').configApp( weirdWorld )
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






