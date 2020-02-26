/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * appRoot is a user's entry into the 
 * app
 * ***************************************************************************/
"use strict"

/*****************************************************************************/
const appStatus = require('@src/appStatus').appStatus
const appData   = require('@src/appData').appData
const request = require("request")
const weirdWorld = require('@src/weirdworld').weirdWorld
/*****************************************************************************/


const appRoot = (function() {

    return {

        render: function(req, res, next) {

            let pageData = {
                title: 'WeirdWorld',
                pageTitle: `Franck: Let's get going!!!`,
                state: 'initializing',

            }

            if (appStatus.running()) {
                    pageData.state = 'running'
            }
            res.render('user', pageData)
        }, 

        getUserData: function(req, res, next) {
            let userData = {
                    countryCodes: ['MLI', 'BHR', 'PRI', 'WSM']
            }
            res.send( userData )
        }
     
    }

})()

module.exports = {
    appRoot
}
