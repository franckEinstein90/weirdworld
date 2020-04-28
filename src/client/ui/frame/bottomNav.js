/*******************************************************************************
 *  ui feature for bottom status bar of client app
 ******************************************************************************/
"use strict"
/******************************************************************************/

/******************************************************************************/


const bottomNav = function( app ){

    let msgs = {
        clientStatus: 'client loaded', 
        serverStatus: 'waiting for message', 
        queryStatus: 'N/A'
    } 

    let updateTicker = () => {
        let statusBarContent = [
            `client: ${msgs.clientStatus}`, 
            `server: ${msgs.serverStatus}`, 
            `query: ${msgs.queryStatus}`
        ].join(' | ')
        $('#bottomNav').text(statusBarContent)
    }

    app.socket.on('updateBottomStatusInfo', function( data ) {
        if('serverStatus' in data){
            msgs.serverStatus = data.serverStatus
        }
        updateTicker()
    })

    $("#bottomNav").click(function( event ){
        $("#bottomNav").focus()
    })

    updateTicker()
    return app
}


const addFeature = function( app ){
    return bottomNav( app )
}

module.exports = {
    addFeature
}
