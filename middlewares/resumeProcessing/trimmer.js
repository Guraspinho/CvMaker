const detectLocation = require('./addressDetector');
const detectLanguages = require('./languageDetector');
const detectProgLangs = require('./ProgLangDetector');


function tokenize(text)
{
    // This regular expression matches sequences of English and Georgian letters and numbers.
    const regex = /[a-zA-Zა-ჰ0-9+#]+/g;

    // Find all matches in the text.
    const tokens = text.match(regex);

    return tokens || [];
}



async function extractText(resumeText, user)
{
    const {name,lastname} = user;
    
    const keywords =
    {
        "workExperience": 
        [
            "professional experience", "work experience", "professional background", "professional history", "employment history", "employment experience", "experiences",
            "პროფესიული გამოცდილება","სამუშაო გამოცდილება", "გამოცდილება",
        ],
        "education": ["education", "განათლება"],
        "certifications": ["certifications", "სერთიფიკატები", ],
        "projects": ["projects", "პროექტები"],
        "skills": 
        [
            "knowledge apart from programming","personal skills", "additional knowledge","soft skills","hard skills","technical skills",
            "operating systems","web development", "additional information", "frameworks", "databases", "tools", "skills", "additional", "personal",
            "უნარჩვევები", "პროგრამირების ენები", "დამატებითი ცოდნა", "ოპერაციული სისტემები", "დამატებითი ინფორმაცია", "ფრეიმვორკები", "ბაზები", "ხელსაწყოები", "უნარჩვევები",
        ],
        "summary":
        [
            "professional summary", "career objective", "career summary", "career profile", "interests", "objective", "profile",
            "პროფესიული რეზიუმე", "კარიერის ობიექტივი", "კარიერის რეზიუმე", "კარიერის პროფილი", "ინტერესები", "ობიექტივი", "პროფილი",
        ],
        "links": ["links", "ლინკები"],
    };

    try
    {
        
        const info = {};
                        
        // Create a new personalDetails object
        info['personalDetails'] = {};
        info['languages'] = [];
        info['skills'] = [];
       
        
    
        // Regex to match email addresses and phone numbers, github and linkedin accounts
        const emailRegex = /\b[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9.-]+\.)+(?:com|org|net|edu|gov|mil|us|uk|au|ca|de|fr|it|ru|cn|in|br|jp|ge)\b/g;
        const phoneRegex = /(\+\d{1,3}\s?)?(\d{3}[-\s]?){2}\d{3}/g;

        const linksRegex = /https?:\/\/[^\s]+/g;
        const githubRegex = /https?:\/\/github\.com\/[A-z0-9_-]+\/?/g;
        const linkedinRegex = /https?:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/g;
    
    
        // tokenize the resume text.
        const tokens  = tokenize(resumeText);
        // console.log(tokens);
    
        
        // Initialize info object with empty objects for each category
        Object.keys(keywords).forEach(category =>
        {
            info[category] = {};
        });
    
        let currentKeyword = null;
        let currentCategory = null;
    
        // Split text into lines and clean it up
        let lines = resumeText.split('\n');
        lines = lines.map(line => line.replace(/[^\x00-\x7F\u10A0-\u10FF]/g, ""));
    
        
        // add location
        const city = detectLocation(tokens);
        info.personalDetails.address = city;
    
        // add languages
        const languages = detectLanguages(tokens);
        info.languages = languages;
    
        // add programming languages
        const programmingLanguages = detectProgLangs(tokens);
        info.skills = programmingLanguages;
    
        // add names and surnames
        info.personalDetails.name = name;
        info.personalDetails.surname = lastname;
    
        // const addressLines = [];

        // console.log(lines);
    
        for (let line of lines)
        {
            if(typeof line !==  "string")
            {
                continue;
            }
            line = line.trim() + ' ';
            // console.log(line);
    
            Object.keys(keywords).forEach(category =>
            {
                const foundKeyword = keywords[category].find(keyword => {
                    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
                    return regex.test(line);
                });
                if (foundKeyword) {
                    currentKeyword = foundKeyword;
                    currentCategory = category;
                }
            });
    
            // if (currentKeyword === 'address') {
            //     addressLines.push(line.trim());
            // }
    
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
    
            if (emails)
            {
                const trimmedEmails = emails.map(email =>
                {
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
    
        
            
            if (Array.isArray(links))
            {
                info['links'] = (info['links'] || []).concat(links);
            }
            
            if (Array.isArray(githubLinks))
            {
                info['links'] = (info['links'] || []).concat(githubLinks);
            }
            
            if (Array.isArray(linkedinLinks))
            {
                info['links'] = (info['links'] || []).concat(linkedinLinks);
            }
        }
    
    
    
        if (info['phoneNumbers'] && info['phoneNumbers'].length > 0) {
            info['personalDetails']['phoneNumbers'] = info['phoneNumbers'][0];
            delete info['phoneNumbers'];
        }
    
        if (info['emails'] && info['emails'].length > 0) {
            info['personalDetails']['emails'] = info['emails'][0];
            delete info['emails'];
        }
    
        if (info['address']) {
            info['personalDetails']['address'] = info['address'];
            delete info['address'];
        }
    
        Object.keys(info).forEach(key => {
            if (typeof info[key] === 'object' && info[key] !== null) {
                Object.keys(info[key]).forEach(subKey => {
                    if (typeof info[key][subKey] === 'string') {
                        info[key][subKey] = info[key][subKey].trim();
                    }
                });
            }
        });
    
        const filteredInfo = {};
        Object.keys(info).forEach(key => {
            if (typeof info[key] === 'object') {
                filteredInfo[key] = {};
                Object.keys(info[key]).forEach(subKey => {
                    if (info[key][subKey] !== "") {
                        filteredInfo[key][subKey] = info[key][subKey];
                    }
                });
            }
        });

        return filteredInfo;
    }
    catch (error)
    {
        console.log(`Error ${error}`);
        throw new Error("An error occured while processing a resume");
    }
 
}



module.exports = {
    extractText
};


// create custom word tokenizer which will tokenize the text on anything exept english characters,and  georgian characters, 
