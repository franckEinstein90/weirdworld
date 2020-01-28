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
    let _rapidApiKey = null 
    return {
        ready: function({
            appStatus, 
            rapidApiKey
        }) {
            _rapidApiKey = rapidApiKey
        },
        rapidApiKey : _ => _rapidApiKey, 
        run: function() {

        }
    }
})()

module.exports = {
    weirdWorld
}
