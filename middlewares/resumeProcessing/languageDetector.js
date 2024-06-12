// languages

function detectLanguages(text)
{
    let languages = new Set();

    const languagesEn = 
    [
        "english", "georgian", "spanish", "french", "german", "italian", "portuguese",
        "dutch", "russian", "chinese", "japanese", "korean", "arabic", "hindi", "bengali",
        "punjabi", "urdu", "indonesian", "turkish", "polish", "swahili", "amharic", "zulu", "xhosa",
        "greek", "latin", "hebrew", "yoruba", "igbo", "thai", "vietnamese", "persian", "malay", "filipino",
        "burmese", "kurdish", "somali", "romanian", "hungarian", "czech", "swedish", "finnish", "norwegian",
        "danish", "icelandic", "irish", "welsh", "mongolian", "nepali", "khmer", "lao", "sinhala", "malagasy",
        "maori", "hawaiian", "esperanto"
    ];
    
    
    
    const languagesKa = 
    [
        "ინგლისური", "ქართული", "ესპანური", "ფრანგული", "გერმანული", "იტალიური", "პორტუგალიური",
        "ჰოლანდიური", "რუსული", "ჩინური", "იაპონური", "კორეული", "არაბული", "ჰინდი", "ბენგალური",
        "პენჯაბი", "ურდუ", "ინდონეზიური", "თურქული", "პოლონური", "სვაჰილი", "ამჰარული", "ზულუ", "ხოსა",
        "ბერძნული", "ლათინური", "ებრაული", "იორუბა", "იგბო", "ტაილანდური", "ვიეტნამური", "სპარსული", "მალაიური",
        "ფილიპინური","ბირმული", "ქურთული", "სომალიური", "რუმინული", "უნგრელი", "ჩეხური", "შვედური", "ფინური",
        "ნორვეგიული","დანიური", "ისლანდიური", "ირლანდიური", "უელსური", "მონღოლური", "ნეპალური", "ხმერული", "ლაო",
        "სინჰალური", "მალაგასური","მაორი", "ჰავაი", "ესპერანტო"
    ];

        for (let token of text)
        {
            for (let language of languagesKa)
            {
                if(token === language)
                {
                    languages.add(language);
                }
            }
        }

    
    if(languages.size)
    {
        let languagesArr = Array.from(languages);
        return languagesArr;
    }


    for (let token of text)
    {
        for (let language of languagesEn)
        {
            if(token === language)
            {
                languages.add(language);
            }
        }
    }
    
    
    
    if(languages.size)
    {
        let languagesArr = Array.from(languages);
        languagesArr = languagesArr.map(language => language[0].toUpperCase() + language.slice(1));
        
        return languagesArr;
    }

    return;
    

}

module.exports = detectLanguages;