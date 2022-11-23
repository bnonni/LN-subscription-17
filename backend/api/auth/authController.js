const debug = require('../../utils/debug');
const signupService = require('./auth');

const signup = async (req, res) => {
    try {
        const { username, password, name, emailPhone } = req.body;
        const response = await signupService.signup(
            username,
            password,
            name,
            emailPhone
        );
        debug.info(`Sign Up Response: ${JSON.stringify(response)}`);
        if (!response.success) res.status(500).json(response);
        else res.status(200).json(response);
    } catch (error) {
        debug.error(error.stack);
        res.status(500).json({
            message: error.message,
            error: error.stack,
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, password, name, emailPhone } = req.body;
        const response = await signupService.signup(
            username,
            password,
            name,
            emailPhone
        );
        debug.info(`Sign Up Response: ${JSON.stringify(response)}`);
        if (!response.success) res.status(500).json(response);
        else res.status(200).json(response);
    } catch (error) {
        debug.error(error.stack);
        res.status(500).json({
            message: error.message,
            error: error.stack,
        });
    }
};

const logout = async (req, res) => {
    try {
        const { username } = req.body;
        const response = await signupService.logout(username);

        debug.info(`Sign Up Response: ${JSON.stringify(response)}`);
        
        if (!response.success) res.status(500).json(response);
        else res.status(200).json(response);
    } catch (error) {
        debug.error(error.stack);
        res.status(500).json({
            message: error.message,
            error: error.stack,
        });
    }
};

module.exports = { signup, login, logout };
