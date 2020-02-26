/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * user settigns and info
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/

 const tripTable = (function(){

   let $tripTable = null

   return {
      configure: function( containerID ){
         $tripTable = $(`#${containerID}`)
         $tripTable.DataTable({
            paging: false, 
            searching: false,
            select: true
         })
      }, 

      addTrip: function( trip ){

      }
   }

 })()

const tripTabular = function({
   clientApp, 
   containerID 
   }){

      tripTable.configure( containerID )
      clientApp.tripTable = tripTable
      clientApp.trips.forEach( trip => tripTable.addTrip(trip) )
      return clientApp
 }

 module.exports = {
    tripTabular
 }