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
        //countries   : require('../clientServerCommon/countries').countries, 
        //cities      : require('../clientServerCommon/cities').cities, 
        cuisines    : null, 
        friends     : null, 
       // regions     : require('../clientServerCommon/cities').regions, 
        subregion   : null
 //shows: 
  //    languages   : 
   //   currencies  : 
    //  cultures    : 
        //poets : 
        //painters: 
    //  climate     : 

    }
    require('../common/features').mountFeatureSystem( weirdWorldClient )
    require('./ui/ui').addUiComponent(                weirdWorldClient )
    require('./serverComs.js').addDataFetchFeature(   weirdWorldClient ) 
    .then( weirdWorldClient => {
        require('./user/users').addLoginFeature(      weirdWorldClient )
/*
        return require('./demo.js').addDemoData({ 
            clientApp       : weirdWorldClient, 
            numCountries    : 10, 
            numCities       : 20, 
            numTrips        : 3
            })*/
    })/*
    .then( weirdWorldClient => {
        require('./user/trips').addTripModule( weirdWorldClient )
        require('./ui/discoverPane').discoverPane({
            clientApp: weirdWorldClient, 
            containerID: 'discover'
        })
        return weirdWorldClient
    })
    .then( weirdWorldClient => {
        require('./ui/tripTabular').tripTabular({
            clientApp : weirdWorldClient, 
            containerID: 'userTripList'
        })

        require('./ui/tripVisual').tripDisplay( weirdWorldClient )
    })*/
  
})
