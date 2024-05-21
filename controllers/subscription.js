const User = require('../models/users');
const {BadRequestError} = require('../errors/everyError');
const {StatusCodes} = require('http-status-codes');
const asyncWrapper = require('../middlewares/asyncWrapper');
const xssFilters = require('xss-filters');


const buySubscription = asyncWrapper( async (req, res) =>
{
    const user = await User.findById(req.user.userId);
    const subscriptionPlan = xssFilters.inHTMLData(req.body.subscriptionPlan);

    // check if the user provided a subscription plan
    if(!subscriptionPlan || (subscriptionPlan !== 'weekly' && subscriptionPlan !== 'monthly'))
    {
        throw new BadRequestError('Please provide a valid subscription plan');
    }

    // check if the user with the provided id exists
    if(!user)
    {
        throw new BadRequestError(`User with ID ${req.user.userId} not found`);
    }

    // check if the user already has a subscription plan
    if(user.subscriptionPlan)
    {
        throw new BadRequestError('You already have a subscription plan');
    }


    // set the expiration date of the subscription plan
    if(subscriptionPlan === 'weekly')
    {
        await User.findOneAndUpdate({_id: req.user.userId}, {subscriptionExpiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000}, {new:true, runValidators:true});
    }
    else if(subscriptionPlan === 'monthly')
    {
        await User.findOneAndUpdate({_id: req.user.userId}, {subscriptionExpiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000}, {new:true, runValidators:true});
    }

    

    res.status(StatusCodes.OK).json({user:{msg: 'Subscription plan was purchased successfully'}});
});


module.exports = {buySubscription};


// one week subscription plan costs 4.99$
// one month subscription plan costs 14.99$