const detectLocation = require('./addressDetector');
const detectLanguages = require('./languageDetector');
const detectProgLangs = require('./ProgLangDetector');
const detectName = require('./nameDetector');
const detectSurname = require('./surnameDetector');

function tokenize(text) {
    // This regular expression matches sequences of English and Georgian letters and numbers.
    const regex = /[a-zA-Zა-ჰ0-9+#]+/g;

    // Find all matches in the text.
    const tokens = text.match(regex);

    return tokens || [];
}

async function extractText(resumeText) {
    const keywords = {
        "workExperience": [
            "professional experience", "work experience", "professional background", "professional history", "employment history", "employment experience", "experiences",
            "პროფესიული გამოცდილება", "სამუშაო გამოცდილება", "გამოცდილება",
        ],
        "education": ["education", "განათლება", "bachelor's", "master's", "phd", "doctorate"],
        "certifications": ["certifications", "სერთიფიკატები"],
        "projects": ["projects", "პროექტები"],
        "skills": [
            "knowledge apart from programming", "personal skills", "additional knowledge", "soft skills", "hard skills", "technical skills",
            "operating systems", "web development", "additional information", "frameworks", "databases", "tools", "skills", "additional", "personal",
            "უნარჩვევები", "პროგრამირების ენები", "დამატებითი ცოდნა", "ოპერაციული სისტემები", "დამატებითი ინფორმაცია", "ფრეიმვორკები", "ბაზები", "ხელსაწყოები", "უნარჩვევები",
        ],
        "summary": [
            "professional summary", "career objective", "career summary", "career profile", "interests", "objective", "profile",
            "პროფესიული რეზიუმე", "კარიერის ობიექტივი", "კარიერის რეზიუმე", "კარიერის პროფილი", "ინტერესები", "ობიექტივი", "პროფილი",
        ],
        "links": ["links", "ლინკები"],
        "profession": ["profession", "პროფესია"],
        "website": ["website", "ვებგვერდი"]
    };

    try {
        const info = {};

        // Create a new personalDetails object
        info['personalDetails'] = {
            name: "",
            lastname: "",
            email: "",
            phone: "",
            address: "",
            website: "",
            profession: ""
        };
        info['languages'] = [];
        info['skills'] = [];
        info['visibility'] = {
            photo: true,
            address: true,
            email: true,
            phone: true,
            workExperience: true,
            summary: true,
            education: true,
            certifications: false,
            links: true,
            projects: true,
            skills: true,
            languages: true,
            color: ''
        };

        // Initialize education section
        info['education'] = [{
            degree: "",
            school: "",
            startDate: "",
            endDate: "",
            degreeDescription: []
        }];

        // Initialize work experience section
        info['workExperience'] = [{
            companyName: "",
            jobTitle: "",
            startDate: "",
            endDate: "",
            jobDescription: []
        }];

        // Initialize links section
        info['links'] = [{
            title: "",
            url: ""
        }];

        // Initialize certifications section
        info['certifications'] = [{
            name: "",
            organization: "",
            date: "",
            email: "",
            number: ""
        }];

        // Initialize projects section
        info['projects'] = [{
            name: "",
            description: "",
            link: ""
        }];

        // languagesSection2
        info['languagesSection2'] = 
        [
            {
                singleLanguage: ""
            }
        ]

        // skillsSection2
        info['skillsSection2'] = 
        [
            {
                singleskill: ""
            }
        ]

        // Regex to match email addresses and phone numbers, github and linkedin accounts
        const emailRegex = /\b[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9.-]+\.)+(?:com|org|net|edu|gov|mil|us|uk|au|ca|de|fr|it|ru|cn|in|br|jp|ge)\b/g;
        const phoneRegex = /(\+\d{1,3}\s?)?(\d{3}[-\s]?){2}\d{3}/g;
        const linksRegex = /https?:\/\/[^\s]+/g;
        const githubRegex = /https?:\/\/github\.com\/[A-z0-9_-]+\/?/g;
        const linkedinRegex = /https?:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/g;

        // Tokenize the resume text.
        const tokens = tokenize(resumeText);

        // Initialize info object with empty objects for each category
        Object.keys(keywords).forEach(category => {
            info[category] = {};
        });

        let currentKeyword = null;
        let currentCategory = null;

        // Split text into lines and clean it up
        let lines = resumeText.split('\n');
        lines = lines.map(line => line.replace(/[^\x00-\x7F\u10A0-\u10FF]/g, ""));

        // Add location
        const city = detectLocation(tokens);
        info.personalDetails.address = city;

        // Add languages
        const languages = detectLanguages(tokens);
        info.languages = languages;

        // Add programming languages
        const programmingLanguages = detectProgLangs(tokens);
        info.skills = programmingLanguages;

        // Add names and surnames
        info.personalDetails.name = detectName(tokens);
        info.personalDetails.lastname = detectSurname(tokens);

        for (let line of lines) {
            if (typeof line !== "string") {
                continue;
            }
            line = line.trim() + ' ';

            Object.keys(keywords).forEach(category => {
                const foundKeyword = keywords[category].find(keyword => {
                    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
                    return regex.test(line);
                });
                if (foundKeyword) {
                    currentKeyword = foundKeyword;
                    currentCategory = category;
                }
            });

            if (currentKeyword) {
                if (!info[currentCategory][currentKeyword]) {
                    info[currentCategory][currentKeyword] = "";
                }
                let lineWithoutKeyword = line.replace(new RegExp(`\\b${currentKeyword}:?\\b`, 'i'), '');
                lineWithoutKeyword = lineWithoutKeyword.trimStart();
                info[currentCategory][currentKeyword] += lineWithoutKeyword;
            }

            const emails = line.match(emailRegex);
            const links = line.match(linksRegex);
            let phoneNumbers = line.match(phoneRegex);
            const githubLinks = line.match(githubRegex);
            const linkedinLinks = line.match(linkedinRegex);

            if (emails) {
                const trimmedEmails = emails.map(email => {
                    const parts = email.split('@');
                    const domainParts = parts[1].split('.');
                    return parts[0] + '@' + domainParts[0] + '.' + domainParts[1];
                });
                info['emails'] = (info['emails'] || []).concat(trimmedEmails);
            }

            if (phoneNumbers) {
                phoneNumbers = phoneNumbers.map(phoneNumber => {
                    if (phoneNumber.startsWith('+995') && phoneNumber[4] !== ' ') {
                        return phoneNumber.slice(0, 4) + ' ' + phoneNumber.slice(4);
                    }
                    return phoneNumber;
                });
                info['phoneNumbers'] = (info['phoneNumbers'] || []).concat(phoneNumbers);
            }

            if (Array.isArray(links)) {
                info['links'] = [...(Array.isArray(info['links']) ? info['links'] : []), ...links];
            }

            if (Array.isArray(githubLinks)) {
                info['links'] = [...(Array.isArray(info['links']) ? info['links'] : []), ...githubLinks];
            }

            if (Array.isArray(linkedinLinks)) {
                info['links'] = [...(Array.isArray(info['links']) ? info['links'] : []), ...linkedinLinks];
            }
        }

        // Add education details if found
        const educationDetails = {
            degree: "",
            school: "",
            startDate: "",
            endDate: "",
            degreeDescription: []
        };
        if (currentCategory === "education" && currentKeyword) {
            educationDetails.degree = currentKeyword;
            educationDetails.degreeDescription.push({ descriptionText: info[currentCategory][currentKeyword] });
        }
        info.education = [educationDetails];

        // Add work experience details if found
        const workExperienceDetails = {
            companyName: "",
            jobTitle: "",
            startDate: "",
            endDate: "",
            jobDescription: []
        };
        if (currentCategory === "workExperience" && currentKeyword) {
            workExperienceDetails.jobTitle = currentKeyword;
            workExperienceDetails.jobDescription.push({ descriptionText: info[currentCategory][currentKeyword] });
        }
        info.workExperience = [workExperienceDetails];

        // Add links details if found
        const linksDetails = {
            title: "",
            url: ""
        };
        if (currentCategory === "links" && currentKeyword) {
            linksDetails.title = currentKeyword;
            linksDetails.url = info[currentCategory][currentKeyword];
        }
        info.links = [linksDetails];

        // Add certifications details if found
        const certificationsDetails = {
            name: "",
            organization: "",
            date: "",
            email: "",
            number: ""
        };
        if (currentCategory === "certifications" && currentKeyword) {
            certificationsDetails.name = currentKeyword;
            certificationsDetails.organization = info[currentCategory][currentKeyword];
        }
        info.certifications = [certificationsDetails];

        // Add projects details if found
        const projectsDetails = {
            name: "",
            description: "",
            link: ""
        };
        if (currentCategory === "projects" && currentKeyword) {
            projectsDetails.name = currentKeyword;
            projectsDetails.description = info[currentCategory][currentKeyword];
        }
        info.projects = [projectsDetails];

        if (info['phoneNumbers'] && info['phoneNumbers'].length > 0) {
            info['personalDetails']['phone'] = info['phoneNumbers'][0];
            delete info['phoneNumbers'];
        }

        if (info['emails'] && info['emails'].length > 0) {
            info['personalDetails']['email'] = info['emails'][0];
            delete info['emails'];
        }

        return info;
    } catch (error) {
        console.log(error);
        throw new Error("An error occurred while processing a resume");
    }
}

module.exports = {
    extractText
};
