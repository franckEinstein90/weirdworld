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
let _rapidApiKey = config.get('rapidAPIKey')
const features = function(){

    let _rapidApiKey = config.get('rapidAPIKey')

    return {
      ready: _ => console.log('checking features available') ,
      rapidApiKey: (_rapidApiKey ? _rapidApiKey : null)
    }
}

module.exports = {
   features
}