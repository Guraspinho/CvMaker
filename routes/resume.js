const express = require('express');
const {uploadYourResume, createResume, editResume, deleteResume, downloadResume, yourResumes, getSingleResume} = require('../controllers/resume');
const {uploadPhoto, getPhoto, deletePhoto} = require('../controllers/cvPhotos');
const checkSubscription = require('../middlewares/subscription');
const {upload, photo} = require('../utils/multer');
const router = express.Router();


router.route('/edit/:id').put(editResume);
router.route('/delete/:id').delete(deleteResume);


// need to check for subsctiption also
router.route('/download/:id').get(downloadResume);
router.route('/:id').get(getSingleResume);
router.route('/').get(yourResumes);

router.route('/upload').post(upload.array('file'), uploadYourResume);
router.route('/create').post(createResume);

router.route('/photo/:id').get(getPhoto);
router.route('/upload/photo/:id').post(photo.array('file'), uploadPhoto);
router.route('/delete/photo/:id').delete(deletePhoto);


module.exports = router;