/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 *
 * ***************************************************************************/
"use strict"
/*****************************************************************************/
const db = require('@server/db').db
/*****************************************************************************/


const users = (function() {

    return {
        find: async function({
            email,
            password,
            userName
        }) {
            if (userName && password) {
                return db.getRecord({
                    table: 'users',
                    select: `userName = '${userName}' AND password = '${password}';`
                })
            }
            return null
        }

    }

})()

module.exports = {
    users
}