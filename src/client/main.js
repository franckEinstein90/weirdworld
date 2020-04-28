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
    require('./execute').addExecuteCommandFeature( weirdWorldClient ) 
    weirdWorldClient.userMode = 'console'

    weirdWorldClient.consoleMode = (function() {

        let charBuffer = []
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
                    weirdWorldClient.execute(String.fromCharCode(...charBuffer))
                    charBuffer.length = 0
                }
                else{
                    charBuffer.push(event.which)
                    out()
            }
                
          }
        }

    })()

    $( document ).keypress(function( event ){
        if(weirdWorldClient.userMode === 'console'){
            weirdWorldClient.consoleMode.keyInput(event)
       }
   })

})

