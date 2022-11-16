const express = require('express');
const router = express();

const LNurlAuth = require('passport-lnurl-auth');

const {
    LNurlAuthLoginSignup,
    LNurlAuthLogout,
} = require('./signup/LNurlAuthMiddleware');
const { regularController } = require('./signup/signupController');

router.post('/signup', regularController);
router.get(
    '/signup/lnurl',
    LNurlAuthLoginSignup,
    new LNurlAuth.Middleware({
        callbackUrl: process.env.URL + '/v1/signup/lnurl',
        cancelUrl: process.env.URL,
    })
);
router.get('/logout', LNurlAuthLogout);
// const { subscribeController } = require('./subscription/subscriptionController');
// router.post('/subscribe', subscribeController);

// const { subscribeController } = require('./subscription/subscriptionController');
// router.post('/paid', paymentController);

module.exports = router;
