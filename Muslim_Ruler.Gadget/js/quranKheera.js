




function kheeraRandom()
{
	document.getElementById('kheeraPage').innerText = quranPage[Math.floor(Math.random()*countAyaat)] ;
}





function kheeraShow()
{
	var g_text = '' ;
	var pageIndex=-99;
	var kheeraPage = Number(document.getElementById('kheeraPage').innerText) ;
	for (i=0; i<countAyaat; i++) if (kheeraPage==quranPage[i]) pageIndex=i;
	g_text += '<font color="#A40FA0">' ;
	if (pageIndex!=-99)
	{
		g_text += '<font color="#0000FF"><br><h1>' + 'أعوذ بالله من الشيطان الرجيم' ;
		g_text += '<br>' + 'بسم الله الرحمن الرحيم' ;
		var quranAyyaText1 = quranAyya1[pageIndex]  ;
		var ayyaWords = quranAyyaText1.split(" ") ;
		var ayaaLength = ayyaWords.length ;
		var quranAyyaText1 = '' ;
		var flag = 0 ;
		for(i=0; i<ayaaLength; i++)
		{
			//if ( ayyaWords[i].substr(0,1) == '[' ) { quranAyyaText1 += '<br>' ; flag=1 ; }
			if ( quranAyyaText1.length > 120 && flag==0 ) { quranAyyaText1 += '<br>' ; flag=1 ; }
			quranAyyaText1 += ayyaWords[i] + ' ' ;
		}
		g_text += '</font></h1><br><hr><br><br><h2>' + quranAyyaText1 + '<br><br>' + quranAyya2[pageIndex] + '</h2><br>' ;
		g_text += '<hr><br><br><h1>' + quranKheera1[pageIndex] + '<br><br><hr><br>' + quranKheera2[pageIndex] + '</h1>' ;
	}
	else
		g_text += '<br><br><br><br><br><h2>آسف لم تختار أي صفحة من القرآن أو هذه الصفحة غير موجودة في قاعدة بيانات البرنامج الرجاء إعادة المحاولة</h2>' ;
	g_text += '</font>' ;
	document.body.style.height = 580 + 20*flag ;
	document.getElementById('textArea').innerHTML = g_text ;
}





var quranPage = [];
var quranAyya1 = [];
var quranAyya2 = [];
var quranKheera1 = [];
var quranKheera2 = [];

function readQuranKheera()
{
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var dat = new Array();
	var f = fs.GetFile(installationPath() + "\\data\\quranKheera.data");
	var ts = fs.OpenTextFile(f,1,true,-1); // 1 = ForReading
	//dat = ts.ReadAll;
	var i = 0;
	while (!ts.AtEndOfStream)
	{
		dat[i] = ts.ReadLine();
		i++;
	}
	ts.Close();
	if (dat.length > 0)
	{
		for (var i=0; i< dat.length; i++)
		{
			var lin = dat[i].split("\t");
			quranPage[i] = lin[0] ;
			var quranAyya = lin[1].split("[");
			quranAyya1[i] = quranAyya[0];
			quranAyya2[i] = "[" + quranAyya[1];
			//quranKheera[i] = lin[2] + "\t" + lin[3];
			quranKheera1[i] = lin[2] ;
			quranKheera2[i] = lin[3] ;
		}
	}
	fs = null;
	return dat.length
}





function readQuranKheeraSample()
{
var dat = [ 
"12	بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ (+) الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ [الفاتحة : 1]	فيه الإعانة من الله والخير والبركة	جيدة إن شاء الله",
"14	أُولَئِكَ عَلَى هُدًى مِنْ رَبِّهِمْ وَأُولَئِكَ هُمُ الْمُفْلِحُونَ [البقرة : 5]	اعمل عملك فإنه محمود وممدوح	جيدة إن شاء الله",
"16	فَإِنْ لَمْ تَفْعَلُوا وَلَنْ تَفْعَلُوا فَاتَّقُوا النَّارَ الَّتِي وَقُودُهَا النَّاسُ وَالْحِجَارَةُ أُعِدَّتْ لِلْكَافِرِينَ [البقرة : 24]	اتركه ففيه سيئة	نهي",
"18	قُلْنَا اهْبِطُوا مِنْهَا جَمِيعًا فَإِمَّا يَأْتِيَنَّكُمْ مِنِّي هُدًى فَمَنْ تَبِعَ هُدَايَ فَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ [البقرة : 38]	هذا العمل فيه مصالح خفية إلا أنه يورث التعب بعد الراحة	جيدة إن شاء الله",
"20	وَإِذْ قُلْنَا ادْخُلُوا هَذِهِ الْقَرْيَةَ فَكُلُوا مِنْهَا حَيْثُ شِئْتُمْ رَغَدًا وَادْخُلُوا الْبَابَ سُجَّدًا وَقُولُوا حِطَّةٌ نَغْفِرْ لَكُمْ خَطَايَاكُمْ وَسَنَزِيدُ الْمُحْسِنِينَ [البقرة : 58]	يدرك عكس المطلب المقصود ومع ذلك فالعمل أولى من الترك	جيدة إن شاء الله",
"22	قَالُوا ادْعُ لَنَا رَبَّكَ يُبَيِّنْ لَنَا مَا لَوْنُهَا قَالَ إِنَّهُ يَقُولُ إِنَّهَا بَقَرَةٌ صَفْرَاءُ فَاقِعٌ لَوْنُهَا تَسُرُّ النَّاظِرِينَ [البقرة : 69]	يدرك المطلب المقصود ولكن لا يكتفى به بل يريد الزيادة	جيدة إن شاء الله",
"24	وَإِذْ أَخَذْنَا مِيثَاقَكُمْ لَا تَسْفِكُونَ دِمَاءَكُمْ وَلَا تُخْرِجُونَ أَنْفُسَكُمْ مِنْ دِيَارِكُمْ ثُمَّ أَقْرَرْتُمْ وَأَنْتُمْ تَشْهَدُونَ [البقرة : 84]	تحصيل عكس المطلوب	جيدة إن شاء الله",
"26	قُلْ إِنْ كَانَتْ لَكُمُ الدَّارُ الْآخِرَةُ عِنْدَ اللَّهِ خَالِصَةً مِنْ دُونِ النَّاسِ فَتَمَنَّوُا الْمَوْتَ إِنْ كُنْتُمْ صَادِقِينَ [البقرة : 94]	ولكن المطلب المقصود لا يدرك	جيدة إن شاء الله",
"28	مَا نَنْسَخْ مِنْ آيَةٍ أَوْ نُنْسِهَا نَأْتِ بِخَيْرٍ مِنْهَا أَوْ مِثْلِهَا أَلَمْ تَعْلَمْ أَنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ [البقرة : 106]	اتركه واقصد غيره فإنه خير منه أو مثله ولكن يقصد غيره	جيدة إن شاء الله",
"30	وَلَنْ تَرْضَى عَنْكَ الْيَهُودُ وَلَا النَّصَارَى حَتَّى تَتَّبِعَ مِلَّتَهُمْ قُلْ إِنَّ هُدَى اللَّهِ هُوَ الْهُدَى وَلَئِنِ اتَّبَعْتَ أَهْوَاءَهُمْ بَعْدَ الَّذِي جَاءَكَ مِنَ الْعِلْمِ مَا لَكَ مِنَ اللَّهِ مِنْ وَلِيٍّ وَلَا نَصِيرٍ [البقرة : 120]	لا يصلح الإقدام على هذا العمل	نهي"
]

for (var i=0; i< dat.length; i++)
{
	var lin = dat[i].split("\t");
	quranPage[i] = lin[0] ;
	var quranAyya = lin[1].split("[");
	quranAyya1[i] = quranAyya[0];
	quranAyya2[i] = "[" + quranAyya[1];
	quranKheera1[i] = lin[2] ;
	quranKheera2[i] = lin[3] ;
}
return dat.length ;
}



