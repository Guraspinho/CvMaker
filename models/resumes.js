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
        visibility:
        {
            photo: {type: Boolean, default: true},
            address: {type: Boolean, default: true},
            email: {type: Boolean, default: true},
            phone: {type: Boolean, default: true},
            workExperience: {type: Boolean, default: true},
            summary: {type: Boolean, default: true},
            education: {type: Boolean, default: true},
            certifications: {type: Boolean, default: false},
            links: {type: Boolean, default: true},
            projects: {type: Boolean, default: true},
            skills: {type: Boolean, default: true},
            languages: {type: Boolean, default: true},
            color: {type: String, default: ''},
        }, 
        skills: [String],
        skillsSection2:
        [
            {
               singleSkill: String,
            }
        ], 
        languages: [String],
        languagesSection2:
        [
            {
                singleLanguage: String,
            }
        ],
        pdfURL: String,
        summary: String
    },
    {timestamps: true});

module.exports = mongoose.model('Resume', resumeSchema);


