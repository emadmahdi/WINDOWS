




function updateAyyaList()
{
	var suraID = document.getElementById('quranSura').value ;
	var suraLength = quranSuraLength[suraID] ;
	for(var i=quranAyya.options.length-1; i>=0; i--) quranAyya.remove(i);
	for (var i=1; i<=suraLength; i++) quranAyya.options[i-1] = new Option(i,i) ;
	document.getElementById('quranAyya').value = 1 ;
	updateQuranText();
}





function updateQuranText()
{
	var suraID = document.getElementById('quranSura').value ;
	var ayyaID = Number(document.getElementById('quranAyya').value) ;
	var suraLength = quranSuraLength[suraID]+1 ;
	var str = '' ;
	var lines = 0 ;
	str += '<br><div align="center" style="font-size:30pt">' + 'سورة' + spacer2 + quranSuraName[suraID] + '</div>' ;
	str += '<textarea lang=ar readonly style="height:500px;width:100%;font-weight:bold;font-family:Traditional Arabic;background-color:#f7f7f7;font-size:26pt;margin-right:10px;margin-top:10px;line-height:46pt;color:black">' ;
	var str1 = '' ;
	var ayyaText = '' ;
	while ( lines<=9 && ayyaID<suraLength )
	{
			if (ayyaID==1 && suraID!=1 && suraID!=9) var ayyaText = quranAyyaText[quranSuraPosition[suraID]+0] + ' () ' + quranAyyaText[quranSuraPosition[suraID]+ayyaID] ;
			else var ayyaText = quranAyyaText[quranSuraPosition[suraID]+ayyaID] ;
			if (lines<=9) str1 += ayyaText ;
			lines = Math.ceil(str1.length/85) ;
			str1 += ' ('+ayyaID+') ' ;
			ayyaID += 1 ;
	}
	str += str1 + '</textarea>' ;
	document.getElementById('textArea3').innerHTML = str ;
}





