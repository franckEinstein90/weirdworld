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
const appData       = require('@src/appData').appData
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

const weirdWorld = function({
    root, 
    settings, 
    logs 
    }) {

    let _consoleLogger  = newLogger()
    let _fileLogger     = newLogger(logs)
    let _appLogger      = appData.env(_consoleLogger, _fileLogger)
    let _startTime      = moment() 
    _appLogger.info(`Starting init on ${_startTime}`)

    return new Promise((resolve, reject) => {
        appDatabase.configure({     //check if there's a settings database 
            filePath: settings
        })
        .then( dbStatus => {
            _appLogger.info(`access to settings database = ${dbStatus}`)

            resolve({       
                data        : appData,

                features    : {
                    userManagement      : false, 
                    messages            : false, 
                    settingsDb          : dbStatus, 
                    clock               : false, 
                    authentication      : false, 
                    security            : false, 
                    versioning          : false, 
                    calendar            : false
                },
 
                say: msg => {
                    _appLogger.info(msg)
                }, 

                run: app => {
                    if( app.features.versioning ) {
                        app.say(`weirdworld v:${app.version.major}.${app.version.minor}.${app.version.patch} booting`)
                    } else {
                        app.say(`weirdworld booting`)
                    }
                    if( app.features.clock ){
                        app.clock.start()
                    }
                }
            }) 
        })
   })
}

module.exports = {
    weirdWorld
}
