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
        `<DIV class='countryCard discovered ${country.region}'>`, 
        `<DIV style='display:flex'>`, 
             `<DIV style="text-align:left;width:200px;">`, 
                country.subregion, 
             `</DIV>`, 

             `<DIV style="padding-left:20px; text-align:left">`, 
                    `<h2 style="padding-right:10px">${country.name}</h2>`,
             `</DIV>`, 
        `</DIV>`,
        '</DIV>'
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
    Sortable.create(document.getElementById(containerID))
    clientApp.ui.discoverPane = discoverPaneModule
}

module.exports = {
    discoverPane
}


