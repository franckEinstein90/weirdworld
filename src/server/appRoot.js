/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * appRoot is a user's entry into the 
 * app
 * ***************************************************************************/
"use strict"
/*****************************************************************************/

const appRootModule = function( app ) {

    let _render = function(req, res, next) {
            res.send('app route router')
    }

    let _router = require('express').Router()

    _router.get('/', (req,res)=>{
        let pageData = {
            title: 'WeirdWorld', 
            pageTitle: `let's go!!!`, 
            state: 'init'
        }
        res.render('user', pageData)
    }) 

    return {
        router: _router 
    }
}
const addAppRoot = function( app ){
    app.addComponent({
        label: 'httpRoot', 
        methods: appRootModule( app )
    })
    app.routers.push({
        route: '/',
        router: app.httpRoot.router
    })
    return app
}

module.exports = {
    addAppRoot
}
