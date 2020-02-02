/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 00000000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"

/*****************************************************************************/
const db = require('@server/db').db
/*****************************************************************************/

const trips = (function(){

    return {
        getUserTrips: function( userData, req, res, next){
            if( userData.authenticated === 'yes' ){
               return db.getRecord({
                    table: 'trips',
                    selectStatement: `userID = '${userData.id}'`
               }) 
            } else {
                return 200  //user not authenticated doesn't have saved records
            }
        }, 

        postNewTrip: function( userData, req, res, next ){

            if( userData.authenticated === 'yes'){
                return db.createRecord({
                    table: 'trips', 
                    values: {
                        userID: userData.id, 
                        tripName: req.body.tripName
                    }
                }) 
            } else {
                return 200  //user not authenticated doesn't get to create new records
            }
        }
    }
})()

module.exports = {
    trips
}
