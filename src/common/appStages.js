/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 * 
 * ***************************************************************************/
"use strict"
/*****************************************************************************/
const path = require('path')

const _addAppStatusModule = function( app ){

    let _statuses = ['initializing']
    let _statusIndex = 0

    return {

        get current(){
            return _statuses[_statusIndex]
        },

        next : label  => {
            _statuses.push( label )
            _statusIndex += 1
        }
    }
}

const mountStatusModule = function(app){

    return app.addFeature({
        label     : 'status', 
        method    : _addAppStatusModule( app ), 
        mountFile : path.basename(__filename)
    })

}

module.exports = {
   mountStatusModule 
}
