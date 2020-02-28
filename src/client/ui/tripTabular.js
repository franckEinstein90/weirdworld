/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * trip tabular representation 
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/
const demoTrip = [

            ["<td>1</td>", 
            "<td>Venice</td>", 
            "<td>June 21<sup>st</sup></td>", 
            "<td>June 23<sup>rd</sup></td>", 
            "<td>Marco Abradamo</td>"].join(''),

            ["<td>2</td>", 
            "<td>Venice</td>", 
            "<td>June 23<sup>rd</sup></td>", 
            "<td>June 25<sup>th</sup></td>", 
            "<td>TBD</td>"].join(''),

            ["<td>3</td>", 
            "<td>Berlin</td>", 
            "<td>June 25<sup>th</sup></td>", 
            "<td>June 27<sup>th</sup></td>", 
            "<td>4 Seasons</td>"].join(''),

            ["<td>4</td>", 
            "<td>Prague</td>", 
            "<td>June 28<sup>th</sup></td>", 
            "<td>July 1<sup>st</sup></td>", 
            "<td>Hostel...</td>"].join(''),

            ["<td>5</td>", 
            "<td>Bologna</td>", 
            "<td>July 1<sup>st</sup></td>", 
            "<td>July 3<sup>rd</sup></td>", 
            "<td>Maria Eleanora</td>"].join('')
]



const tripTable = (function(){

   let $tripTable       = null
   let $tripTableBody   = null  

   return {

      configure: function( containerID ){
         $tripTable = $(`#${containerID}`)
         $tripTableBody = $(`#${containerID} TBODY`)
         demoTrip.forEach(location => $tripTableBody.append(`<TR>${location}</TR>`))
         $tripTable.DataTable({
            "columnDefs" : [
                {
                    "targets" : [0], 
                    "visible" : false, 
                }
            ], 
            "paging"    : false, 
            "ordering"  : false, 
            "info"      : false, 
            "searching" : false,
            "select"    : true
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
