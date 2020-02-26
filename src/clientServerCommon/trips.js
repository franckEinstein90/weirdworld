/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * country class
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/


const Trip = function(){
   this.path = null
   this.cost = null
}

const trips = (function(){

   let _trips = new Map()

   return {

      newTrip : function(){

      }, 
      editTrip : function(){

      }, 
      deleteTrip  : function(){

      }, 
      forEach : function( callback ){
         _trips.forEach(callback)
      }

   }
})()

module.exports = {
   trips
}