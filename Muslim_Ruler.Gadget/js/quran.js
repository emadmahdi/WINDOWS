




function quranMouseOver()
{
	if (document.getElementById('quranText').style.color != 'blue') 
		{
			document.getElementById('quranText').style.color = 'blue' ;
			setTimeout("document.getElementById('quranText').style.color='green'",10*60*1000);
		}
	else
		document.getElementById('quranText').style.color = 'green' ;
}





function quran(action)
{
	var showQuran = (SettingsManager.getValue("Home", "showQuran")=='true') ;
	var quranColor = System.Gadget.document.getElementById('quranText').style.color ;
	if (action==1)
	{
		var showQuran = !showQuran;
		SettingsManager.setValue("Home", "showQuran", showQuran);
		System.Gadget.document.getElementById('quranText').style.color = 'green' ;
		SettingsManager.saveFile() ;
		SettingsManager.loadFile() ;
		adjustHeight();
		document.getElementById('showQuran').checked = showQuran ;
	}
	if (!showQuran) System.Gadget.document.getElementById('quranText').innerText ='' ;
	else if (quranColor!='blue' || action==2)
	{
		var ayyaSize = 999 ;
		while (ayyaSize>80)
		{
			var ayyaText = quranAyyaText[Math.floor(Math.random()*quranSize)] ;
			var ayyaSize = arabicTextClean(ayyaText).length ;
		}
		System.Gadget.document.getElementById('quranText').innerText = ayyaText ;
	}
}





var	quranSuraPosition = [] ;
var	quranSuraLength = [] ;
var	quranSuraNumber = [] ;
var	quranSuraName = [] ;
var	quranAyyaNumber = [] ;
var	quranAyyaText = [] ;
var	quranAyyaTextClean = [] ;

function readQuranAll(loadFlag)
{
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var f = fs.GetFile(installationPath() + "\\data\\quranAll.data");
	var ts = fs.OpenTextFile(f,1,true,-1); // 1 = ForReading
	var i = 0;
	var previous = 999 ;
	var suraNumber = 0 ;
	while (!ts.AtEndOfStream)
	{
		var dat = ts.ReadLine();
		var lin = dat.split("\t");
		var ayyaNumber = Number(lin[0]) ;
		if ( previous>ayyaNumber )
		{
			suraNumber++ ;
			quranSuraPosition[suraNumber] = i ;
		}
		var previous = ayyaNumber ;
		quranSuraLength[suraNumber] = ayyaNumber ;
		quranAyyaText[i] = lin[1] ;
		if (loadFlag>=1)
		{
			quranSuraNumber[i] = suraNumber ;
			quranAyyaNumber[i] = ayyaNumber ;
		}
		if (loadFlag==2) quranAyyaTextClean[i] = arabicTextClean(lin[1]) ;
    i++;
	}
	ts.Close();
	fs = null;
	return i ;
}





var quranSuraName = [
''					,
'الفاتحة'		,
'البقرة'		,
'آل عمران'	,
'النساء'		,
'المائدة'		,
'الأنعام'		,
'الأعراف'		,
'الأنفال'		,
'براءة'			,
'يونس'			,
'هود'				,
'يوسف'			,
'الرعد'			,
'إبراهيم'		,
'الحجر'			,
'النحل'			,
'الإسراء'		,
'الكهف'			,
'مريم'			,
'طه'				,
'الأنبياء'		,
'الحج'			,
'المؤمنون'	,
'النور'			,
'الفرقان'		,
'الشعراء'		,
'النمل'			,
'القصص'			,
'العنكبوت'	,
'الروم'			,
'لقمان'			,
'السجدة'		,
'الأحزاب'		,
'سبإ'				,
'فاطر'			,
'يس'				,
'الصافات'		,
'ص'					,
'الزمر'			,
'غافر'			,
'فصلت'			,
'الشورى'		,
'الزخرف'		,
'الدخان'		,
'الجاثية'		,
'الأحقاف'		,
'محمد'			,
'الفتح'			,
'الحجرات'		,
'ق'					,
'الذاريات'	,
'الطور'			,
'النجم'			,
'القمر'			,
'الرحمن'		,
'الواقعة'		,
'الحديد'		,
'المجادلة'	,
'الحشر'			,
'الممتحنة'	,
'الصف'			,
'الجمعة'		,
'المنافقون'	,
'التغابن'		,
'الطلاق'			,
'التحريم'		,
'الملك'			,
'القلم'			,
'الحاقة'		,
'المعارج'		,
'نوح'				,
'الجن'			,
'المزمل'		,
'المدثر'		,
'القيامة'		,
'الإنسان'		,
'المرسلات'		,
'النبأ'			,
'النازعات'	,
'عبس'				,
'التكوير'		,
'الانفطار'		,
'المططفين'	,
'الانشقاق'		,
'البروج'		,
'الطارق'		,
'الأعلى'			,
'الغاشية'		,
'الفجر'			,
'البلد'			,
'الشمس'			,
'الليل'			,
'الضحى'			,
'الشرح'			,
'التين'			,
'العلق'			,
'القدر'			,
'البينة'		,
'الزلزلة'		,
'العاديات'	,
'القارعة'		,
'التكاثر'		,
'العصر'			,
'الهمزة'		,
'الفيل'			,
'قريش'			,
'الماعون'		,
'الكوثر'		,
'الكافرون'	,
'النصر'			,
'المسد'			,
'الإخلاص'			,
'الفلق'			,
'الناس'			] ;





function readQuranSample()
{
quranAyyaText = 
["بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ,"
,"لِإِيلَافِ قُرَيْشٍ"
,"إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ"
,"فَلْيَعْبُدُوا رَبَّ هَذَا الْبَيْتِ"
,"الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ"
,"بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
,"أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ"
,"فَذَلِكَ الَّذِي يَدُعُّ الْيَتِيمَ"
,"وَلَا يَحُضُّ عَلَى طَعَامِ الْمِسْكِينِ"
,"فَوَيْلٌ لِلْمُصَلِّينَ"
,"الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ"
,"الَّذِينَ هُمْ يُرَاءُونَ"
,"وَيَمْنَعُونَ الْمَاعُونَ"
,"بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
,"إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ"
,"فَصَلِّ لِرَبِّكَ وَانْحَرْ"
,"إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ"
,"بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
,"قُلْ يَا أَيُّهَا الْكَافِرُونَ"
,"لَا أَعْبُدُ مَا تَعْبُدُونَ"
,"وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ"
,"وَلَا أَنَا عَابِدٌ مَا عَبَدْتُمْ"
,"وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ"
,"لَكُمْ دِينُكُمْ وَلِيَ دِينِ"
,"بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
,"إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ"
,"وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا"
,"فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا"
,"بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
,"تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ"
,"مَا أَغْنَى عَنْهُ مَالُهُ وَمَا كَسَبَ"
,"سَيَصْلَى نَارًا ذَاتَ لَهَبٍ"
,"وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ"
,"فِي جِيدِهَا حَبْلٌ مِنْ مَسَدٍ"
,"بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
,"قُلْ هُوَ اللَّهُ أَحَدٌ"
,"اللَّهُ الصَّمَدُ"
,"لَمْ يَلِدْ وَلَمْ يُولَدْ"
,"وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ"
,"بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
,"قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ"
,"مِنْ شَرِّ مَا خَلَقَ"
,"وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ"
,"وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ"
,"وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ"
,"بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
,"قُلْ أَعُوذُ بِرَبِّ النَّاسِ"
,"مَلِكِ النَّاسِ"
,"إِلَهِ النَّاسِ"
,"مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ"
,"الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ"
,"مِنَ الْجِنَّةِ وَالنَّاسِ"
]
return quranAyyaText.length ;
}





