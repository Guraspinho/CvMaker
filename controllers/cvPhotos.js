const { BadRequestError, NotFoundError} = require("../errors/everyError");
const {StatusCodes} = require('http-status-codes');
const asyncWrapper = require('../middlewares/asyncWrapper');
const Resume = require('../models/resumes');
const { deleteCommand, uploadCommand, s3Operation, getSignedUrlFunction } = require('../utils/multer');


// Upload a photo
const uploadPhoto = asyncWrapper(async (req,res) =>
{
    const _id = req.params.id;
    const createdBy = req.user.userId;


  
    if(!req.files || req.files.length === 0)
    {
        throw new BadRequestError('Please upload a file');
    }    

    const file = req.files[0];

    const { command, Key } = uploadCommand(file);
    await s3Operation(Key, command);

    const signedUrl = await getSignedUrlFunction(Key);

    // store the key and signed URL in a db
    const resume = await Resume.findOneAndUpdate({_id, createdBy},{photoURL: signedUrl, photoKey: Key},{new: true, runValidators: true});
    
    if(!resume)
    {
        throw new NotFoundError(`Could not find resumes with ID: ${_id}`);
    }
    

    res.status(StatusCodes.CREATED).json({user:{msg:'File was uploaded successfully'}})
});



// Get a photo

const getPhoto = asyncWrapper(async (req,res) =>
{
    const _id = req.params.id;
    const createdBy = req.user.userId;
    let photoURL;

    const resume = await Resume.findOne({_id, createdBy});
    
    if(!resume)
    {
        throw new NotFoundError(`Could not find a resume with ID: ${_id}`);
    }

    if(resume.photoURL)
    {
        photoURL = resume.photoURL;
    }
    else
    {
        throw new NotFoundError(`No photos to show`);
    }

    res.status(StatusCodes.OK).json({user:{msg:'File was downloaded successfully'}, photoURL});

});


const deletePhoto = asyncWrapper(async (req, res) =>
{
    const _id = req.params.id;
    const createdBy = req.user.userId;

    const {photoKey} = await Resume.findOne({_id, createdBy});
    const Key = photoKey;

    if(!Key)
    {
        throw new NotFoundError(`Could not find resumes with ID: ${_id}`);
    }

    const command = deleteCommand(Key);
    await s3Operation(Key, command);

    res.status(StatusCodes.OK).json({user:{msg:'File was deleted successfully'}});

});

module.exports = { uploadPhoto, getPhoto, deletePhoto };


