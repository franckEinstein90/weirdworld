/*******************************************************************************
* FranckEinstein90 - franck.binard@canada.ca
 -------------------------------------
* add process stats support
******************************************************************************/
"use strict"

/*****************************************************************************/
const os = require('os')
/*****************************************************************************/
const pidUsage = require('pidusage')
/*****************************************************************************/

const APICanStats = function( APICan ){
  
  let getStats = () => {

     return new Promise((resolve, reject) => {
        pidUsage( APICan.processStats.id, function(err, stats ){
           APICan.processStats.cpu 		= `${stats.cpu} %`
           APICan.processStats.memory 	= `${stats.memory / 1024 / 1024} MB`
           APICan.processStats.elapsed	= stats.elapsed
           APICan.processStats.ppid = stats.ppid
           return resolve( stats )
        })
     })
  }

  APICan.processStats.update = getStats
}

const addProcessStatsFeature = function( app ){
  
  app.processStats = {
     id: process.pid
  },  
  APICanStats( app )
  return app.processStats.update()
  .then(_ => {
     return app
  })
}

module.exports = {
  addProcessStatsFeature
}