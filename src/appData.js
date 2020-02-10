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

})()

module.exports = {
    appData
}
