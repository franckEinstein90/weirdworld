"use strict"

const divPerimeter = require('./utils/css').divPerimeter

const layout = function( contentViewport, screen) {

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
    let visualCanvasPerimeter = divPerimeter("#visualCanvas")
    $('#playPanel').css({
        height: leftTopCss.height - visualCanvasPerimeter.height 
    })
    return leftTopCss
}

module.exports = {
   layout 
}
