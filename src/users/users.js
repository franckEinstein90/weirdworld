/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 *
 * ***************************************************************************/
"use strict"
/*****************************************************************************/
/*****************************************************************************/


const users = function( app ) {
    app.say(`user module exists, but there's nothing there`)
    return app 
/*       find: async function({
            email,
            password,
            userName
        }) {
       /*     if (userName && password) {
                return db.getRecord({
                    table: 'users',
                    select: `userName = '${userName}' AND password = '${password}';`
                })
            }
            return null
       */ 


}

module.exports = {
    users
}
