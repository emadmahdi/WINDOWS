




function hijriMonthOccasions()
{
	var str = '' ;
	str += '<br><div align="center" style="font-size:30pt">' + 'مناسبات شهر' + spacer2 ;
	str += hijriMonthNames[hijriMonth-1] + spacer2 + hijriYear + '</div>' ;
	str += '<hr><br><table>' ;
	var dateGreg = hijriToGreg(hijriYear, hijriMonth, 1) ;
	var dayName = dateGreg[3] ;
	for (var i=1; i<31; i++)
	{
		if ( dateGreg[2]>28 )
		{
			var dateGreg = hijriToGreg(hijriYear, hijriMonth, i) ;
			var dayName = dateGreg[3] ;
		}
		var occasion = hijriOccasion(i, hijriMonth) ;
		if (occasion!='')
		{
			var dayGreg = dateGreg[2] ;
			var monthGreg = dateGreg[1] ;
		  var dayName = dayName % 7 ;
			str += '<tr>' ;
			str += '<td align="center" style="width:60;font-weight:bold">' + daysNames[dayName] + '</td>' ;
			str += '<td align="center" style="width:85;font-weight:bold">' + i + spacer1 + hijriMonthNames[hijriMonth-1] + '</td>' ;
			str += '<td align="center" style="width:110;font-weight:bold">' + dayGreg + spacer1 + monthNames[monthGreg-1] + '</td>' ;
			str += '<td style="font-weight:bold">' + occasion + '</td>' ;
			str += '</tr>' ;
		}
		dateGreg[2]++ ;
		dayName++ ;
	}
	str += '</table>' ;
	document.getElementById('textArea3').innerHTML = str ;
	quickenDataSave();
}




