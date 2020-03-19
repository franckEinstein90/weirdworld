/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 * 
 * ***************************************************************************/
"use strict"
 /****************************************************************************/
const Feature = function( options ){

    this.method     = null
    this.label      = null
    this.mountFile  = null

    if( options.method ){
        this.label = options.method.constructor.name
        this.method = options.method
    }
    if (options.label)      this.label      = options.label
    if (options.mountFile)  this.mountFile  = options.mountFile 

}
const AppComponent = function( componentDefinition ) {

    let _features = new Map()
    this.label = componentDefinition.label

    if('methods' in componentDefinition){
        Object.keys(componentDefinition.methods).forEach((key, index)=>{
            if(key === 'configure') return 
            _features[key] = true
            this[key] = componentDefinition.methods[key]
        })
    }

    this.addFeature =  feature => {
        try {
            let newFeature = new Feature(feature)
            _features.set(newFeature.label, newFeature)
        } catch (err){
            throw err
        } finally{
            return this 
        }
    }

}

const featureSystem = function( app ){

    let _features = new Map()
    let _components = new Map()

    return {
        get listFeatures(){
            let featureList = {}
            _features.forEach((feature, featureTag)=>{
                featureList[featureTag] = feature
            })
            return featureList
        }, 

        addComponent: function( componentInfo ){
            if(!('label' in componentInfo )) throw "Unable to find label property in component definition"
            let component = new AppComponent( componentInfo )
            _components.set(componentInfo.label, component)
            app[componentInfo.label] = component
            return app
        }, 

        addFeature: function ( feature ) {
            try {
                let newFeature = new Feature(feature)
                _features.set( newFeature.label, newFeature)
                if(newFeature.method) app[feature.label] = newFeature.method
            } catch ( err ){
                throw "unable to create new feature"
            } finally {
                return app
            }
       }, 

       implements: function(featureLabel){
            return _features.has(featureLabel)
       }
    }
}

const mountFeatureSystem = function( app ){

    let featureModule   = featureSystem( app )
    app.addFeature      = featureModule.addFeature
    app.addComponent    = featureModule.addComponent
    app.implements      = featureModule.implements
    Object.defineProperty(app, 'features', {get: ()=>featureSystem.listFeatures})
    return app

}

module.exports = {
    mountFeatureSystem
}
