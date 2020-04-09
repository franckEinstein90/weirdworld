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



const addUserManagement = function( app ){

    const userNameInput = app.ui.createInput({
        icon        : 'fa fa-user', 
        placeholder : 'Member Name or Email', 
        inputID     : 'userName'
    })

    const passwordInput = app.ui.createInput({
        icon        : 'fa fa-envelope-o', 
        placeholder : 'Password', 
        inputID     : 'password'
    })
 
    const loginForm = [
    `<form>`, 
        `${userNameInput}`, 
        `${passwordInput}`,
        `<button id="loginButton" class="w3-button w3-block w3-section w3-ripple w3-padding">Come in</button>`, 
    `</form>`
    ].join('')


    app.featureSystem.addComponent({label: 'userManagement'})

    let authenticateUser = function({userHandle, password}){
        let userInfoQuery = { userHandle, password }
        app.serverFetch('user', userInfoQuery)
    }

    app.userManagement.addFeature({
        label: 'authenticateUser', 
        method: authenticateUser 
    })

    app.userManagement.addFeature({
        label: 'userLogin', 
        method: ()=>{
            let userHandle = $('#userName').val()
            let password = $('#password').val()
            app.userManagement.authenticateUser({
                userHandle, 
                password
            })
        }
    })

    app.userManagement.addFeature({
        label: 'userLoginModal', 
        method: loginContent => {
            app.ui.modalWindow({
                title: 'Login', 
                content: loginForm 
            })
            app.ui.createTrigger('loginButton', app.userManagement.userLogin)
        }
    })

    app.ui.createTrigger('btnLogin', event => {
        event.preventDefault()
        app.userManagement.userLoginModal()
    })

    return app
}

module.exports = {
    addUserManagement
}
