/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 00000000000000000000000000000000
 *
 *
 * ***************************************************************************/

"use strict"

/*****************************************************************************/
//const db = require('@server/db').db
//const users = require('@user/users').users
//const trips = require('@user/trips').trips
/*****************************************************************************/
/*
const user = (function() {

    let _unregisteredID = '32jjf32-dfdsa-vadfds23'
    let _getUserData = function({
        userID,
        callback
    }) {
        let userRecord = db.getRecord({
                table: 'users',
                selectStatement: `id = '${userID}'`
            })
            .then(userData => {
                callback(userData[0])
            })

    }
    let _getReqUserID = req => 'userID' in req.body ? req.body.userID : _unregisteredID
    let _addHeader = res => res.header("Content-Type", "application/json; charset=utf-8")
    return {

        login: function(req, res, next) {
            let user = {}
            let checkArguments = x => x in req.body ? user[x] = req.body[x] : user[x] = null
            checkArguments('email')
            checkArguments('password')
            checkArguments('userName')

            users.find(user)
                .then(authUser => {
                    if (Array.isArray(authUser) && authUser.length > 0) {
                        const accessToken = encodeToken({
                            userID: authUser.id
                        })
                    } else {
                        res.status(401)
                        res.send({
                            error: authUser
                        })
                        return
                    }
                })

            //    const accessToken = encodeToken({userID : user.id})
            //res.send({accessToken})
        },
        getData: function(req, res, next) {
            let userID = _getReqUserID(req)
            _getUserData({
                userID,
                callback: userData => {
                    res.header("Content-Type", "application/json; charset=utf-8")
                    res.send(userData)
                }
            })
        },

        postNewTrip: function(req, res, next) {

            let userID = _getReqUserID(req)
            _getUserData({
                userID,
                callback: userData => {
                    res.header("Content-Type", "application/json; charset=utf-8")
                    trips.postNewTrip(userData, req, res, next)
                        .then(newRecordResult => {
                            res.send({
                                newRecordResult
                            })
                        })
                }
            })
        },

        getTrip: function(req, res, next) {
            let userID = _getReqUserID(req)
            _getUserData({
                userID,
                callback: userData => {
                    _addHeader(res)
                    trips.getUserTrips(userData, req, res, next)
                        .then(results => res.send(results))
                }
            })
        }
    }

})()
*/

let _userRoutes = function( app ){

    app.authenticateUser = (userHandle, password) => {
        app.localDb.get
        debugger
    }

    let _router = require('express').Router()
    _router.get('/user', function(req, res){
        let  password  = req.query.password
        let userHandle = req.query.userHandle
        app.authenticateUser(userHandle, password)
        .then(authInfo => {
            debugger
        })
    })


    return {
        router  : _router
    }
}

const addUserModule = function( app ){

    let userRoutes = _userRoutes( app )

    app.addComponent({
        label: 'userModule'
    })

    app.routers.push({
        route: 'user', 
        router: userRoutes.router
    })

    return app

}
module.exports = {
   addUserModule 
}