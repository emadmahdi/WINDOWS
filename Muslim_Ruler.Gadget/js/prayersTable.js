




function getGregTable()
{
	var yearGreg = Number(gregYear1000.value + gregYear100.value + gregYear10.value + gregYear1.value) ;
	var monthGreg = Number(gregMonth.value) ;
	var dayGreg = Number(gregDay.value) ;
	makeTableMonthly(yearGreg, monthGreg, dayGreg);
	quickenDataSave();
}





function getHijriTable()
{
	var yearHijri = Number(hijriYear1000.value + hijriYear100.value + hijriYear10.value + hijriYear1.value) ;
	var monthHijri = Number(hijriMonth.value) ;
	var dayHijri = Number(hijriDay.value) ;
	var gregDate = hijriToGreg(yearHijri, monthHijri, dayHijri) ;
	makeTableMonthly(gregDate[0],gregDate[1],gregDate[2]);
	quickenDataSave();
}





function makeTableMonthly(year,month,day)
{
	var count = Number(countDays100.value + countDays10.value + countDays1.value) ;
	var isShowHijri = outHijri.checked ;
	var isShowGreg = outGreg.checked ;
	var isShowDay = outDay.checked ;

	var output = [];
	var ii = 0;
  if (outImsak.checked) { output[ii] = '8'; ii++; };
  if (outFajr.checked) { output[ii] = '0'; ii++; };
  if (outSunrise.checked) { output[ii] = '1'; ii++; };
  if (outDhuhr.checked) { output[ii] = '2'; ii++; };
  if (outAsr.checked) { output[ii] = '3'; ii++; };
  if (outSunset.checked) { output[ii] = '4'; ii++; };
  if (outMaghrib.checked) { output[ii] = '5'; ii++; };
  if (outIsha.checked) { output[ii] = '6'; ii++; };
  if (outMidnight.checked) { output[ii] = '7'; ii++; };

	var monthFormat = document.getElementById('monthFormat').value ;
	var timeFormat = document.getElementById('timeFormat').value ;
	var timeLanguage = document.getElementById('timeLanguage').value ;
	var lat = SettingsManager.getValue("Home", "lat");
	var lng = SettingsManager.getValue("Home", "lng");
	var timeZone  = SettingsManager.getValue("Home", "tzone");

	var sealevel = (SettingsManager.getValue("Home", "sealevel") == 'true');
	if (sealevel) var elevation = 0 ;
	else var elevation = Number(SettingsManager.getValue("Home", "elevation")) ;

	var city = SettingsManager.getValue("Home", "city");

	adjustCalc();
	selectMonthNames(monthFormat);

	var str3 = "";
	str3 += "<html><head><meta http-equiv=\"Content-Type\" content=\"text\/html\" charset=\"windows-1256\"><style>\r\n" ;
	str3 += "div.title	{font-size:30pt;text-align:center;color:blue;font:bold;}\r\n" ;
	str3 += "tr.head		{font-size:15pt;font:bold;height:50px;text-align:center;valign:middle;background:lightgray;color:blue}\r\n" ;
	str3 += "tr.data		{font-size:13pt;text-align:center;color:black;font:bold}\r\n" ;
	str3 += "td.date		{background:lightgray;color:black}\r\n" ;
	str3 += "</style></head><body dir=rtl lang='"+timeLanguage+"'>\r\n" ;

	str3 += '<br><div class="title"><u>' + 'جدول مواقيت الصلاة' + '</u><br>\r\n' + city + '\r\n<br>\r\n</div>\r\n';

	var startDate = new Date() ; startDate.setFullYear(year, month-1, day);
	var endDate = dateAddJD(startDate,count) ;

	var str2 = '<table align=center border=2px cellPadding=8px>\r\n' ;
	str2 += '<tr class="head">' ;
	if (isShowDay) str2 += '<td>' + 'اليوم' + '</td>' ;
	if (isShowGreg) str2 += '<td>' + 'الميلادي' + '</td>' ;
	if (isShowHijri) str2 += '<td>' + 'الهجري' + '</td>' ;
	for (var i in output) str2 += '<td>' + prayersNamesAR[output[i]] + '</td>' ;
	str2 += '</tr>\r\n' ;

	var hijri = gregToHijri(year,month,day) ;
	while (startDate < endDate)
	{
		var times = prayers(startDate, lat, lng, timeZone, timeFormat, elevation);
		str2 += '<tr class="data">' ;
		if (isShowDay) str2 += '<td class="date">' + daysNames[hijri[3]] + '</td>' ;
		if (isShowGreg) str2 += '<td class="date">' + startDate.getDate() + '-' + monthNames[startDate.getMonth()] + '-' + startDate.getFullYear() + '</td>' ;
		if (isShowHijri) str2 += '<td class="date">' + hijri[2] + '-' + hijriMonthNames[hijri[1]-1] + '-' + (hijri[0]>0?hijri[0]:'('+hijri[0]+')') + '</td>' ;
		for (var i in output) str2 += '<td>' + times[output[i]] + '</td>' ;
		str2 += '</tr>\r\n' ;
		startDate.setDate(startDate.getDate()+1);
		if (hijri[2]>28) var hijri = gregToHijri(startDate.getFullYear(),startDate.getMonth()+1,startDate.getDate()) ;
		else { hijri[2]++ ; hijri[3]=(hijri[3]+1)%7 ; }
	}
	str2 += '</table>\r\n' ;
	str2 += '</body></html>\r\n' ;

	showHTML( str3 + str2 , 'prayerTable_tempfile.html' , false ) ;

	quickenDataSave();
}




