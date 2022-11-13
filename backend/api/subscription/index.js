const express = require('express');
const router = express();

const { signupController, paymentController } = require('./subscriptionController');

router.post('/signup', signupController);
router.post('/paid', paymentController);

module.exports = router;
