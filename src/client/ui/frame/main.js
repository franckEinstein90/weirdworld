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
        rightOrBottom   : bottomRightCss,
        resize          : function(){
            _configureLayout( app )
        }
    }   
   _configureLayout( app )
   return app

}



const addAppFrameFeature = function( app ){

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
