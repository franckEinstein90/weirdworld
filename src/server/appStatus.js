/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 *
 * ***************************************************************************/
                                "use strict"

/*****************************************************************************/
const appStatus = (function(){

    let _upTime = 0         //mins
    let _running = false

    let _statusReport = (req, res, next) => {
        return {
            uptime: _upTime, 
            running: _running
        }
    }


    return{

        running: _ => _running , 
        upTime: _ => _upTime,
        report: (req, res, next)=> _statusReport(req, res, next) 

    }

})()

module.exports = {
    appStatus
}
