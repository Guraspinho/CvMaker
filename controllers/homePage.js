const asyncWrapper = require('../middlewares/asyncWrapper');
const Template = require('../models/templates');
const { NotFoundError} = require("../errors/everyError");
const {StatusCodes} = require('http-status-codes');

const homePage = asyncWrapper(async (req,res) =>
    {
        const templates = await Template.find();
    
        if(!templates)
        {
            throw new NotFoundError('No templates were found');
        }
    
        res.status(StatusCodes.OK).json({templates});
    }); 
    
module.exports = {homePage};