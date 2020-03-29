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

const _setHeight  = (element, height) => {
    element.height(height)
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

const cssDef = options => screen => {
    let height = 0
    if(options.height){
        if(typeof options.height === 'function') {
            height = options.height(screen)
        } else {
            height = options.height
        }
    }
       return {
           top: 0, 
           height,
           left:0
       }     
}

let bottomNavCss = cssDef({ height: s => s.orientation === 'portrait' ? 55 : 30 })
let topNavCss    = cssDef({height:55})
let bottomRightCss = cssDef({})

const uiFrame = function( app ){
    debugger
    app.ui.visualElements = {
        topNav          : topNavCss, 
        bottomNav       : bottomNavCss, 
        rightOrBottom   : bottomRightCss
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
