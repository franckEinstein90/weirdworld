/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * client side entry point 
 *
 * ***************************************************************************/
"use strict";
/****************************************************************************/
const addAppDebugConsole = function( app ){

    app.consoleMode = function(){
        $('#console').css('display', 'visible')
    }

    let charBuffer = [];
    let out = (mode) => {
        if(mode === 'keyCode') {
            $('#console').text("> " +  charBuffer)
        } else {
            $('#console').text("> " +  String.fromCharCode(...charBuffer))
        }
    }


    return {

        keyInput: function(event){
            if( event.which === 13 ) {
                app.execute(String.fromCharCode(...charBuffer))
                charBuffer.length = 0
            }
            else{
                charBuffer.push(event.which)
                out()
        }
            
      }
    }

}

    
module.exports = {
    addAppDebugConsole
}
