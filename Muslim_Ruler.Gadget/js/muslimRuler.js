




function adjustHeight()
{
	var showAhadeth = (SettingsManager.getValue("Home", "showAhadeth")=='true') ;
	if (showAhadeth) var ahadethHeight = 120 ; else var ahadethHeight = 0 ;
	System.Gadget.document.getElementById('ahadethText').style.height = ahadethHeight ;

	var showQuran = (SettingsManager.getValue("Home", "showQuran")=='true') ;
	if (showQuran) var quranHeight = 120 ; else var quranHeight = 0 ;
	System.Gadget.document.getElementById('quranText').style.height = quranHeight ;

	var showTimes = (SettingsManager.getValue("Home", "showTimes")=='true') ;
	if (showTimes) var timesHeight = 25 + 20 * setOutput().length ; else var timesHeight = 0 ;
	System.Gadget.document.body.style.height = 105 + timesHeight + ahadethHeight + quranHeight ;
}





function hideFlyout()
{
	quickenDataLoad();
	settingsChanged = (SettingsManager.getValue("Home", "settingsChanged") == 'true');
	if (settingsChanged)
	{
		SettingsManager.setValue("Home", "settingsChanged", false);
		selectMonthNames();
		adjustHeight();
		adjustCalc();
		makeTable();
		updateDates(1);
	}
}





function mainLoop()
{
	var today = new Date();
	var strToday1 = daysNames[today.getDay()] ;
	var strToday2 = System.Gadget.document.getElementById('dayName').innerText ;
	if ( strToday1 != strToday2 ) { updateDates(1); 	quickenDataSave(); quickenDataLoad(); }
	var repeateRateMinutes = Number(SettingsManager.getValue("Home", "repeateRate"));
	var prayersTimes = makeTable();
	azanPrayers(prayersTimes);
	if ( (today.getMinutes()%repeateRateMinutes)==0 )
	{
		if ( quranSize<100 ) quranSize=readQuranAll(0);
		if ( ahadethSize<100 ) ahadethSize=readAhadeth(0);
		quran(0);
		ahadeth(0);
	}
	setTimeout("mainLoop()",60000-1000*today.getSeconds());
}





function toggleTimes()
{
	var showTimes = (SettingsManager.getValue("Home", "showTimes")=='true') ;
	showTimes = !showTimes ;
	SettingsManager.setValue("Home", "showTimes", showTimes);
	SettingsManager.saveFile();
	SettingsManager.loadFile();
	adjustHeight();
	makeTable();
	document.getElementById('showTimes').checked = showTimes ;
}





function makeTable()
{
	var showTimes = (SettingsManager.getValue("Home", "showTimes")=='true');
	if (showTimes)
	{
		var today = new Date();
		var tomorrow = new Date();
		var yesterday = new Date();
		tomorrow.setDate(today.getDate()+1);
		yesterday.setDate(today.getDate()-1);
		var lat = SettingsManager.getValue("Home", "lat");
		var lng = SettingsManager.getValue("Home", "lng");
		var tz  = SettingsManager.getValue("Home", "tzone");

		var sealevel = (SettingsManager.getValue("Home", "sealevel") == 'true');
		if (sealevel) var elevation = 0 ;
		else var elevation = Number(SettingsManager.getValue("Home", "elevation")) ;

		var timeFormat = SettingsManager.getValue("Home", "timeFormat");
		var times3 = prayers(today, lat, lng, tz, "FloatMinutes", elevation);
	 	var output = setOutput();
		var lastTableItem = output.length-1 ;
		var lastItem = output[lastTableItem];
		var startNextDay = -999 ;
		var lastItemHours = 0 ;
		var lastItemMinutes = 0 ;
		var imsakTime = times3[8];
		var lastItemTime = times3[lastItem];
		if (lastItemTime<imsakTime)
		{
			var currentPrayTime = times3[8];
			for (var i=0; i<=lastItem; i++)
			{
				var previousPrayTime = currentPrayTime;
				var currentPrayTime = times3[i];
				if (currentPrayTime<previousPrayTime)
				{
					var startNextDay = i ;
					var lastItemHours = Math.floor(lastItemTime) ;
					var lastItemMinutes = Math.floor((lastItemTime-lastItemHours)*60) ;
					today.setHours(today.getHours()-lastItemHours,today.getMinutes()-lastItemMinutes,today.getSeconds());
					tomorrow.setHours(tomorrow.getHours()-lastItemHours,tomorrow.getMinutes()-lastItemMinutes,tomorrow.getSeconds());
					i = 999 ;
				}
			}
		}
		var times2 = prayers(today, lat, lng, tz, "FloatMinutes", elevation);
		if (startNextDay>=0) for (var ii=startNextDay; ii<=lastItem; ii++) times2[ii] += 24 ;
		var nowTime = today.getHours() + today.getMinutes()/60 + lastItemHours + lastItemMinutes/60 + 5/3600 ;
		var timeLanguage = SettingsManager.getValue("Home", "timeLanguage");
		var times = prayers(today, lat, lng, tz, timeFormat, elevation);
		var times1 = prayers(tomorrow, lat, lng, tz, timeFormat, elevation);
		var str = '<table lang="'+timeLanguage+'" dir=rtl id="timetable" style="font-family:tahoma;width:100%;font-size:13px;font-weight:normal;color:#00009F">';
		str += '<tr align="center" bgcolor="#BAC0D1">';
 		str += '<td width=50px></td>';
		str += '<td>' + daysNames[today.getDay()].substr(2)+'</td>';
		str += '<td>' + daysNames[tomorrow.getDay()].substr(2)+'</td>';
		str += '</tr>';
		output[-1]= -1 ;
		times2[-1] = 0 ;
		var azanArray = azanEnabled();
		for (var i=0; i<=lastTableItem; i++)
		{
			str += '<tr align="center">';
			if (azanArray[output[i]]) str += '<td bgcolor="#BAC0D1" background=images/bkgrnd/bkg_pray_alrm.png>'+spacer3+(output[i]==8?'إمساك':prayersNamesAR[output[i]])+'</td>';
			else str += '<td bgcolor="#BAC0D1" background=images/bkgrnd/bkg_pray.png>'+prayersNamesAR[output[i]]+'</td>';
			if (nowTime>=times2[output[i]] && nowTime>=times2[output[i-1]]) str += '<td bgcolor="#C8C8C8">'+times[output[i]]+'</td>';
			else str += '<td bgcolor="#E7EAEF">'+times[output[i]]+'</td>';
			str += '<td bgcolor="#E7EAEF">'+ times1[output[i]]+ '</td>';
			str += '</tr>';
		}
		str += '</table>';
		System.Gadget.document.getElementById('tablePrayers').innerHTML = str;
		return times2 ;
	}
	else
	{
		System.Gadget.document.getElementById('tablePrayers').innerHTML = '';
		return [99,99,99,99,99,99,99,99,99] ;
	}
}





function azanEnabled()
{
	var enableAzan1 = (SettingsManager.getValue("Home", "azan1Enabled")=='true');
	var enableAzan2 = (SettingsManager.getValue("Home", "azan2Enabled")=='true');
	var enableAzan3 = (SettingsManager.getValue("Home", "azan3Enabled")=='true');

	var azan = [ false, false, false, false, false, false, false, false, false ] ;

	if ( enableAzan1 )
	{
		azan[8] = (SettingsManager.getValue("Home", "azan1Imsak")=='true');
		azan[0] = (SettingsManager.getValue("Home", "azan1Fajr")=='true');
  	azan[2] = (SettingsManager.getValue("Home", "azan1Dhuhr")=='true');
		azan[3] = (SettingsManager.getValue("Home", "azan1Asr")=='true');
		azan[5] = (SettingsManager.getValue("Home", "azan1Maghrib")=='true');
		azan[6] = (SettingsManager.getValue("Home", "azan1Isha")=='true');
	}

	if ( enableAzan2 )
	{
		azan[8] = azan[8] || (SettingsManager.getValue("Home", "azan2Imsak")=='true');
		azan[0] = azan[0] || (SettingsManager.getValue("Home", "azan2Fajr")=='true');
  	azan[2] = azan[2] || (SettingsManager.getValue("Home", "azan2Dhuhr")=='true');
		azan[3] = azan[3] || (SettingsManager.getValue("Home", "azan2Asr")=='true');
		azan[5] = azan[5] || (SettingsManager.getValue("Home", "azan2Maghrib")=='true');
		azan[6] = azan[6] || (SettingsManager.getValue("Home", "azan2Isha")=='true');
	}

	if ( enableAzan3 )
	{
		azan[8] = azan[8] || (SettingsManager.getValue("Home", "azan3Imsak")=='true');
		azan[0] = azan[0] || (SettingsManager.getValue("Home", "azan3Fajr")=='true');
	  azan[2] = azan[2] || (SettingsManager.getValue("Home", "azan3Dhuhr")=='true');
		azan[3] = azan[3] || (SettingsManager.getValue("Home", "azan3Asr")=='true');
		azan[5] = azan[5] || (SettingsManager.getValue("Home", "azan3Maghrib")=='true');
		azan[6] = azan[6] || (SettingsManager.getValue("Home", "azan3Isha")=='true');
	}

	return azan;
}





function repeatRate()
{
	var repeateRate = showPeriod.value ;
	SettingsManager.setValue("Home", "repeateRate", repeateRate ) ;
	SettingsManager.saveFile();
}





function outputPrayerAlter()
{
	SettingsManager.setValue("Home", "outImsak", outImsak.checked);
	SettingsManager.setValue("Home", "outFajr", outFajr.checked);
	SettingsManager.setValue("Home", "outSunrise", outSunrise.checked);
	SettingsManager.setValue("Home", "outDhuhr", outDhuhr.checked);
	SettingsManager.setValue("Home", "outAsr", outAsr.checked);
	SettingsManager.setValue("Home", "outSunset", outSunset.checked);
	SettingsManager.setValue("Home", "outMaghrib", outMaghrib.checked);
	SettingsManager.setValue("Home", "outIsha", outIsha.checked);
	SettingsManager.setValue("Home", "outMidnight", outMidnight.checked);
	SettingsManager.setValue("Home", "timeFormat", timeFormat.value);
	SettingsManager.setValue("Home", "timeLanguage", timeLanguage.value);
	SettingsManager.saveFile();
	SettingsManager.loadFile();
	adjustHeight();
	makeTable();
}





function outputDatesAlter()
{
	SettingsManager.setValue("Home", "monthFormat", monthFormat.value);
	SettingsManager.saveFile();
//	SettingsManager.loadFile();
	selectMonthNames();
	updateDates(0); 
}





function switchMonths()
{
	var format = SettingsManager.getValue("Home", "monthFormat") ;
	var format = (format=="arMonthNames") ? 'enMonthNames' : 'arMonthNames' ;
	document.getElementById('monthFormat').value = format ;
	outputDatesAlter();
}





function switchTimeFormat()
{
	var format = SettingsManager.getValue("Home", "timeFormat") ;
	var language = SettingsManager.getValue("Home", "timeLanguage") ;
	var flag=false ;
	if (flag==false && format=='12hNS' && language=='ar') { var flag=true ; var format = '24h' ; var language='ar' ; }
	if (flag==false && format=='24h' && language=='ar') { var flag=true ; var format = '12hNS' ; var language='en' ; }
	if (flag==false && format=='12hNS' && language=='en') { var flag=true ; var format = '24h' ; var language='en' ; }
	if (flag==false && format=='24h' && language=='en') { var flag=true ; var format = '12hNS' ; var language='ar' ; }
	document.getElementById('timeFormat').value = format ;
	document.getElementById('timeLanguage').value = language ;
	SettingsManager.setValue("Home", "timeFormat", format);
	SettingsManager.setValue("Home", "timeLanguage", language);
	SettingsManager.saveFile();
	makeTable();
}





function alarmChange()
{
	if (azan0Enabled.checked) System.Gadget.document.getElementById('dayName').background="images/bkgrnd/bkg_day_alrm.png";
	else System.Gadget.document.getElementById('dayName').background="images/bkgrnd/bkg_day.png";
	SettingsManager.setValue("Home", "azan0Enabled", azan0Enabled.checked);
	SettingsManager.setValue("Home", "azan0Hours", azan0Hours.value);
	SettingsManager.setValue("Home", "azan0Minutes", azan0Minutes.value);
	SettingsManager.saveFile();
//	SettingsManager.loadFile();
}





