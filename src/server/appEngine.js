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

const appOutTools = function( app ){
    app.tools = {}
    let _consoleLogger  = newLogger()
    let _appLogger      = _consoleLogger
    app.tools.say = msg => {
        if(Array.isArray(msg)){
            app.tools.say('***********************')
            msg.forEach(l => app.tools.say(l))
            app.tools.say('***********************')
        }
        else{
            _appLogger.info( msg )
            console.log(msg)
        }
    }

 
}

const configApp = function( app ){

    return new Promise((resolve, reject) => {
        appOutTools( app )
        app.startTime = moment() 
        app.status.next('mounting AppEngine')
        return require('@src/server/weirdworldVersion').weirdWorldVersion( app )
        .then( app => {
            app.tools.say([
                'Mounting app engine', 
                `${app.startTime}`, 
                `app: ${app.metadata.name} -  ${app.versionTag}`
            ])
            return resolve(app)
        })
    }) 
}

module.exports = {
  configApp 
}

