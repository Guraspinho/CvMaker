// address

function detectLocation(text) 
{
	let temp = '';
	const citiesEn =
	[ 
		"tbilisi", "batumi", "kutaisi", "rustavi", "gori", "zugdidi", "poti", "kobuleti",
		"khashuri", "samtredia", "senaki", "zestafoni", "marneuli", "telavi", "akhalkalaki",
		"ozurgeti", "kaspi", "chiatura", "tskaltubo", "sagarejo", "gardabani", "tkibuli", "khoni",
		"bolnisi", "akhalkalaki", "gurjaani", "mtskheta", "kvareli", "akhmeta", "kareli", "lanchkhuti",
		"tsalenjikha", "dusheti", "sachkhere", "dedoplistsqaro", "lagodekhi", "ninotsminda", "abasha",
		"tsnori", "terjola", "martvili", "jvari", "khobi", "vani", "baghdati", "vale", "tetritsqaro",
		"tsalka", "dmanisi", "oni", "ambrolauri", "sighnaghi", "tsageri"
	];

	const citiesKa =
	[
		"თბილისი","ბათუმი","ქუთაისი","რუსთავი","გორი","ზუგდიდი","ფოთი",
		"ქობულეთი","ხაშური","სამტრედია","სენაკი","ზესტაფონი","მარნეული","თელავი","ახალციხე","ოზურგეთი",
		"კასპი","ჭიათურა","წყალტუბო","საგარეჯო","გარდაბანი","ბორჯომი","ტყიბული","ხონი","ბოლნისი","ახალქალაქი",
		"გურჯაანი","მცხეთა","ყვარელი","ახმეტა","ქარელი","ლანჩხუთი","წალენჯიხა","დუშეთი","საჩხერე",
		"დედოფლისწყარო","ლაგოდეხი","ნინოწმინდა","აბაშა","წნორი","თერჯოლა","მარტვილი","ჯვარი","ხობი","ვანი",
		"ბაღდათი","ვალე","თეთრი წყარო","წალკა","დმანისი","ონი","ამბროლაური"
	];

	for (let token of text)
	{
		for (let city of citiesEn) {
			if (token === city) {
				temp = city;
				break;
			}
		}
		if (temp !== '') {
			break;
		}
	}

	if (temp !== '')
	{
		temp = temp[0].toUpperCase() + temp.slice(1);
		return temp;
	}

	for (let token of text)
	{
		for (let city of citiesKa)
		{
			if (token === city)
			{
				temp = city;
				break;
			}
		}
		if (temp !== '')
		{
			break;
		}
	}

	if (temp !== '')
	{
		temp = temp[0].toUpperCase() + temp.slice(1);
		return temp;
	}
	else
	{
		return temp;
	}
	
	
}

module.exports = detectLocation;