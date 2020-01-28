/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * user settigns and info
 *
 * ***************************************************************************/
"use strict"

 /****************************************************************************/

const getUserInfo = function( callback ){
        $.ajax({
                method: "GET",
                url: "/userData",
                success: callback, 
                error: (xhr, stats, error)=>{
                    debugger
                }
            })
}
 
const users = (function(){

    let _countries = new Map()

    let _processUserData = function(result, status, xhr){
        result.countryCodes.forEach(code => _countries.set(code, 1))
    }

    return{
       ready: function( ){
            let userData = getUserInfo( _processUserData)
       }  
    }
})()

module.exports = {
    users
}
