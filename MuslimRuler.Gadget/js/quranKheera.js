




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







