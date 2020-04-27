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
    app.ui.addFeature({ label: 'modalWindow', method: showModal })
    return app 
}


module.exports = {
    addModalFeature
}
