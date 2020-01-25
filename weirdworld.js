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
const app = require('@server/expressStack').expressStack({
    root: __dirname, 
    staticFolder: path.join(__dirname, 'public'), 
    faviconPath: __dirname + '/public/LOGO139x139.png', 
})
/*****************************************************************************/
/*****************************************************************************/
const routingSystem = require('@server/routingSystem').routingSystem({
    app
})
/*****************************************************************************/
const server = require('@server/httpServer').httpServer({
    app,
    defaultPort: '3000'
})
/*****************************************************************************/
const appStatus = require('@src/appStatus').appStatus
const weirdWorld = require('@src/weirdworld').weirdWorld
weirdWorld.ready({
     appStatus
    })
