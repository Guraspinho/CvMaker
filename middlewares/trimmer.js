const natural = require('natural');

function extractText(resumeText)
{
    const info = {};
    let currentKeyword = null;

    const keywords = [
        "knowledge apart from programming","programming languages","additional knowledge", "operating systems","my work", "additional information", "professional summary", "career objective", "career summary", "career profile", "career goals",
        "professional experience", "work experience", "professional background", "professional history", "employment history", "employment experience","personal skills", "technical skills", "soft skills", "hard skills","web development ",
        "skills", "experience", "education", "certifications", "projects", "languages","profile","უნარჩვევები", "გამოცდილება", "განათლება","ენები","პროგრამირების ენები","",
        "interests", "frameworks", "databases", "tools", "objective",
    ];

    let tokenizer = new natural.WordTokenizer();
    let tokens = tokenizer.tokenize(resumeText);
    console.log(tokens);

    // Initialize info object with empty strings for each keyword
    keywords.forEach(keyword => info[keyword] = "");

    // Regex to match email addresses and phone numbers
    const emailRegex = /\b[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9.-]+\.)+(?:com|org|net|edu|gov|mil|us|uk|au|ca|de|fr|it|ru|cn|in|br|jp|ge)\b/g;
    const phoneRegex = /(\+\d{1,3}\s?)?(\d{3}[-\s]?){2}\d{3}/g;

    // Split text into lines and iterate through each line
    const lines = resumeText.split('\n');
    lines.forEach(line =>
    {
        // Add a space at the end of the line to ensure words are not concatenated
        line = line.trim() + ' ';

        // Check if the line contains any of the keywords
        const foundKeyword = keywords.find(keyword => line.includes(keyword));
        if (foundKeyword && foundKeyword !== currentKeyword)
        {
            // Update current section
            currentKeyword = foundKeyword;
        }
        else if (currentKeyword)
        {
            // Append the line to its data
            info[currentKeyword] += line;
        }

        // Extract emails and phone numbers
        const emails = line.match(emailRegex);
        let phoneNumbers = line.match(phoneRegex);

        if (emails)
        {
            // Trim the emails
            const trimmedEmails = emails.map(email =>
            {
                const parts = email.split('@');
                const domainParts = parts[1].split('.');
                return parts[0] + '@' + domainParts[0] + '.' + domainParts[1];
            });
            info['emails'] = (info['emails'] || []).concat(trimmedEmails);
        }

        if (phoneNumbers)
        {
            phoneNumbers = phoneNumbers.map(phoneNumber =>
            {
                if (phoneNumber.startsWith('+995') && phoneNumber[4] !== ' ')
                {
                    return phoneNumber.slice(0, 4) + ' ' + phoneNumber.slice(4);
                }
                return phoneNumber;
            });
            info['phoneNumbers'] = (info['phoneNumbers'] || []).concat(phoneNumbers);
        }
    });

    // Trim whitespace from each section
    Object.keys(info).forEach(key =>
    {
        if (Array.isArray(info[key]))
        {
            info[key] = [...new Set(info[key])];  // Remove duplicates
        }
        else
        {
            info[key] = info[key].trim();
        }
    });

    // Filter out empty strings
    const filteredInfo = {};
    Object.keys(info).forEach(key =>
    {
        if (info[key] !== "")
        {
            filteredInfo[key] = info[key];
        }
    });

    // Remove non-ASCII characters
    Object.keys(filteredInfo).forEach(key =>
    {
        if (typeof filteredInfo[key] === 'string')
        {
            filteredInfo[key] = filteredInfo[key].replace(/[^\x00-\x7F]/g, "");
        }
        else if (Array.isArray(filteredInfo[key]))
        {
            filteredInfo[key] = filteredInfo[key].map(item => item.replace(/[^\x00-\x7F]/g, ""));
        }
    });

    return filteredInfo;
}

module.exports =
{
    extractText
};