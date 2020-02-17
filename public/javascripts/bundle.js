(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./country":1,"./ui/discoverPane.js":3,"./ui/tripVisual":5,"./ui/ui":6,"./users":7}],3:[function(require,module,exports){
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



},{}],4:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"

 /****************************************************************************/


const showModal  = ({
    title, 
    content
}) => {
         $('#modalTitle').text(title)
         $('#modalContent').html(content)
         document.getElementById('modalWindow').style.display='block'
}
    
const addModalFeature = function( ui ){

    ui.features.modal = true
    let _modalLogin = {
      title: "member login"
    }

    let _modalWindows = new Map()
    _modalWindows.set("login", _modalLogin)

    ui.showModal = showModal
    return ui
   /* : function( modalId ){
         let modalContent = _modalWindows.get(modalId) 
      }*/
}


module.exports = {
    addModalFeature
}

},{}],5:[function(require,module,exports){
"use strict"

const tripDisplay = function( clientApp ){
    let nodes = new vis.DataSet([
        {id: 1, label: 'Berlin'}, 
        {id: 2, label: 'Prague'}, 
        {id: 3, label: 'venice'},
        {id: 4, label: 'Bologna'}
    ])

    let edges = new vis.DataSet([
        {from: 1, to: 2}, 
        {from: 2, to: 3, label:'Lufthansa (152$)'}, 
        {from: 3, to: 4}
    ])

    let container = document.getElementById('visualCanvas')
    let data = {
        nodes, 
        edges
    }
    let options = {
        edges   : {
            arrows  : {
                to: true
            }
        }
    }
    let trip = new vis.Network(container, data, options)
}

module.exports = {
    tripDisplay
}
},{}],6:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"

 /****************************************************************************/
const addModalFeature = require('./modal').addModalFeature
 /****************************************************************************/
const sections = [
    window, 
    '#viewPort', 
    '#visualCanvas'
]

const ui = function( app ){
    app.ui = { 
        modal   : null
    }
    app.ui.features = {
        modal   : false
    }
    addModalFeature(app.ui)

    let _sections = sections.map( section => {
            return {
                handle  : section, 
                height  : null, 
                width   : null
            } 
    })
    
    let _readySize = () => _sections.forEach( section => {
            section.height = $( section.handle ).height()
            section.width  = $( section.handle ).width()
    })

    let _logSize = section => `${section.handle}: w-${section.width} h-${section.height}`
   
    app.features.ui = true
}

module.exports = {
    ui
}

},{"./modal":4}],7:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * user settigns and info
 *
 * ***************************************************************************/
"use strict"
const showModal = require('./ui/modal').showModal
 /****************************************************************************/

const getUserInfo = function( callback ){
    $.ajax({
        method: "GET",
        url: "/userData",
        success: callback, 
        error: (xhr, stats, error)=>{
        }
            })
}


 
const user = (function(){

    let _countries = new Map()
    let _trips = new Map()
    let _userData = null

    let _processUserData = function(result, status, xhr){
        _userData = result
    }

    return{
       ready: function( ){
                $('#userTripList').DataTable({
                paging: false, 
                searching: false,
                select: true
            })

           $('#topNavNewTripTrigger').click( event => {
                event.preventDefault()
           })

           getUserInfo( _processUserData )
       }  
    }
})()



const inputField = ({
    icon, 
    placeholder
}) => [ `<div class="w3-row w3-section">`, 
            `<div class="w3-col" style="width:50px"><i class="w3-xxlarge ${icon}"></i></div>`, 
            `<div class="w3-rest">`, 
            `<input class="w3-input w3-border" name="first" type="text" placeholder="${placeholder}">`, 
            `</div>`, 
        `</div>` ].join('')


const userNameInput = inputField({
    icon: 'fa fa-user', 
    placeholder: 'Member Name or Email'
})

const emailInput = inputField({
    icon:           'fa fa-envelope-o', 
    placeholder:    'Password'
})
 
const loginForm = [
    `<form>`, 
    `${userNameInput}`, 
    `${emailInput}`,
    `<button class="w3-button w3-block w3-section w3-ripple w3-padding">Come in</button>`, 
    `</form>`
    ].join('')

const addLoginFeature = function( app ){

    if(app.ui.features.modal){
            app.showLogin = x => app.ui.showModal({
                title   : 'Login', 
                content : loginForm 
            })

            $('#btnLogin').click( event => {
                event.preventDefault()
                app.showLogin( )
            })

            app.features.login = true
    }
}

module.exports = {
    addLoginFeature, 
    user
}

},{"./ui/modal":4}]},{},[2]);
