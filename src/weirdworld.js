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
"use strict"

/*****************************************************************************/
const winston = require('winston')
/*****************************************************************************/
const appDatabase   = require('@server/db').db
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
        
        app.startTime      = moment() 
        app.say = msg => _appLogger.info( msg )

        require('@src/weirdworldVersion').weirdWorldVersion( app )
        .then( app => {
                app.say(`booting ${app.name} ${app.versionTag} on ${app.startTime}`)
                return resolve(app)
        })
    })
}

module.exports = {
   configApp 
}
/*
    root, 
    settings, 
    logs 
    }) {

    return new Promise((resolve, reject) => {
        appDatabase.configure({     //check if there's a settings database 
            filePath: settings
        })
        .then( dbStatus => {
            _appLogger.info(`access to settings database = ${dbStatus}`)

            resolve({       
                data        : appData,


                say: msg => {
                    _appLogger.info(msg)
                }, 

       })
   })
}

*/
