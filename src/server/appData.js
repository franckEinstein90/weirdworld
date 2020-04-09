/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"

/*****************************************************************************/
const config    = require('config')
/*****************************************************************************/

let configGet = tag => config.has(tag) ? config.get(tag) : null

const appData = function( app ){

    let _env                = config.has('env') ? config.get('env') : 'dev'
    let _oktaClientID       = configGet('oktaClientID')
    let _oktaClientSecret   = configGet('oktaClientSecret')
    let _oktaClientDomain   = configGet('oktaClientDomain')
    let _rapidApiKey        = configGet('rapidAPIKey')
    let _settingsDBPath     = configGet('settingsDBPath')
    let _appSecret          = configGet('appSecret')
    let _port               = '3000'
    let _baseURL            = `http://localhost:${_port}`
    let _postLogoutURI      = `${_baseURL}/logout/callback`
    
    return {
        env                 : (x, y) => _env === "env" ? x : y,
        port                : _port,  
        oktaClientID        : _oktaClientID,
        oktaClientSecret    : _oktaClientSecret,
        oktaClientDomain    : _oktaClientDomain,
        rapidApiKey         : _rapidApiKey, 
        settingsDBPath      : _settingsDBPath, 
        baseURL             : _baseURL, 
        postLogoutURI       : _postLogoutURI, 
        appSecret           : _appSecret
    }
}

const mountAppData = function( app ){
    return new Promise((resolve, reject) => {
        app.tools.say(['mounting app local data'])
        app.featureSystem.addComponent({
            label   : 'localData', 
            methods : appData( app )
        })
        return resolve( app )
    })
}

module.exports = {
    mountAppData
}
