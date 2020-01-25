(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * country class
 *
 * ***************************************************************************/
"use strict"

const countries = (function(){
   let _countries = new Map()
  return {
      has: function({
         countryCode
      }){
         return _countries.has(countryCode)
      }, 
     add: function( countryInfo ){
        _countries.set(countryInfo.code, countryInfo)
     }
  }    
})()


module.exports = {
   countries
}
},{}],2:[function(require,module,exports){
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * country class
 *
 * ***************************************************************************/
const countries = require('./country').countries
const maxPopulation =  1501590000

let population = function(population){
   return `Population: <span style='color:red'>${population}</span>`
}

let newCountryCard = function({
   countryInfo
}){

  
   return [
      `<div class='w3-card countryCard discovered'>`, 
      '<h2>',
      countryInfo.name,
      '</h2>',
      `currencies:${countryInfo.currencies}<br/>`,
      `${population(countryInfo.population)}`,
      '</div>'
   ].join('')
}

let searchResponse = function(data, textStatus, jqXHR){
  $('#discoverPane').empty()
      data.forEach(country=>{
         let countryObject = countries.add({
            countryInfo: country
         })
      $('#discoverPane').append(newCountryCard({country}))
   })
}



$(function(){

   var G = new jsnx.Graph();
   G.addNodesFrom([
       ["france", {color: 'red'}],
       ["togo", {color: 'blue'}],
       ["mexico", {color: 'blue'}],
       ["austria", {color: 'blue'}],
       ["italy", {color: 'green'}],
       ["spain", {color: 'green'}],
       ["usa", {color: 'green'}],
       ["canada", {color: 'green'}],
       ["germany", {color: 'white'}]
   ]);
   G.addEdgesFrom([
      ["mexico","usa"], 
      ["canada","usa"], 
      ["france","spain"], 
      ["germany","italy"], 
      ["france","italy"], 
      ["france","germany"], 
      ["germany", "austria"]]);
    
   // `jsnx.draw` accept a graph and configuration object
   jsnx.draw(G, {
     element: '#demo-canvas', 
     nodeAttr:{
        r:50
     },
     nodeShape: 'circle' ,
     labelStyle:{
         'font-size':'1.4em'
     },
     layoutAttr:{
        charge: -2000, 
        linkDistance: 200
     }, 
     withLabels: true,
     nodeStyle: {
         fill: function(d) {
             return d.data.color;
         }
     }
   });

   $( window ).resize(function(){
      jsnx.draw(G)
   })

   $('#findCountryButton').click(event => {
      event.preventDefault()
      let countryInput = $('#findCountryInput').val()
     $.ajax({
         method: "GET",
         url: "/countryInfo",
         data: {country: countryInput},
         success: searchResponse
         })
      .done(function( data ) {
           if ( console && console.log ) {
             console.log( "Sample of data:", data.slice( 0, 100 ) );
           }
         });
   })



})
},{"./country":1}]},{},[2]);
