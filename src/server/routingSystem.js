/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 00000000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"

/*****************************************************************************/
const express     = require('express');
const cors        = require('cors');
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;
const session     = require('express-session').session;
const whiteList = [];

const corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.indexOf(origin) !== 1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

const routingSystem = function( app ){
    return new Promise((resolve, reject)=>{
        app.routers = [];
        return resolve( app );
    })
}


module.exports = {
    routingSystem
}
