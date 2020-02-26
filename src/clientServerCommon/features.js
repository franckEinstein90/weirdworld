"use strict"

const featureSystem = (function(){

    let _features = new Map()

    return {
        
        add: function (featureName, on = false) {
            _features.set(featureName, on)           
            featureSystem.list.push(featureName)
        }, 

        has: featureName => _features.has(featureName), 

        list : [] //list the features of the app

    }

})()

const addFeatureSystem = function( app ){
    app.features = featureSystem
}

module.exports = {
    addFeatureSystem
}
