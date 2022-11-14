const express = require('express');
const router = express();

const { signupController } = require('./signup/signupController');
router.post('/signup', signupController);
router.post('/signup/lnurl-auth', signupController);

// const { subscribeController } = require('./subscription/subscriptionController');
// router.post('/subscribe', subscribeController);

// const { subscribeController } = require('./subscription/subscriptionController');
// router.post('/paid', paymentController);

module.exports = router;
