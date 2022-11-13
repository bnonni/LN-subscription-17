const debug = require('../../utils/debug');
const offerMap = require('../../utils/offerMap');
const apiCall = require('../../utils/apiCall')

const signup = async (info, tier, recurrence) => {
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

const payment = async (tier, recurrence) => {
    try {
        const offerId = offerMap[tier + recurrence]
        const res = await apiCall(`/v1/offers/listOffers?offer_id=${offerId}`, 'GET')
        const used = res.offers[0].used
        return { success: true, message: used };    
    } catch (error) {
        debug.error(error.stack, error.status, error.message);
        throw new Error(error);
    }
}

module.exports = { signup, payment };
