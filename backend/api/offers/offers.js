const debug = require('../../utils/debug');
const apiCall = require('../../utils/apiCall');

const create = async (data) => {
    try {
        const res = await apiCall('/v1/offers/offer', 'POST', { data });
        return { success: true, message: res.offers[0].bolt12 };
    } catch (error) {
        debug.error(error.stack, error.status, error.message);
        throw new Error(error);
    }
};

const info = async (id) => {
    try {
        // TODO
    } catch (error) {
        debug.error(error.stack, error.status, error.message);
        throw new Error(error);
    }
};

module.exports = { create, info };
