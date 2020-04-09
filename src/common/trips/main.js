/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * - Trip class
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/

let Budget = function( ) {
    
    this.currency, 
    this.onHand, 
    this.estimatedCost

}

const Trip = function( name ){

    this.name = name
    this.budget = new Budget()

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


const addComponent = function( app ){
    app.trips = trips    
}

module.exports = {
   addComponent 
}
