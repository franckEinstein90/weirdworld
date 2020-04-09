"use strict"

class City {
   constructor(name){
      this.name = name
   }
}


const cities = (function(){

   let _cities = new Map()

   return {
      add   : function(cityInfo){
         let cityName = cityInfo.name
         if(cityName === "") {
            return
         }
         if(_cities.has(cityName)){
            return 
         }
         let newCity = new City(cityInfo.name)
         _cities.set(cityName, newCity)
         cities.list.push(cityName)
      },

      list : []
   }

})()

module.exports = {
   cities
}