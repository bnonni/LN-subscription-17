const bcrypt = require('bcrypt');
const debug = require('../../utils/debug');
const bitcoiners = require('../../db/collection');

const signup = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
        const response = await bitcoiners.add({ data });

        return { success: true, message: response };
    } catch (error) {
        debug.error(error.stack, error.status, error.message);
        throw new Error(error);
    }
};

const login = async (username, password) => {
    try {
        const response = await bitcoiners
            .where('username', '==', username)
            .get();

        if (response.empty) {
            debug.error('No matching documents.');
            return { success: false, message: 'No matching documents.' };
        }

        const doc = await response.data();
        const hashedPassword = doc.password;

        const valid = bcrypt.compare(password, hashedPassword);
        if(!valid) return { success: false, message: 'Wrong username/password.' }; 
        else return { success: true, message: 'Login success.' };
        
    } catch (error) {
        debug.error(error.stack, error.status, error.message);
        throw new Error(error);
    }
};

module.exports = { signup, login };
