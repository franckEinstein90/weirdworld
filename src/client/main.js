/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * client side entry point 
 *
 * ***************************************************************************/
"use strict"
/****************************************************************************/
const appMode = function( opt ){
    this.name = opt.name
    this.keyHandler = opt.keyHandler || null
}


$(function() {

    let modes = {
        app: 'app',
        console: 'console window'
    };

    let weirdWorldClient = {
        userMode: modes.app
    };

    weirdWorldClient.socket = io();
    require('../common/features').mountFeatureSystem(weirdWorldClient);
    require('./ui/main').addUiComponent(weirdWorldClient);
    require('./io/main').addDataFetchFeature(weirdWorldClient);
    require('./users/main').addUserManagement(weirdWorldClient);
    require('./ui/tripVisual').tripDisplay(weirdWorldClient);
    require('./views/game').addGameModule(weirdWorldClient);
    require('./execute').addExecuteCommandFeature(weirdWorldClient);
    require('./appModes').addAppDebugConsole(weirdWorldClient);


    $(document).keypress(function(event) {
        if (weirdWorldClient.userMode === 'app') {
            if (event.which === 106) { //go into console mode
                weirdWorldClient.userMode = modes.console;
                weirdWorldClient.consoleMode();
            }
        } else if (weirdWorldClient.userMode === 'console') {
            weirdWorldClient.consoleMode.keyInput(event);
        }
    })

})
