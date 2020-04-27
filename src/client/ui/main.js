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


const resizeUI = function( app ){
    app.ui.visualElements.resize()
    app.threeDScene.resize()
}

const addUiComponent = function( app ){
    app.featureSystem.addComponent({label: 'ui'})
    $(window).resize(()=> {
        resizeUI( app )
    })
   

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
