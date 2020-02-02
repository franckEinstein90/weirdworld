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


 
const user = (function(){

    let _countries = new Map()
    let _trips = new Map()
    let _userData = null

    let _processUserData = function(result, status, xhr){
        _userData = result
        debugger
    }

    return{
       ready: function( ){

            $('#userTripList').DataTable({
                paging: false, 
                searching: false,
                select: true
            })

           $('#topNavNewTripTrigger').click( event => {
                event.preventDefault()
            
           })

           getUserInfo( _processUserData )
       }  
    }
})()



module.exports = {
    user
}
