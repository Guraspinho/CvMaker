// surnames

function detectSurname(text)
{
    
    const surnamesKa = new Set ([
        "აბაშიძე", "აბდუშელიშვილი", "აგლაძე", "ალავიძე", "ამირანაშვილი", "ანანიაშვილი",
        "არაბიძე", "არაქელაშვილი", "ასათიანი", "აფაქიძე", "ბაქრაძე", "ბახტაძე",
        "ბერიძე", "ბიბილეიშვილი", "ბიძინაშვილი", "ბოგვერაძე", "ბოლქვაძე", "ბოლქვაძე",
        "გაბუნია", "გაგნიძე", "გაგუა", "გამრეკელაშვილი", "განსვია", "გელაშვილი",
        "გელაშვილი", "გივიშვილი", "გიგაშვილი", "გიგაური", "გიგინეიშვილი", "გიგოლაშვილი",
        "გოგიბერიძე", "გოგიშვილი", "გოგრიჭიანი", "გორელიშვილი", "გოცირიძე", "გრიგალაშვილი",
        "გუგუშვილი", "გულაშვილი", "გურგენიძე", "გურასპაშვილი", "გურასაშვილი", "გურასპიშვილი",
        "დავითაშვილი", "დარჩაშვილი", "დევდარიანი","დაუშვილი",
        "დვალიშვილი", "ეისიანი", "თარხან-მოურავი", "თელაძე", "თემურაშვილი", "თოდუა",
        "თომაშვილი", "თორაძე", "იაკობაშვილი", "იგორაშვილი", "ივანიშვილი", "ივერიაშვილი",
        "ინაშვილი", "კაკაბაძე", "კაკუშაძე", "კალანდაძე", "კანთელაძე", "კაპანაძე",
        "კაკაბაძე", "კარელიძე", "კასრაძე", "კვარაცხელია", "კახიძე", "კიკნაძე",
        "კილაძე", "კობერიძე", "კოდუა", "კოსტავა", "კუცია", "ლაგვილავა", "ლევანიძე",
        "ლეკვეიშვილი", "ლომიძე", "ლორთქიფანიძე", "მაბუჩიძე", "მათეშვილი", "მათურელი",
        "მეტრეველი", "მინაშვილი", "მიქავა", "მიქელაძე", "მიქაბერიძე", "მიქაძე",
        "მოდებაძე", "მოთიაშვილი", "მუმლაძე", "მუსხელიშვილი", "მუჯირი", "ნადირაძე",
        "ნანობაშვილი", "ნატროშვილი", "ნემსაძე", "ნინიაშვილი", "ნიკოლაიშვილი",
        "ნიკოლავა", "ნიკოლოზიშვილი", "ნოდია", "ნოზაძე", "ოლაშვილი", "ოთხმეზური",
        "პაპიძე", "პარადაშვილი", "პარეზაშვილი", "პაჭკორია", "პირმისაშვილი", "პაპუაშვილი",
        "რამიშვილი", "რუსიაშვილი", "რუსიშვილი", "საბაშვილი", "სამსონია", "საბაძე", "სულაბერიძე",
        "სარჯველაძე", "სარიშვილი", "სვანიძე", "სიხარულიძე", "სიკნაძე", "სოზაშვილი",
        "სოლომნიშვილი", "სუხიშვილი", "ტაბატაძე", "ტატუაშვილი", "ტუხაშვილი", "ტყემალაძე",
        "ტაბიძე", "ტოროშელიძე", "ტუღუში", "ყაზიშვილი", "ყანჩელი", "ყაზარაშვილი",
        "ყიზილაშვილი", "ქავთარაძე", "ქარჩავა", "ქაცარავა", "ქერჩიაშვილი", "ქურციკიძე",
        "ქუმსიშვილი", "ღლონტი", "ღოღობერიძე", "ღუჭაშვილი", "შენგელია", "შერვაშიძე",
        "შონია", "შუბითიძე", "შუკაკიძე", "შურღაია", "ჩადუნელი", "ჩალაძე", "ჩანდურია",
        "ჩანტლაძე", "ჩარექაშვილი", "ჩელიძე", "ჩოხელი", "ჩხაიძე", "ჩხაიძე", "ჩხიკვაძე",
        "ცაბაძე", "ცალიშვილი", "ცერცვაძე", "ცინცაძე", "ცირეკიძე", "ცირეკიძე",
        "ციხისელი", "ცქიტიშვილი", "ძიძიგური", "ძნელაძე", "წულაძე", "წულუკიძე",
        "ჭანტურია", "ჭარელი", "ჭეიშვილი", "ჭელიძე", "ჭიკაიძე", "ჭრელაშვილი",
        "ჭუმბურიძე", "ხალვაში", "ხარატიშვილი", "ხარებაშვილი", "ხაზარაძე", "ხერხეულიძე",
        "ხიზანიშვილი", "ხოჯავა", "ხოფერია", "ხუციშვილი", "ჯავახაძე", "ჯაოშვილი",
        "ჯაფარიძე", "ჯიბლაძე", "ჯინჯოლავა", "ჯუღაშვილი", "ჯღამაძე", "წულაია"
      ]);

      const surnamesEn = new Set ([
        "abashidze", "abdushelishvili", "aglazde", "alavidze", "amiranashvili", "ananiashvili",
        "arabidze", "arakelashvili", "asatiani", "afakidze", "bakradze", "bakhtadze",
        "beridze", "bibileishvili", "bidzinashvili", "bogveradze", "bolkvadze",
        "gabunia", "gagnidze", "gagua", "gamrekelashvili", "gansvia", "gelashvili",
        "gvelashvili", "giviashvili", "gigashvili", "gigauri", "giginashvili", "gigolashvili",
        "gogiberidze", "gogishvili", "gogrishiani","guraspashvili","gogeishvili","gurasashvili",
        "gorelshvili", "gotsiridze", "grigalashvili", "tsulaia",
        "gugushvili", "gulashvili", "gurgenidze", "davitashvili", "darchashvili", "devdariani",
        "dvalishvili", "eisiani", "tarkhan-mouravi", "teladze", "temurashvili", "todua",
        "tomashvili", "toradze", "iakobashvili", "igorashvili", "ivanashvili", "iveriashvili",
        "inashvili", "kakabadze", "kakushadze", "kalandadze", "kanteladze", "kapanadze",
        "kakabadze", "karelidze", "kasradze", "kvaratskhelia", "kakhidze", "kiknadze",
        "kiladze", "koberidze", "kodua", "kostava", "kutsia", "lagvilava", "levanidze",
        "lekveishvili", "lomidze", "lortkipanidze", "mabuchidze", "mateshvili", "matureli",
        "metreveli", "minashvili", "mikava", "mikeladze", "mikaberidze", "mikadze",
        "modebadze", "motiashvili", "mumladze", "mushelishvili", "mujiri", "nadiradze",
        "nanobashvili", "natriashvili", "nemsadze", "niniashvili", "nikolaishvili",
        "nikolava", "nikolozishvili", "nodia", "nozadze", "olashvili", "otkhmezuri",
        "papidze", "paradashvili", "parezashvili", "patchkoria", "pirmisashvili", "papuashvili",
        "ramishvili", "rusiashvili", "rushiashvili", "sabashvili", "samsonia", "sabazde",
        "sardjveladze", "sarishvili", "svanidze", "sikharulidze", "siknadze", "sozashvili","sulaberidze",
        "sulakvelidze", "sarajishvili","saridze",
        "solomnishvili", "sukhishvili", "tabatadze", "tatuashvili", "tukhishvili", "tkemaladze",
        "tabidze", "toroshelidze", "tughushi", "qazishvili", "qancheli", "qazarashvili",
        "qizilashvili", "kavtaradze", "karchava", "katsarava", "kerchiashvili", "kurtsikidze",
        "kumsishvili", "ghlonti", "ghoghoberidze", "ghvichashvili", "shengelia", "shervashidze",
        "shonia", "shubitidze", "shukakidze", "shurgaia", "chaduneli", "chaladze", "chanduria",
        "chantladze", "chareqashvili", "chelidze", "chokheli", "chkhaidze", "chkhaidze", "chkikvadze",
        "tsabadze", "tsalishvili", "tsertsvadze", "tsintsadze", "tsirekidze", "tsirekidze",
        "tsikhiseli", "tskvitishvili", "dzidziguri", "dzeneladze", "tsuladze", "tsulukidze",
        "tsanturia", "chareli", "cheishvili", "chelidze", "chikvaidze", "chrelashvili",
        "chumburidze", "khalvashi", "kharatishvili", "kharebashvili", "khazaradze", "kherkheulidze",
        "khizanishvili", "khojava", "khofferia", "khutsishvili", "javakhadze", "jaoshvili",
        "japaridze", "jiblidze", "jinjolava", "jughashvili", "jghamadze"
      ]);
      
      
    for (let token of text) {
        if (surnamesKa.has(token) || surnamesEn.has(token))
        {
            return token;
        }
    }

    return null;
      
}
module.exports = detectSurname;