




function gregYearCalendar()
{
	var yearGreg = Number(gregYear1000.value + gregYear100.value + gregYear10.value + gregYear1.value) ;
	var isBoth = isBothCalendar.checked ;

	str1 = str ;
	str1 += "<table width=1000 align=center><tr>\r\n" ;
	str1 += "<td class='year'>\r\n" + "السنة الميلادية" + spacer3 + yearGreg + "</td>\r\n" ;
	str1 += "</tr></table>\r\n" ;

	str1 += "<table lang=ar width=1000 align=center border=2px>\r\n" ;

	str1 += "<tr align=middle>\r\n" ;
	str1 += "<td>\r\n" + gregMonthCalendar(yearGreg,1,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + gregMonthCalendar(yearGreg,2,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + gregMonthCalendar(yearGreg,3,1,isBoth) + "</td>\r\n" ;
	str1 += "</tr>\r\n" ;

	str1 += "<tr align=middle>\r\n" ;
	str1 += "<td>\r\n" + gregMonthCalendar(yearGreg,4,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + gregMonthCalendar(yearGreg,5,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + gregMonthCalendar(yearGreg,6,1,isBoth) + "</td>\r\n" ;
	str1 += "</tr>\r\n" ;

	str1 += "<tr align=middle>\r\n" ;
	str1 += "<td>\r\n" + gregMonthCalendar(yearGreg,7,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + gregMonthCalendar(yearGreg,8,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + gregMonthCalendar(yearGreg,9,1,isBoth) + "</td>\r\n" ;
	str1 += "</tr>\r\n" ;

	str1 += "<tr align=middle>\r\n" ;
	str1 += "<td>\r\n" + gregMonthCalendar(yearGreg,10,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + gregMonthCalendar(yearGreg,11,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + gregMonthCalendar(yearGreg,12,1,isBoth) + "</td>\r\n" ;
	str1 += "</tr>\r\n" ;

	str1 += "</table></body></html>\r\n" ;

	showHTML( str1 , 'yearCalendar_tempfile.html' , false ) ;

	quickenDataSave();
}





function hijriYearCalendar()
{
	var yearHijri = Number(hijriYear1000.value + hijriYear100.value + hijriYear10.value + hijriYear1.value) ;
	var isBoth = isBothCalendar.checked ;

	str1 = str ;
	str1 += "<table width=1000 align=center><tr>\r\n" ;
	str1 += "<td class='year'>\r\n" + "السنة الهجرية" + spacer3 + yearHijri + "</td>\r\n" ;
	str1 += "</tr></table>\r\n" ;

	str1 += "<table lang=ar width=1000 align=center border=2px>\r\n" ;

	str1 += "<tr align=middle>\r\n" ;

	str1 += "<td>\r\n" + hijriMonthCalendar(yearHijri,1,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + hijriMonthCalendar(yearHijri,2,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + hijriMonthCalendar(yearHijri,3,1,isBoth) + "</td>\r\n" ;
	str1 += "</tr>\r\n" ;

	str1 += "<tr align=middle>\r\n" ;
	str1 += "<td>\r\n" + hijriMonthCalendar(yearHijri,4,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + hijriMonthCalendar(yearHijri,5,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + hijriMonthCalendar(yearHijri,6,1,isBoth) + "</td>\r\n" ;
	str1 += "</tr>\r\n" ;

	str1 += "<tr align=middle>\r\n" ;
	str1 += "<td>\r\n" + hijriMonthCalendar(yearHijri,7,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + hijriMonthCalendar(yearHijri,8,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + hijriMonthCalendar(yearHijri,9,1,isBoth) + "</td>\r\n" ;
	str1 += "</tr>\r\n" ;

	str1 += "<tr align=middle>\r\n" ;
	str1 += "<td>\r\n" + hijriMonthCalendar(yearHijri,10,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + hijriMonthCalendar(yearHijri,11,1,isBoth) + "</td>\r\n" ;
	str1 += "<td>\r\n" + hijriMonthCalendar(yearHijri,12,1,isBoth) + "</td>\r\n" ;
	str1 += "</tr>\r\n" ;

	str1 += "</table></body></html>\r\n" ;

	showHTML( str1 , 'yearCalendar_tempfile.html' , false ) ;

	quickenDataSave();
}





function gregMonthCalendar(year,month,day,isBoth)
{
	var z = "" ;
	var s = "" ;
	var dowFirst = 6 ;
	var dd=new Date() ;	dd.setFullYear(year, month-1, day) ;
	var hijri = gregToHijri(year,month,day) ;
	var d=new Date() ; d.setFullYear(year, month-1, day-hijri[3]+dowFirst) ;
	if ( d.getDate()<dd.getDate() || ( d.getMonth()==dd.getMonth() && d.getDate()>dd.getDate() ) ) d.setDate(d.getDate()-7);
	var firstHijriMonth = hijri[1] ;
	z += "<table width=100% border=2px><tr><td class='month'>\r\n<div class='monthL'>" ;
	z += "(" + month + ")" + spacer4 + monthNames[month-1] + spacer1 + year ;
	if (isBoth)
	{
		z += "</div>\r\n<div class='monthS'>" ;
		z += "(" + hijri[1] + ")" + spacer1 + hijriMonthNames[hijri[1]-1] + spacer1 + (hijri[0]>0?hijri[0]:'('+hijri[0]+')') ;
	}
	s += "<table width=80% border=2px><tr>\r\n" ;
	for(var x=0; x<7 ; x++)
	{
		s += "<td class='name" + ( x!=dowFirst ? "'>" : " we'>" ) ;
		s += calendarDOW[(x+dowFirst)%7] ;
		s += "</div></td>\r\n" ;
	}
	s += "</tr></table>\r\n" ;
	s += "<table width=80%>\r\n" ;
	hijri[2] = [ 29 ] ;
	for(var y=1; y<7 ; y++)
	{
		s += "<tr>\r\n" ;
		for(var x=0; x<7; x++)
		{
			if (hijri[2]>28) var hijri = gregToHijri(d.getFullYear(),d.getMonth()+1,d.getDate()) ;
			else { hijri[2]++ ; hijri[3]=(hijri[3]+1)%7 ; }
			s += "<td class='day" + ( x==dowFirst ? " we'>" : "'>" ) ;
			s+="<div class='dayL'>" ;
			if (d.getMonth()+1==month) { s+=d.getDate()+'</div>'; dd.setDate(dd.getDate()+1); }
			else s+=spacer1+'</div>';
			if (isBoth) s+="<div class='dayS'>" + ( d.getMonth()+1==month ? hijri[2]+'</div>' : '</div>' );
			s+="</td>\r\n" ;
			d.setDate(d.getDate()+1);
		}
		s+="</tr>\r\n";
	}
	s+="</table>\r\n";
	var hijri = gregToHijri(dd.getFullYear(),dd.getMonth()+1,dd.getDate()) ;
	if ( isBoth && firstHijriMonth!=hijri[1] )
	{
		z += spacer3 + "<+>" + spacer3 ;
		z += "(" + hijri[1] + ")" + spacer1 + hijriMonthNames[hijri[1]-1] + spacer1 + (hijri[0]>0?hijri[0]:'('+hijri[0]+')') ;
	}
	z += "</div>\r\n</tr></td></table>\r\n" ;
	return z+s;
};





function hijriMonthCalendar(year,month,day,isBoth)
{
	var z = "" ;
	var s = "" ;
	var dowFirst = 6 ;
	var dd0 = hijriToGreg(year,month,day) ;
	var dd = new Date() ; dd.setFullYear( dd0[0],dd0[1]-1, dd0[2]) ;
	var d=new Date() ; d.setFullYear( dd0[0],dd0[1]-1, dd0[2]-dd0[3]+dowFirst ) ;
	if ( d.getDate()<dd.getDate() || ( d.getMonth()==dd.getMonth() && d.getDate()>dd.getDate() ) ) d.setDate(d.getDate()-7);
	var firstGregMonth = dd.getMonth()+1 ;
	z += "<table width=100% border=2px><tr><td class='month'>\r\n<div class='monthL'>" ;
	z += "(" + month + ")" + spacer4 + hijriMonthNames[month-1] + spacer1 + (year>0?year:'('+year+')') ;
	if (isBoth)
	{
		z += "</div>\r\n<div class='monthS'>" ;
		z += "(" + (dd.getMonth()+1) + ")" + spacer1 + monthNames[dd.getMonth()] + spacer1 + dd.getFullYear() ;
	}
	s += "<table width=80% border=2px><tr>\r\n" ;
	for(var x=0; x<7 ; x++)
	{
		s += "<td class='name" + ( x!=dowFirst ? "'>" : " we'>" ) ;
		s += calendarDOW[(x+dowFirst)%7] ;
		s += "</div></td>\r\n" ;
	}
	s += "</tr></table>\r\n" ;
	s += "<table width=80%>\r\n" ;
	var hijri = [ year, month, 29 ] ;
	for(var y=1; y<7 ; y++)
	{
		s += "<tr>\r\n" ;
		for(var x=0; x<7; x++)
		{
			if (hijri[2]>28) var hijri = gregToHijri(d.getFullYear(),d.getMonth()+1,d.getDate()) ;
			else { hijri[2]++ ; hijri[3]=(hijri[3]+1)%7 ; }
			s += "<td class='day" + ( x==dowFirst ? " we'>" : "'>" ) ;
			s+="<div class='dayL'>" ;
			if (hijri[1]==month) { s+=hijri[2]+'</div>'; dd.setDate(dd.getDate()+1); }
			else s+=spacer1+'</div>';
			if (isBoth) s+="<div class='dayS'>" + ( hijri[1]==month ? d.getDate()+'</div>' : '</div>' );
			s+="</td>\r\n" ;
			d.setDate(d.getDate()+1);
		}
		s+="</tr>\r\n";
	}
	s+="</table>\r\n";
	if ( isBoth && firstGregMonth!=dd.getMonth()+1 )
	{
		z += spacer3 + "<+>" + spacer3 ; 
		z += "(" + (dd.getMonth()+1) + ")" + spacer1 + monthNames[dd.getMonth()] + spacer1 + dd.getFullYear() ;
	}
	z += "</div>\r\n</tr></td></table>\r\n" ;
	return z+s;
};






