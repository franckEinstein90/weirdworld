"use strict"

const featureSystem = (function(){

    let _features = new Map()

    return {
        
        add : function({ featureName, on }){
                   
        }


    }

})()

const addFeatureSystem = function( app ){
    app.features = featureSystem
    app.features.include = features => Object.keys(features).forEach(key => featureSystem.add(key))
}

module.exports = {
    addFeatureSystem
}
