"use strict"

const divPerimeter = require('../ui/frame/css').divPerimeter


const appGame = function( app ){

    let gameCanvasDimensions = divPerimeter("#playPanel")
    /** @type {HTMLCanvasElement} */
    let canvas = document.getElementById('gameScreen')
    let context = canvas.getContext('2d')


    let ship = {
        x: canvas.width /2, 
        y: canvas.height/2, 
        size: 30
    }
    ship.r = ship.size / 2, 
    ship.a = 90 / 180 * Math.PI

    return {

        FPS: 30, 
        update: function(){
            context.fillStyle = "red"
            context.strokeStyle = 'red'
            context.lineWidth = ship.size / 20
            context.beginPath()
            context.moveTo(
                ship.x + ship.r * Math.cos(ship.a), 
                ship.y - ship.r * Math.sin(ship.a) 
            )
            context.lineTo(
                ship.x - ship.r * (Math.cos(ship.a) + Math.sin(ship.a)), 
                ship.y + ship.r * (Math.sin(ship.a) - Math.cos(ship.a))
            )
            context.lineTo(
                ship.x - ship.r * (Math.cos(ship.a) - Math.sin(ship.a)), 
                ship.y + ship.r * (Math.sin(ship.a) + Math.cos(ship.a))
            )
            context.closePath()
            context.stroke()
        }

    }

}

const addGameModule = function( app ){

   app.appGame = appGame(app)
   setInterval(app.appGame.update, 1000/app.appGame.FPS)
   return app

}

module.exports = {
    addGameModule
}