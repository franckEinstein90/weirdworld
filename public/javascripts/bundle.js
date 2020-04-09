(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * client/server communications 
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/


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


let testServerDataFetch = function(dataFetchFunction){

    return new Promise((resolve, reject) => {
        dataFetchFunction('countryInfo', { country : 'ir' })
        .then( testResult => resolve( true ))
        .catch( err => resolve(false) )
    })

}

const addDataFetchFeature = function( app ){ //adds ajax data fetch

    return new Promise((resolve, rejet) => {
        app.featureSystem.addFeature({
            label: 'serverFetch', 
            method: (route, query) => getServerData(route, query)
        })
        return resolve(app)
    })

}

module.exports = {
    addDataFetchFeature
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

$(function() {


    let weirdWorldClient = { 
    }

    weirdWorldClient.socket = io()
    require('../common/features').mountFeatureSystem( weirdWorldClient )
    require('./ui/main').addUiComponent( weirdWorldClient )
    require('./io/main').addDataFetchFeature( weirdWorldClient ) 
    require('./users/main').addUserManagement( weirdWorldClient )
    require('./ui/tripVisual').tripDisplay( weirdWorldClient) 

})


},{"../common/features":11,"./io/main":1,"./ui/main":7,"./ui/tripVisual":9,"./users/main":10}],3:[function(require,module,exports){
/*******************************************************************************
 *  ui feature for bottom status bar of client app
 ******************************************************************************/
"use strict"
/******************************************************************************/

/******************************************************************************/


const bottomNav = function( app ){

    let msgs = {
        clientStatus: 'client loaded', 
        serverStatus: 'waiting for message', 
        queryStatus: 'N/A'
    } 

    let updateTicker = () => {
        let statusBarContent = [
            `client: ${msgs.clientStatus}`, 
            `server: ${msgs.serverStatus}`, 
            `query: ${msgs.queryStatus}`
        ].join(' | ')
        $('#bottomNav').text(statusBarContent)
    }

    app.socket.on('updateBottomStatusInfo', function( data ) {
        if('serverStatus' in data){
            msgs.serverStatus = data.serverStatus
        }
        updateTicker()
    })

    updateTicker()
    return app
}


const addFeature = function( app ){
    return bottomNav( app )
}

module.exports = {
    addFeature
}
},{}],4:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * client side entry point 
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/
 const UIElement = require('./uiElement').UIElement

const deviceRatios = [
    {id: 1, ratio: '4x3'}, 
    {id: 2, ratio: '16x9'}, 
    {id: 3, ratio: '3x2'}
]
   
const cssDef = options => screen => {
    let assign = (value, property) => {
        if(typeof value[property] === 'function'){
            return value[property](screen)
        } else {
            return value[property]
        }
    }
    let height = 0
    let width = 0
    if(options.width) width = assign( options, 'width')
    if(options.height) height = assign( options, 'height')
    return {
        left: 0, 
        top: 0, 
        width, 
        height
    }    
}

let bottomNavCss = cssDef({ 
    width: s => s.width, 
    height: s => s.orientation === 'portrait' ? 55 : 30 
})

let contentCss = cssDef({
    width: s => s.width
})

let topNavCss    = cssDef({
    width: s => s.width,
    height:55
})

let bottomRightCss = cssDef({})


const _screenDimensions = _ => {
    let height =  $( window ).height()
    let width = $( window ).width()
    let orientation = height > width ? 'portrait' : 'landscape' 
     return {
        height,
        width,
        orientation
    }
}
const _contentInnerLayout = ( contentViewport, screen) => {

    let leftTopCss = {
        top     : contentViewport.top, 
        height  : contentViewport.height,
        width   : contentViewport.width
    } 
 
    if($('#leftOrTop').length){
        if (screen.orientation === 'portrait'){
            leftTopCss.top    = contentViewport.top
            leftTopCss.height = contentViewport.height / 2
            leftTopCss.width =  contentViewport.width
        } else {
            leftTopCss.width = contentViewport.width / 2 
        } 
       $('#leftOrTop').css( leftTopCss )
    }

    let bottomOrRightCss = {
        top: leftTopCss.top,  
        height: contentViewport.height,
        width: contentViewport.width/2, 
        left: contentViewport.width/2 
    } 
    if($('#rightOrBottom').length){
        if (screen.orientation === 'portrait'){
            bottomOrRightCss.top    = contentViewport.top + (contentViewport.height / 2) 
            bottomOrRightCss.height = contentViewport.height / 2 
            bottomOrRightCss.width  = contentViewport.width
            bottomOrRightCss.left   = 0 
        } else {

        } 
       $('#rightOrBottom').css( bottomOrRightCss)
    }
}

const _configureLayout = ( app ) => {

    let screen           = _screenDimensions()
    let visualElements   = app.ui.visualElements
    let contentViewport  = {
        top     : 0, 
        height  : screen.height, 
        width   : screen.width,
        bottom  : screen.height
    }
    
    if( visualElements.topNav ){  
        let topNav = visualElements.topNav( screen )
        contentViewport.top     += topNav.height
        contentViewport.height  -= topNav.height
        $('#topNav').css( topNav )
    }

    if( visualElements.bottomNav ){
        let bottomNav = visualElements.bottomNav( screen )
        contentViewport.height -= bottomNav.height
        contentViewport.bottom -= bottomNav.height
        bottomNav.top = contentViewport.bottom
        $('#bottomNav').css( bottomNav )
    }
    
    if($('#content').length)  $('#content').css( contentViewport )
    _contentInnerLayout(contentViewport, screen)
}

const uiFrame = function( app ){
    app.ui.visualElements = {
        topNav          : topNavCss, 
        bottomNav       : bottomNavCss, 
        rightOrBottom   : bottomRightCss
    }   

    _configureLayout( app )
    $(window).resize(()=> {
        _configureLayout( app )
    })
   return app

}



const addAppFrameFeature = function( app ){
    debugger

    Object.defineProperty(app.ui, 'screen', { get: function(){
        return new this.geometry.Rectangle({
            height:  $( window ).height(),
            width: $( window ).width()
        })
    }})

    uiFrame( app )
    require('./bottomNav').addFeature( app )
    return app
}


module.exports = {
    addAppFrameFeature
}

},{"./bottomNav":3,"./uiElement":5}],5:[function(require,module,exports){
"use strict"

const UiElement = function( options ){

   this.container = options.container

}

module.exports = {
   UiElement
}
},{}],6:[function(require,module,exports){
"use strict"


const addGraphUiFeature = function(app) {

    debugger

}

module.exports = {
    addGraphUiFeature
}

},{}],7:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/
const sections = [
    window, 
    '#viewPort', 
    '#visualCanvas'
]

const inputField = ({
    icon,
    inputID,  
    placeholder
}) => [ `<div class="w3-row w3-section">`, 
            `<div class="w3-col" style="width:50px"><i class="w3-xxlarge ${icon}"></i></div>`, 
            `<div class="w3-rest">`, 
            `<input class="w3-input w3-border" id='${inputID}' `, 
            `name="first" type="text" placeholder="${placeholder}">`, 
            `</div>`, 
        `</div>` ].join('')


const triggers = function( app ){

    let createTrigger = (htmlID, action) => {
        $(`#${htmlID}`).click(action)
    }
    app.ui.addFeature({label: 'createTrigger', method: createTrigger})
    app.ui.addFeature({label: 'createInput', method: inputField})

}

const addUiComponent = function( app ){
    app.featureSystem.addComponent({label: 'ui'})
    require('../../common/geometry/main').addModule(app.ui)
    triggers( app )
    require('./frame/main').addAppFrameFeature( app )
    require('./modal/main').addModalFeature(app)
    require('./graphUi').addGraphUiFeature(app)
    return app
}

module.exports = {
   addUiComponent 
}

},{"../../common/geometry/main":12,"./frame/main":4,"./graphUi":6,"./modal/main":8}],8:[function(require,module,exports){
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
    
const addModalFeature = function( app ){
    app.ui.addFeature({ label: 'modalWindow', method: showModal })
    return app 
}


module.exports = {
    addModalFeature
}

},{}],9:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * client side entry point 
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/





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
        nodes   : {
            shadow:true, 
            font: '15px yellow'
        }, 
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

},{}],10:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * user settigns and info
 *
 * ***************************************************************************/
"use strict"
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



const addUserManagement = function( app ){

    const userNameInput = app.ui.createInput({
        icon        : 'fa fa-user', 
        placeholder : 'Member Name or Email', 
        inputID     : 'userName'
    })

    const passwordInput = app.ui.createInput({
        icon        : 'fa fa-envelope-o', 
        placeholder : 'Password', 
        inputID     : 'password'
    })
 
    const loginForm = [
    `<form>`, 
        `${userNameInput}`, 
        `${passwordInput}`,
        `<button id="loginButton" class="w3-button w3-block w3-section w3-ripple w3-padding">Come in</button>`, 
    `</form>`
    ].join('')


    app.featureSystem.addComponent({label: 'userManagement'})

    let authenticateUser = function({userHandle, password}){
        let userInfoQuery = { userHandle, password }
        app.serverFetch('user', userInfoQuery)
    }

    app.userManagement.addFeature({
        label: 'authenticateUser', 
        method: authenticateUser 
    })

    app.userManagement.addFeature({
        label: 'userLogin', 
        method: ()=>{
            let userHandle = $('#userName').val()
            let password = $('#password').val()
            app.userManagement.authenticateUser({
                userHandle, 
                password
            })
        }
    })

    app.userManagement.addFeature({
        label: 'userLoginModal', 
        method: loginContent => {
            app.ui.modalWindow({
                title: 'Login', 
                content: loginForm 
            })
            app.ui.createTrigger('loginButton', app.userManagement.userLogin)
        }
    })

    app.ui.createTrigger('btnLogin', event => {
        event.preventDefault()
        app.userManagement.userLoginModal()
    })

    return app
}

module.exports = {
    addUserManagement
}

},{}],11:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 * 
 * ***************************************************************************/
"use strict"
 /****************************************************************************//*****************************************************************************/
"use strict"
/*****************************************************************************/

class Feature {

    constructor( options ){
        this.label          = options.label
        this.implemented    = options.implemented || false
        this.method         = options.method || false
    }

}

function AppComponent( componentDefinition ){

    this.label = componentDefinition.label
    let _features = new Map()

    if('methods' in componentDefinition) {
        Object.keys(componentDefinition.methods).forEach(
            (key, index)=>{
                if(key === 'configure') return
                _features[key] = true
                this[key] = componentDefinition.methods[key]
            })
    }

    this.addFeature =  function(feature){
        if(!('label' in feature)) throw 'error in feature definition'
        if(_features.has(feature.label)) throw "feature already exists"
        _features.set( feature.label, feature)
        if('method' in feature) this[ feature.label ] = feature.method
    }
}

const featureSystem = function( app ){

    let _features       = new Map()
    let _components     = new Map()
    let _reqMajor       = 0
    let _requirements   = new Map()

    return {

        get list()  {
            let features = {}
            _features.forEach((value, key)=>{
                features[key] = value
            })
            return features
        },

        implements  : featureLabel => _features.has(featureLabel), 

        addRequirement  : function({
            req, 
            parentReq
        }) {
            if( parentReq === undefined || parentReq === null){
                _reqMajor += 1
                _requirements.set(  _reqMajor, req)
            }
        },

        includes: featureName => {
            if(_features.has(featureName)) return _features.get(featureName)
            return false
        },

        addComponent : function( componentInfo ){
            let newComponent = new AppComponent( componentInfo )
            _components.set(newComponent.label, newComponent)
            app[newComponent.label] = newComponent 
        }, 

        add : function( feature ){
            if(!('label' in feature)) throw 'error in feature definition'
            if(_features.has(feature.label)) throw "feature already exists"
            _features.set( feature.label, feature)
            if('method' in feature) app[ feature.label ] = feature.method
        }
    }
}

const mountFeatureSystem = function( app ){

    let features = featureSystem( app )
    Object.defineProperty( app, 'features', {get: () => features.list})
    app.featureSystem = {}
    app.featureSystem.addRequirement = features.addRequirement        
    app.featureSystem.addComponent   = features.addComponent
    app.featureSystem.Feature = Feature
    app.featureSystem.addFeature = features.add
    app.featureSystem.implements = features.implements
    return app
}

module.exports = {
    mountFeatureSystem
}

},{}],12:[function(require,module,exports){
"use strict"

const addModule  = function( app ){
   app.geometry = {}
   app.geometry.Rectangle = require('./rectangle').Rectangle
}

module.exports = {
   addModule
}
},{"./rectangle":13}],13:[function(require,module,exports){
"use strict"
 /****************************************************************************/
  
let Rectangle = function(options){
      this.top = options.top || 0
      this.left = options.left || 0
      this.height = options.height || 0
      this.width = options.width || 0
      this.right = this.left + this.width
      this.bottom = this.top + this.height
      this.orientation = this.height > this.width ? 'portrait' : 'landscape' 
}

module.exports = {
   Rectangle
}
},{}]},{},[2]);
