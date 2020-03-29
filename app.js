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
    name        :                          'weirdWorld', 
    root        :                             __dirname, 
    staticFolder:        path.join(__dirname, 'public'),
    faviconPath : __dirname + '/public/LOGO139x139.png', 
}


require('@src/common/features').mountFeatureSystem( weirdWorld ) 
require('@src/common/appStages').mountStatusModule( weirdWorld )
require('@src/server/appData').mountAppData(        weirdWorld )
require('@src/common/dataModel').addComponent(      weirdWorld )
require('@server/db').addLocalDatabase(             weirdWorld )

.then( require('@appEngine').mountAppEngine                   )
.then( require('@server/expressStack').configExpress          )  
.then( require('@src/appEvents').appEvents                    )
.then( require('@src/apiFetch').mountRapidApiInterface        )
.then( require('@src/appClock').appClock                      )
.then( require('@server/routingSystem').routingSystem         )
.then( require('@server/httpServer').httpServer               )
.then( require('@server/appRoot').addAppRoot                  )
.then( require('@user').addUserModule                         )
.then( app => app.run()                                       )






