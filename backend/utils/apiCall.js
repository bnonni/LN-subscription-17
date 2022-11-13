const fetch = require('node-fetch');
const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;
const HEADERS = { 'Content-Type': 'application/json', macaroon: API_KEY };

module.exports = apiCall = async (path, method, json = null) => {
    if (method == 'POST') {
        const req = await fetch(BASE_URL + path, {
            method: method,
            headers: HEADERS,
            body: JSON.stringify(json),
        });
        return await req.json()
    } else {
        const req = await fetch(BASE_URL + path, {
            method: method,
            headers: HEADERS,
        });
        return await req.json()
    }
};
