const express = require('express');
const {changePassword,changeName, settings, changeSurname, deleteUser} = require('../controllers/settings');
const router = express.Router();

router.route('/').get(settings);
router.route('/password').put(changePassword);


router.route('/surname').put(changeSurname);
router.route('/name').put(changeName);
router.route('/delete').delete(deleteUser);



module.exports = router;