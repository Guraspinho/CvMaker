const express = require('express');
const {homePage} = require('../controllers/homePage');

const router = express.Router();


router.route('/').get(homePage);

module.exports = router;