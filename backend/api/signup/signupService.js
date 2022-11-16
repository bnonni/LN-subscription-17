const debug = require('../../utils/debug');
const offerMap = require('../../utils/offerMap');
const apiCall = require('../../utils/apiCall')

const lnurl = async (info, tier, recurrence) => {
    try {
        const offerId = offerMap[tier + recurrence]
        const res = await apiCall(`/v1/offers/listOffers?offer_id=${offerId}`, 'GET')
        const offer = res.offers[0].bolt12
        await bitcoiners.add({ info, tier, recurrence, offer: offer });
        return { success: true, message: offer };
    } catch (error) {
        debug.error(error.stack, error.status, error.message);
        throw new Error(error);
    }
};

const regular = async (username, password) => {
    try {
        // username, password
        // store in DB
        return { success: true };
    } catch (error) {
        debug.error(error.stack, error.status, error.message);
        throw new Error(error);
    }
}

module.exports = { lnurl, regular };
