/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"

 /****************************************************************************/
 /****************************************************************************/
let newCountryCard = function( country ) {

    return [
        `<DIV class='countryCard discovered' style='margin-top:20px'>`,
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


const discoverPaneModule = (function(){

    let $discoverPane = null

    return {
        ready: function( containerID ){
            $discoverPane = $(`#${containerID}`)
        }, 
        empty: function(){
            $discoverPane.empty()
        },
        appendCard: function(country){
            $discoverPane.append(newCountryCard(country))
        }
    }
})()

const discoverPane = function({
    clientApp, 
    containerID
}){
    discoverPaneModule.ready( containerID )
    clientApp.countries.forEach(country => discoverPaneModule.appendCard(country))
    clientApp.ui.discoverPane = discoverPaneModule
}

module.exports = {
    discoverPane
}


