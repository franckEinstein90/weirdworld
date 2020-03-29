(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
        //countries   : require('../clientServerCommon/countries').countries, 
        //cities      : require('../clientServerCommon/cities').cities, 
        cuisines    : null, 
        friends     : null, 
       // regions     : require('../clientServerCommon/cities').regions, 
        subregion   : null
 //shows: 
  //    languages   : 
   //   currencies  : 
    //  cultures    : 
        //poets : 
        //painters: 
    //  climate     : 

    }
    require('../common/features').mountFeatureSystem( weirdWorldClient )
    require('./ui/ui').addUiComponent(                weirdWorldClient )
    require('./serverComs.js').addDataFetchFeature(   weirdWorldClient ) 
    .then( weirdWorldClient => {
        require('./user/users').addLoginFeature(      weirdWorldClient )
/*
        return require('./demo.js').addDemoData({ 
            clientApp       : weirdWorldClient, 
            numCountries    : 10, 
            numCities       : 20, 
            numTrips        : 3
            })*/
    })/*
    .then( weirdWorldClient => {
        require('./user/trips').addTripModule( weirdWorldClient )
        require('./ui/discoverPane').discoverPane({
            clientApp: weirdWorldClient, 
            containerID: 'discover'
        })
        return weirdWorldClient
    })
    .then( weirdWorldClient => {
        require('./ui/tripTabular').tripTabular({
            clientApp : weirdWorldClient, 
            containerID: 'userTripList'
        })

        require('./ui/tripVisual').tripDisplay( weirdWorldClient )
    })*/
  
})

},{"../common/features":7,"./serverComs.js":2,"./ui/ui":5,"./user/users":6}],2:[function(require,module,exports){
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
    debugger
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
        app.addFeature({
            label: 'serverFetch', 
            method: (route, query) => getServerData(route, query)
        })
        return resolve(app)
    })

}

module.exports = {
    addDataFetchFeature
} 

},{}],3:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * client side entry point 
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/
const deviceRatios = [
    {id: 1, ratio: '4x3'}, 
    {id: 2, ratio: '16x9'}, 
    {id: 3, ratio: '3x2'}
]
    

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

const _setHeight = (element, height) => {
    element.height(height)
}

const _configureLayout = ( app ) => {

    let screen           = _screenDimensions()
    let visualElements   = app.ui.visualElements
    let contentViewport  = {
        top     : 0, 
        height  : screen.height, 
        width   : screen.width
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
        $('#bottomNav').css( bottomNav )
    }
    
    $('#content').css( contentViewport )

    leftTopCss = {
        top  : contentViewport.top, 
        height : contentViewport.height, 
        width  : contentViewport.width / 2 
    } 
    $('#leftTop').css( leftTopCss )

}

let bottomNavCss = screen => {
    let height = screen.orientation === 'portrait' ? 55 : 30
    return {
        top: screen.height - height, 
        left: 0, 
        height 
    }
}

let topNavCss = screen => {
    return {
        top: 0,  
        left: 0, 
        height: 55 
    }
}


const uiFrame = function( app ){

    app.ui.visualElements = {
        topNav      : topNavCss, 
        bottomNav   : bottomNavCss, 
    }   

    _configureLayout( app )
    $(window).resize(()=> {
        _configureLayout( app )
    })

}

const addAppFrameFeature = function( app ){
    uiFrame( app )
    return app
}


module.exports = {
    addAppFrameFeature
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
    
const addModalFeature = function( app ){
    app.ui.addFeature({ label: 'modalWindow', method: showModal })
    return app 
}


module.exports = {
    addModalFeature
}

},{}],5:[function(require,module,exports){
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


const ui = function( app ){

    let createTrigger = (htmlID, action) => {
        $(`#${htmlID}`).click(action)
    }
    app.ui.addFeature({label: 'createTrigger', method: createTrigger})
    app.ui.addFeature({label: 'createInput', method: inputField})

    addModalFeature(app)
}

const addUiComponent = function( app ){
    app.addComponent({label: 'ui'})
    ui( app )
    require('./appFrame').addAppFrameFeature( app )
}

module.exports = {
   addUiComponent 
}

},{"./appFrame":3,"./modal":4}],6:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * user settigns and info
 *
 * ***************************************************************************/
"use strict"
const showModal = require('../ui/modal').showModal
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



const addLoginFeature = function( app ){

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


    app.addComponent({label: 'userManagement'})

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
    addLoginFeature, 
    user
}

},{"../ui/modal":4}],7:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 * 
 * ***************************************************************************/
"use strict"
 /****************************************************************************/
const Feature = function( options ){

    this.method     = null
    this.label      = null
    this.mountFile  = null

    if( options.method ){
        this.label = options.method.constructor.name
        this.method = options.method
    }
    if (options.label)      this.label      = options.label
    if (options.mountFile)  this.mountFile  = options.mountFile 

}
const AppComponent = function( componentDefinition ) {

    let _features = new Map()
    this.label = componentDefinition.label

    if('methods' in componentDefinition){
        Object.keys(componentDefinition.methods).forEach((key, index)=>{
            if(key === 'configure') return 
            _features[key] = true
            this[key] = componentDefinition.methods[key]
        })
    }

    this.addFeature =  feature => {
        try {
            let newFeature = new Feature(feature)
            _features.set(newFeature.label, newFeature)
        } catch (err){
            throw err
        } finally{
            return this 
        }
    }

}

const featureSystem = function( app ){

    let _features = new Map()
    let _components = new Map()

    return {
        get listFeatures(){
            let featureList = {}
            _features.forEach((feature, featureTag)=>{
                featureList[featureTag] = feature
            })
            return featureList
        }, 

        addComponent: function( componentInfo ){
            if(!('label' in componentInfo )) throw "Unable to find label property in component definition"
            let component = new AppComponent( componentInfo )
            _components.set(componentInfo.label, component)
            app[componentInfo.label] = component
            return app
        }, 

        addFeature: function ( feature ) {
            try {
                let newFeature = new Feature(feature)
                _features.set( newFeature.label, newFeature)
                if(newFeature.method) app[feature.label] = newFeature.method
            } catch ( err ){
                throw "unable to create new feature"
            } finally {
                return app
            }
       }, 

       implements: function(featureLabel){
            return _features.has(featureLabel)
       }
    }
}

const mountFeatureSystem = function( app ){

    let featureModule   = featureSystem( app )
    app.addFeature      = featureModule.addFeature
    app.addComponent    = featureModule.addComponent
    app.implements      = featureModule.implements
    Object.defineProperty(app, 'features', {get: ()=>featureSystem.listFeatures})
    return app

}

module.exports = {
    mountFeatureSystem
}

},{}]},{},[1]);
