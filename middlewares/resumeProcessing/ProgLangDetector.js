// programming languages

function detectProgLangs(text)
{
    let languages = new Set();
    const programmingLanguages = 
    [
        "javascript", "python", "java", "c#", "c",
        "c++", "ruby", "go", "swift", "kotlin",
        "typescript", "php", "Rust", "scala", "perl", "lua"
    ];

    for (let token of text)
    {
        for (let language of programmingLanguages)
        {
            if(language === token)  
            {
                languages.add(language);
            }  
        }
    }
    // console.log(languages);
    
    if(languages.length != 0)
    {
        let languagesArr = Array.from(languages);
        return languagesArr;
    }
    return;

}

module.exports = detectProgLangs;