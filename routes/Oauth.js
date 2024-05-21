const express = require('express');
const router = express.Router();

const { sendRequest, getTokens } = require('../controllers/GoogleOauth');


// sign in with google
router.route('/google/request').post(sendRequest);
router.route('/google/response').get(getTokens);

module.exports = router;