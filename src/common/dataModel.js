"use strict"
 
const viewModel = function( app ){

    let primary  = 'primary'
    let foreign  = entity => `foreign(${entity})`
    let property = 'property'
    
    return {

        trips : {
            ID : primary
        },
 
        countries : {
            route : '/countries'
        }

    }
}

const addComponent = function( app ){
    app.featureSystem.addComponent({
        label   : 'dataModel', 
        methods : viewModel( app )
    })
}

module.exports = {
   addComponent
}
