/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 00000000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"

/*****************************************************************************/
const express     = require('express')
const cors        = require('cors')
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC
const session     = require('express-session').session
/*****************************************************************************/
/*const appData = require('@src/appData').appData*/
const appRoot   = require('@routes/appRoot').appRoot/*
const appStatus = require('@src/appStatus').appStatus
const user = require('@user/user').user
/*****************************************************************************/
const whiteList = []

const corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.indexOf(origin) !== 1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}


const routingSystem = function({
    app
}) {
 /*   let oidc = new ExpressOIDC({
        issuer: `${appData.oktaClientDomain}/oauth2/default`,
        client_id: appData.oktaClientID,
        client_secret: appData.oktaClientSecret,
        appBaseUrl: appData.baseURL,
        scope: 'openid profile',
        post_logout_redirect_uri: appData.postLogoutRedirect 
    })
    app.use(session({
        secret: appData.appSecret, 
        resave: true, 
        saveUninitialized: false
    }))
    app.use(oidc.router)*/
    let router = express.Router()

    app.use('/', router)
    router.get('/', appRoot.render)
    /*
    router.post('/login'   , user.login )
    router.get('/userData' , oidc.ensureAuthenticated(), user.getData )

    router.post('/newTrip' , oidc.ensureAuthenticated(), user.postNewTrip)
    router.get('/trips'    , oidc.ensureAuthenticated(), user.getTrip )

    router.get('/countryInfo'   , appRoot.countryInfo )
    router.get('/appStatus'     , oidc.ensureAuthenticated(), appStatus.report )

    app.use(function(req, res, next) {
        next(createError(404));
    })

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    })*/
}

module.exports = {
    routingSystem
}
