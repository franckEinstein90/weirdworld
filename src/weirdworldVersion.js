/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
*
 * ***************************************************************************/

"use strict"

/*****************************************************************************/
const apv = require('appversion')
/*****************************************************************************/
const weirdWorldVersion = function( weirdworld ){

    return new Promise((resolve, reject)=> {

        apv.getAppVersion( (err, data) => {
            weirdworld.features.versioning = true
            weirdworld.version = data.version
            return resolve (weirdworld)
        })

    })
        
}

module.exports = {
  weirdWorldVersion 
}
