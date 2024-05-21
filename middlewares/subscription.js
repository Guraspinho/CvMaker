const {UnauthenticatedError, BadRequestError, NotFoundError} = require('../errors/everyError');
const User = require('../models/users');
const {StatusCodes} = require('http-status-codes')


const checkSubscription = async (req, res, next) =>
{
    const user = await User.findById(req.user.userId);

    // check if the user with the provided id exists
    if(!user)
    {
        console.log(`User with ID ${req.user.userId} not found`);
        throw new NotFoundError(`User with ID ${req.user.userId} not found`);
    }

    // check if the user has a subscription plan
    if(!user.subscriptionPlan)
    {
        console.log(`User with ID ${req.user.userId} does not have a subscription plan`);
        throw new BadRequestError('You do not have a subscription plan');
    }

    // check if the subscription is expired
    if(user.subscriptionExpiresAt < new Date())
    {
        console.log(`Subscription for user with ID ${req.user.userId} has expired`);
        throw new BadRequestError('Your subscription has expired');
    }

    next();
}


module.exports = checkSubscription;

// check if the user has a subscription plan
// if the user has a subscription plan, check if the subscription is expired
// if the subscription is expired, send an error message
// if the subscription is not expired, continue with the request
// if the user does not have a subscription plan, send an error message(the frontend will redirect the user to the payment page)