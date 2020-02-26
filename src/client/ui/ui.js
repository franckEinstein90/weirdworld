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
   
    app.features.add('ui')
    addModalFeature(app)
}

module.exports = {
    ui
}
