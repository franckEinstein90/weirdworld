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
const appData = (function(){

    let _env                = config.get('env')
    let _oktaClientID       = config.get('oktaClientID')
    let _oktaClientSecret   = config.get('oktaClientSecret')
    let _oktaClientDomain   = config.get('oktaClientDomain')
    let _rapidApiKey        = config.get('rapidAPIKey')
    let _settingsDBPath     = config.get('settingsDBPath')
    let _appSecret          = config.get('appSecret')
    
    return {
        env              : (x, y) => _env === "env" ? x : y, 
        oktaClientID     : _oktaClientID,
        oktaClientSecret : _oktaClientSecret,
        oktaClientDomain : _oktaClientDomain,
        rapidApiKey      : _rapidApiKey, 
        settingsDBPath   : _settingsDBPath, 
        baseURL          : "http://localhost:3000/logout/callback", 
        appSecret        : _appSecret
    }

})()

module.exports = {
    appData
}
