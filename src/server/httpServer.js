/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 *
 * ***************************************************************************/
"use strict"

/*****************************************************************************/
const http = require('http')
const debug = require('debug')('weirdworld')
/*****************************************************************************/

const normalizePort = function(val) {
    let port = parseInt(val, 10)
    if (isNaN(port)) return val
    if (port >= 0) return port
    return false
}

const onError = function(port, error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const onListening = function(addr) {
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}

const httpServer = function( appPackage ) {

    let {expressStack , weirdworld} = appPackage
    let _port = normalizePort(process.env.PORT || weirdworld.data.port)
    expressStack.set('port', _port)

    let _server = http.createServer(expressStack)
    _server.listen(_port)
    _server.on('error', x => onError(_port))
    _server.on('listening', x => onListening(_server.address()))

    weirdworld.say(`App running on port ${_port}`)
    return weirdworld 
}


module.exports = {
    httpServer
}
