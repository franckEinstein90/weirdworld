/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * user settigns and info
 *
 * ***************************************************************************/
"use strict"
const showModal = require('./ui/modal').showModal
 /****************************************************************************/

const getUserInfo = function( callback ){
    $.ajax({
        method: "GET",
        url: "/userData",
        success: callback, 
        error: (xhr, stats, error)=>{
        }
            })
}


 
const user = (function(){

    let _countries = new Map()
    let _trips = new Map()
    let _userData = null

    let _processUserData = function(result, status, xhr){
        _userData = result
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



const inputField = ({
    icon, 
    placeholder
}) => [ `<div class="w3-row w3-section">`, 
            `<div class="w3-col" style="width:50px"><i class="w3-xxlarge ${icon}"></i></div>`, 
            `<div class="w3-rest">`, 
            `<input class="w3-input w3-border" name="first" type="text" placeholder="${placeholder}">`, 
            `</div>`, 
        `</div>` ].join('')


const userNameInput = inputField({
    icon: 'fa fa-user', 
    placeholder: 'Member Name or Email'
})

const emailInput = inputField({
    icon:           'fa fa-envelope-o', 
    placeholder:    'Password'
})
 
const loginForm = [
    `<form>`, 
    `${userNameInput}`, 
    `${emailInput}`,
    `<button class="w3-button w3-block w3-section w3-ripple w3-padding">Come in</button>`, 
    `</form>`
    ].join('')

const addLoginFeature = function( app ){

    app.showLogin = x => app.ui.showModal({
        title   : 'Login', 
        content : loginForm 
    })

    $('#btnLogin').click( event => {
        event.preventDefault()
        app.showLogin( )
    })

    app.features.add('login')
    return app
}

module.exports = {
    addLoginFeature, 
    user
}
