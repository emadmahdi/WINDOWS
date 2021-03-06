




prayersNames = new Array(
		'Fajr',
		'Sunrise',
		'Dhuhr',
		'Asr',
		'Sunset',
		'Maghrib',
		'Isha',
		'Midnight',
		'Imsak'
);





prayersNamesAR = new Array(
		'الفجر',
		'الشروق',
		'الظهر',
		'العصر',
		'الغروب',
		'المغرب',
		'العشاء',
		'نصف ليل',
		'الإمساك'
	);





function prayers(today, latitude, longitude, timeZone, timeFormat, elevation)
{
	var sealevel = (SettingsManager.getValue("Home", "sealevel") == 'true');
	if (sealevel) var elevation = 0;
//	var summerTime = (SettingsManager.getValue("Home", "summerTime") == 'true');
	var summerTime = false;
	var tomorrow = new Date();
	tomorrow.setFullYear(today.getFullYear(), today.getMonth(), today.getDate()+1);
	tomorrow.setHours(today.getHours(),today.getMinutes(),today.getSeconds());
	var today_times = prayTimes.getTimes(today, [latitude, longitude, elevation] , timeZone, summerTime, "Float");
	var tomorrow_times = prayTimes.getTimes(tomorrow, [latitude, longitude, elevation] , timeZone, summerTime, "Float");
	var today_times = getMidnightTime(today_times,tomorrow_times);
	var today_times = formatPrayers(today_times,timeFormat);
	var newTimes = [];
	for (var i in prayersNames) newTimes[i] = today_times[prayersNames[i].toLowerCase()];
	return newTimes;
}





// timeFormat:	FloatMinutes, Float, 12hNS, 24h
function formatPrayers(times, timeFormat)
{
	for (var i in prayersNames)
	{
		var prayName = prayersNames[i].toLowerCase() ;
		if (timeFormat == 'Float')
		{
			if (times[prayName]<0) times[prayName]+=24;
			if (times[prayName]>=24) times[prayName]-=24;
		}
		else
		{
			if (prayName=='fajr' || prayName=='dhuhr' || prayName=='asr' || prayName=='maghrib' || prayName=='isha' ) times[prayName]+=59.99/3600 ;
			if (times[prayName]<0) times[prayName]+=24;
			if (times[prayName]>=24) times[prayName]-=24;
			var hours = Math.floor(times[prayName]);
			var minutes = Math.floor((times[prayName]-hours)*60);
			if (timeFormat == 'FloatMinutes') times[prayName] = hours + minutes/60 ;
			else
			{
				if (timeFormat == '12hNS') hours = (hours+12-1)%12 + 1 ;
				times[prayName] = hours + ':' + ((minutes<10)?'0':'')+minutes ;
			}
		}
	}
	return times ;
}





function getMidnightTime(today_times,tomorrow_times)
{
	var midnightCalcMethod = SettingsManager.getValue("Home", "midnightCalcMethod");
	var tuneMidnight = Number(SettingsManager.getValue("Home", "tuneMidnight"));
	switch (midnightCalcMethod)
	{
		case 'Imsak'			:	today_times['midnight'] = today_times['sunset']  + prayTimes.timeDiff( today_times['sunset'] , tomorrow_times['imsak']   )/ 2 ; break ;
		case 'Jafari'			:	today_times['midnight'] = today_times['sunset']  + prayTimes.timeDiff( today_times['sunset'] , tomorrow_times['fajr']    )/ 2 ; break ;
		case 'Standard'		:	today_times['midnight'] = today_times['sunset']  + prayTimes.timeDiff( today_times['sunset'] , tomorrow_times['sunrise'] )/ 2 ; break ;
		case 'Imsak1'			:	today_times['midnight'] = today_times['maghrib'] + prayTimes.timeDiff( today_times['maghrib'], tomorrow_times['imsak']   )/ 2 ; break ;
		case 'Jafari1'		:	today_times['midnight'] = today_times['maghrib'] + prayTimes.timeDiff( today_times['maghrib'], tomorrow_times['fajr']    )/ 2 ; break ;
		case 'Standard1'	:	today_times['midnight'] = today_times['maghrib'] + prayTimes.timeDiff( today_times['maghrib'], tomorrow_times['sunrise'] )/ 2 ; break ;
	}
	today_times['midnight'] += tuneMidnight/60 ;
	return today_times ;
}





function setOutput()
{
	var output = [];
	var ii = 0;
  if (SettingsManager.getValue("Home", "outImsak") == 'true') { output[ii] = '8'; ii++; };
  if (SettingsManager.getValue("Home", "outFajr") == 'true') { output[ii] = '0'; ii++; };
  if (SettingsManager.getValue("Home", "outSunrise") == 'true') { output[ii] = '1'; ii++; };
  if (SettingsManager.getValue("Home", "outDhuhr") == 'true') { output[ii] = '2'; ii++; };
  if (SettingsManager.getValue("Home", "outAsr") == 'true') { output[ii] = '3'; ii++; };
  if (SettingsManager.getValue("Home", "outSunset") == 'true') { output[ii] = '4'; ii++; };
  if (SettingsManager.getValue("Home", "outMaghrib") == 'true') { output[ii] = '5'; ii++; };
  if (SettingsManager.getValue("Home", "outIsha") == 'true') { output[ii] = '6'; ii++; };
  if (SettingsManager.getValue("Home", "outMidnight") == 'true') { output[ii] = '7'; ii++; };
	return output;
}





// convert given string such as "5-10min" into two numbers
// 1st number is angles = 5
// 2nd number is minutes = -10
function separateAnglesTime(str)
{
	var angle0 = 0;
	var time0 = 0;
	var angle1 = 0;
	var time1 = 0;
	var str = '+' + str.toLowerCase().replace(/ /g,'')+'+0';
	var str = str.replace('++','+').replace('+-','-');
	var str = str.replace(/[+]/g,':+').replace(/[-]/g,':-');
	var strArray = str.split(/:/);
	if (strArray[0].indexOf('min')!=-1) var time0 = 1* strArray[0].split('min')[0];
	else var angle0 = 1* strArray[0];
	if (strArray[1].indexOf('min')!=-1) var time1 = 1* strArray[1].split('min')[0];
	else var angle1 = 1* strArray[1];
	return  [ Number(angle0+angle1) , Number(time0+time1) ];
}





function adjustCalc()
{
  var angleImsak = SettingsManager.getValue("Home", "angleImsak") ;
  var angleMaghrib = SettingsManager.getValue("Home", "angleMaghrib") ;
  var angleFajr = SettingsManager.getValue("Home", "angleFajr") ;
  var calcMethod = SettingsManager.getValue("Home", "calcMethod") ;
	var angleIsha = SettingsManager.getValue("Home", "angleIsha") ;
	var calcAsr = SettingsManager.getValue("Home", "calcAsr") ;
	var valueHighLats = SettingsManager.getValue("Home", "highLats") ;

	var tuneImsak = Number(SettingsManager.getValue("Home", "tuneImsak"));
	var tuneFajr = Number(SettingsManager.getValue("Home", "tuneFajr"));
	var tuneSunrise = Number(SettingsManager.getValue("Home", "tuneSunrise"));
	var tuneDhuhr = Number(SettingsManager.getValue("Home", "tuneDhuhr"));
	var tuneAsr = Number(SettingsManager.getValue("Home", "tuneAsr"));
	var tuneSunset = Number(SettingsManager.getValue("Home", "tuneSunset"));
	var tuneMaghrib = Number(SettingsManager.getValue("Home", "tuneMaghrib"));
	var tuneIsha = Number(SettingsManager.getValue("Home", "tuneIsha"));
	var tuneMidnight = Number(SettingsManager.getValue("Home", "tuneMidnight"));

	var numArray = separateAnglesTime(angleImsak) ;
	angleImsak = -numArray[0] ;
	tuneImsak += numArray[1] ;
	var numArray = separateAnglesTime(angleFajr) ;
	angleFajr = -numArray[0] ;
	tuneFajr += numArray[1] ;
	var numArray = separateAnglesTime(angleMaghrib) ;
	angleMaghrib = -numArray[0] ;
	tuneMaghrib += numArray[1] ;
	var numArray = separateAnglesTime(angleIsha) ;
	angleIsha = -numArray[0] ;
	tuneIsha += numArray[1] ;

	var sealevel = (SettingsManager.getValue("Home", "sealevel") == 'true');
	if (sealevel) var elevation = 0;
	else var elevation = Number(SettingsManager.getValue("Home", "elevation"));

	var angleRiseSet = 0.833;
	var angleElevation = prayTimes.riseSetAngle(elevation) - angleRiseSet;
	var angleRiseSetElev = angleRiseSet + angleElevation;

	if (angleImsak<=angleRiseSetElev) angleImsak = angleRiseSetElev;
	else angleImsak += angleElevation;

	if (angleFajr<=angleRiseSetElev) angleFajr = angleRiseSetElev;
	else angleFajr += angleElevation;

	if (angleMaghrib<=angleRiseSetElev) angleMaghrib = angleRiseSetElev;
	else angleMaghrib += angleElevation;

	if (angleIsha<=angleRiseSetElev) angleIsha = angleRiseSetElev;
	else angleIsha += angleElevation;

	if (angleImsak<=angleRiseSetElev && tuneImsak!=0) angleImsak = angleFajr;

	if (angleFajr<=angleRiseSetElev && tuneFajr==0) tuneFajr-=0.999;

	prayTimes.adjust( {  maghrib: angleMaghrib , highLats: valueHighLats , asr: calcAsr , isha: angleIsha , fajr: angleFajr , imsak: angleImsak } ) ;
	prayTimes.tune( { sunrise: tuneSunrise , sunset: tuneSunset , dhuhr: tuneDhuhr , asr: tuneAsr , isha: tuneIsha , fajr: tuneFajr , midnight: tuneMidnight , imsak: tuneImsak , maghrib: tuneMaghrib } ) ;
}




