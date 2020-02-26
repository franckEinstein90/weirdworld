"use strict"

const request = require("request")

let options = key => country => {
   return {
       method: 'GET',
       url: `https://restcountries-v1.p.rapidapi.com/name/${country}`,
       headers: {
           'x-rapidapi-host': 'restcountries-v1.p.rapidapi.com',
           'x-rapidapi-key': key 
       }
   }
}


const getCountryInfo = function( options ){
   return new Promise((resolve, reject) => {
      request( options, function(error, response, body) {
         if (error) {
            return reject (error)
         }
         return resolve(JSON.parse(body))
      })
  }) 
}


const rapidAPIInterface = (function(){

   let _rapidApiKey = null
   let _options =  null

   return {

      config : function( apiKey ){
         _rapidApiKey = apiKey
         _options = options(apiKey)
      }, 

      test : function( app ){
         return new Promise(resolve => {
            getCountryInfo(_options('ir'))
            .then(countryInfo => {
               if(countryInfo.find(country=>country.name === "Iran")){
                  app.features.add( "getCountryInfo: gets country infor from rapidAPI" )
                  app.getCountryInfo = c => getCountryInfo(_options(c))
                  return resolve( app )
               }
               return resolve(app )
            })
         })
     }
   }
})()

const addRapidApiDataFetchFeature  = async function( app ){
   rapidAPIInterface.config( app.data.rapidApiKey )
   return rapidAPIInterface.test( app )
}

module.exports = {
   addRapidApiDataFetchFeature
}