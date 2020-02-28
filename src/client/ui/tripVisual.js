"use strict"




const tripDisplay = function( clientApp ){
    let nodes = new vis.DataSet([
        {id: 1, label: 'Berlin'}, 
        {id: 2, label: 'Prague'}, 
        {id: 3, label: 'venice'},
        {id: 4, label: 'Bologna'}
    ])

    let edges = new vis.DataSet([
        {from: 1, to: 2}, 
        {from: 2, to: 3, label:'Lufthansa (152$)'}, 
        {from: 3, to: 4}
    ])

    let container = document.getElementById('visualCanvas')

    let data = {
        nodes, 
        edges
    }

    let options = {
        nodes   : {
            shadow:true, 
            font: '15px yellow'
        }, 
        edges   : {
            arrows  : {
                to: true
            }
        }
    }

    let trip = new vis.Network(container, data, options)
}

module.exports = {
    tripDisplay
}
