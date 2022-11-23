const express = require('express');
const router = express();
const ppLnurlAuth = require('passport-lnurl-auth');
const path = require('path');
const pathToFile = path.join(__dirname, '..', '..', 'views', 'login.html');

const { lnurlAuthIn, lnurlAuthOut } = require('./auth/authMiddleware');

const { signup, login, logout } = require('./auth/authController');
const { offerCreate, offerList, offerInfo } = require('./offers/offersController');

/* Username-Password Routes */
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

/* LNURL Auth Routes */
router.get(
    '/signup/lnurl',
    lnurlAuthIn,
    new ppLnurlAuth.Middleware({
        callbackUrl: process.env.URL + '/v1/signup/lnurl',
        cancelUrl: process.env.URL,
        loginTemplateFilePath: pathToFile,
    })
);
router.get('/logout/lnurl', lnurlAuthOut);

/* Bolt12 Offer Routes */
router.post('/offer/create', offerCreate);
router.post('/offer/list', offerList);
router.post('/offer/info', offerInfo);


module.exports = router;
