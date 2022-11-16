const debug = require('../../utils/debug');
const apiCall = require('../../utils/apiCall')

const signup = async (username, password) => {
    try {
        // username, password
        // store in DB
        return { success: true };
    } catch (error) {
        debug.error(error.stack, error.status, error.message);
        throw new Error(error);
    }
}

module.exports = { signup };
