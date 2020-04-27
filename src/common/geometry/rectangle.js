"use strict"
 /****************************************************************************/
  
let Rectangle = function(options){
      this.top = options.top || 0
      this.left = options.left || 0
      this.height = options.height || 0
      this.width = options.width || 0
      this.right = this.left + this.width
      this.bottom = this.top + this.height
      this.orientation = this.height > this.width ? 'portrait' : 'landscape' 
}

module.exports = {
   Rectangle
}