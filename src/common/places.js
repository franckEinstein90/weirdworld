/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * - Trip class
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/


const places = (function(){
    
    let _locationFinder  = null
    let _locationCreator = null
    let _locations = new Map()

    let _findLocation =  placeDescription => {
        return new Promise((resolve, reject) => {
            _locationFinder(placeDescription)

            .then( location =>{
                _locations.set (location.id, location)
                return resolve(location.id)
            })

            .catch( err => {
                let location = _locationCreator( placeDescription )
                _locations.set (location.id, location)
                return resolve(location.id)
            })
        })
    }

    return {

        configure : function({
            locationFinder, 
            locationCreator
        }){
            _locationFinder  = locationFinder
            _locationCreator = locationCreator
        }, 

        name: function( placeDescription ){
            return _findLocation( placeDescription )
        }

    }
})()


module.exports = {
    places
}
