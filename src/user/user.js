/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 00000000000000000000000000000000
 *
 *
 * ***************************************************************************/

"use strict"

/*****************************************************************************/
const db = require('@server/db').db
const trips = require('@user/trips').trips
/*****************************************************************************/

const user = (function(){

    let _unregisteredID = '32jjf32-dfdsa-vadfds23'
    let _getUserData = function({
        userID, 
        callback
    }){
        let userRecord = db.getRecord({
            table:'users', 
            selectStatement: `id = '${userID}'`
        })
        .then( userData  => {
           callback( userData[0] ) 
        })
 
    }
    let _getReqUserID = req => 'userID' in req.body ? req.body.userID : _unregisteredID
    let _addHeader = res => res.header("Content-Type", "application/json; charset=utf-8")
    return{

        getData : function( req, res, next ){
            let userID = _getReqUserID ( req )
            _getUserData({
                    userID, 
                    callback: userData => {
                        res.header("Content-Type", "application/json; charset=utf-8")
                        res.send( userData )
                    }
            })
        },

        postNewTrip : function( req, res, next){

            let userID = _getReqUserID( req )
            _getUserData({
                    userID, 
                    callback: userData  => {
                        res.header("Content-Type", "application/json; charset=utf-8")
                        trips.postNewTrip( userData, req, res, next )
                        .then( newRecordResult => {
                            res.send({
                                newRecordResult
                            })
                        })
                    }
                })
        },

        getTrip: function( req, res, next){
            let userID = _getReqUserID( req )
            _getUserData({
                userID, 
                callback: userData => {
                    _addHeader(res)
                    trips.getUserTrips( userData, req, res, next)  
                    .then(results => res.send(results))
                }
            })
        }
    }

})()

module.exports = {
    user
}

