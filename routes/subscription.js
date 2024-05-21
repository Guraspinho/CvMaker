const express = require('express');
const {buySubscription} = require('../controllers/subscription');

const router = express.Router();

router.route('/').post(buySubscription);

module.exports = router;