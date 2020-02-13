/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"

/*****************************************************************************/
const express = require('express')
const cookieParser = require('cookie-parser')
const favicon = require('express-favicon')
const path = require('path')
/*****************************************************************************/

const configExpress = function( app ) {
    
    app.expressStack =  express()
    require('@viewSystem/viewSystem').viewSystem({
        app     : app.expressStack,  
        root    : app.root,
        layoutsDir:  path.join(app.root,'views','layouts/'),
        partialsDir: path.join(app.root,'views','partials/')
    })

    app.expressStack.use(cookieParser());
    app.expressStack.use(express.json())
    app.expressStack.use(express.urlencoded({
        extended: false
    }))

    app.expressStack.use(express.static(app.staticFolder))
    app.expressStack.use(favicon(app.faviconPath))

    return app
}

module.exports = {
   configExpress 
}
