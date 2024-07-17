const mongoose = require('mongoose');


const resumeSchema = new mongoose.Schema(
    {
        createdBy:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        resumeName:
        {
            type: String,
            default: ""
        },
        resumeLanguage:
        {
            type: String,
            enum: ["en","ka"],
            default: "en"
        },
        personalDetails:
        {
            name: String,
            lastname: String,
            email: String,
            phone: String,
            address: String,
            website: String,
            profession: String,
        },
        workExperience:
        [
            {
                companyName: String,
                jobTitle: String,
                startDate: String,
                endDate: String,
                jobDescription: [ { descriptionText: {type: String} } ],
            },
        ],
        education:
        [
            {
                degree: String,
                school: String,
                startDate: String,
                endDate: String,
                degreeDescription: [ { descriptionText: {type: String} } ],
            },
        ],
        links:
        [
            {
                title: String,
                url: String,
            },
        ],
        certifications:
        [
            {
                name: String,
                organization: String,
                date: Date,
                email: String,
                number: String,
            },
        ],
        projects:
        [
            {
                name: String,
                description: String,
                link: String,
            },
        ],
        photoURL:
        {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        },
        photoKey:
        {
            type: String,
            default: 'default.jpg',
        },
        skills: [String],
        languages: [String],
        summary: String
    },
    {timestamps: true});

module.exports = mongoose.model('Resume', resumeSchema);


