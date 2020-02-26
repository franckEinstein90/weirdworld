"use strict"
/******************************************************************************************** */
const pickRandom = require('mathjs').pickRandom
/******************************************************************************************** */

const countryQuerySamples = ['ar', 'ir', 'ab', 'pc', 'ca', 'ma']

const addDemoData = function( {
   clientApp, 
   numCountries, 
   numCities}){

   let demoCountryQuery = pickRandom( countryQuerySamples )
   return clientApp.getServerData('countryInfo', {
      country: demoCountryQuery 
   })
   .then( countryData => {
      if(! Array.isArray( countryData ) ){
         return addDemoData({
            clientApp, 
            numCountries, 
            numCities
         })
      } else {
         let diff = numCountries - clientApp.countries.list.length 
         let countrySample = null
         if( countryData.length >= diff ){
            countrySample = pickRandom(countryData, diff)  
         }
         else {
            countrySample = countryData
         }
         countrySample.forEach(countryData => {
            clientApp.cities.add({name : countryData.capital})
            clientApp.countries.add(countryData)
         })
         return clientApp
      }
   })

}

module.exports = {
   addDemoData
}