/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * country class
 *
 * ***************************************************************************/
"use strict"

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
            _countries.set(countryInfo.alpha3Code, countryInfo)
        },
        forEach:  callback => _countries.forEach( callback )            
    }
})()


module.exports = {
    countries
}
