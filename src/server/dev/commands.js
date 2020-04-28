

const devCommands = function( app ){
   let _router = require('express').Router()
   _router.get('/', function(req, res){
      debugger
   })

   app.routers.push({
        route: 'cmds', 
        router: _router 
    })
}

module.exports = {
   devCommands
}