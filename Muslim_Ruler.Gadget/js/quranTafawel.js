




function kheeraRandom()
{
	rand = Math.floor(Math.random()*quranSize) ;
	if (quranAyyaNumber[rand]==0) kheeraRandom() ;
	document.getElementById('kheeraPage').innerHTML = spacer2+quranSuraName[quranSuraNumber[rand]]+spacer2+quranAyyaNumber[rand] ;
}





function tafawelShow(methodKheera)
{
		var linesToAdd = 0 ;
		var ayyaText = '' ;
		var g_text = '' ;
		g_text += '<font color="#A40FA0">' ;
		g_text += '<font color="#0000FF"><br><h1>' + 'أعوذ بالله من الشيطان الرجيم' ;
		g_text += '<br>' + 'بسم الله الرحمن الرحيم' + '</font></h1><br><hr><br><br><h2>' ;
		g_text += '<font color="#0000FF">' ;
		g_text += '<u>' + ':طريقة التفاؤل بالآية' + '</u><br></font>' ;
		var quranLetter = quranAyyaText[rand].substr(0,1) ;
		for (i=0; i<countTafawel; i++) if (quranLetter==tafawelLetter[i]) var letterIndex=i;
		var ayyaWords = quranAyyaText[rand].split(" ") ;
		var ayaaLength = ayyaWords.length ;
		for(i=0; i<ayaaLength; i++)
		{
			if ( ayyaText.length>120 && linesToAdd==0 ) { ayyaText += '<br>' ; linesToAdd=1 ; }
			if ( ayyaText.length>240 && linesToAdd==1 ) { ayyaText += '<br>' ; linesToAdd=2 ; }
			if ( ayyaText.length>360 && linesToAdd==2 ) { ayyaText += '<br>' ; linesToAdd=3 ; }
			if ( ayyaText.length>480 && linesToAdd==3 ) { ayyaText += '<br>' ; linesToAdd=4 ; }
			ayyaText += ayyaWords[i] + ' ' ;
		}
		g_text += '<br>' + ayyaText + '<br><br>[ ' + quranSuraName[quranSuraNumber[rand]] + ' - ' + quranAyyaNumber[rand] + ' ]</h2><br>' ;
		g_text += '<font color="#0000FF">' ;
		g_text += '<hr><br><br><h2><u>' + ':طريقة التفاؤل بالحرف' + '</u><br></font>' ;
		g_text += '</u><br><br>' + quranLetter + '<br><br>' + tafawelKheera[letterIndex] + '</h2>' ;
	g_text += '</font>' ;
	document.body.style.height = 600 + 22*linesToAdd ;
	if (1==2) document.body.style.height = 380 + 22*linesToAdd ;
	document.getElementById('textArea').innerHTML = g_text ;
}





function readTafawel()
{
	var countTafawel = 30 ;
	tafawelLetter = [] ;
	tafawelKheera = [] ;
	Tafawel = 
	[
		"أ"	,	"خير وسعادة وسرور وتوفيق" ,
		"ا"	,	"خير وسعادة وسرور وتوفيق" ,
		"إ"	,	"خير وسعادة وسرور وتوفيق" ,
		"ب"	,	"يرى منافع كثيرة ويأمن ممن يخاف" ,
		"ت"	,	"انه كان في معصية ويتوب عنها" ,
		"ث"	,	"يرزق خير الدنيا والآخرة" ,
		"ج"	,	"يجد منافع كثيرة فيما عزم عليه" ,
		"ح"	,	"يرزق حلالاً طيباً من حيثُ لا يحتسب" ,
		"خ"	,	"لا تمضي فان الأمر غير صالح" ,
		"د"	,	"يحصل على مراده وينال السعادة" ,
		"ذ"	,	"يقهر أعداءه" ,
		"ر"	,	"ينصر على قومه" ,
		"ز"	,	"يقع في خصومة وخطر فليتصدق" ,
		"س"	,	"يرزق السعادة والخير" ,
		"ش"	,	"يخاف عليه من الأعداء" ,
		"ص"	,	"يقع في أمر عظيم فليتصدق" ,
		"ض"	,	"يكون ذا مال وفير" ,
		"ط"	,	"يرى التوفيق في الدنيا والآخرة" ,
		"ظ"	,	"يظهر في الأمر ما كان خفيا" ,
		"ع"	,	"يعان على أمره ويوفق" ,
		"غ"	,	"يقع في أمر شديد فليتصدق" ,
		"ف"	,	"يجمع الله شمله بعد الفراق" ,
		"ق"	,	"يكون سعيدا ومقبولاً بين العباد" ,
		"ك"	,	"يقع في خصومة فليتصدق" ,
		"ل"	,	"يتيسر أمره ويقهر أعداؤه" ,
		"م"	,	"يحذر لئلا يقع في الندامة" ,
		"ن"	,	"يكون ذا جاه وقبول" ,
		"ه"	,	"يتوقف أمره قليلاً وتكون عاقبته خيراً" ,
		"و"	,	"يرزق مالاً ولا يحتاج لأحد" ,
		"ي"	,	"يجد بشارة فيها خير"
	]

	for (var i=0; i< countTafawel; i++)
	{
		tafawelLetter[i] = Tafawel[2*i+0] ;
		tafawelKheera[i] = Tafawel[2*i+1] ;
	}
	return countTafawel ;
}







