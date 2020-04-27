"use strict"

const THREE = require('three')
const drawAxis = function( _scene ){

   let material = new THREE.LineBasicMaterial({
         color: 0x0000ff
         })

   let geometry = new THREE.Geometry()
   geometry.vertices.push(
         new THREE.Vector3( 0, 0, 0),
         new THREE.Vector3( 0, 50, 0)
      )

   let line = new THREE.Line( geometry, material )
   _scene.add( line )

}

const initGrid = function ( _scene ){
    let gridHelper = new THREE.GridHelper(100, 100)
    _scene.add(gridHelper)

    var material = new THREE.LineBasicMaterial({
         color: 0x0000ff
    })

      var geometry = new THREE.Geometry();
      geometry.vertices.push(
         new THREE.Vector3( -10, 10, 10 ),
         new THREE.Vector3( 10, 30, 10 ),
         new THREE.Vector3( 30, 10, 10 )
      );
      var line = new THREE.Line( geometry, material );
      _scene.add( line );

      geometry = new THREE.Geometry();
      geometry.vertices.push(
         new THREE.Vector3( 10, 30, 10 ),
         new THREE.Vector3( 10, 50, 30 ),
         new THREE.Vector3( 10, 30, 50 )
      );
      line = new THREE.Line( geometry, material );
      _scene.add( line )
} 


const drawObjects = function( _scene ) {

    let material = new THREE.LineBasicMaterial({
         color: 0xff0000
    })

 
    let object = new THREE.Mesh( new THREE.SphereBufferGeometry( 10, 10, 10 ), material)
	object.position.set( -10, 10, 10)
    _scene.add( object )

    object = new THREE.Mesh( new THREE.SphereBufferGeometry( 10, 10, 10 ));
    object.position.set( 10, 30, 10)
    _scene.add( object )

    object = new THREE.Mesh( new THREE.SphereBufferGeometry( 10, 10, 10 ));
    object.position.set( 30, 10, 10)
    _scene.add( object )

    object = new THREE.Mesh( new THREE.SphereBufferGeometry( 10, 10, 10 ));
    object.position.set( 10, 50, 30)
    _scene.add( object )

    object = new THREE.Mesh( new THREE.SphereBufferGeometry( 10, 10, 10 ));
    object.position.set( 10, 30, 50)
    _scene.add( object )
} 

module.exports = {
    drawAxis, 
    initGrid, 
    drawObjects
}
