const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const OauthSchema = new mongoose.Schema({
    email:
    {
        type: String,
        required: true,
    },
    name:
    {
        type: String,
        required: true,
    },
    surname:
    {
        type: String,
        required: true,
    },
    lastNameChangedAt:
    {
        type: Date,
        default: Date.now
    },
    lastSurnameChangedAt:
    {
        type: Date,
        default: Date.now
    },
    subscriptionExpiresAt:
    {
        type: Date,
    },  

},{timestamps: true});


// generate JWT

OauthSchema.methods.createJWT = function()
{
    return jwt.sign({userID: this._id, userName: this.name, userSurname: this.surname}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}


module.exports = mongoose.model('Oauth', OauthSchema);