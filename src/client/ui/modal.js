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
    
const addModalFeature = function( app ){

    app.features.add('modal window')
    let _modalLogin = {
      title: "member login"
    }

    let _modalWindows = new Map()
    _modalWindows.set("login", _modalLogin)

    app.ui.showModal = showModal
    return app 
}


module.exports = {
    addModalFeature
}
