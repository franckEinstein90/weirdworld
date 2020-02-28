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
        countries   : require('../clientServerCommon/countries').countries, 
        cities      : require('../clientServerCommon/cities').cities, 
        trips       : require('../clientServerCommon/trips').trips,
        cuisines    : null, 
        friends     : null, 
        regions     : require('../clientServerCommon/cities').regions, 
        subregion   : null
 //shows: 
  //    languages   : 
   //   currencies  : 
    //  cultures    : 
        //poets : 
        //painters: 
    //  climate     : 

    }

    require('../clientServerCommon/features').addFeatureSystem( weirdWorldClient )
    require('./ui/ui').ui( weirdWorldClient )
    require('./serverComs.js').addDataFetchFeature( weirdWorldClient ) 
    .then( weirdWorldClient => {
        if(weirdWorldClient.features.has('member info')){
            debugger
        } else{
            //user is not logged in, add login feature
            require('./users').addLoginFeature( weirdWorldClient )
            return require('./demo.js').addDemoData({ 
                clientApp       : weirdWorldClient, 
                numCountries    : 10, 
                numCities       : 20, 
                numTrips        : 3
            })
        }
    })

    .then( weirdWorldClient => {
        return require('./ui/discoverPane').discoverPane({
            clientApp: weirdWorldClient, 
            containerID: 'discover'
        })
    })

    require('./ui/tripTabular').tripTabular({
        clientApp : weirdWorldClient, 
        containerID: 'userTripList'
    })

    require('./ui/tripVisual').tripDisplay( weirdWorldClient )
   
})
