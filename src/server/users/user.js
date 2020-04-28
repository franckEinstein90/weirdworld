/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 00000000000000000000000000000000
 *
 *
 * ***************************************************************************/

"use strict"

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

    app.featureSystem.addComponent({
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