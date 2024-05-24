const { text } = require('express');
const { string } = require('joi');
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
            photo: {type: Boolean, default: false},
            address: {type: Boolean, default: false},
            email: {type: Boolean, default: false},
            phone: {type: Boolean, default: false},
            workExperience: {type: Boolean, default: false},
            summary: {type: Boolean, default: false},
            education: {type: Boolean, default: false},
            links: {type: Boolean, default: false},
            certifications: {type: Boolean, default: false},
            projects: {type: Boolean, default: false},
            color: {type: string, default: ''},
        }, 
        skills: [String],
        languages: [String],
        pdfURL: String,
        summary: String
    },
    {timestamps: true});

module.exports = mongoose.model('Resume', resumeSchema);