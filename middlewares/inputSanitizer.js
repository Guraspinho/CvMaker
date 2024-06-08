const xssFilters = require('xss-filters');

const sanitizeResume = (resume) => {
    const sanitizedResume = {
        ...resume,
        createdBy: resume.createdBy ? xssFilters.inHTMLData(resume.createdBy.toString()) : undefined,
        personalDetails: resume.personalDetails ? {
            name: resume.personalDetails.name ? xssFilters.inHTMLData(resume.personalDetails.name) : undefined,
            lastname: resume.personalDetails.lastname ? xssFilters.inHTMLData(resume.personalDetails.lastname) : undefined,
            email: resume.personalDetails.email ? xssFilters.inHTMLData(resume.personalDetails.email) : undefined,
            phone: resume.personalDetails.phone ? xssFilters.inHTMLData(resume.personalDetails.phone) : undefined,
            address: resume.personalDetails.address ? xssFilters.inHTMLData(resume.personalDetails.address) : undefined,
            website: resume.personalDetails.website ? xssFilters.inHTMLData(resume.personalDetails.website) : undefined,
            profession: resume.personalDetails.profession ? xssFilters.inHTMLData(resume.personalDetails.profession) : undefined,
        } : undefined,
        workExperience: resume.workExperience ? resume.workExperience.map(exp => ({
            ...exp,
            companyName: exp.companyName ? xssFilters.inHTMLData(exp.companyName) : undefined,
            jobTitle: exp.jobTitle ? xssFilters.inHTMLData(exp.jobTitle) : undefined,
            startDate: exp.startDate ? xssFilters.inHTMLData(exp.startDate) : undefined,
            endDate: exp.endDate ? xssFilters.inHTMLData(exp.endDate) : undefined,
            jobDescription: exp.jobDescription ? exp.jobDescription.map(desc => ({
                descriptionText: desc.descriptionText ? xssFilters.inHTMLData(desc.descriptionText) : undefined
            })) : undefined,
        })) : undefined,
        education: resume.education ? resume.education.map(edu => ({
            ...edu,
            degree: edu.degree ? xssFilters.inHTMLData(edu.degree) : undefined,
            school: edu.school ? xssFilters.inHTMLData(edu.school) : undefined,
            startDate: edu.startDate ? xssFilters.inHTMLData(edu.startDate) : undefined,
            endDate: edu.endDate ? xssFilters.inHTMLData(edu.endDate) : undefined,
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
            organization: cert.organization ? xssFilters.inHTMLData(cert.organization) : undefined,
            date: cert.date ? xssFilters.inHTMLData(cert.date.toString()) : undefined,
            email: cert.email ? xssFilters.inHTMLData(cert.email) : undefined,
            number: cert.number ? xssFilters.inHTMLData(cert.number) : undefined,
        })) : undefined,
        projects: resume.projects ? resume.projects.map(proj => ({
            name: proj.name ? xssFilters.inHTMLData(proj.name) : undefined,
            description: proj.description ? xssFilters.inHTMLData(proj.description) : undefined,
            link: proj.link ? xssFilters.inHTMLData(proj.link) : undefined
        })) : undefined,
        photoURL: resume.photoURL ? xssFilters.inHTMLData(resume.photoURL) : undefined,
        photoKey: resume.photoKey ? xssFilters.inHTMLData(resume.photoKey) : undefined,
        visibility: resume.visibility ? {
            photo: resume.visibility.photo,
            address: resume.visibility.address,
            email: resume.visibility.email,
            phone: resume.visibility.phone,
            workExperience: resume.visibility.workExperience,
            summary: resume.visibility.summary,
            education: resume.visibility.education,
            certifications: resume.visibility.certifications,
            links: resume.visibility.links,
            projects: resume.visibility.projects,
            skills: resume.visibility.skills,
            languages: resume.visibility.languages,
            color: resume.visibility.color ? xssFilters.inHTMLData(resume.visibility.color) : undefined,
        } : undefined,
        skills: resume.skills ? resume.skills.map(skill => xssFilters.inHTMLData(skill)) : undefined,
        skillsSection2: resume.skillsSection2 ? resume.skillsSection2.map(skill => ({
            singleSkill: skill.singleSkill ? xssFilters.inHTMLData(skill.singleSkill) : undefined
        })) : undefined,
        languages: resume.languages ? resume.languages.map(lang => xssFilters.inHTMLData(lang)) : undefined,
        languagesSection2: resume.languagesSection2 ? resume.languagesSection2.map(lang => ({
            singleLanguage: lang.singleLanguage ? xssFilters.inHTMLData(lang.singleLanguage) : undefined
        })) : undefined,
        pdfURL: resume.pdfURL ? xssFilters.inHTMLData(resume.pdfURL) : undefined,
        summary: resume.summary ? xssFilters.inHTMLData(resume.summary) : undefined
    };

    return sanitizedResume;
};

module.exports = sanitizeResume;