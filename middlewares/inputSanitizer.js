const xssFilters = require('xss-filters');

const sanitizeResume = (resume) => {
    const sanitizedResume = {
        ...resume,
        personalDetails: resume.personalDetails ? {
            name: resume.personalDetails.name ? xssFilters.inHTMLData(resume.personalDetails.name) : undefined,
            email: resume.personalDetails.email ? xssFilters.inHTMLData(resume.personalDetails.email) : undefined,
            phone: resume.personalDetails.phone ? xssFilters.inHTMLData(resume.personalDetails.phone) : undefined,
            address: resume.personalDetails.address ? xssFilters.inHTMLData(resume.personalDetails.address) : undefined,
        } : undefined,
        workExperience: resume.workExperience ? resume.workExperience.map(exp => ({
            ...exp,
            jobTitle: exp.jobTitle ? xssFilters.inHTMLData(exp.jobTitle) : undefined,
            jobDescription: exp.jobDescription ? exp.jobDescription.map(desc => ({
                descriptionText: desc.descriptionText ? xssFilters.inHTMLData(desc.descriptionText) : undefined
            })) : undefined,
        })) : undefined,
        education: resume.education ? resume.education.map(edu => ({
            ...edu,
            degree: edu.degree ? xssFilters.inHTMLData(edu.degree) : undefined,
            school: edu.school ? xssFilters.inHTMLData(edu.school) : undefined,
            degreeDescription: edu.degreeDescription ? edu.degreeDescription.map(desc => ({
                descriptionText: desc.descriptionText ? xssFilters.inHTMLData(desc.descriptionText) : undefined
            })) : undefined,
        })) : undefined,
        links: resume.links ? resume.links.map(link => ({
            title: link.title ? xssFilters.inHTMLData(link.title) : undefined,
            url: link.url ? xssFilters.inHTMLData(link.url) : undefined
        })) : undefined,
        certifications: resume.certifications ? resume.certifications.map(cert => ({
            name: cert.name ? xssFilters.inHTMLData(cert.name) : undefined,
            organization: cert.organization ? xssFilters.inHTMLData(cert.organization) : undefined
        })) : undefined,
        projects: resume.projects ? resume.projects.map(proj => ({
            name: proj.name ? xssFilters.inHTMLData(proj.name) : undefined,
            description: proj.description ? xssFilters.inHTMLData(proj.description) : undefined,
            link: proj.link ? xssFilters.inHTMLData(proj.link) : undefined
        })) : undefined,
        skills: resume.skills ? resume.skills.map(skill => xssFilters.inHTMLData(skill)) : undefined,
        languages: resume.languages ? resume.languages.map(lang => xssFilters.inHTMLData(lang)) : undefined,
        pdfURL: resume.pdfURL ? xssFilters.inHTMLData(resume.pdfURL) : undefined,
        photoURL: resume.photoURL ? xssFilters.inHTMLData(resume.photoURL) : undefined,
        summary: resume.summary ? xssFilters.inHTMLData(resume.summary) : undefined
    };

    return sanitizedResume;
};
module.exports = sanitizeResume;