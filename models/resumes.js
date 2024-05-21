const { text } = require('express');
const mongoose = require('mongoose');


const resumeSchema = new mongoose.Schema(
    {
        createdBy:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        personalDetails:
        {
            name: String,
            email: String,
            phone: String,
            address: String,
        },
        workExperience:
        [
            
            {
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
        workVisibility:
        {
            type: Boolean,
            default: true,
        },
        educationVisibility:
        {
            type: Boolean,
            default: true,
        },
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
        pdfURL: String,
        summary: String
    },
    {timestamps: true});

module.exports = mongoose.model('Resume', resumeSchema);