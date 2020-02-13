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
            weirdworld.version = data.version
            weirdworld.features.versioning = true
            weirdworld.versionTag = [
                    `v ${weirdworld.version.major}`, 
                    `.${weirdworld.version.minor}`, 
                    `.${weirdworld.version.patch}`].join('')
            return resolve (weirdworld)
        })

    })
        
}

module.exports = {
  weirdWorldVersion 
}
