const debug = require('../../utils/debug');
const signupService = require('./auth');

const userPassword = async (req, res) => {
    try {
        const { username, password } = req.body;
        const response = await signupService.signup(username, password);
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

module.exports = { userPassword };
