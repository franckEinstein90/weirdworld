/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 * 
 * ***************************************************************************/
"use strict"
/*****************************************************************************/
require('module-alias/register')
const path = require('path')
/*****************************************************************************/

const weirdWorld = {  
    metadata : {
        name        :  'weirdWorld', 
        root        :  __dirname, 
        staticFolder:  path.join(__dirname, 'public'),
        faviconPath : __dirname + '/public/LOGO139x139.png'
    }
}
require('@src/common/features').mountFeatureSystem( weirdWorld ) 
require('@src/common/appStages').mountStatusModule( weirdWorld )
require('@src/server/appEngine').configApp( weirdWorld ) 
.then( require('@src/server/appData').mountAppData )
.then( app => {
    /*********************************
     * Business Objects
     *********************************/
    require('@common/dataModel').addComponent( app )
    require('@common/trips/main').addComponent( app )

    /*********************************
     * Events + timers
     *********************************/
    require('@common/clock/timer').add( app  )
    return require('@server/db').addLocalDatabase( app  )
})
.then( require('@server/express').configExpress )  
.then( require('@server/apiFetch').mountRapidApiInterface        )
.then( require('@server/routingSystem').routingSystem )
.then( require('@server/httpServer').httpServer )
.then( require('@server/appRoot').addAppRoot )
.then( require('@user').addUserModule )
.then( require('@server/process').addProcessStatsFeature )
.then( app => { //final preps before launch
    require('@server/clocks').setClocks( app )
    require('@server/dev/commands').devCommands( app )
    return app
})
.then( app => {

    app.routers.forEach( path => {
        app.tools.say(`setting path: ${path.route}`)
        app.express.use( path.route, path.router )
    })

    app.clocks.forEach(clock => clock.start())
    app.server.start()
    app.tools.say(`${app.metadata.name} now running`)

}) 




