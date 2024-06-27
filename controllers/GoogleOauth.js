const {OAuth2Client} = require('google-auth-library');
const {UnauthenticatedError, BadRequestError, NotFoundError} = require("../errors/everyError");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require('../middlewares/asyncWrapper');
const Oauth = require('../models/Oauth');
const User = require("../models/users");
const xssFilters = require('xss-filters');


async function getUserData(access_token)
{
    // sanitize user input
    access_token = xssFilters.inHTMLData(access_token);
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    return data;
}

// when clicking sign in with google button
const sendRequest = asyncWrapper(async (req, res) =>
{
    res.header('Access-Control-Allow-Origin', 'https://cvmaker.ge');

    // not necessary for a production server
    res.header('referrer-policy', 'no-referrer-when-downgrade'); // This is a security measure to prevent the browser from sending the referrer header to the server.
    
    
    // This is the URL that the user will be redirected to after they have successfully authenticated with Google.
    const redirectUrl = "https://cvmaker.ge/callback/";

    let authorizationUrl;

    const client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectUrl
    );

    try
    {
        authorizationUrl = client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/userinfo.profile openid email'],
            prompt: 'consent',
        });
    }
    catch (error)
    {
        throw new UnauthenticatedError('Error generating auth URL');
    }

    res.status(StatusCodes.OK).json({authorizationUrl});
});



// This function will be called after the user has successfully authenticated with Google.
const getTokens = asyncWrapper(async (req, res) =>
    {

        // let code = req.query.code; 
        let code = req.headers.authorization; // this code will come from frontend via authorization header

        if(!code)
        {
            throw new UnauthenticatedError("Headers must include auth code");
        }

        // sanitize user input
        code = xssFilters.inHTMLData(code);

        // initialize the google oauth library
        const redirectUrl = 'https://cvmaker.ge/callback/';
        const client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectUrl
        );  
        
        // get authorization token from google (the one what contains user info).
        try
        {
            const googleResponse = await client.getToken(code);
            await client.setCredentials(googleResponse.tokens);
        }
        catch (error)
        {
            throw new UnauthenticatedError('Invalid or expired token');
        }


        // this part is for extracting email from a google token and creating jwt on it  
        const user = client.credentials;

        let access_token = user.access_token;

    // sanitize user input
    access_token = xssFilters.inHTMLData(access_token);

    const userData = await getUserData(access_token);

    // extract user data
    const {given_name, family_name, email} = userData;

    // check if user with such email exists
    const alreadyUser = await User.findOne({email});

    if(alreadyUser)
    {
        throw new BadRequestError("email already in use try a different one");
    }

    // check if user with such email exists
    const AlreadySignedup = await Oauth.findOne({email});

    if(AlreadySignedup)
    {
        const token =  AlreadySignedup.createJWT();
        res.status(StatusCodes.OK).json({user: { msg: "User signed in successfully" }, token});
    }
    else
    {
        const newUser = await Oauth.create({name: given_name, surname: family_name, email});
        const token = newUser.createJWT();
        res.status(StatusCodes.CREATED).json({user:{ msg: "User signed up successfully" }, token});
    }
});

module.exports = {sendRequest, getTokens};


