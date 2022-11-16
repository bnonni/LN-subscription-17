const express = require('express');
const router = express();

const ppLnurlAuth = require('passport-lnurl-auth');

const { lnurlAuthIn, lnurlAuthOut } = require('./auth/authMiddleware');

const { userPassword } = require('./auth/authController');
const { offerCreate, offerInfo } = require('./offers/offersController');

router.post('/signup', userPassword);
router.get('/logout' /* TODO: add username pass logout? */);
router.get(
    '/signup/lnurl',
    lnurlAuthIn,
    new ppLnurlAuth.Middleware({
        callbackUrl: process.env.URL + '/v1/signup/lnurl',
        cancelUrl: process.env.URL,
    })
);
router.get('/logout/lnurl', lnurlAuthOut);
router.post('/offer/create', offerCreate);
router.post('/offer/info', offerInfo);

module.exports = router;
