/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 00000000000000000000000000000000
 *
 *
 * ***************************************************************************/

"use strict"

/*****************************************************************************/
const express = require('express')
const cors = require('cors')
const appRoot = require('@routes/appRoot').appRoot
const appStatus = require('@src/appStatus').appStatus
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

    let router = express.Router()
    app.use('/', router)

    router.get('/', appRoot.render)
    router.get('/userData', appRoot.getUserData)
    router.get('/countryInfo', appRoot.countryInfo)
    router.get('/appStatus', appStatus.report)

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
    })
}

module.exports = {
    routingSystem
}
