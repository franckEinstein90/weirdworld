/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * client side entry point 
 *
 * ***************************************************************************/
"use strict"

 /****************************************************************************/
 /****************************************************************************/
const countries = require('./country').countries
const user = require('./users').user
const discoverPane = require('./ui/discoverPane.js').discoverPane
 /****************************************************************************/

const maxPopulation = 1501590000

let population = function(population) {
    return `Population: <span style='color:red'>${population}</span>`
}

let searchResponse = function(data, textStatus, jqXHR) {
    discoverPane.empty()
    data.forEach(country => {
        let countryObject = countries.add({
            countryInfo: country
        })
    })

    countries.forEach((country, countryCode) => {
        discoverPane.addCard({
            country, 
            countryCode
        })
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

    let weirdWorldClient = {
        ui          : null,
        login       : null,
  
        features    : {
            ui      : false, 
            login   : false
        }
    }

    require('./ui/ui').ui( weirdWorldClient ) 
    require('./users').addLoginFeature( weirdWorldClient ) 
    require('./ui/tripVisual').tripDisplay( weirdWorldClient )

    user.ready()  
    discoverPane.ready()

    let el = document.getElementById('items')
    let sortable = Sortable.create(el) 

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
        ["morroco", {
            color: 'red'
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
        ["morroco", "togo"], 
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



})
