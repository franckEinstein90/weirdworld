"use strict"
const THREE = require('three')


const addThreeDScene = function ( app ){

    let _scene = new THREE.Scene() 
    _scene.background = new THREE.Color( 'skyblue' )

    let _container = document.querySelector('#rightOrBottom') 
    let ambientLight = new THREE.AmbientLight( 0x606060 )
    _scene.add( ambientLight )
    let directionalLight = new THREE.DirectionalLight(0xffffff)
    _scene.add( directionalLight)

    let _renderer = new THREE.WebGLRenderer( {antialias: true} )
    _renderer.setSize( _container.clientWidth, _container.clientHeight)
    _renderer.setPixelRatio( window.devicePixelRatio ) 
    _container.appendChild( _renderer.domElement )

   let _camera = new THREE.PerspectiveCamera(45, 
            _container.clientWidth / _container.clientHeight, 1, 10000)
        _camera.position.set( 100, 100, 100)
        _camera.lookAt(0,0,0)
    
    require('./threeD/main').initGrid(_scene)
    require('./threeD/main').drawAxis(_scene)
    require('./threeD/main').drawObjects(_scene)
   _renderer.render(_scene, _camera)

    return {
        resize : function(){
            _renderer.setSize( _container.clientWidth, _container.clientHeight)
            _camera = new THREE.PerspectiveCamera(45, 
            _container.clientWidth / _container.clientHeight, 1, 10000)
            _camera.position.set( 100, 100, 100)
            _camera.lookAt(0,0,0)
            _renderer.render(_scene, _camera)
        }
    }
}

const addGraphUiFeature = function(app) {
    app.threeDScene = addThreeDScene( app )
    return app 
}

module.exports = {
    addGraphUiFeature
}
