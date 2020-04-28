"use strict"

const addExecuteCommandFeature = function( app ){
    app.execute = function(command){
        if(command === 'refresh') {
            alert('refreshing client')
        } 
    }
}
module.exports = {
    addExecuteCommandFeature
}
