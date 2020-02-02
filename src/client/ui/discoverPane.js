/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"

 /****************************************************************************/
 /****************************************************************************/
let newCountryCard = function({
    countryCode, 
    country
}) {

    return [
        `<div class='w3-card countryCard discovered' style='margin-top:20px'>`,
        `<DIV style='display:flex'>`, 
             `<DIV style="text-align:left;width:200px; color:blue; background-color:yellow; margin-left:5px">`, 
                `<h3>${country.region}</h3>`, 
                country.subregion, 
             `</DIV>`, 

             `<DIV style="padding-left:20px; text-align:left">`, 
                    `<h2>${country.name}</h2>`,
             `</DIV>`, 
        `</DIV>`,
        `<DIV>Borders: ${country.borders.map(b => "<b>" + b + "</b>")}</DIV>`,
        '</div>'
    ].join('')
}


const discoverPane = (function(){

    let $discoverPane = null

    return {
        ready: function(){
            $discoverPane = $('#discover')
        }, 
        empty: function(){
            $discoverPane.empty()
        },
        addCard: function({
            country, 
            countryCode
            }){
            $discoverPane.append(newCountryCard({
                country,
                countryCode
          }))
        }
    }
})()

module.exports = {
    discoverPane
}


