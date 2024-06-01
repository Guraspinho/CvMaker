const { BadRequestError, NotFoundError} = require("../errors/everyError");
const {StatusCodes} = require('http-status-codes');
const asyncWrapper = require('../middlewares/asyncWrapper');
const {extractText}  = require('../middlewares/trimmer');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const Resume = require('../models/resumes');
const sanitizeResume = require('../middlewares/inputSanitizer');
const {convertToPdf} = require('../utils/puppeteer');

// Extract text from pdf or docx files

const uploadYourResume = asyncWrapper(async (req,res) =>
{
    // sanitize user input
    if(!req.files || req.files.length === 0)
    {
        throw new BadRequestError('Please upload a file');
    }

    const file = req.files[0];

    let data;

    // Extract text from the uploaded file
    if(file.mimetype === "application/pdf")
    {
        data = await pdf(file.buffer);
        data = data.text;
    }
    else if(file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype === "application/msword")
    {
        const result = await mammoth.extractRawText({buffer: file.buffer});
        data = result.value;
    }
    const lowerCaseData = data.toLocaleLowerCase();

    const info = extractText(lowerCaseData);
    console.log(info);

    res.status(StatusCodes.OK).json({user:{msg: 'Resume was uploaded successfully'}});
});

// Create a resume
const createResume = asyncWrapper(async (req, res) => {
    const data = req.body;

    const sanitizedData = sanitizeResume(data);

    sanitizedData.createdBy = req.user.userId;

    const resume = await Resume.create(sanitizedData);

    if (!resume) {
        throw new BadRequestError('Could not create a resume');
    }

    res.status(StatusCodes.CREATED).json({ user: { msg: 'Resume was created successfully' } });
});

// Edit a resume
const editResume = asyncWrapper(async (req, res) => {
    const _id = req.params.id;
    const createdBy = req.user.userId;

    const data = req.body;
    const sanitizedData = sanitizeResume(data);

    const resume = await Resume.findOneAndUpdate({ _id, createdBy }, sanitizedData, { new: true, runValidators: true });

    if (!resume) {
        throw new NotFoundError(`Could not find a resume with id ${req.params.id}`);
    }

    res.status(StatusCodes.OK).json({ user: { msg: 'Resume was edited successfully' } });
});


// need to delete it on S3 bucket as well
const deleteResume = asyncWrapper(async (req,res) =>
{

    const resume = await Resume.findOneAndDelete({_id: req.params.id, createdBy: req.user.userId});

    if(!resume)
    {
        throw new NotFoundError(`Clould not find a resume with id ${req.params.id}`);
    }


    res.status(StatusCodes.OK).json({user:{msg: 'Resume was deleted successfully'}});
});



// Get all resumes of the user
const yourResumes = asyncWrapper(async (req,res) =>
{
    const resumes = await Resume.find({createdBy: req.user.userId});

    // If no resumes were found
    if (!resumes)
    {
        throw new NotFoundError('No resumes were found');
    }

    // If user has no resumes
    if(resumes.length === 0)
    {
        return res.status(StatusCodes.NOT_FOUND).json({user:{msg: 'You have no resumes'}});
    }


    res.status(StatusCodes.OK).json({user:{msg: 'Your resumes were fetched successfully'}, resumes});
});
 

// Get a specific resume of the user
const getSingleResume = asyncWrapper(async (req,res) =>
{
    const resume = await Resume.findOne({_id: req.params.id, createdBy: req.user.userId});

    // If no resumes were found
    if (!resume)
    {
        throw new NotFoundError(`Clould not find a resume with id ${req.params.id}`);
    }

    res.status(StatusCodes.OK).json({ resume });
});


// download a resume
const downloadResume = asyncWrapper(async (req,res) =>
{
    const resume = await Resume.findOne({_id: req.params.id, createdBy: req.user.userId});

    if(!resume)
    {
        throw new NotFoundError(`Clould not find a resume with id ${req.params.id}`);
    }
    const pdf = await convertToPdf(resume);

    console.log(pdf);

    res.status(StatusCodes.OK).json({user:{msg: 'Resume was downloaded successfully'}});
});



module.exports =
{
    uploadYourResume,
    editResume,
    deleteResume,
    downloadResume,
    yourResumes,
    getSingleResume,
    createResume,
};