/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * client/server communications 
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/


const getServerData = function( route, query ){
    return new Promise((resolve, reject)=>{
        $.ajax({
                method: "GET",
                url: `/${route}`,
                data: query , 
        })
        .done(data => resolve(data))
        .fail(error => reject(error))
    })
} 


let testServerDataFetch = function(dataFetchFunction){

    return new Promise((resolve, reject) => {
        dataFetchFunction('countryInfo', { country : 'ir' })
        .then( testResult => resolve( true ))
        .catch( err => resolve(false) )
    })

}

const addDataFetchFeature = function( app ){ //adds ajax data fetch

    app.getServerData = (route, query) => getServerData( route, query )
    return testServerDataFetch( app.getServerData )
    .then( testResult => {
        if( testResult ){
            app.features.add("fetch data from server")
            app.locationFinder  = null
            app.locationCreator = null
        }
        return app
    })
}

module.exports = {
    addDataFetchFeature
} 
