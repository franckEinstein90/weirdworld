/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * client side entry point 
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/

$(function() {


    let weirdWorldClient = { 

    }

    weirdWorldClient.socket = io()
    require('../common/features').mountFeatureSystem( weirdWorldClient )
    require('./ui/main').addUiComponent( weirdWorldClient )
    require('./io/main').addDataFetchFeature( weirdWorldClient ) 
    require('./users/main').addUserManagement( weirdWorldClient )
    require('./ui/tripVisual').tripDisplay( weirdWorldClient)
    debugger   

})

