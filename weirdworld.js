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

const expressStack = require('@server/expressStack').expressStack({
    root        : __dirname, 
    staticFolder: path.join(__dirname, 'public'), 
    faviconPath : __dirname + '/public/LOGO139x139.png', 
})

require('@src/weirdworld').weirdWorld({
    root    : __dirname, 
    settings: 'settings.db'
})
.then( app => {
    return require('@src/appEvents').appEvents( app )
})
.then( app => {   
    return require('@src/appClock').appClock( app )
})
.then( weirdworld => {
    return require('@users/users').users({
        expressStack, 
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
    app.run(app)
})






