const debug = require('../../utils/debug');
const offers = require('./offers');

const offerCreate = async (req, res) => {
    try {
        const { amount, description, label, recurrence } = req.body;
        const response = await offers.create(amount, description, label, recurrence);
        
        debug.info(`Offer Create Response: ${JSON.stringify(response)}`);

        if (!response.success) res.status(500).json(response);
        else res.status(200).json(response);

    } catch (error) {
        debug.error(error.stack);
        res.status(500).json({ message: error.message, error: error.stack });
    }
};

const offerList = async (req, res) => {
    try {
        const response = await offers.list();

        debug.info(`Offer List Response: ${JSON.stringify(response)}`);

        if (!response.success) res.status(500).json(response);
        else res.status(200).json(response);

    } catch (error) {
        debug.error(error.stack);
        res.status(500).json({ message: error.message, error: error.stack });
    }
};

const offerInfo = async (req, res) => {
    try {
        const id = req.body.id;
        const response = await offers.info(id);

        debug.info(`Offer Info Response: ${JSON.stringify(response)}`);

        if (!response.success) res.status(500).json(response);
        else res.status(200).json(response);
        
    } catch (error) {
        debug.error(error.stack);
        res.status(500).json({ message: error.message, error: error.stack });
    }
};

module.exports = { offerCreate, offerList, offerInfo };
