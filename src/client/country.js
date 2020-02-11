/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * country class
 *
 * ***************************************************************************/
"use strict"

class Country{
    constructor({
        alpha3Code,  //3 letter code for country
        borders,     //
        region,      // 
        continent,   //
        nativeName, 
        englishName 
    }){
        this.alpha3Code = alpha3Code
    }
}


const countries = (function() {

    let _countries = new Map()

    return {
        has: function({
            countryCode
        }) {
            return _countries.has(countryCode)
        },

        add: function({
            countryInfo
        }) {
            let country = new Country({
                alpha3Code: countryInfo.alpha3Code,
                borders: countryInfo.borders, 
                region: countryInfo.subregion, 
                continent: countryInfo.region,
                nativeName: countryInfo.nativeName, 
                englishName: countryInfo.name 
                 
            })
            _countries.set(countryInfo.alpha3Code, countryInfo)
        },

        forEach:  callback => _countries.forEach( callback )            
    }
})()


module.exports = {
    countries
}
