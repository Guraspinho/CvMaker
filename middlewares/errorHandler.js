const { CustomAPIError } = require('../errors/everyError');
const { StatusCodes } = require('http-status-codes');
const multer = require('multer');

const errorHandlerMiddleware = (err, req, res, next) =>
{
    let customError = 
    {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'something went wrong please try again later'
    };

    if(err.name == 'ValidationError')
    {
        customError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(',');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    
    if(err.name == 'CastError')
    {
        customError.msg = `${err.value} is not a valid ID`
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    if(err.code && err.code == 11000)
    {
        customError.msg = `Email already in use, try a different one.`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // multer errors
    if(err instanceof multer.MulterError)
    {
        if(err.code === "LIMIT_FILE_SIZE")
        {
            customError.msg = "The file you are trying to upload is too big";
            customError.statusCode = StatusCodes.BAD_REQUEST;
        }
        else if(err.code === "LIMIT_FILE_COUNT")
        {
            customError.msg = "You are trying to upload too many files";
            customError.statusCode = StatusCodes.BAD_REQUEST;
        }
        else if(err.code === "LIMIT_UNEXPECTED_FILE")
        {
            customError.msg = "Only pdf, docx, doc files are supported";
            customError.statusCode = StatusCodes.BAD_REQUEST;
        }
    }

    return res.status(customError.statusCode).json( {msg: customError.msg });
}

module.exports = errorHandlerMiddleware;