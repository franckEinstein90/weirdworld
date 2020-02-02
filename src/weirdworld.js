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
const config    = require('config')
/*****************************************************************************/
const db = require('@server/db').db
/*****************************************************************************/

const weirdWorld = (function() {

    let _rapidApiKey = null 
    let _initApplication = function({
        dbOn
    }){
    }

    return {
        ready: function({
            appStatus, 
            rapidApiKey
        }) {
            _rapidApiKey = rapidApiKey
            db.ready({
                filePath: 'settings.db'
            })
            .then( dbOn =>  _initApplication({
                dbOn
            }))
        },
        rapidApiKey : _ => _rapidApiKey, 
        run: function() {

        }
    }
})()

module.exports = {
    weirdWorld
}
