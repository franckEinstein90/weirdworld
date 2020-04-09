/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 * - sets up database
 * - gets config variables and what nots
 * - says everything a go, app is booting
 *
 * ***************************************************************************/
"use strict"

/*****************************************************************************/
const sqlite3 = require('sqlite3').verbose()
/*****************************************************************************/

const db = (function(){

    let _db = null
    let _app = null

    return {

        configure: function( app ){

            return new Promise( resolve => {
                _app = app
                _db = new sqlite3.Database(
                        `${app.root}\${app.settingsDBPath}`, 
                        err => {
                            if ( err ) return resolve( false )
                            return resolve(true)
                        })
                })
        },
        
        createRecord: function({
            table, 
            values  //values is just an object, keys are field names, values are ...values
        }){

            let fields = []
            let fieldValues = []
            let valArray = Object.entries(values)
            valArray.forEach(field => {
                fields.push( `'${field[0]}'` )
                fieldValues.push( `'${field[1]}'` )
            })

            return new Promise((resolve, reject) => {
                let SQLStatement =  `INSERT INTO ${table} (${fields.join(',')}) VALUES (${fieldValues.join(',')});` 
                _db.run(SQLStatement, function( err, state ){
                    if( err ){
                        return reject(err)
                    } else {
                        return resolve(this.lastID)
                    }
                })
            })
        }, 

        getRecord: function({
            table, 
            select
        }){
            return new Promise((resolve, reject)=>{
                let SQLStatement = `SELECT * FROM ${table} WHERE ${select};`
                _db.all(SQLStatement, (err, rows)=>{
                    if( err ){
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                })
            })
        }, 

        getAllTableRows: function({
            table, 
            where
        }){
            let whereStatement = ''
            if( where ) whereStatement = ` WHERE ${where}`

            return new Promise((resolve, reject) => {

                let SQLStatement = `SELECT * FROM ${table} ${whereStatement};`
                _db.all(SQLStatement, (err, rows)=>{
                    if(err){
                        return reject( err )
                    } else {
                        return resolve( rows ) 
                    }
                })
            })
        } 
    }

})()

const addLocalDatabase = function( app ){
    return db.configure( app )
    .then( result => {

            if(!result) return app
            app.featureSystem.addComponent({
                label: 'localDb', 
                methods: db
                })
            return app

     }).catch( err => {
          return app 
     })
}

module.exports = {
    addLocalDatabase
}
