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

let options = country => {
    return {
        method: 'GET',
        url: `https://restcountries-v1.p.rapidapi.com/name/${country}`,
        headers: {
            'x-rapidapi-host': 'restcountries-v1.p.rapidapi.com',
            'x-rapidapi-key': appData.rapidApiKey
        }
    }
}


const appRoot = (function() {

    return {

        render: function(req, res, next) {

            let pageData = {
                title: 'WeirdWorld',
                pageTitle: `Franck: Let's get going!!!`,
                state: 'initializing',

            }

            request(options('uk'), function(error, response, body) {
                if (error) throw new Error(error);
                pageData.myCountries = JSON.parse(body)

                if (appStatus.running()) {
                    pageData.state = 'running'
                }
                res.render('index', pageData)
            })
        }, 

        getUserData: function(req, res, next) {
            let userData = {
                    countryCodes: ['MLI', 'BHR', 'PRI', 'WSM']
            }
            res.send( userData )
        },
 
        countryInfo: function(req, res, next) {
            let countryName = req.query.country
            request(options(countryName), function(error, response, body) {
                if (error) throw new Error(error);
                res.send(JSON.parse(body))
            })
        }
    }

})()

module.exports = {
    appRoot
}
