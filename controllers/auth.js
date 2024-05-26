const {UnauthenticatedError, BadRequestError, NotFoundError} = require("../errors/everyError");
const { getSignedUrls } = require('../utils/multer');
const { sendEmail, sendContactEmail, sendPasswordResetEmail } = require("../utils/nodeMailer");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/users");
const Oauth = require("../models/Oauth");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middlewares/asyncWrapper");
const xssFilters = require('xss-filters');
const resumes = require("../models/resumes");

const signup = asyncWrapper(async (req, res) =>
{
    let { email, password, passwordAgain } = req.body;

    // sanitize user input
    email = xssFilters.inHTMLData(email);
    password = xssFilters.inHTMLData(password);
    passwordAgain = xssFilters.inHTMLData(passwordAgain);

    // checking len of an input password
    if (password.length > 32)
    {
        throw new BadRequestError("Password must have less than 32 characters");
    }
    
    // checking if passwords match
    if (!passwordAgain || password !== passwordAgain)
    {
        throw new BadRequestError("Passwords must match");
    }

    // checking if email is valid
    const OauthUser = await Oauth.findOne({ email });

    if (OauthUser)
    {
        throw new BadRequestError("Email already in use, try a different one.");
    }

    const user = await User.create({ ...req.body });

    const token = user.emailVerificationToken();

    await sendEmail(email, token);


    res.status(StatusCodes.CREATED).json({ user: { msg: "Please verify your Email" } });
});

// confirm email whenn signing up

const confirmEmail = asyncWrapper(async (req, res) =>
{

    let { id } = req.params;

    // sanitize user input
    id = xssFilters.inHTMLData(id);

    const token = id.substring(1);

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userID, username: payload.username };
    const _id = req.user.userId;

    const user = await User.findOneAndUpdate({ _id }, { verified: true }, { new: true, runValidators: true });

    // check if user with such id exists or not.
    if (!user)
    {
        throw new NotFoundError(`No user found with ID: ${_id}`);
    }


    res.status(StatusCodes.ACCEPTED).redirect("https://cvmaker-frontend.onrender.com/en/signin");
});

// resend email when signing up
const resendEmail = asyncWrapper(async (req, res) =>
{
    let { email } = req.body;

    // sanitize user input
    email = xssFilters.inHTMLData(email);
    const user = await User.findOne({ email });

    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // test if email is valid
    if (!emailRegex.test(email))
    {
        throw new BadRequestError("Please provide a valid email");
    }

    // check if user with such email exists
    if (!user)
    {
        throw new NotFoundError(`No user found with email: ${email}`);
    }

    // check if user is already verified
    if (user.verified)
    {
        throw new BadRequestError("Email is already verified");
    }

    const token = user.createJWT();
    await sendEmail(email, token);
    res.status(StatusCodes.OK).json({ msg: "Please verify your Email" });
});

const login = asyncWrapper(async (req, res) =>
{

    let { email, password } = req.body;

    // sanitize user input
    email = xssFilters.inHTMLData(email);
    password = xssFilters.inHTMLData(password);


    // checks if email and password are provided
    if (!email || !password)
    {
        throw new BadRequestError("Please provide User credentials");
    }
    const userCredentials = await User.findOne({ email });

    // checks wether user with provided credentials exist
    if (!userCredentials)
    {
        throw new UnauthenticatedError("User with provided email does not exist");
    }

    // checks wether user has their email confirmed or not
    if (!userCredentials.verified)
    {
        throw new UnauthenticatedError("You must verify your email in order to log in");
    }

    //checks if the password is correct
    const isPasswordCorrect = await userCredentials.comparePasswords(password);

    if (!isPasswordCorrect)
    {
        throw new UnauthenticatedError("Provided password is incorrect");
    }
    const token = userCredentials.createJWT();

    // set user status as logged in
    await User.findOneAndUpdate( { email }, { loggedIn: true }, { new: true, runValidators: true } );


    // sign the url to access photos
    const keys = await resumes.find({ user: userCredentials._id });
    const urls = await getSignedUrls(keys);


    // returns username and jwt
    res.status(StatusCodes.CREATED).json( {user: { token }, urls});

});

// logout
const logout = asyncWrapper(async (req, res) =>
{
    res.status(StatusCodes.OK).json({ user: { msg: "Logged out suecessfully" } });
});

// contact us
const contactUs = asyncWrapper(async (req, res) =>
{
    let { name, email, message } = req.body;

    // sanitize user input
    name = xssFilters.inHTMLData(name);
    email = xssFilters.inHTMLData(email);
    message = xssFilters.inHTMLData(message);

    // check if email is valid
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email))
    {
        throw new BadRequestError("Please provide a valid email");
    }

    // check if name and message are provided
    if (!name || !message)
    {
        throw new BadRequestError("Please provide name and message");
    }

    await sendContactEmail(name,email, message);
    res.status(StatusCodes.OK).json({ msg: "Message sent successfully" });
});

const forgotPassword = asyncWrapper(async (req, res) =>
{
    let { email } = req.body;

    // sanitize user input
    email = xssFilters.inHTMLData(email);

    // check if email is valid
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email))
    {
        throw new BadRequestError("Please provide a valid email");
    }

    // check if user with such email exists
    const user = await User.findOne({ email });

    if (!user)
    {
        throw new NotFoundError(`No user found with email: ${email}`);
    }

    const token = user.createJWT();
    await sendPasswordResetEmail(email, token);
    res.status(StatusCodes.OK).json({ msg: "Password reset link was sent to email" });
});

const getPasswordResetPage = asyncWrapper(async (req, res) =>
{
    let { id } = req.params;
    id = xssFilters.inHTMLData(id);
    const token = id.substring(1);
    console.log('extracted from params: '+ token);   

    res.cookie('token', token, { httpOnly: true });


    // res.cookie('token', token, { httpOnly: true });
    // console.log('new cookie  ' +req.cookies.token);

    res.status(StatusCodes.OK).redirect("http://localhost:3000/en/signin/reset/change-password");
}); 

const changePassword = asyncWrapper(async (req, res) =>
{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ') )
    {
        throw new BadRequestError("invalid token provided");
    }

    const token = authHeader.split(' ')[1];
    console.log('changepassword token '+token);

    if (!token)
    {
        throw new BadRequestError("No token provided");
    }


    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userID, username: payload.username };
    
    const _id = req.user.userId;

    const user = await User.findOne({ _id });

    if (!user)
    {
        throw new NotFoundError(`No user found with ID: ${_id}`);
    }

    // extract
    let {newPassword, passwordAgain} = req.body;


    newPassword = xssFilters.inHTMLData(newPassword);
    passwordAgain = xssFilters.inHTMLData(passwordAgain);

    console.log(newPassword, passwordAgain);

    if(!newPassword || !passwordAgain)
    {
        throw new BadRequestError("Please provide valid passwords");
    }

    // checking len of an input password
    if (newPassword.length > 32)
    {
        throw new BadRequestError("Password must have less than 32 characters");
    }

    // checking if passwords match
    if (!passwordAgain || newPassword !== passwordAgain)
    {
        throw new BadRequestError("Passwords must match");
    }


    // update password
    user.password = newPassword;
    await user.save();



    res.status(StatusCodes.OK).json({ msg: "Password was reset suecessfully" });
});


module.exports =
{
    login,
    signup,
    confirmEmail,
    logout,
    resendEmail,
    contactUs,
    forgotPassword,
    changePassword,
    getPasswordResetPage
};

