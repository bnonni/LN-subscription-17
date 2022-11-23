const debug = require('../../utils/debug');
const apiCall = require('../../utils/apiCall');
const bitcoiners = require('../../db/collection');

const signup = async (data) => {
    try {
        const response = await bitcoiners.add({ data });
        return { success: true, message: response };
    } catch (error) {
        debug.error(error.stack, error.status, error.message);
        throw new Error(error);
    }
};

const login = async (username, password) => {
    try {
        // username, password
        // store in DB
        return { success: true };
    } catch (error) {
        debug.error(error.stack, error.status, error.message);
        throw new Error(error);
    }
};

module.exports = { signup, login };
