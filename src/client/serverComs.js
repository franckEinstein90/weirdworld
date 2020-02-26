"use strict"


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

const addDataFetchFeature = function( app ){ //adds ajax data fetch
    app.getServerData = (route, query) => getServerData( route, query )
    return app.getServerData('countryInfo', {country : 'ir'})
    .then( testResult => { //it worked, add feature
            app.features.add("fetch data from server")
            return app
        })
    .catch( result => {    //it didn't work, don't add
        return app         //feature
    })
}

module.exports = {
    addDataFetchFeature
} 
