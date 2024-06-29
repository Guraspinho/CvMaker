const express = require('express');
const {signup, confirmEmail, login, resendEmail, contactUs, forgotPassword, changePassword} = require('../controllers/auth');

const router = express.Router();

router.route('/signup').post(signup);
router.route('/signin').post(login);
router.route('/contact').post(contactUs);

router.route('/confirm/:id').get(confirmEmail);
router.route('/resend').get(resendEmail);

router.route('/forgotpassword').post(forgotPassword);
router.route('/changepassword').post(changePassword);



module.exports = router;    