




var resultsHadeth = [] ;

function ahadethSearch()
{
	resultsHadeth = [] ;
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
		for (var i=0; i<ahadethSize; i++ )
		{
			var text = ' ' + hadethTextClean[i] + ' ' ;
			if ( text.match(searchWords1)!=null && text.match(searchWords2)!=null && text.match(searchWords3)!=null && text.match(searchWords4)==null && text.match(searchWords5)==null)
			{
				resultsHadeth[resultsID] = i ;
				resultLine = hadethText[i] ;
				resultsList.options[resultsID] = new Option('- '+resultLine,resultsID) ;
				resultsID++ ;
			}
		}
		if ( resultsID==0 ) document.getElementById('resultsText1').innerText = "لا يوجد تطابق" ;
		else document.getElementById('resultsText1').innerText = "تم ايجاد " + resultsID + " تطابق";
	}
	document.getElementById('sectionsList').value = '' ;
	document.getElementById('chaptersList').value = '' ;
	document.getElementById('booksList').value = '' ;
}





function updateResultsText()
{
	var resultsID = document.getElementById('resultsList').value ;
	var hadethID = Number(resultsHadeth[resultsID]) ;
	document.getElementById('resultsText2').value = hadethText[hadethID] ;
	document.getElementById('resultsText1').innerText = ahadethBooks[hadethBook[hadethID]] + ' - ' + ahadethChapters[hadethChapter[hadethID]] + ' - ' + ahadethSections[hadethSection[hadethID]] ;
}





function updateAhadethBooksList()
{
	var booksCount = ahadethBooks.length ;
	for (var i=0; i<booksCount; i++) booksList.options[i] = new Option(ahadethBooks[i],i) ;
}





function updateAhadethChaptersList(clearFlag)
{
	if(clearFlag==1) for(var i=resultsList.options.length-1; i>=0; i--) resultsList.remove(i);
	document.getElementById('resultsText1').innerText = '' ;
	document.getElementById('resultsText2').value = '' ;
	for(var i=chaptersList.options.length-1; i>=0; i--) chaptersList.remove(i);
	for(var i=sectionsList.options.length-1; i>=0; i--) sectionsList.remove(i);
	var d = new ActiveXObject("Scripting.Dictionary");
	var listID = 0 ;
	var bookID = booksList.value ;
	for (var i=0; i<ahadethSize; i++ )
		if ( hadethBook[i]==bookID )
		{
			var chapter = ahadethChapters[hadethChapter[i]] ;
			if (!d.Exists(chapter) && chapter.length >0)
			{
				d.Add(chapter,chapter);
				chaptersList.options[listID] = new Option(chapter,hadethChapter[i]) ;
				listID++ ;
			}
		}
	if (listID==1)
	{
		chaptersList.value = chaptersList.options[0].value ;
		updateAhadethSectionsList(1) ;
	}
}





function updateAhadethSectionsList(clearFlag)
{
	if(clearFlag==1) for(var i=resultsList.options.length-1; i>=0; i--) resultsList.remove(i);
	document.getElementById('resultsText1').innerText = '' ;
	document.getElementById('resultsText2').value = '' ;
	var d = new ActiveXObject("Scripting.Dictionary");
	var listID = 0 ;
	var chapterID = chaptersList.value ;
	for(var i=sectionsList.options.length-1; i>=0; i--) sectionsList.remove(i);
	for (var i=0; i<ahadethSize; i++ )
		if ( hadethChapter[i]==chapterID )
		{
			var section = ahadethSections[hadethSection[i]] ;
			if (!d.Exists(section) && section.length >0)
			{
				d.Add(section,section);
				sectionsList.options[listID] = new Option(section,hadethSection[i]) ;
				listID++ ;
			}
		}
	if (listID==1)
	{
		sectionsList.value = sectionsList.options[0].value ;
		updateAhadethList() ;
	}
}





function updateAhadethList()
{
	resultsHadeth = [] ;
	var resultsID = 0 ;
	var listID = 0 ;
	for(var i=resultsList.options.length-1; i>=0; i--) resultsList.remove(i);
	document.getElementById('resultsText2').value = '' ;
	var chapterID = document.getElementById('chaptersList').value ;
	var sectionID = document.getElementById('sectionsList').value ;
	for (var i=0; i<ahadethSize; i++ )
		if ( hadethSection[i]==sectionID )
		{
			resultsList.options[listID] = new Option('- '+hadethText[i],listID) ;
			resultsHadeth[listID] = i ;
			listID++ ;
		}
	document.getElementById('resultsText1').innerText = "تم ايجاد " + listID + " تطابق";
}









