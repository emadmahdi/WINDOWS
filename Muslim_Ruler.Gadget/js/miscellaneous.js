




//Kaba
	var KabaLat = 21.422515 ;
	var KabaLong = 39.826204 ;





var	spacer1 = "&nbsp;";
var spacer2 = spacer1+spacer1;
var spacer3 = spacer2+spacer1;
var spacer4 = spacer3+spacer1;
var spacer5 = spacer4+spacer1;
var spacer6 = spacer5+spacer1;
var spacer7 = spacer6+spacer1;
var spacer8 = spacer7+spacer1;
var spacer9 = spacer8+spacer1;
var spacer10 = spacer9+spacer1;
var spacer11 = spacer10+spacer1;
var spacer12 = spacer11+spacer1;
var spacer13 = spacer12+spacer1;
var spacer14 = spacer13+spacer1;
var spacer15 = spacer14+spacer1;
var spacer16 = spacer15+spacer1;
var spacer17 = spacer16+spacer1;
var spacer18 = spacer17+spacer1;
var spacer19 = spacer18+spacer1;
var spacer20 = spacer19+spacer1;





var calendarDOW = [ 'ح' , 'ن' , 'ث' , 'ر' , 'خ' , 'ج' , 'س' ] ;






var arMonthNamesSmall = new Array(
'كانون2',
'شباط',
'آذار',
'نيسان',
'آيار',
'حزيران',
'تموز',
'آب',
'أيلول',
'تشرين1',
'تشرين2',
'كانون1'
);

var arMonthNames = new Array(
'كانون ثاني',
'شباط',
'آذار',
'نيسان',
'آيار',
'حزيران',
'تموز',
'آب',
'أيلول',
'تشرين أول',
'تشرين ثاني',
'كانون أول'
);

var enMonthNames = new Array(
'يناير',
'فبراير',
'مارس',
'ابريل',
'مايو',
'يونيو',
'يوليو',
'أغسطس',
'سبتمبر',
'أكتوبر',
'نوفمبر',
'ديسمبر'
);

var enMonthNamesSmall = enMonthNames ;





var daysNames = new Array(
'الأحد',
'الأثنين',
'الثلاثاء',
'الأربعاء',
'الخميس',
'الجمعة',
'السبت'
);





var gregMonthNamesSmall ;
var monthNames ;





function selectMonthNames(monthFormat)
{
	if (typeof monthFormat == 'undefined') var monthFormat = SettingsManager.getValue("Home", "monthFormat") ;
	if (monthFormat=="enMonthNames")
	{
		gregMonthNamesSmall = enMonthNamesSmall ;
		monthNames = enMonthNames ;
	}
	else
	{
		gregMonthNamesSmall = arMonthNamesSmall ;
		monthNames = arMonthNames ;
	}
}





function saveFile(filename, contents)
{
	try
	{
		var fs = new ActiveXObject("Scripting.FileSystemObject");
		var newFile = fs.CreateTextFile(filename, true, true);

		try
			{
				newFile.Write(contents);
			}
		finally
			{
				newFile.Close();
			}
	}
	catch (e)
		{
			// Do nothing
		}
}





function makeDefaults()
{
	//var shell = new ActiveXObject("WScript.Shell");
	//var cmd = 'cmd.exe /c mkdir \"' + installationPath() + '\\users\"' ;
	//shell.Run(cmd);
	//var cmd = 'cmd.exe /c copy \"' + installationPath() + '\\azan.mp3\" \"' + installationPath() + '\\users\\azan.mp3\"' ;
	//shell.Run(cmd);

	SettingsManager.setValue("Home", "lat", 33.34058);
	SettingsManager.setValue("Home", "lng", 44.40088);
	SettingsManager.setValue("Home", "tzone", "+3");
	SettingsManager.setValue("Home", "elevation", "41");
	SettingsManager.setValue("Home", "sealevel", "false");
	
	SettingsManager.setValue("Home", "location", "العراق - Baghdad");
	SettingsManager.setValue("Home", "selCountry", "العراق");
	SettingsManager.setValue("Home", "selCity", 465);
	
	SettingsManager.setValue("Home", "summerTime", "false");

	SettingsManager.setValue("Home", "timeFormat", "12hNS");
	SettingsManager.setValue("Home", "timeLanguage", "en");
	SettingsManager.setValue("Home", "monthFormat", "arMonthNames");

	SettingsManager.setValue("Home", "outImsak", "true");
	SettingsManager.setValue("Home", "outFajr", "true");
	SettingsManager.setValue("Home", "outSunrise", "true");
	SettingsManager.setValue("Home", "outDhuhr", "true");
	SettingsManager.setValue("Home", "outAsr", "true");
	SettingsManager.setValue("Home", "outSunset", "true");
	SettingsManager.setValue("Home", "outMaghrib", "true");
	SettingsManager.setValue("Home", "outIsha", "true");
	SettingsManager.setValue("Home", "outMidnight", "true");

	SettingsManager.setValue("Home", "azan0Multiple", "false");
	SettingsManager.setValue("Home", "azan0Enabled", "false");
	SettingsManager.setValue("Home", "azan0Hours", "00");
	SettingsManager.setValue("Home", "azan0Minutes", "00");

	SettingsManager.setValue("Home", "azan1Enabled", "true");
	SettingsManager.setValue("Home", "azan1Imsak", "true");
	SettingsManager.setValue("Home", "azan1Fajr", "true");
	SettingsManager.setValue("Home", "azan1Dhuhr", "true");
	SettingsManager.setValue("Home", "azan1Asr", "true");
	SettingsManager.setValue("Home", "azan1Maghrib", "true");
	SettingsManager.setValue("Home", "azan1Isha", "true");
	SettingsManager.setValue("Home", "azan1Multiple", "true");

	SettingsManager.setValue("Home", "azan2Enabled", "false");
	SettingsManager.setValue("Home", "azan2Imsak", "false");
	SettingsManager.setValue("Home", "azan2Fajr", "false");
	SettingsManager.setValue("Home", "azan2Dhuhr", "false");
	SettingsManager.setValue("Home", "azan2Asr", "false");
	SettingsManager.setValue("Home", "azan2Maghrib", "false");
	SettingsManager.setValue("Home", "azan2Isha", "false");
	SettingsManager.setValue("Home", "azan2Multiple", "false");

	SettingsManager.setValue("Home", "azan3Enabled", "false");
	SettingsManager.setValue("Home", "azan3Imsak", "false");
	SettingsManager.setValue("Home", "azan3Fajr", "false");
	SettingsManager.setValue("Home", "azan3Dhuhr", "false");
	SettingsManager.setValue("Home", "azan3Asr", "false");
	SettingsManager.setValue("Home", "azan3Maghrib", "false");
	SettingsManager.setValue("Home", "azan3Isha", "false");
	SettingsManager.setValue("Home", "azan3Multiple", "false");

	SettingsManager.setValue("Home", "calcMethod", "All");
	SettingsManager.setValue("Home", "angleImsak", "-19.5-10min");
	SettingsManager.setValue("Home", "angleMaghrib", "-4.5");
	SettingsManager.setValue("Home", "angleFajr", "-12");
	SettingsManager.setValue("Home", "angleIsha", '+90min');
	SettingsManager.setValue("Home", "midnightCalcMethod", "Imsak");
	SettingsManager.setValue("Home", "asrCalcMethod", "Late");
	SettingsManager.setValue("Home", "calcAsr", 2);
	SettingsManager.setValue("Home", "highLats", "None");
		
	SettingsManager.setValue("Home", "azan0File", installationPath() + "/azan.mp3" );
	SettingsManager.setValue("Home", "azan0Volume", 40);
		
	SettingsManager.setValue("Home", "azan1File", installationPath() + "/azan.mp3" );
	SettingsManager.setValue("Home", "azan1Volume", 40);

	SettingsManager.setValue("Home", "azan2File", installationPath() + "/azan.mp3" );
	SettingsManager.setValue("Home", "azan2Volume", 40);

	SettingsManager.setValue("Home", "azan3File", installationPath() + "/azan.mp3" );
	SettingsManager.setValue("Home", "azan3Volume", 40);
	
	SettingsManager.setValue("Home", "hijriCalcMethod", "Normal Eyes");
	SettingsManager.setValue("Home", "hijriCorrection", 0);
	SettingsManager.setValue("Home", "minMoonAltitude", "==");
	SettingsManager.setValue("Home", "minMoonIllum", "==");
	SettingsManager.setValue("Home", "minMoonAge", "==");
	SettingsManager.setValue("Home", "minMoonAvail", "==");
	SettingsManager.setValue("Home", "minMoonAzmoth", "==");
	SettingsManager.setValue("Home", "moonVisibilityMethod", "Shaukat-Odeh-Yallop");
	SettingsManager.setValue("Home", "moonCheckDelay", 6);

	SettingsManager.setValue("Home", "horizonMethod", "Circle4");
	SettingsManager.setValue("Home", "horizonSouth", 4000);
	SettingsManager.setValue("Home", "horizonNorth", 4000);
	SettingsManager.setValue("Home", "horizonEast", 4000);
	SettingsManager.setValue("Home", "horizonWest", 4000);

	SettingsManager.setValue("Home", "tuneImsak", 0);
	SettingsManager.setValue("Home", "tuneFajr", 0);
	SettingsManager.setValue("Home", "tuneSunrise", 0);
	SettingsManager.setValue("Home", "tuneDhuhr", 0);
	SettingsManager.setValue("Home", "tuneAsr", 0);
	SettingsManager.setValue("Home", "tuneSunset", 0);
	SettingsManager.setValue("Home", "tuneMaghrib", 0);
	SettingsManager.setValue("Home", "tuneIsha", 0);
	SettingsManager.setValue("Home", "tuneMidnight", 0);

	SettingsManager.setValue("Home", "azan1TuneImsak", 0);
	SettingsManager.setValue("Home", "azan1TuneFajr", 0);
	SettingsManager.setValue("Home", "azan1TuneDhuhr", 0);
	SettingsManager.setValue("Home", "azan1TuneAsr", 0);
	SettingsManager.setValue("Home", "azan1TuneMaghrib", 0);
	SettingsManager.setValue("Home", "azan1TuneIsha", 0);

	SettingsManager.setValue("Home", "azan2TuneImsak", 0);
	SettingsManager.setValue("Home", "azan2TuneFajr", 0);
	SettingsManager.setValue("Home", "azan2TuneDhuhr", 0);
	SettingsManager.setValue("Home", "azan2TuneAsr", 0);
	SettingsManager.setValue("Home", "azan2TuneMaghrib", 0);
	SettingsManager.setValue("Home", "azan2TuneIsha", 0);

	SettingsManager.setValue("Home", "azan3TuneImsak", 0);
	SettingsManager.setValue("Home", "azan3TuneFajr", 0);
	SettingsManager.setValue("Home", "azan3TuneDhuhr", 0);
	SettingsManager.setValue("Home", "azan3TuneAsr", 0);
	SettingsManager.setValue("Home", "azan3TuneMaghrib", 0);
	SettingsManager.setValue("Home", "azan3TuneIsha", 0);
	
	SettingsManager.setValue("Home", "showAhadeth", "true");
	SettingsManager.setValue("Home", "showQuran", "true");
	SettingsManager.setValue("Home", "showTimes", "true");

	SettingsManager.setValue("Home", "settingsChanged", "false");

	SettingsManager.setValue("Home", "repeateRate", 1);

	if (isGadgetRequest())
	{
		System.Gadget.document.getElementById('ahadethText').innerText = 'توكل على اللّه يكفيك' ;
		System.Gadget.document.getElementById('quranText').innerText = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ (+) الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' ;
		System.Gadget.document.getElementById('ahadethText').style.color = 'red' ;
		System.Gadget.document.getElementById('quranText').style.color  = 'green' ;
	}
}





function distanceHorizonToHours(defaultSetup)
{
	var hm_diffEast = "-:- ـ" ; 
	var hm_diffWest = "-:- ـ" ;
	if (defaultSetup==0)
	{
		var horizonMethod = document.getElementById('horizonMethod').value ;
		var cityLat = Number(document.getElementById('latitude').value) ;
		var cityLong = Number(document.getElementById('longitude').value) ;
		var horizonEast1 = Number(document.getElementById('horizonEast').value) ;
		var horizonWest1 = Number(document.getElementById('horizonWest').value) ;
	}
	else
	{
		var horizonMethod = SettingsManager.getValue("Home",'horizonMethod') ;
		var cityLat = Number(SettingsManager.getValue("Home", "lat")) ;
		var cityLong = Number(SettingsManager.getValue("Home", "lng")) ;
		var horizonEast1 = Number(SettingsManager.getValue("Home",'horizonEast')) ;
		var horizonWest1 = Number(SettingsManager.getValue("Home",'horizonWest')) ;
	}
	if (horizonMethod != 'None')
	{
		var center = new LatLon(cityLat, 0) ;
		var point = new LatLon(cityLat, 15) ;
		var distancePerHour = Number(center.distanceTo(point)) ;
		var hm_diffEast = hmstring(horizonEast1/distancePerHour);
		var hm_diffWest = hmstring(horizonWest1/distancePerHour);
	}
	if (defaultSetup==0)
	{
		document.getElementById('horizonHoursEast').innerText = hm_diffEast ;
		document.getElementById('horizonHoursWest').innerText = hm_diffWest ;
	}
	return [ hm_diffEast , hm_diffWest ] ;
}





function methodHorizonValues(horizonMethod, cityLong, cityLat)
{
	switch (horizonMethod)
	{
		case 'Night2':		var horizonEast = 3000 ; var horizonWest = 3000 ; var horizonSouth = 3000 ; var horizonNorth = 3000 ; break ;
		case 'Night4':		var horizonEast = 6000 ; var horizonWest = 6000 ; var horizonSouth = 6000 ; var horizonNorth = 6000 ; break ;
		case 'Night6':		var horizonEast = 10000 ; var horizonWest = 10000 ; var horizonSouth = 10000 ; var horizonNorth = 10000 ; break ;
		case 'Night8':		var horizonEast = 13400 ; var horizonWest = 13400 ; var horizonSouth = 13400 ; var horizonNorth = 13400 ; break ;
		case 'Night10':		var horizonEast = 16700 ; var horizonWest = 16700 ; var horizonSouth = 16700 ; var horizonNorth = 16700 ; break ;
		case 'Night12':		var horizonEast = 20000 ; var horizonWest = 20000 ; var horizonSouth = 20000 ; var horizonNorth = 20000 ; break ;
		case 'Night14':		var horizonEast = 24000 ; var horizonWest = 24000 ; var horizonSouth = 24000 ; var horizonNorth = 24000 ; break ;
		case 'East2':			var horizonEast = 3000 ; var horizonWest = 0 ; var horizonSouth = 750 ; var horizonNorth = 750 ; break ;
		case 'East4':			var horizonEast = 6000 ; var horizonWest = 0 ; var horizonSouth = 1500 ; var horizonNorth = 1500 ; break ;
		case 'East6':			var horizonEast = 10000 ; var horizonWest = 0 ; var horizonSouth = 2500 ; var horizonNorth = 2500 ; break ;
		case 'East8':			var horizonEast = 13400 ; var horizonWest = 0 ; var horizonSouth = 3400 ; var horizonNorth = 3400 ; break ;
		case 'East10':		var horizonEast = 16700 ; var horizonWest = 0 ; var horizonSouth = 4250 ; var horizonNorth = 4250 ; break ;
		case 'East12':		var horizonEast = 20000 ; var horizonWest = 0 ; var horizonSouth = 5000 ; var horizonNorth = 5000 ; break ;
		case 'East14':		var horizonEast = 24000 ; var horizonWest = 0 ; var horizonSouth = 6000 ; var horizonNorth = 6000 ; break ;
		case 'Circle01':	var horizonEast = 100 ; var horizonWest = 100 ; var horizonSouth = 100 ; var horizonNorth = 100 ; break ;
		case 'Circle05':	var horizonEast = 500 ; var horizonWest = 500 ; var horizonSouth = 500 ; var horizonNorth = 500 ; break ;
		case 'Circle1':		var horizonEast = 1000 ; var horizonWest = 1000 ; var horizonSouth = 1000 ; var horizonNorth = 1000 ; break ;
		case 'Circle2':		var horizonEast = 2000 ; var horizonWest = 2000 ; var horizonSouth = 2000 ; var horizonNorth = 2000 ; break ;
		case 'Circle4':		var horizonEast = 4000 ; var horizonWest = 4000 ; var horizonSouth = 4000 ; var horizonNorth = 4000 ; break ;
		case 'Circle6':		var horizonEast = 6000 ; var horizonWest = 6000 ; var horizonSouth = 6000 ; var horizonNorth = 6000 ; break ;
		case 'Circle8':		var horizonEast = 8000 ; var horizonWest = 8000 ; var horizonSouth = 8000 ; var horizonNorth = 8000 ; break ;
		case 'Circle10':	var horizonEast = 10000 ; var horizonWest = 10000 ; var horizonSouth = 10000 ; var horizonNorth = 10000 ; break ;
		case 'Circle15':	var horizonEast = 15000 ; var horizonWest = 15000 ; var horizonSouth = 15000 ; var horizonNorth = 15000 ; break ;
		case 'Circle20':	var horizonEast = 20000 ; var horizonWest = 20000 ; var horizonSouth = 20000 ; var horizonNorth = 20000 ; break ;
		case 'None':			var horizonEast = '==' ; var horizonWest = '==' ; var horizonSouth = '==' ; var horizonNorth = '==' ; break ;
		case 'Manual':		var horizonEast = 0 ; var horizonWest = 0 ; var horizonSouth = 0 ; var horizonNorth = 0 ; break ;
	}
	var cityLat = Number(cityLat) ;
	var cityLong = Number(cityLong) ;
	var center = new LatLon(cityLat, 0) ;
	var point = new LatLon(cityLat, 15) ;
	var distancePerHour = Number(center.distanceTo(point)) ;
	if (horizonMethod.substr(0,5)=='Night')
	{
		var diffHours = Number(horizonMethod.substr(5,2));
		var distance = Math.ceil(distancePerHour*diffHours) ;
		horizonEast = distance ;
		horizonWest = distance ;
		horizonSouth = distance ;
		horizonNorth = distance ;
	}
	if (horizonMethod.substr(0,4)=='East')
	{
		var diffHours = Number(horizonMethod.substr(4,2));
		var distance = Math.ceil(distancePerHour*diffHours) ;
		horizonEast = distance ;
		horizonWest = 0 ;
		horizonSouth = Math.floor(distance/4) ;
		horizonNorth = Math.floor(distance/4) ;
	}
	return [ horizonEast , horizonWest , horizonSouth , horizonNorth ] ;
}





function diameterHorizon(angle,XX,YY)
{
	if (XX<=0 || YY<=0) var diameter = 0 ; else var diameter = YY*sind(90-atand(YY/XX))/cosd(90-angle-atand(YY/XX)) ;
	if (angle==22.5) diameter *= 1.20 ;
	else if (angle==45) diameter *= 1.25 ;
	else if (angle==67.5) diameter *= 1.20 ;
	return diameter ;
}





function pointsHorizonArray(cityLong, cityLat, horizonEast, horizonWest, horizonSouth, horizonNorth)
{
	var hE = Number(horizonEast) ;
	var hW = Number(horizonWest) ;
	var hS = Number(horizonSouth) ;
	var hN = Number(horizonNorth) ;
	var cityLat = Number(cityLat) ;
	var cityLong = Number(cityLong) ;

	var city = new LatLon(cityLat, cityLong) ;

	var points = [] ;
	var diameter = [] ;
	var angle = [] ;

var sectors = [ diameterHorizon(67.5,hE,hN) , diameterHorizon(45,hE,hN) , diameterHorizon(22.5,hE,hN) , hE ,
								diameterHorizon(22.5,hE,hS) , diameterHorizon(45,hE,hS) , diameterHorizon(67.5,hE,hS) , hS ,
								diameterHorizon(67.5,hW,hS) , diameterHorizon(45,hW,hS) , diameterHorizon(22.5,hW,hS) , hW ,
								diameterHorizon(22.5,hW,hN) , diameterHorizon(45,hW,hN) , diameterHorizon(67.5,hW,hN) , hN ] ;

	var div=10 ;
	var divisions = [] ;
	for (i=0; i<=div; i++) divisions[i] = 100/div * i ;

//	var divisions = [ 0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99, 100 ] ;

	angle[0] = 0 ;
	diameter[0] = sectors[0] * divisions[0]/100 ;

	for (var j=0; j<=div; j++)
		for (var i=1; i<=16; i++)
		{
			angle[16*j+i] = (i*(360/16))%360 ;
			diameter[16*j+i] = sectors[i-1] * divisions[j+1]/100 ;
		}

	points[0] = 0 ;
	points[1] = 0 ;
	points[2] = cityLong ;
	points[3] = cityLat ;

	var i = 0 ;
	for (var j=1; j<=(div*16); j++)
	{
//		if ( j>16*(div-1) ) j=j+3 ;
//		if ( (j<=16 && j%4==1) || (j>16 && j<=32 && j%2==1) || j>32 ) i++ ;
		i++ ;
		points[4*i+0] = angle[j].toFixed(2) ;
		points[4*i+1] = diameter[j].toFixed(2) ;
		var point = city.destinationPoint(angle[j], diameter[j]) ;
		points[4*i+2] = point._lon ;
		points[4*i+3] = point._lat ;
	}
	return points ;
}





function pointsHorizon(cityLong, cityLat)
{
	var horizonEast = SettingsManager.getValue("Home", "horizonEast") ;
	var horizonWest = SettingsManager.getValue("Home", "horizonWest") ;
	var horizonSouth = SettingsManager.getValue("Home", "horizonSouth") ;
	var horizonNorth = SettingsManager.getValue("Home", "horizonNorth") ;

	return pointsHorizonArray(cityLong, cityLat, horizonEast, horizonWest, horizonSouth, horizonNorth) ;
}





var horizonMoonVisi 		= [] ;
var moonVisiData 				= [] ;
var isMoonVisiData 			= [] ;
var hijriMonthCorrData 	= [] ;

function quickenDataInit()
{
	SettingsManager.setValue("Home", "horizonMoonVisi", "");
	SettingsManager.setValue("Home", "moonVisiData", "");
	SettingsManager.setValue("Home", "hijriMonthCorrData", "");
	SettingsManager.setValue("Home", "isMoonVisiData", "");
	SettingsManager.saveFile();
}





function quickenDataLoad()
{
	SettingsManager.loadFile();
	horizonMoonVisi = SettingsManager.getValue("Home", "horizonMoonVisi").split(',');
	moonVisiData = SettingsManager.getValue("Home", "moonVisiData").split(',');
	hijriMonthCorrData = SettingsManager.getValue("Home", "hijriMonthCorrData").split(',');
	isMoonVisiData = SettingsManager.getValue("Home", "isMoonVisiData").split(',');
}





function quickenDataSave()
{
	SettingsManager.setValue("Home", "horizonMoonVisi", horizonMoonVisi);
	SettingsManager.setValue("Home", "moonVisiData", moonVisiData);
	SettingsManager.setValue("Home", "hijriMonthCorrData", hijriMonthCorrData);
	SettingsManager.setValue("Home", "isMoonVisiData", isMoonVisiData);
	SettingsManager.saveFile();
}





function updateDates(fullFlag)
{
	var today = new Date() ;
	System.Gadget.document.getElementById('dateGreg').innerText = today.getDate()+' '+monthNames[today.getMonth()]+' '+today.getFullYear() ;
	if (fullFlag==1)
	{
		System.Gadget.document.getElementById('dayName').innerText = daysNames[today.getDay()] ;
		var todayHijri = gregToHijri(today.getFullYear(),today.getMonth()+1,today.getDate()) ;
		System.Gadget.document.getElementById('dateHijri').innerText = todayHijri[2]+' '+hijriMonthNames[todayHijri[1]-1]+' '+todayHijri[0] ;
		quickenDataSave();
	}
	var azan0Enabled = (SettingsManager.getValue("Home", "azan0Enabled") == 'true');
	if (azan0Enabled==true) System.Gadget.document.getElementById('dayName').background="images/bkgrnd/bkg_day_alrm.png";
	else System.Gadget.document.getElementById('dayName').background="images/bkgrnd/bkg_day.png";
}





function hmsstring(t) {
  var hours = Math.abs(t);
  var minutes = 60.0*(hours-Math.floor(hours));
  var seconds = 60.0*(minutes-Math.floor(minutes));
  hours=Math.floor(hours);
  minutes=Math.floor(minutes);
  seconds=Math.round(seconds);
  if (seconds >= 60) { minutes+=1; seconds-=60; }
  if (minutes >= 60) { hours+=1; minutes-=60; }
  if (hours >= 24) { hours-=24; }
  var hmsstr=(t < 0) ? "-" : "";
  hmsstr+=((hours < 10) ? "0" : "" )+hours;
  hmsstr+=((minutes < 10) ? ":0" : ":" )+minutes;
  hmsstr+=((seconds < 10) ? ":0" : ":" )+seconds;
  return hmsstr;
}





function hmstring(t) {
  var hours = Math.abs(t);
  var minutes = 60.0*(hours-Math.floor(hours));
  hours=Math.floor(hours);
  minutes=Math.round(minutes);
  if (minutes >= 60) { hours+=1; minutes-=60; }
  if (hours >= 24) { hours-=24; }
  var hmsstr=(t < 0) ? "-" : "";
  hmsstr+=((hours < 10) ? "0" : "" )+hours;
  hmsstr+=((minutes < 10) ? ":0" : ":" )+minutes;
  return hmsstr;
}





function installationPath()
{
	if (location.protocol=='file:' || location.protocol=='http:' || location.protocol=='https:')
		var pathname=document.URL.substr(location.protocol.length+2,document.URL.lastIndexOf('\\')-location.protocol.length-2);
	else var pathname = System.Gadget.path;
	var pathname = pathname.replace(/\\/g,'/') ;
	return pathname;
}





function arabicTextClean(textIn)
{
	var textOut = textIn
	var textOut = textOut.replace(/[ًٌٍَُِّْـء]/g,'').replace(/[أإآ]/g,'ا') ;
	var textOut = textOut.replace(/ؤ/g,'و') ;
	var textOut = textOut.replace(/ئ/g,'ى') ;
	var textOut = textOut.replace(/ظ/g,'ض') ;
	var textOut = textOut.replace(/ة/g,'ه') ;
	var textOut = textOut.replace('	',' ') ;
	while (textOut.search('  ')>=0) var textOut = textOut.replace('  ',' ') ;
	if ( textOut.substr(0,1)==' ' ) var textOut = textOut.substr(1,textOut.length-1) ;
	if ( textOut.substr(textOut.length-1,1)==' ' ) var textOut = textOut.substr(0,textOut.length-1) ;
	return textOut ;
}





function toggleFlyout(flyoutFile)
{
	if (System.Gadget.Flyout.show) callFlyout('');
	else callFlyout(flyoutFile);
}





function callFlyout(flyoutFile)
{
	if (isGadgetRequest())
	{
		if (flyoutFile=='') System.Gadget.Flyout.show = false;
		else
		{
			System.Gadget.Flyout.file = flyoutFile+'.html';
			System.Gadget.Flyout.show = true;
		}
	}
	else
	{
		if (flyoutFile=='') callBrowser('menu') ;
		else callBrowser(flyoutFile) ;
	}
}





function callBrowser(flyoutFile)
{
	var shell = new ActiveXObject("WScript.Shell");
//	window.navigate( installationPath() + '\\' + flyoutFile + '.html' );
	shell.Run( 'iexplore.exe ' + installationPath() + '\\' + flyoutFile + '.html' );
}





/*
function callHTA(flyoutFile)
{
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (!fso.FileExists(flyoutFile+'.hta')) fso.CopyFile ( flyoutFile+'.html' , flyoutFile+'.hta' , true );
	var shell = new ActiveXObject("WScript.Shell");
	shell.Run( flyoutFile+'.hta' );
}
*/





function showHTML(htmlString, filename, mapFlag)
{
	var shell = new ActiveXObject("WScript.Shell");
	var tempPath = shell.ExpandEnvironmentStrings("%temp%");
	var folder =  tempPath + '\\muslimruler'  ;
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (!fso.FolderExists(folder)) fso.CreateFolder( folder ) ;
	if (mapFlag) fso.CopyFile ( installationPath() + '\\images\\map\\*.png' , folder , true );
	saveFile( folder + '\\' + filename , htmlString );
	shell.Run( 'iexplore.exe ' + folder + '\\' + filename ); // window.navigate();
	//shell.Run( 'msedge.exe ' + folder + '\\' + filename ); // window.navigate();
}





function moonVisibilitySetup(moonVisibility, flagManual)
{
	var minMoonAltitude = 0 ; var minMoonIllum = 0 ; var minMoonAge = 0 ; var minMoonAvail = 0 ; var minMoonAzmoth = 0 ;
	switch (moonVisibility)
	{
//		case 'Normal Eyes':		minMoonAltitude = 6 ; minMoonIllum = 1 ; minMoonAge = 12 ; minMoonAvail = 16 ; minMoonAzmoth = 30 ; break ;
//		case 'Sharp Eyes':		minMoonAltitude = 5 ; minMoonIllum = 0.75 ; minMoonAge = 10 ; minMoonAvail = 12 ; minMoonAzmoth = 20 ; break ;
//		case 'Powered Eyes':	minMoonAltitude = 4 ; minMoonIllum = 0.5 ; minMoonAge = 8 ; minMoonAvail = 8 ; ; minMoonAzmoth = 10 ; break ;
		case 'Normal Eyes':		document.getElementById('moonVisibilityMethod').value = 'Shaukat-Odeh-Yallop' ; break ;
		case 'Sharp Eyes':		document.getElementById('moonVisibilityMethod').value = 'Shaukat-Odeh-Yallop' ; break ;
		case 'Powered Eyes':	document.getElementById('moonVisibilityMethod').value = 'Shaukat-Odeh-Yallop' ; break ;
		case 'Birth':					minMoonAltitude = -999 ; minMoonIllum = 0 ; minMoonAge = 0 ; minMoonAvail = 0 ; ; minMoonAzmoth = 0 ; break ;
		case 'Exist':					minMoonAltitude = 0 ; minMoonIllum = 0 ; minMoonAge = 0 ; minMoonAvail = 0 ; ; minMoonAzmoth = 0 ; break ;
		case 'Math':					minMoonAltitude = '==' ; minMoonIllum = '==' ; minMoonAge = '==' ; minMoonAvail = '==' ; minMoonAzmoth = '==' ; break ;
		case 'Manual':
			if (flagManual==1)
			{
				minMoonAltitude = Number(SettingsManager.getValue("Home", "minMoonAltitude")) ;
 				minMoonIllum = Number(SettingsManager.getValue("Home", "minMoonIllum")) ;
 				minMoonAge = Number(SettingsManager.getValue("Home", "minMoonAge")) ;
				minMoonAvail = Number(SettingsManager.getValue("Home", "minMoonAvail")) ;
				minMoonAzmoth = Number(SettingsManager.getValue("Home", "minMoonAzmoth")) ;
			}
			else
			{
				minMoonAltitude = 5 ; minMoonIllum = 0.5 ; minMoonAge = 10 ; minMoonAvail = 10 ; ; minMoonAzmoth = 0 ; break ;
			}
			break ;
	}
	return [minMoonAltitude, minMoonIllum, minMoonAge, minMoonAvail, minMoonAzmoth];
}





function isGadgetRequest()
{
	if (location.protocol=='file:' || location.protocol=='http:' || location.protocol=='https:') return false;
	else return true;
}





function setRepeatRate(repeateRate)
{
	SettingsManager.setValue("Home", "repeateRate", repeateRate ) ;
	SettingsManager.saveFile() ;
	callFlyout('menu');
}





function altitudeAdjustment(elevation)
{
//	var earthRadius = 6356752.3142 ; // in meters  (earth Polar radius)
//	var earthRadius = 6371008.8 ; // in meters  (earth Mean radius)
//	var earthRadius = 6371007.2 ; // in meters  (earth Authalic radius)
//	var earthRadius = 6371000.8 ; // in meters  (earth Volumetric radius)
//	var earthRadius = 6367445.0 ; // in meters  (earth Rectifying radius)
//	var earthRadius = 6378137.0 ; // in meters  (earth Equatorial radius)
	var earthRadius = 6371008.8 ; // in meters  (earth Mean radius)
	if (elevation>=0) var angleAdjustment = -acosd(earthRadius/(earthRadius+elevation)) ;
	else var angleAdjustment = acosd(earthRadius/(earthRadius-elevation)) ;
	//if (elevation>=0) var angleAdjustment = -0.0347*Math.sqrt(elevation) ; // an approximation
	//else var angleAdjustment = 0.0347*Math.sqrt(-elevation) ; // an approximation
	return angleAdjustment ;
}
// original function copied from prayers javascript library file "PrayTimes_org.js"
//	riseSetAngle: function() {
//		//var earthRad = 6371009; // in meters
//		//var angle = DMath.arccos(earthRad/(earthRad+ elv));
//		var angle = 0.0347* Math.sqrt(elv); // an approximation
//		return 0.833+ angle;
//	},




