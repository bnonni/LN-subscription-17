const debug = require('../../utils/debug');
const subscriptionService = require('./subscriptionService');

const signupController = async (req, res) => {
    try {
        const { email, phone, password,  } = req.body;
        // const tier = req.body.tier;
        // const info = req.body.info;
        // const recurrence = req.body.recurrence;
        // const response = await subscriptionService.signup(info, tier, recurrence);

        // debug.info(`Sign Up Response: ${JSON.stringify(response)}`);

        // if (!response.success) res.status(500).json(response);
        // else res.status(200).json(response);
        console.log(tier, info, recurrence);
    } catch (error) {
        debug.error(error.stack);
        res.status(500).json({ message: error.message, error: error.stack });
    }
};

const paymentController = async (req, res) => {
    try {
        const tier = req.body.tier;
        const recurrence = req.body.recurrence;
        const response = await subscriptionService.paid(tier, recurrence);

        debug.info(`Paid Response: ${JSON.stringify(response)}`);

        if (!response.success) res.status(500).json(response);
        else res.status(200).json(response);
    } catch (error) {
        debug.error(error.stack);
        res.status(500).json({ message: error.message, error: error.stack });
    }
};

module.exports = { signupController, paymentController };
