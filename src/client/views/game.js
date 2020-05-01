"use strict"

const divPerimeter = require('../ui/frame/css').divPerimeter; 

const GameObject = function( opt ){

    this.x = opt.x || 0;
    this.y = opt.y || 0;
    this.size = opt.size || 30; 
    this.radius = this.size / 2; 
    this.angle = 90 / 180 * Math.PI; 
}

GameObject.prototype.draw = function( context ){
    context.beginPath()
    context.moveTo(
        this.x + this.radius * Math.cos(this.angle), 
        this.y - this.radius * Math.sin(this.angle) 
    );
    context.lineTo(
        this.x - this.radius * (Math.cos(this.angle) + Math.sin(this.angle)), 
        this.y + this.radius * (Math.sin(this.angle) - Math.cos(this.angle))
    );
    context.lineTo(
        this.x - this.radius * (Math.cos(this.angle) - Math.sin(this.angle)), 
        this.y + this.radius * (Math.sin(this.angle) + Math.cos(this.angle))
    );
    context.closePath();
}

const appGame = function( app ){

    let gameCanvasDimensions = divPerimeter("#playPanel"); 
    /** @type {HTMLCanvasElement} */
    let canvas = document.getElementById('gameScreen'); 
    let context = canvas.getContext('2d'); 


    let ship = new GameObject({
        x: canvas.width /2, 
        y: canvas.height/2, 
        size: 30
    });

    return {

        FPS: 30, 

        update: function(){
            context.fillStyle = "red";
            context.strokeStyle = 'red';
            context.lineWidth = ship.size / 20;
            ship.draw( context );
            context.stroke();
        }
    }
}

const addGameModule = function( app ){
   app.appGame = appGame(app);
   setInterval(app.appGame.update, 1000 / app.appGame.FPS);
   return app;
}

module.exports = {
    addGameModule
}