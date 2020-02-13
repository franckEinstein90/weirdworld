/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 *
 * ***************************************************************************/
"use strict"

 /****************************************************************************/


const showModal  = ({
    title, 
    content
}) => {
         $('#modalTitle').text(title)
         $('#modalContent').html(content)
         document.getElementById('modalWindow').style.display='block'
}
    
const addModalFeature = function( ui ){

    ui.features.modal = true
    let _modalLogin = {
      title: "member login"
    }

    let _modalWindows = new Map()
    _modalWindows.set("login", _modalLogin)

    ui.showModal = showModal
    return ui
   /* : function( modalId ){
         let modalContent = _modalWindows.get(modalId) 
      }*/
}


module.exports = {
    addModalFeature
}
