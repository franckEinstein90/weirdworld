/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * client side entry point 
 *
 * ***************************************************************************/
"use strict"

 /****************************************************************************/
const countries = require('./country').countries
const users = require('./users').users
 /****************************************************************************/

const maxPopulation = 1501590000

let population = function(population) {
    return `Population: <span style='color:red'>${population}</span>`
}

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

let searchResponse = function(data, textStatus, jqXHR) {
    $('#discoverPane').empty()
    data.forEach(country => {
        let countryObject = countries.add({
            countryInfo: country
        })
    })
    countries.forEach((country, countryCode) => {
        $('#discoverPane').append(newCountryCard({
            country,
            countryCode
        }))
    })
}

let getCountryInfo = function(countryInput){
        $.ajax({
                method: "GET",
                url: "/countryInfo",
                data: {
                    country: countryInput
                },
                success: searchResponse
            })
}

$(function() {
    users.ready()   

    let G = new jsnx.Graph();
    G.addNodesFrom([
        ["france", {
            color: 'red'
        }],
        ["togo", {
            color: 'blue'
        }],
        ["mexico", {
            color: 'blue'
        }],
        ["austria", {
            color: 'blue'
        }],
        ["italy", {
            color: 'green'
        }],
        ["spain", {
            color: 'green'
        }],
        ["usa", {
            color: 'green'
        }],
        ["canada", {
            color: 'green'
        }],
        ["germany", {
            color: 'white'
        }]
    ]);
    G.addEdgesFrom([
        ["mexico", "usa"],
        ["canada", "usa"],
        ["france", "spain"],
        ["germany", "italy"],
        ["france", "italy"],
        ["france", "germany"],
        ["germany", "austria"]
    ]);

    // `jsnx.draw` accept a graph and configuration object
    jsnx.draw(G, {
        element: '#demo-canvas',
        nodeAttr: {
            r: 50
        },
        nodeShape: 'circle',
        labelStyle: {
            'font-size': '1.4em'
        },
        layoutAttr: {
            charge: -2000,
            linkDistance: 200
        },
        withLabels: true,
        nodeStyle: {
            fill: function(d) {
                return d.data.color;
            }
        }
    });

    $(window).resize(function() {
        jsnx.draw(G)
    })

    $('#findCountryButton').click(event => {
        event.preventDefault()
        let countryInput = $('#findCountryInput').val()
        getCountryInfo( countryInput )
     })


     getCountryInfo( 'fr' )

})
