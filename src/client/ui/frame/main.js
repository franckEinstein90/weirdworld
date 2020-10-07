/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * client side entry point 
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/
const UIElement = require('./uiElement').UIElement; 
const cssDef = require('./utils/cssDef').cssDef; 
const leftOrTopLayout = require('./leftOrTop.js').layout; 
const divPerimeter = require('./utils/css.js').divPerimeter;

const deviceRatios = [
    {id: 1, ratio: '4x3'}, 
    {id: 2, ratio: '16x9'}, 
    {id: 3, ratio: '3x2'}
]

const bottomNavCss = cssDef({ 
    width: s => s.width, 
    height: s => s.orientation === 'portrait' ? 55 : 30 
})

const topNavCss    = cssDef({
    width: s => s.width,
    height:55
})

const leftNavCss = cssDef({
    width: 40, 
    height: s => s.height
})



const _contentInnerLayout = ( contentViewport, screen) => {

   let leftTopCss = leftOrTopLayout(contentViewport, screen);
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

    let screen           = divPerimeter( window ) ;
    let visualElements   = app.ui.visualElements ;
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
    debugger 
    if(visualElements.leftNav) {
        debugger
    }


    if($('#content').length)  $('#content').css( contentViewport )
    _contentInnerLayout(contentViewport, screen)
}

const uiFrame = function( app ){

    app.ui.visualElements = {
        topNav          : topNavCss, 
        bottomNav       : bottomNavCss,
        leftNav         : leftNavCss,  
        rightOrBottom   : cssDef({}),
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
