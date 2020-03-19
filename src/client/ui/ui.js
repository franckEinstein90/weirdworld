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
