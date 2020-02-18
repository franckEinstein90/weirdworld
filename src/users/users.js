/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 *
 * ***************************************************************************/
"use strict"
/*****************************************************************************/
const ExpressOIDC   = require('@okta/oidc-middleware').ExpressOIDC
const session       = require('express-session')
const njwt          = require('njwt')
/*****************************************************************************/

const users = function({
    expressStack, 
    app   
}) {
    let jwtAuthentication = (req, res, next) => {
        const token = req.header('Access-Token')
        if(!token){
            return next()
        }
        try {
            debugger
        }catch (err){
            debugger
        }
    }

    let authEngineCredentials = {
        issuer: `${app.data.oktaClientDomain}/oauth2/default`,
        client_id: app.data.oktaClientID,
        client_secret: app.data.oktaClientSecret,
        appBaseUrl: app.data.baseURL,
        scope: 'openid profile',
        post_logout_redirect_uri: app.data.postLogoutURI
    }
    
    app.authSystem = new ExpressOIDC(authEngineCredentials)
  
    expressStack.use(session({
        secret: app.data.appSecret, 
        resave: true, 
        saveUninitialized: false
    })) 
    expressStack.get('/login', (req, res, next)=>{
        res.render('login')
    })
    expressStack.use(app.authSystem.router)
    expressStack.use( jwtAuthentication )

    return new Promise((resolve, reject) => {
        app.authSystem.on('ready', () => {
            app.say(`user managment module is on`)
            return resolve({
                expressStack, 
                app
            })
        })
        app.authSystem.on('error', err => {
        debugger
        })
    })
 
 
/*       find: async function({
            email,
            password,
            userName
        }) {
       /*     if (userName && password) {
                return db.getRecord({
                    table: 'users',
                    select: `userName = '${userName}' AND password = '${password}';`
                })
            }
            return null
       */ 


}

module.exports = {
    users
}
