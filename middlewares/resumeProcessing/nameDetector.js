
//names

function detectName(text) {
    const namesKa = new Set([
        "adami", "aleko", "alekos", "aleksandra", "aleksandre", "aleksi", "amiran", "akaki",
        "ana", "anastasia", "ani", "anri", "anzor", "anzori", "archil", "asmat", "avtandil", 
        "badri", "beka", "besik", "bidzina", "barbare", "bela", "dachi", "dato", "davit",
        "dimitri", "demetre", "demi", "darina", "dima", "eliko", "elisbar", "elene", "eleno",
        "elguja", "eliso", "eka", "esma", "erekle", "gabriel", "gela", "gigi", "guliko",
        "gia", "giga", "gio", "giorgi", "giorgina", "giorgius", "goga", "gvanca", "gvantsa", 
        "guram", "ia", "inola", "irakli", "ivane", "ivlita", "izo", "jaba", "kakha", "kako", 
        "ketevan", "kolia", "kote", "khatuna", "lana", "lado", "lali", "lea", "leka", 
        "lela", "levan", "levani", "lia", "lizi", "luka", "maka", "malkhaz", "manana", 
        "mano", "maia", "mariam", "mamuka", "medea", "merab", "mzia", "nani", "nata", 
        "natia", "nato", "nazi", "niko", "nika", "nikoloz", "nino", "nodar", "nugzar", 
        "nutsa", "otar", "ramaz", "rati", "rezo", "rezi", "rusudan", "salome", "sanda", 
        "sandro", "sashiko", "shorena", "shota", "siko", "sopo", "tamta", "tako", "tamar", 
        "tamara", "tamuna", "tata", "tazo", "teimuraz", "teona", "tinatin", "tina", "taliko", 
        "tornike", "tsotne", "ugro", "vano", "vakho", "vakhtang", "zaira", "zaza", 
        "zurab", "zuriko", "zura", "zviad", "zosime"
    ]);

    const namesEn = new Set([
        "ადამი", "ალეკო", "ალეკოსი", "ალექსანდრა", "ალექსანდრე", "ალექსი", "ამირანი", "აკაკი",
        "ანა", "ანასტასია", "ანი", "ანრი", "ანზორი", "ანზორი", "არჩილი", "ასმათი", "ავთანდილი",
        "ბადრი", "ბეკა", "ბესიკი", "ბიძინა", "ბარბარე", "ბელა", "დაჩი", "დათო", "დავითი",
        "დიმიტრი", "დემეტრე", "დემი", "დარინა", "დიმა", "ელიკო", "ელისბარი", "ელენე", "ელენო",
        "ელგუჯა", "ელისო", "ეკა", "ესმა", "ერეკლე", "გაბრიელი", "გელა", "გიგი", "გულიკო",
        "გია", "გიგა", "გიო", "გიორგი", "გიორგინა", "გიორგიუსი", "გოგა", "გვანცა", "გვანცა",
        "გურამი", "ია", "ინოლა", "ირაკლი", "ივანე", "ივლიტა", "იზო", "ჯაბა", "კახა", "კაკო",
        "კეტევანი", "კოლია", "კოტე", "ხათუნა", "ლანა", "ლადო", "ლალი", "ლეა", "ლეკა",
        "ლელა", "ლევანი", "ლევანი", "ლია", "ლიზი", "ლუკა", "მაკა", "მალხაზი", "მანანა",
        "მანო", "მაია", "მარიამი", "მამუკა", "მედეა", "მერაბი", "მზია", "ნანი", "ნატა",
        "ნატია", "ნატო", "ნაზი", "ნიკო", "ნიკა", "ნიკოლოზი", "ნინო", "ნოდარი", "ნუგზარი",
        "ნუცა", "ოთარი", "რამაზი", "რატი", "რეზო", "რუსუდანი", "სალომე", "სანდა", "სანდრო",
        "საშიკო", "შორენა", "შოთა", "სიკო", "სოფო", "თამთა", "თაკო", "თამარ", "თამარა",
        "თამუნა", "თატა", "თაზო", "თეიმურაზი", "თეონა", "თინათინი", "თინა", "ტალიკო",
        "ტორნიკე", "ცოტნე", "უგრო", "ვანო", "ვახო", "ვახტანგი", "ზაირა", "ზაზა",
        "ზურაბი", "ზურიკო", "ზურა", "ზვიადი", "ზოსიმე"
    ]);

    for (let token of text) {
        if (namesKa.has(token) || namesEn.has(token)) {
            // Return the name immediately if found
            return token;
        }
    }

    return null;
}

module.exports = detectName;