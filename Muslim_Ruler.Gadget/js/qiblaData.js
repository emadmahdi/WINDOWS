




function showQiblaData()
{
	var yearGreg = Number(gregYear1000.value + gregYear100.value + gregYear10.value + gregYear1.value) ;
	var monthGreg = Number(gregMonth.value) ;
	var dayGreg = Number(gregDay.value) ;
	var hourGreg = Number(gregHour.value) ;
	var minuteGreg = Number(gregMinute.value) ;


	var sealevel = (SettingsManager.getValue("Home", "sealevel") == 'true');
	if (sealevel) var elevation = 0 ;
	else var elevation = Number(SettingsManager.getValue("Home", "elevation")) ;


	var observer = {} ;
	observer.year 			= yearGreg;
	observer.month 			= monthGreg;
	observer.day 				= dayGreg;
	observer.hours 			= hourGreg;
	observer.minutes 		= minuteGreg;
	observer.seconds 		= 0;
	observer.tz 				= tz;
	observer.latitude 	= g_dblLatDeg ;
	observer.longitude 	= g_dblLongDeg ;


 	var today = new Date() ;
 	today.setFullYear(observer.year,observer.month-1,observer.day) ;
	today.setHours(observer.hours,observer.minutes,0);


	var todayPercent = today.getFullYear() + today.getMonth()/12  + (today.getDate()-1)/365.25 ;


	if (todayPercent>=2015 && todayPercent<=2020)
		var magneticDeclination = wmm.declination(elevation/1000, g_dblLatDeg, g_dblLongDeg, todayPercent) ;
	else
	  {
	  	var start = wmm.declination(elevation/1000, g_dblLatDeg, g_dblLongDeg, 2015);
  		var end = wmm.declination(elevation/1000, g_dblLatDeg, g_dblLongDeg, 2020);
			var variation = (end-start)/5 ;
			if (todayPercent>2020) var magneticDeclination = end + variation*(todayPercent-2020) ;
			else var magneticDeclination = start - variation*(2015-todayPercent) ;
		}


	var magneticDeclination = -magneticDeclination ;


	var qiblaMagnetic = qibla + magneticDeclination ;
	var qiblaCompass = 360 - qiblaMagnetic ;


  //find the Sun rise and set times
	var sunTimesString = spacer1 + sunTimes(observer,elevation) + '<br>' ;

	observer.day++ ;
	var arrSunRiseSet = sunrise(observer,elevation) ;
	observer.day-- ;





	//find the Moon rise and set times
	var moonTimesString = moonTimes(observer,elevation) + '<br>' ;

	observer.day++ ;
	var arrMoonRiseSet = moonrise(observer,elevation) ;
	observer.day-- ;










	var arrSunPos = topoSunPos(observer,elevation);
	var sunAltitude = arrSunPos[3] ;
	var sunAzmoth = arrSunPos[4] ;





	var arrMoonPos = topoMoonPos(observer,elevation,false);
	var moonAltitude = arrMoonPos[3] ;
	var moonAzmoth = arrMoonPos[4] ;





 	var qiblaSun = qibla-sunAzmoth ;
 	var qiblaMoon = qibla-moonAzmoth ;

  msgBelowHorizon = 'الآن تحت الأفق' ;



	if (qibla>=180) var qiblaSunShadow=qibla-180; else var qiblaSunShadow=qibla+180;
	if (qibla>=180) var qiblaMoonShadow=qibla-180; else var qiblaMoonShadow=qibla+180;


	var timeMoonShadow=timeSunShadow=timeSun=timeMoon='==:==' ;
	var timeMoonCount=0 ; var timeSunCount=0 ; var timeMoonShadowCount=0 ; var timeSunShadowCount=0 ;
	var timeMoonMin=24 ; var timeSunMin=24 ; var timeMoonShadowMin=24 ; var timeSunShadowMin=24 ;
	var timeMoonMax=0 ; var timeSunMax=0 ; var timeMoonShadowMax=0 ; var timeSunShadowMax=0 ;


	var minHH=23.99 ;
	var maxHH=0 ;
	if (arrMoonRiseSet[0]>=0) { minHH=Math.min(minHH,arrMoonRiseSet[0]) ; maxHH=Math.max(maxHH,arrMoonRiseSet[0]) ; }
	if (arrMoonRiseSet[1]>=0)	{ minHH=Math.min(minHH,arrMoonRiseSet[1]) ; maxHH=Math.max(maxHH,arrMoonRiseSet[1]) ; }
 	if (arrMoonRiseSet[0]<0 || arrMoonRiseSet[1]<0 || arrMoonRiseSet[0]>arrMoonRiseSet[1])	{ minHH=0 ; maxHH=23.99 ; }
	if (arrSunRiseSet[0]>=0) { minHH=Math.min(minHH,arrSunRiseSet[0]) ; maxHH=Math.max(maxHH,arrSunRiseSet[0]) ; }
	if (arrSunRiseSet[1]>=0) { minHH=Math.min(minHH,arrSunRiseSet[1]) ; maxHH=Math.max(maxHH,arrSunRiseSet[1]) ; }
 	if (arrSunRiseSet[0]<0 || arrSunRiseSet[1]<0 || arrSunRiseSet[0]>arrSunRiseSet[1])	{ minHH=0 ; maxHH=23.99 ; }
	var minHH=Math.floor(minHH) ;
	var maxHH=Math.floor(maxHH)+1 ;


	for (var hh=minHH; hh<maxHH; hh++)
	 for (var mm=0; mm<60; mm+=2)
	  for (var ss=0; ss<60; ss+=60)
		{
			observer.seconds = ss ;
			observer.minutes = mm ;
			observer.hours = hh ;
			var hhmmss = hh+mm/60+ss/3600 ;
			var arrSunPos = topoSunPos(observer,elevation);
			var arrMoonPos = topoMoonPos(observer,elevation,false);
			if (isMoonUp(arrMoonPos[3]) && qibla>arrMoonPos[4]-3 && qibla<arrMoonPos[4]+3)
				{
					timeMoonCount++ ;
					var timeMoonMin = Math.min(timeMoonMin,hhmmss) ;
					var timeMoonMax = Math.max(timeMoonMax,hhmmss) ;
				}
			if (isSunUp(arrSunPos[3]) && qibla>arrSunPos[4]-3 && qibla<arrSunPos[4]+3)
				{
					timeSunCount++ ;
					var timeSunMin = Math.min(timeSunMin,hhmmss) ;
					var timeSunMax = Math.max(timeSunMax,hhmmss) ;
				}
			if (isMoonUp(arrMoonPos[3]) && qiblaMoonShadow>arrMoonPos[4]-3 && qiblaMoonShadow<arrMoonPos[4]+3)
				{
					timeMoonShadowCount++ ;
					var timeMoonShadowMin = Math.min(timeMoonShadowMin,hhmmss) ;
					var timeMoonShadowMax = Math.max(timeMoonShadowMax,hhmmss) ;
				}
			if (isSunUp(arrSunPos[3]) && qiblaSunShadow>arrSunPos[4]-3 && qiblaSunShadow<arrSunPos[4]+3)
				{
					timeSunShadowCount++ ;
					var timeSunShadowMin = Math.min(timeSunShadowMin,hhmmss) ;
					var timeSunShadowMax = Math.max(timeSunShadowMax,hhmmss) ;
				}
		}

	if (timeMoonCount>0) { var timeMoonValue=(timeMoonMax+timeMoonMin)/2 ; var timeMoon = hmstring(timeMoonValue) ; }
	if (timeSunCount>0) { var timeSunValue=(timeSunMax+timeSunMin)/2 ; var timeSun = hmstring(timeSunValue) ; }
	if (timeMoonShadowCount>0) { var timeMoonShadowValue=(timeMoonShadowMax+timeMoonShadowMin)/2 ; var timeMoonShadow = hmstring(timeMoonShadowValue) ; }
	if (timeSunShadowCount>0) { var timeSunShadowValue=(timeSunShadowMax+timeSunShadowMin)/2 ; var timeSunShadow = hmstring(timeSunShadowValue) ; }


	if (qibla<0) 						qibla+=360;
	if (qiblaMagnetic<0) 		qiblaMagnetic+=360;
	if (qiblaCompass<0) 		qiblaCompass+=360;
	if (qiblaSun<0) 				qiblaSun+=360;
	if (qiblaMoon<0) 				qiblaMoon+=360;
	if (qiblaMoonShadow<0) 	qiblaMoonShadow+=360;
	if (qiblaSunShadow<0) 	qiblaSunShadow+=360;
	if (sunAzmoth<0)				sunAzmoth+=360;
	if (moonAzmoth<0)				moonAzmoth+=360;


	var dayWeek = ( jd0(yearGreg,monthGreg,dayGreg) + 1.5 ) % 7 ;

	var g_strTextPage = '' ;
	g_strTextPage += '\r\n' ;
	g_strTextPage += 'المعلومات هي ليوم :' + spacer6 + daysNames[dayWeek] + spacer8 + 'يوم :' + spacer2 + dayGreg + spacer8 ;
	g_strTextPage += 'شهر :' + spacer2 + monthGreg + spacer8 + 'سنة :' + spacer2 + yearGreg + spacer8 ;
	g_strTextPage += 'ساعة :' + spacer2 + hourGreg + spacer8 + 'دقيقة :' + spacer2 + minuteGreg ;


	var str1 = g_strTextPage ;


	g_strTextPage = '\r\n' ;


	g_strTextPage += 'في هذا اليوم تكون القبلة بنفس إتجاه الشمس وعكس إتجاه ظلها تقريبا في الساعة' + spacer2 + ':' + spacer6 + timeSun + '<br>' ;
	g_strTextPage += 'في هذا اليوم تكون القبلة بنفس إتجاه القمر وعكس إتجاه ظله تقريبا في الساعة' + spacer6 + ':' + spacer6 + timeMoon + '<br>' ;
	g_strTextPage += 'في هذا اليوم تكون القبلة بنفس إتجاه ظل الشمس وعكس إتجاهها تقريبا في الساعة' + spacer1 +':' + spacer6 + timeSunShadow + '<br>' ;
	g_strTextPage += 'في هذا اليوم تكون القبلة بنفس إتجاه ظل القمر وعكس إتجاهه تقريبا في الساعة' + spacer5 + ':' + spacer6 + timeMoonShadow + '<br>' ;

	g_strTextPage += '<hr>\r\n' ;
	g_strTextPage += 'زاوية إتجاه القبلة (بمقياس 360 درجة) نسبة للشمال الجغرافي والدوران مع عقرب الساعة' + spacer4 + ':' + spacer6 + anglestring(qibla) + '<br>' ;
	g_strTextPage += 'زاوية إتجاه القبلة (بمقياس 360 درجة) نسبة للشمال المغناطيسي والدوران مع عقرب الساعة' + spacer1 + ':' + spacer6 + anglestring(qiblaMagnetic) + '<br>' ;
	g_strTextPage += 'زاوية إتجاه القبلة (بمقياس 360 درجة) نسبة لإتجاه الشمس والدوران مع عقرب الساعة' + spacer1 + ':' + spacer4 + anglestring(qiblaSun) + (isSunUp(sunAltitude)?'':spacer2+msgBelowHorizon) + '<br>' ;
	g_strTextPage += 'زاوية إتجاه القبلة (بمقياس 360 درجة) نسبة لإتجاه القمر والدوران مع عقرب الساعة' + spacer4  + ':' + spacer4 + anglestring(qiblaMoon) + (isMoonUp(moonAltitude)?'':spacer2+msgBelowHorizon) + '<br>' ;

	g_strTextPage += '<hr>\r\n' ;
	g_strTextPage += 'زاوية إتجاه الشمال المغناطيسي (بمقياس 360 درجة) باستعمال بوصلة صلاة : ' + spacer6 + anglestring(qiblaCompass) + '<br>' ;
	g_strTextPage += 'زاوية إتجاه الشمال باستعمال بوصلة صلاة بمقياس :' ;
	g_strTextPage += spacer2 + '32درجة=' + (qiblaCompass/360*32).toFixed(1) ;
	g_strTextPage += spacer2 + '36درجة=' + (qiblaCompass/360*36).toFixed(1) ;
	g_strTextPage += spacer2 + '40درجة=' + (qiblaCompass/360*40).toFixed(1) ;
	g_strTextPage += spacer2 + '44درجة=' + (qiblaCompass/360*44).toFixed(1) + '<br>\r\n' ;

	g_strTextPage += '<hr>\r\n' ;
	g_strTextPage += 'زاوية إنحراف الشمس (بمقياس 360 درجة) عن الشمال الجغرافي :' + spacer6 + anglestring(sunAzmoth) + '<br>' ;
	g_strTextPage += 'زاوية إنحراف القمر (بمقياس 360 درجة) عن الشمال الجغرافي' + spacer4 + ':' + spacer6 + anglestring(moonAzmoth) + '<br>' ;
	g_strTextPage += '\r\n' ;
	g_strTextPage += 'زاوية إرتفاع الشمس (بمقياس 360 درجة) عن الأرض :' + spacer6 + anglestring(sunAltitude) + (isSunUp(sunAltitude)?'':spacer6+msgBelowHorizon) + '<br>' ;
	g_strTextPage += 'زاوية إرتفاع القمر (بمقياس 360 درجة) عن الأرض' + spacer4 + ':' + spacer6 + anglestring(moonAltitude) + (isMoonUp(moonAltitude)?'':spacer6+msgBelowHorizon) +  '<br>' ;

	g_strTextPage += '<hr>\r\n' ;
	g_strTextPage += 'زاوية إنحراف الشمال المغناطيسي (بمقياس 360 درجة) عن الشمال الجغرافي' + spacer1 + ':' + spacer6 + anglestring(magneticDeclination) + (magneticDeclination<0?spacer3+'( الإنحراف سالب )':'') + '<br>' ;
	g_strTextPage += '\r\n' ;
	g_strTextPage += 'المسافة الأرضية الى الكعبة بالكيلومترات (كم)' + spacer1 + ':' + spacer6 + distance.toFixed(1) + '<br>' ; 

	g_strTextPage += '<hr>\r\n' ;
	g_strTextPage += sunTimesString ;
	g_strTextPage += moonTimesString ;


	var str2 = g_strTextPage ;


	var g_strTextPage = '\r\n' ;

	g_strTextPage += spacer5 + '<font style="color:brown">'+'شمس'+'</font>' + ' ('+timeSun+')' ;
	g_strTextPage += spacer18 + '<font style="color:brown">'+'قمر'+'</font>' + ' ('+timeMoon+')' ;
	g_strTextPage += '<font style="color:brown">' ;
	g_strTextPage += spacer20 + 'شمال جغرافي' ;
	g_strTextPage += spacer12 + 'شمال مغناطيسي (بوصلة)' ;
	g_strTextPage += spacer16 + 'القبلة' ;
	g_strTextPage += '</font>' ;

	g_strTextPage += '<div align=left id="canvas'+0+'" style="position:relative;left:'+(0)+';top:'+(0)+'">\r\n';
	g_strTextPage += '</div>\r\n' ;


/*
//	g_strTextPage +=	'<br><br><br>\r\n' ;

	var size1X=118; var size1Y=118; 
	var size2X=18; var size2Y=96; 

	var c0PosX=15; var c0PosY=40;
	var c0BG = background.addImageObject("images/qibla/square_colored.png", c0PosX, c0PosY);
	c0BG.width = size1X ; c0BG.height = size1Y ;
	var c0North = background.addImageObject("images/qibla/cronometer_green.png", c0PosX+size1X/2-6, c0PosY+5);
	c0North.width = size2X ; c0North.height = size2Y ;
	c0North.rotation = -qibla ;
	var c0Qibla = background.addImageObject("images/qibla/cronometer_red.png", c0PosX+size1X/2-6, c0PosY+5);
	c0Qibla.width = size2X ; c0Qibla.height = size2Y ;
	c0Qibla.rotation = qiblaCompass ;
	var c0Sun = background.addImageObject("images/qibla/cronometer_yellow.png", c0PosX+size1X/2-6, c0PosY+5);
	c0Sun.width = size2X ; c0Sun.height = size2Y ;
	c0Sun.rotation = qiblaCompass+sunAzmoth+magneticDeclination ;
	var c0Moon = background.addImageObject("images/qibla/cronometer_white.png", c0PosX+size1X/2-6, c0PosY+5);
	c0Moon.width = size2X ; c0Moon.height = size2Y ;
	c0Moon.rotation = qiblaCompass+moonAzmoth+magneticDeclination ;
	var c0Qibla1 = background.addImageObject("images/qibla/cronometer_blue.png", c0PosX+size1X/2-6, c0PosY+5);
	c0Qibla1.width = size2X ; c0Qibla1.height = size2Y ;
	c0Qibla1.rotation = 0  ;


	var c1PosX=165; var c1PosY=40;
	var c1BG = background.addImageObject("images/qibla/square_colored.png", c1PosX, c1PosY);
	c1BG.width = size1X ; c1BG.height = size1Y ;
	var c1North = background.addImageObject("images/qibla/cronometer_red.png", c1PosX+size1X/2-6, c1PosY+5);
	c1North.width = size2X ; c1North.height = size2Y ;
	c1North.rotation = 0 ;
	var c1Qibla = background.addImageObject("images/qibla/cronometer_blue.png", c1PosX+size1X/2-6, c1PosY+5);
	c1Qibla.width = size2X ; c1Qibla.height = size2Y ;
	c1Qibla.rotation = qiblaMagnetic ;


	var c2PosX=315; var c2PosY=40;
	var c2BG = background.addImageObject("images/qibla/square_colored.png", c2PosX, c2PosY);
	c2BG.width = size1X ; c2BG.height = size1Y ;
	var c2North = background.addImageObject("images/qibla/cronometer_green.png", c2PosX+size1X/2-6, c2PosY+5);
	c2North.width = size2X ; c2North.height = size2Y ;
	c2North.rotation = 0 ;
	var c2Qibla = background.addImageObject("images/qibla/cronometer_blue.png", c2PosX+size1X/2-6, c2PosY+5);
	c2Qibla.width = size2X ; c2Qibla.height = size2Y ;
	c2Qibla.rotation = qibla ;


	var c4PosX=615; var c4PosY=40;
	var c4BG = background.addImageObject("images/qibla/square_colored.png", c4PosX, c4PosY);
	c4BG.width = size1X ; c4BG.height = size1Y ;
	if (isSunUp(sunAltitude))
	{
		g_strTextPage += spacer20+spacer1 ;
		var c4Sun = background.addImageObject("images/qibla/cronometer_yellow.png", c4PosX+size1X/2-6, c4PosY+5);
		c4Sun.width = size2X ; c4Sun.height = size2Y ;
		c4Sun.rotation = sunAzmoth-sunAzmoth ;
		var c4Qibla = background.addImageObject("images/qibla/cronometer_blue.png", c4PosX+size1X/2-6, c4PosY+5);
		c4Qibla.width = size2X ; c4Qibla.height = size2Y ;
		c4Qibla.rotation = qiblaSun ;
	}
	else g_strTextPage += spacer11+'الشمس' ;


	var c3PosX=465; var c3PosY=40;
	var c3BG = background.addImageObject("images/qibla/square_colored.png", c3PosX, c3PosY);
	c3BG.width = size1X ; c3BG.height = size1Y ;
	if (isMoonUp(moonAltitude))
	{
		g_strTextPage += spacer18 ;
		var c3Moon = background.addImageObject("images/qibla/cronometer_white.png", c3PosX+size1X/2-6, c3PosY+5);
		c3Moon.width = size2X ; c3Moon.height = size2Y ;
		c3Moon.rotation = moonAzmoth-moonAzmoth ;
		var c3Qibla = background.addImageObject("images/qibla/cronometer_blue.png", c3PosX+size1X/2-6, c3PosY+5);
		c3Qibla.width = size2X ; c3Qibla.height = size2Y ;
		c3Qibla.rotation = qiblaMoon ;
	}
	else g_strTextPage += spacer20+spacer9+'القمر' ;
	g_strTextPage +=	'<br>' ;
*/



//	if (isSunUp(sunAltitude)) g_strTextPage += (spacer14+spacer9) ; else g_strTextPage += (spacer10+'تحت الأفق') ;
//	if (isMoonUp(moonAltitude)) g_strTextPage += (spacer20+spacer7) ; else g_strTextPage += (spacer20+spacer4+'تحت الأفق') ;
//	g_strTextPage +=	'<br>' ;
//	g_strTextPage +=	'<br><br>' ;
	g_strTextPage += spacer4 + '<font style="color:brown">'+'ظل شمس'+'</font>' + ' ('+timeSunShadow+')' ;
	g_strTextPage += spacer13 + '<font style="color:brown">'+'ظل قمر'+'</font>' + ' ('+timeMoonShadow+')' ;
	g_strTextPage += '<font style="color:brown">' ;
	g_strTextPage += spacer16 + 'جنوب جغرافي' ;
	g_strTextPage += spacer11 + 'جنوب مغناطيسي (بوصلة)' ;
	g_strTextPage += '</font>' ;
	g_strTextPage +=	'<br>\r\n' ;


/*
	g_strTextPage += '<img alt="الأزرق = إتجاه القبلة  \r\nالأحمر = إتجاه الشمال المغناطيسي  \r\nالأخضر = إتجاه الشمال الجغرافي  \r\nالأبيض = إتجاه القمر  \r\nالأصفر = إتجاه الشمس" src="images/qibla/square1.png" style="position:absolute;left:'+c0PosX+';top:'+(c0PosY-14)+';width:'+size1X+';height:'+size1Y+';" />\r\n' ;
	g_strTextPage += '<img alt="الأزرق = إتجاه القبلة  \r\nالأحمر = إتجاه الشمال المغناطيسي  \r\nالقهوائي = إتجاه الشمال والجنوب المغناطيسي" src="images/qibla/square1.png" style="position:absolute;left:'+c1PosX+';top:'+(c1PosY-14)+';width:'+size1X+';height:'+size1Y+';" />\r\n' ;
	g_strTextPage += '<img alt="الأزرق = إتجاه القبلة  \r\nالأخضر = إتجاه الشمال الجغرافي  \r\nالقهوائي = إتجاه الشمال والجنوب الجغرافي" src="images/qibla/square1.png" style="position:absolute;left:'+c2PosX+';top:'+(c2PosY-14)+';width:'+size1X+';height:'+size1Y+';" />\r\n' ;
	g_strTextPage += '<img alt="الأزرق = إتجاه القبلة  \r\nالأبيض = إتجاه القمر  \r\nالقهوائي = إتجاه القمر وظل القمر" src="images/qibla/square1.png" style="position:absolute;left:'+c3PosX+';top:'+(c3PosY-14)+';width:'+size1X+';height:'+size1Y+';" />\r\n' ;
	g_strTextPage += '<img alt="الأزرق = إتجاه القبلة  \r\nالأصفر = إتجاه الشمس  \r\nالقهوائي = إتجاه الشمس وظل الشمس" src="images/qibla/square1.png" style="position:absolute;left:'+c4PosX+';top:'+(c4PosY-14)+';width:'+size1X+';height:'+size1Y+';" />\r\n' ;
*/


	g_strTextPage += '\r\n<font style="color:blue">'+'خط أزرق = إتجاه القبلة'+spacer2+'</font>،'+spacer2 ;
	g_strTextPage += '<font style="color:yellow">'+'خط أصفر = إتجاه الشمس'+spacer2+'</font>،'+spacer2 ;
	g_strTextPage += '<font style="color:white">'+'خط أبيض = إتجاه القمر'+spacer2+'</font>،'+spacer2 ;
	g_strTextPage += '<font style="color:green">'+'خط أخضر = إتجاه الشمال الجغرافي'+'<br>'+'</font>' ;
	g_strTextPage += '<font style="color:red">'+'خط أحمر = إتجاه الشمال المغناطيسي (إتجاه مؤشر البوصلة)'+spacer2+'</font>،'+spacer2 ;
	g_strTextPage += '<font style="color:brown">'+'خط قهوائي = احداثيات الدائرة والرسم'+'</font>' ;
	g_strTextPage += '</font>\r\n' ;


	var str3 = g_strTextPage ;





	document.body.style.width = "750px" ;
	document.body.style.height = "690px" ;
	document.body.style.background = "lightblue" ;

	document.getElementById('textArea').dir = "rtl" ;
	document.getElementById('textArea').align = "right" ;
	document.getElementById('textArea').style.font = "bold small Times" ;
	document.getElementById('textArea').style.color = "#0055CC" ;
	document.getElementById('textArea').innerHTML = '<b>' + str3 + '<hr color="red">' + str1 + '<hr>' + str2 + '</b>' ;



	var size1X=118; var size1Y=118; 
	var size2X=18; var size2Y=96; 
	var paper = Raphael("canvas"+0,730,120) ;

	var c0PosX=10; var c0PosY=0;
	paper.image(installationPath()+'/images/qibla/square_colored.png',c0PosX,c0PosY,size1X,size1Y);
	paper.image(installationPath()+'/images/qibla/cronometer_green.png',c0PosX+size1X/2-9,c0PosY+9,size2X,size2Y).attr({transform:'r'+Math.round(-qibla)});
	paper.image(installationPath()+'/images/qibla/cronometer_red.png',c0PosX+size1X/2-9,c0PosY+9,size2X,size2Y).attr({transform:'r'+Math.round(qiblaCompass)});
	paper.image(installationPath()+'/images/qibla/cronometer_yellow.png',c0PosX+size1X/2-9,c0PosY+9,size2X,size2Y).attr({transform:'r'+Math.round(qiblaCompass+sunAzmoth+magneticDeclination)});
	paper.image(installationPath()+'/images/qibla/cronometer_white.png',c0PosX+size1X/2-9,c0PosY+9,size2X,size2Y).attr({transform:'r'+Math.round(qiblaCompass+moonAzmoth+magneticDeclination)});
	paper.image(installationPath()+'/images/qibla/cronometer_blue.png',c0PosX+size1X/2-9,c0PosY+9,size2X,size2Y).attr({transform:'r'+Math.round(0)});

	var c1PosX=155; var c1PosY=0;
	paper.image(installationPath()+'/images/qibla/square_colored.png',c1PosX,c1PosY,size1X,size1Y);
	paper.image(installationPath()+'/images/qibla/cronometer_red.png',c1PosX+size1X/2-9,c1PosY+9,size2X,size2Y).attr({transform:'r'+Math.round(0)});
	paper.image(installationPath()+'/images/qibla/cronometer_blue.png',c1PosX+size1X/2-9,c1PosY+9,size2X,size2Y).attr({transform:'r'+Math.round(qiblaMagnetic)});

	var c2PosX=300; var c2PosY=0;
	paper.image(installationPath()+'/images/qibla/square_colored.png',c2PosX,c2PosY,size1X,size1Y);
	paper.image(installationPath()+'/images/qibla/cronometer_green.png',c2PosX+size1X/2-9,c2PosY+9,size2X,size2Y).attr({transform:'r'+Math.round(0)});
	paper.image(installationPath()+'/images/qibla/cronometer_blue.png',c2PosX+size1X/2-9,c2PosY+9,size2X,size2Y).attr({transform:'r'+Math.round(qibla)});

	var c3PosX=445; var c3PosY=0;
	if (isMoonUp(moonAltitude))
	{
		paper.image(installationPath()+'/images/qibla/square_colored.png',c3PosX,c3PosY,size1X,size1Y);
		paper.image(installationPath()+'/images/qibla/cronometer_white.png',c3PosX+size1X/2-9,c3PosY+9,size2X,size2Y).attr({transform:'r'+Math.round(moonAzmoth-moonAzmoth)});
		paper.image(installationPath()+'/images/qibla/cronometer_blue.png',c3PosX+size1X/2-9,c3PosY+9,size2X,size2Y).attr({transform:'r'+Math.round(qiblaMoon)});
	}
	else paper.image(installationPath()+'/images/qibla/square_colored_moonset.png',c3PosX,c3PosY,size1X,size1Y);

	var c4PosX=590; var c4PosY=0;
	if (isSunUp(sunAltitude))
	{
		paper.image(installationPath()+'/images/qibla/square_colored.png',c4PosX,c4PosY,size1X,size1Y);
		paper.image(installationPath()+'/images/qibla/cronometer_yellow.png',c4PosX+size1X/2-9,c4PosY+9,size2X,size2Y).attr({transform:'r'+Math.round(sunAzmoth-sunAzmoth)});
		paper.image(installationPath()+'/images/qibla/cronometer_blue.png',c4PosX+size1X/2-9,c4PosY+9,size2X,size2Y).attr({transform:'r'+Math.round(qiblaSun)});
	}
	else paper.image(installationPath()+'/images/qibla/square_colored_sunset.png',c4PosX,c4PosY,size1X,size1Y);
}







