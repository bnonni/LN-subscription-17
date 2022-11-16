const debug = require('../../utils/debug');
const offers = require('./offers');

const offerCreate = async (req, res) => {
    try {
        // const { amount, description, label, recurrence } = req.body;
        const response = await offers.create(req.body);
        // TODO

        // debug.info(`Sign Up Response: ${JSON.stringify(response)}`);

        // if (!response.success) res.status(500).json(response);
        // else res.status(200).json(response);
        // console.log(tier, info, recurrence);
    } catch (error) {
        debug.error(error.stack);
        res.status(500).json({ message: error.message, error: error.stack });
    }
};

const offerInfo = async (req, res) => {
    try {
        const tier = req.body.tier;
        const recurrence = req.body.recurrence;
        const response = await offers.paid(tier, recurrence);

        debug.info(`Paid Response: ${JSON.stringify(response)}`);

        if (!response.success) res.status(500).json(response);
        else res.status(200).json(response);
    } catch (error) {
        debug.error(error.stack);
        res.status(500).json({ message: error.message, error: error.stack });
    }
};

module.exports = { offerCreate, offerInfo };
