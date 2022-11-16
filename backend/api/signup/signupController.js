const debug = require('../../utils/debug');
const signupService = require('./signupService');
// const LnurlAuth = require('passport-lnurl-auth');

// const LNurlAuthController = async (req) => {
//     const auth = new LnurlAuth.Middleware({
//         callbackUrl: req.baseUrl + req.url,
//         cancelUrl: req.url,
//     });
//     return auth;
// };

const regularController = async (req, res) => {
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

module.exports = { regularController, /*LNurlAuthController*/ };
