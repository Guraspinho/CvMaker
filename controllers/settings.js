const { UnauthenticatedError, BadRequestError} = require("../errors/everyError");
const User = require('../models/users');
const Resume = require('../models/resumes');
const {StatusCodes} = require('http-status-codes');
const asyncWrapper = require('../middlewares/asyncWrapper');
const Oauth = require('../models/Oauth');
const xssFilters = require('xss-filters');


const settings = asyncWrapper(async (req,res) =>
{
    const {name,surname,email} = await  User.findById(req.user.userId);
    res.status(StatusCodes.OK).json({user:{name,surname,email}});
});

const changePassword = asyncWrapper(async (req,res) =>
{
    const oldPassword = xssFilters.inHTMLData(req.body.oldPassword);
    const newPassword = xssFilters.inHTMLData(req.body.newPassword);
    const _id = req.user.userId;


    const userCredentials = await User.findOne({_id});

    if(!userCredentials)
    {
        throw new UnauthenticatedError('Unable to update password');
    }

    // check if length of a provided password is valid
    if(!newPassword || newPassword.length < 8 || newPassword.length > 32)
    {
        throw new BadRequestError('Please provide valid password');
    }


    const isPasswordCorrect = await userCredentials.comparePasswords(oldPassword);

    // check if provided old password is correct
    if(!isPasswordCorrect)
    {
        throw new UnauthenticatedError('Provided password is incorrect');
    }

    // Old and new passwords must be different
    if(oldPassword === newPassword)
    {
        throw new BadRequestError('Old and new passwords must not match');
    }

    
    // update a password

    userCredentials.password = newPassword;
    await userCredentials.save();

    
    res.status(StatusCodes.OK).json({user:{msg: 'Password was changed suecessfully'}});
});

// change name
const changeName = asyncWrapper(async (req,res) =>
{
    const newName = xssFilters.inHTMLData(req.body.newName);
    const _id = req.user.userId;
    
    
    if(!newName)
    {
        throw new BadRequestError('Please provide a valid name');
    }

    // check if the user is tryung to add the username that is the same as before
    if(newName === req.user.userName)
    {
        throw new BadRequestError(`Your username is already ${newName}`);
    }
    

    const userCredentials = await User.findById(_id);

    if(!userCredentials)
    {
        const OauthUser = await Oauth.findById(_id);
        if(!OauthUser)
        {
            throw new UnauthenticatedError('Could not find user with provided credentials');
        }
    }
    else if(userCredentials)
    {
        // Users can only update their names once per week
    
        if (userCredentials.lastNameChangedAt && (Date.now() - userCredentials.lastNameChangedAt < 7 * 24 * 60 * 60 * 1000));
        {
            throw new BadRequestError('You can only change your name once a week.');
        }
        
        
        await User.findOneAndUpdate( {_id}, {name: newName, lastNameChangedAt: Date.now()} , {new:true, runValidators:true} );
    }
    else if(OauthUser)
    {
        // Users can only update their names once per week
    
        if (OauthUser.lastNameChangedAt && (Date.now() - OauthUser.lastNameChangedAt < 7 * 24 * 60 * 60 * 1000))
        {
            throw new BadRequestError('You can only change your name once a week.');
        }
        
        await Oauth.findOneAndUpdate( {_id}, {name: newName, lastNameChangedAt: Date.now()} , {new:true, runValidators:true} );
    
    }



    res.status(StatusCodes.OK).json({user:{msg:'Name was updated suecessfully'}});
});


// change surname
const changeSurname = asyncWrapper(async (req,res) =>
{
    const newSurname = xssFilters.inHTMLData(req.body.newSurname);
    const _id = req.user.userId;
    
    // check if the user is trying to add the surname that is the same as before
    if(newSurname === req.user.userSurname)
    {
        throw new BadRequestError(`Your surname is already ${newSurname}`);
    }


    if(!newSurname)
    {
        throw new BadRequestError('Please provide a valid surname');
    }

    const userCredentials = await User.findById(_id);

    // Users can only update their surnames once per week
    if (userCredentials.lastSurnameChangedAt && (Date.now() - userCredentials.lastSurnameChangedAt < 7 ))
    {
        throw new BadRequestError('You can only change your surname once a week.');
    }
    
    await User.findOneAndUpdate( {_id}, {surname: newSurname, lastSurnameChangedAt: Date.now()} , {new:true, runValidators:true} );

    res.status(StatusCodes.OK).json({user:{msg:'Surname was updated successfully'}});
});


const deleteUser = asyncWrapper(async (req,res) =>
{
    const _id = req.user.userId;

    
    const user = await User.findOneAndDelete({_id});

    if(!user)
    {
        const OauthUser = await Oauth.findOneAndDelete({_id});
        
        if(!OauthUser)
        {
            throw new UnauthenticatedError('Could not delete user');
        }
    }
    const resumes = await Resume.deleteMany({createdBy: _id});

    if(!resumes)
    {
        throw new UnauthenticatedError('Could not delete user');
    }

    res.status(StatusCodes.OK).json({user:{msg: 'User was deleted successfully'}});

});






module.exports = 
{
    changePassword,
    changeName,
    settings,
    changeSurname,
    deleteUser
}

