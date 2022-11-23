const debug = require('../../utils/debug');
const apiCall = require('../../utils/apiCall');

const create = async (data) => {
    try {
        const response = await apiCall('/v1/offers/offer', 'POST', { data });
        return { success: true, message: response.offers[0].bolt12 };
    } catch (error) {
        debug.error(error.stack, error.status, error.message);
        throw new Error(error);
    }
};

const list = async () => {
    try {
        const response = await apiCall('/v1/offers/listOffers', 'GET');
        return { success: true, message: response.offers };
    } catch (error) {
        debug.error(error.stack, error.status, error.message);
        throw new Error(error);
    }
};

const info = async (id) => {
    try {
        const response = await apiCall('/v1/offers/listOffers', 'GET');
        return { success: true, message: response.offers[id].bolt12 };
    } catch (error) {
        debug.error(error.stack, error.status, error.message);
        throw new Error(error);
    }
};

module.exports = { create, list, info };
