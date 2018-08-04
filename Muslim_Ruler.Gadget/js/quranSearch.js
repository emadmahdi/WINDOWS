




var resultsAyya = [] ;
var resultsSura = [] ;

function quranSearch()
{
	resultsAyya = [] ;
	resultsSura = [] ;
	var resultsID = 0 ;
	for(var i=resultsList.options.length-1; i>=0; i--) resultsList.remove(i);
	document.getElementById('resultsText1').innerText = '' ;
	document.getElementById('resultsText2').value = '' ;
	var searchWords1 = document.getElementById('searchWords1').value ;
	var searchWords2 = document.getElementById('searchWords2').value ;
	var searchWords3 = document.getElementById('searchWords3').value ;
	var searchWords4 = document.getElementById('searchWords4').value ;
	var searchWords5 = document.getElementById('searchWords5').value ;
	var searchType = document.getElementById('searchType').value ;
	var searchSize = Number(document.getElementById('searchSize').value) ;
	var searchWords1 = arabicTextClean(searchWords1) ;
	var searchWords2 = arabicTextClean(searchWords2) ;
	var searchWords3 = arabicTextClean(searchWords3) ;
	var searchWords4 = arabicTextClean(searchWords4) ;
	var searchWords5 = arabicTextClean(searchWords5) ;
	if ( searchType=='Words' )
	{
		var searchWords1 = ' '+searchWords1+' ' ;
		var searchWords2 = ' '+searchWords2+' ' ;
		var searchWords3 = ' '+searchWords3+' ' ;
		var searchWords4 = ' '+searchWords4+' ' ;
		var searchWords5 = ' '+searchWords5+' ' ;
	}
	var searchWords1a = searchWords1 ;
	var searchWords2a = searchWords2 ;
	var searchWords3a = searchWords3 ;
	if (searchWords1==''||searchWords1=='  ') { var searchWords1 = ' ' ; var searchWords1a = '  ' ; }
	if (searchWords2==''||searchWords2=='  ') { var searchWords2 = ' ' ; var searchWords2a = '  ' ; }
	if (searchWords3==''||searchWords3=='  ') { var searchWords3 = ' ' ; var searchWords3a = '  ' ; }
	if (searchWords4=='') var searchWords4 = '  ' ;
	if (searchWords5=='') var searchWords5 = '  ' ;
	if ( searchWords1==' ' && searchWords2==' ' && searchWords3==' ' )
		document.getElementById('resultsText2').value = 'الرجاء إدخال الكلمات المطلوبة للبحث' ;
	else
	{
		for (var i=0; i<quranSize; i++ )
		{
			var text = ' ' + quranAyyaTextClean[i] + ' ' ;
			if ( text.match(searchWords1a)!=null || text.match(searchWords2a)!=null || text.match(searchWords3a)!=null )
				for ( var j=i+1; (j<i+searchSize && j<quranSize && quranSuraNumber[j]==quranSuraNumber[i]); j++ )
					text += quranAyyaTextClean[j] + ' ' ;
			if ( text.match(searchWords1)!=null && text.match(searchWords2)!=null && text.match(searchWords3)!=null && text.match(searchWords4)==null && text.match(searchWords5)==null)
			{
				resultsAyya[resultsID] = quranAyyaNumber[i] ;
				resultsSura[resultsID] = quranSuraNumber[i] ;
				var resultLine = quranSuraName[resultsSura[resultsID]] + '    -    ' ;
				if (resultsAyya[resultsID]==0) resultLine += ' ' ; else  resultLine += resultsAyya[resultsID] ;
				resultLine += '    -    ' + quranAyyaText[quranSuraPosition[resultsSura[resultsID]]+resultsAyya[resultsID]];
				resultsList.options[resultsID] = new Option(resultLine,resultsID) ;
				resultsID++ ;
			}
		}
		if ( resultsID==0 ) document.getElementById('resultsText1').innerText = "لا يوجد تطابق" ;
		else document.getElementById('resultsText1').innerText = "تم ايجاد " + resultsID + " تطابق";
	}
}





function updateResultsText()
{
	var resultsID = document.getElementById('resultsList').value ;
	var searchSize = Number(document.getElementById('searchSize').value) ;
	var suraID = Number(resultsSura[resultsID]) ; ;
	var ayyaID = Number(resultsAyya[resultsID]) ;
	var str = quranSuraName[suraID] + ' - ' ;
	if (ayyaID==0) str += ' ' ; else str += ayyaID ;
	document.getElementById('resultsText1').innerText = str ;
	var suraLength = quranSuraLength[suraID]+1 ;
	var lines = 0 ;
	var str1 = '' ;
	var str2 = '' ;
	if (ayyaID==1 && suraID!=1 && suraID!=9) var str1 = quranAyyaText[quranSuraPosition[suraID]] + ' () ' ;
	for ( var i=ayyaID; (i<ayyaID+searchSize+1 && ayyaID<suraLength); i++ )
	{
			str2 += quranAyyaText[quranSuraPosition[suraID]+i] ;
			if (ayyaID==0) str2 += ' () ' ; else  str2 += ' ('+i+') ' ;
			ayyaID += 1 ;
	}
	document.getElementById('resultsText2').value = '{' + str + '} :    ' + str1 + str2 ;
}









