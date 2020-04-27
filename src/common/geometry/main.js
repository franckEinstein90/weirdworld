"use strict"

const addModule  = function( app ){
   app.geometry = {}
   app.geometry.Rectangle = require('./rectangle').Rectangle
}

module.exports = {
   addModule
}