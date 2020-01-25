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
const config = require('config')
/*****************************************************************************/

const weirdWorld = (function() {
    
    const rapidApiKey = config.get('rapidAPIKey')
    return {
        rapidApiKey : _ => _rapidApiKey, 
        ready: function({
            appStatus
        }) {
            debugger
        },

        run: function() {

        }
    }
})()

module.exports = {
    weirdWorld
}
