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
//const appRoot   = require('@routes/appRoot').appRoot/*
//onst appStatus = require('@src/appStatus').appStatus
//const user = require('@user/user').user
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


const routingSystem = function( app ){
    return new Promise((resolve, reject)=>{
        return resolve( app )
    })
}
 /*   app.use(session({
        secret: appData.appSecret, 
        resave: true, 
        saveUninitialized: false
    }))
    app.use(oidc.router)*/
  //  let router = express.Router()
  //  app.expressStack.use('/', router)
//    app.expressStack.get('/', appRoot.render)

    /*expressStack.get('/protected', app.authSystem.ensureAuthenticated(), (req, res)=>{
        res.send('top secred')
    })*/

   
   
   /* app.expressStack.post('/login'   , ()=>{
        debugger
    })
      /*  
    router.get('/userData' , oidc.ensureAuthenticated(), user.getData )

    router.post('/newTrip' , oidc.ensureAuthenticated(), user.postNewTrip)
    router.get('/trips'    , oidc.ensureAuthenticated(), user.getTrip )
, 
*/
  /*  let countryInfo = function(req, res, next) {
            let countryName = req.query.country
            app.getCountryInfo(countryName)
            .then( results => {
                res.send(results)
                })
      }
    app.expressStack.get('/countryInfo'   , countryInfo )
/*    router.get('/appStatus'     , oidc.ensureAuthenticated(), appStatus.report )
*/
  /*  app.expressStack.use(function(req, res, next) {
        next(createError(404));
    })
    // error handler
    app.expressStack.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    }) 
   */ 

module.exports = {
    routingSystem
}
