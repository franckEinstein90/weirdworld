"use strict"
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 * - sets up database
 * - gets config variables and what nots
 * - says everything a go, app is booting
 *
 * ***************************************************************************/

/*****************************************************************************/
const winston = require('winston')
/*****************************************************************************/
const moment        = require('moment')
/*****************************************************************************/

const newLogger = function( fileName ){
    if(! fileName){
        return winston.createLogger({
            level       : 'info', 
            format      : winston.format.simple(), 
            transports  : [
                new winston.transports.Console()
            ]
        }) 
    }
}

const configApp = function( app ){

    return new Promise((resolve, reject) => {
        let _consoleLogger  = newLogger()
        let _appLogger      = _consoleLogger
        
        app.startTime = moment() 
        app.say = msg => {
            _appLogger.info( msg )
            console.log( msg )
        }
        app.status.next('mounting AppEngine')
        app.say(`Starting ${app.name} on ${app.startTime}`)
        return require('@src/server/weirdworldVersion').weirdWorldVersion( app )
        .then( app => {
            app.say(`${app.status.current} ${app.implements('versioning')? app.versionTag : 'no version info'}`)
            return resolve(app)
        })
    })
}


const mountAppEngine = function( app ){
    return configApp(app)

    .then( app => {
        app.routers = []
        let appRun = function(){
            if(app.routers && app.routers.length > 0){
                app.routers.forEach( path => {
                    app.expressStack.use( path.route, path.router )
                })
            }
            app.server.start()
            app.say(`${app.name} now running`)
        }
 

        return app.addFeature({
            label     : 'run', 
            method    : appRun, 
            mountFile : __filename
        })
    })
}

module.exports = {
   mountAppEngine
}

