"use strict"

const modalBoilerPlate = [
   `<div class="w3-modal" style="display='block'>`, 
      `<div class="w3-modal-content">`, 
         `<div class="w3-container">`, 
         `<span onclick="document.getElementById('id01').style.display='none'"`, 
            `class="w3-button w3-display-topright">&times;`, 
         '</span>', 
         '</div>', 
      '</div>', 
   '</div>'].join('')


const modal = (function(){

   let _modalLogin = {
      title: "member login"
   }

   let _modalWindows = new Map()
   _modalWindows.set("login", _modalLogin)

   return{
      showModal: function( modalId ){
         let modalContent = _modalWindows.get(modalId) 
         $('#modalTitle').text(modalContent.title)
         document.getElementById('modalWindow').style.display='block'
      }
   }
})()

const showModal = function(modalId){
//   let modalContent = 
}

module.exports = {
   showModal: modal.showModal
}