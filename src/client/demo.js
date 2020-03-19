"use strict"


/******************************************************************************************** */
const places = require('../clientServerCommon/places').places
const Trip = require('../clientServerCommon/trips').Trip
/******************************************************************************************** */
const pickRandom = require('mathjs').pickRandom
/******************************************************************************************** */
let demoTrip1   = new Trip( "Europe September 2020" )
demoTrip1.start = places.name('Ottawa, Canada') 


/*

    start  : 

    back   : places.name('Ottawa, Canada'),  

    budget  : {

        currency        : 'CAD', 
        onHand          : 2700, 
        estimatedCost   : 4500
    }

})
demoTrip1.travelSchedule = [

    { 
        to  : places.name('Berlin')
    }, 

    {
        from : places.name('Berlin'), 
        to   : places.name('Prague')
    }, 

    {
        from : places.name('Prague'), 
        to  : places.name('Venice')
    }, 

    {
        from : places.name('Venice'), 
        to   : places.name('Bologna')
    }, 

]

*/


const countryQuerySamples = ['ar', 'ir', 'ab', 'pc', 'ca', 'ma']

const addDemoData = function( {
   clientApp, 
   numCountries, 
   numCities}){

   let demoCountryQuery = pickRandom( countryQuerySamples )
   return clientApp.serverFetch('countryInfo', {
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
