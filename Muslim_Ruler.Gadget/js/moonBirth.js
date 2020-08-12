




 	var pointsCount = 240 ;
 	var Xpoints = 20 ;
 	var Ypoints = 12 ;

	var moonIconNot = 'not.png' ;
	var moonIconImpossible = 'impossible.png' ;
	var moonIconPowered = 'powered.png' ;
	var moonIconSharp = 'sharp.png' ;
	var moonIconNormal = 'normal.png' ;
	var moonIconUncertain = 'uncertain.png' ;
	var moonIconManual = 'manual.png' ;
	var moonIconUnknown = 'unknown.png' ;





function showMoonBirthData(showType)
{

	var htmlInit = '';
	htmlInit += '\r\n<html><head>\r\n<meta http-equiv="Content-Type" content="text\/html" charset="windows-1256">\r\n' ;
	if (showType==2) htmlInit += '<script src="'+installationPath()+'\\libs\\raphael.js" language="javascript" type="text\/javascript"><\/script>\r\n' ;
	htmlInit += '<\/head><body dir=rtl>\r\n' ;


	if (showType==3) horizonMethod = 'World' ;

	var yearHijri = hijriYear1000.value + hijriYear100.value + hijriYear10.value + hijriYear1.value ;
	var monthHijri = Number(hijriMonth.value) + 1 ;

	var jdMoonBirth = moonHijri(yearHijri, monthHijri, tz) ;

	if (showType==1 || showType==2 ) var nextm = jdToDate(jdMoonBirth);
	else var nextm = jdToDate(jdMoonBirth+tz/60/24);
//	var dateMoonBirth = nextm[7] ;

	if ( showType==3 ) var htmlFilename = "moonBirth_"+nextm[0]+((nextm[1]<10)?"0":"")+nextm[1]+((nextm[2]<10)?"0":"")+nextm[2]+"_"+yearHijri+((monthHijri<10)?"0":"")+monthHijri+"_tempfile.html";
	else var htmlFilename = "moonBirth_tempfile.html";
	var location = SettingsManager.getValue("Home", "location")
	
	
	var dataInit = '' ;
	dataInit += '<b><div style="color:3030E0;;font-size:14pt;">' + 'القمر المولود في الساعة' + spacer2 ;
	dataInit += (nextm[4]<10?"0"+nextm[4]:nextm[4]) + ':' + (nextm[5]<10?"0"+nextm[5]:nextm[5]) ;
	dataInit += spacer2 + 'في يوم' + spacer2 ;
	dataInit += daysNames[nextm[3]] + spacer2 + nextm[2] + spacer1 + '-' + spacer1 + monthNames[nextm[1]-1] + spacer1 + '-' + spacer1 + nextm[0] ;
	if (showType==3) dataInit += spacer4 + "( حسب توقيت جرينتش )" ;
	if (showType==1 || showType==2) dataInit += spacer7 + 'في مدينة'+ spacer2 + location ;
	if (showType==2 || showType==3) dataInit += '<br>' + "الشهر الهجري : " + spacer3 + hijriMonthNames[monthHijri-1] + spacer3 + "-" + spacer3 + yearHijri + '<br>' ;
	dataInit += '</div></b>' ;


	if (showType==2) dataInit += '<br>' ;

	if (showType==3) var distanceData = [ '-:-' , '-:-' ] ;
	else var distanceData = distanceHorizonToHours(1);

	if ( showType==1 || showType==2 )
	{
		dataInit += '\r\n<u><b>' + 'تضبيطات الأفق :' + '</u></b>' ;
		if ( horizonMethod == 'None' ) dataInit += spacer3 + 'غير مطلوبة' ;
		else 
		{
			dataInit += spacer3 + 'شمال= ' + horizonNorth + 'كم' ;
			dataInit += spacer3 + 'شرق= ' + horizonEast + 'كم' + ' (' + distanceData[0] + 'ساعة)' ;
			dataInit += spacer3 + 'جنوب= ' + horizonSouth + 'كم' ;
			dataInit += spacer3 + 'غرب= ' + horizonWest +  'كم' + ' (' + distanceData[1] + 'ساعة)' ;
		}
		dataInit += spacer5 + '<u><b>' + 'تضبيطات الرؤية= ' + arabicTrans(hijriCalcMethod) + '</u></b>' ;
	}

	var daysCount = 5 ;

	if (horizonMethod != 'None') var horizonMoonBirth = daysHorizonVisibility(daysCount, jdMoonBirth, g_dblLongDeg, g_dblLatDeg, showType) ;

	var str = dataInit + '\r\n' ;

	for (var i=0; i<daysCount; i++)
	{
		var moonData = moonBirthData(jdMoonBirth+i, g_dblLongDeg, g_dblLatDeg, false) ;
		//var dateSunSet = jdToDate(moonData[1])[7] ;

		var dateMoonCheck = jdToDate(moonData[7]) ;

		if ( horizonMethod == 'None' )
		{
			var moonVis = [ isVisible(moonData[6]) , moonData[6] ] ;
			var horizVis = 'غير مطلوب' ;
		}
		else
		{
			var moonHighestVis 		= horizonMoonBirth[10*i+0] ;
			var moonNormalEyes 		= horizonMoonBirth[10*i+1] ;
			var moonSharpEyes 		= horizonMoonBirth[10*i+2] ;
			var moonPoweredEyes 	= horizonMoonBirth[10*i+3] ;
			var moonImpossible 		= horizonMoonBirth[10*i+4] ;
			var moonNotExist 			= horizonMoonBirth[10*i+5] ;
			var moonUncertain 		= horizonMoonBirth[10*i+6] ;
			var moonUnknown		 		= horizonMoonBirth[10*i+7] ;
			var moonManual		 		= horizonMoonBirth[10*i+8] ;
			var moonClosest				= horizonMoonBirth[10*i+9].split(':') ;
//			if (moonHighestVis=='Manual')
//			{
//				var moonManual = pointsCount - moonNormalEyes - moonSharpEyes - moonPoweredEyes - moonImpossible - moonNotExist - moonUncertain - moonUnknown;
//				if (moonManual<0) moonManual += moonUncertain ;
//			}
//			if (moonHighestVis=='Manual') var moonManual = pointsCount - moonNormalEyes - moonSharpEyes - moonPoweredEyes - moonImpossible - moonNotExist - moonUncertain  - moonUnknown ;
//			else var moonManual = 0 ;
			var moonVis = moonVisibility(moonData[6], moonHighestVis) ;
			if ( moonData[6]==moonHighestVis && moonData[6]!='Not Exist' ) var moonClosest = '0:0:0:0:0:0:0:0'.split(':') ;
			var horizVis = arabicTrans(moonHighestVis) ;
		}

		if (hijriCalcMethod == 'Math')
		{
			hijri = gregToHijri(dateMoonCheck[0],dateMoonCheck[1],dateMoonCheck[2]);
			hijriCount = hijri[2]<9?hijri[2]:"0";
		}
		else if ( moonVis[0]=='Yes' ) hijriCount += 1 ;

		var g_text = '' ;

		if ( showType==1 ) var textcolor = '#0055CC' ;
		else var textcolor = 'black' ;

		g_text += '<table width=930 style="color:'+textcolor+'"><tr><td>\r\n' ;

		g_text += '<hr color="darkgreen">' ;

		if ( showType==2 || showType==3 ) g_text += '<br>' ;
		g_text += '<b><div style="color:3030E0;;font-size:14pt;">' ;
		g_text += 'مساء يوم' + spacer2 + daysNames[dateMoonCheck[3]] + spacer2 + dateMoonCheck[2] + spacer1 + '-' + spacer1 + monthNames[dateMoonCheck[1]-1] + spacer1 + '-' + spacer1 + dateMoonCheck[0] ;
		g_text += spacer10 + '(' + spacer3 + "رؤية هلال الشهر الهجري : " + spacer3 + hijriMonthNames[monthHijri-1] + spacer3 + "-" + spacer3 + yearHijri + spacer3 + ')'
		g_text += '</div></b>' ;

		g_text += '<u>' + 'وقت حساب رؤية الهلال :' + '</u>' ;

		if ( showType==1 || showType==2 )
		{
			g_text += spacer6 + 'في مدينتا= ' + (dateMoonCheck[4]<10?"0"+dateMoonCheck[4]:dateMoonCheck[4]) + ':' + (dateMoonCheck[5]<10?"0"+dateMoonCheck[5]:dateMoonCheck[5]) ;
			g_text += spacer1 + '(' + Math.abs(moonData[8]) + spacer1 + 'دقيقة ' ;
			if (moonData[8]>=0) g_text += 'بعد' ; else g_text += 'قبل' ;
			g_text += ' غروب شمس مدينتنا)' ;
		}

		g_text += spacer6 + 'في نقاط الأفق= ' ;
		if ( horizonMethod != 'None' )
		{
			g_text += 'عند وقت غروب شمس كل موقع' ;
			g_text += spacer1 + '(' + Math.abs(moonData[8]) + spacer1 + 'دقيقة ' ;
			if (moonData[8]>=0) g_text += 'بعد' ; else g_text += 'قبل' ;
			g_text += ' الغروب)' ;
		}
		else g_text += 'الأفق غير مطلوب' ;
		g_text += '<br>' ;

		g_text += '\r\n' ;

		if ( showType==1 || showType==2 )
		{
			g_text += 'بقاء= ' + hmstring(moonData[5]/60) + 'ساعة' ;
			g_text += spacer4 + 'إضاءة= ' + moonData[2] +'%' ;
			g_text += spacer4 + 'إرتفاع= ' + anglestring(moonData[3]) ;
			g_text += spacer4 + 'عمر= ' + Math.floor(moonData[4]/24) + 'يوم' + hmstring(moonData[4]-Math.floor(moonData[4]/24)*24) + 'ساعة' ;
			g_text += spacer4 + 'موقع= ' + anglestring(moonData[9]) ;
			g_text += spacer4 + 'البعد عن الشمس= ' + anglestring(moonData[10]-moonData[9]) + '<br>' ;
			g_text += '\r\n' ;
		}
	

		if ( horizonMethod != 'None' )
		{

			g_text += '<u>' + 'رؤية الافق (' + pointsCount + ' موقع) :' + '</u>' ;
			g_text += spacer2 + 'عين مجردة=' + moonNormalEyes ;
			g_text += spacer2 + 'عين حادة=' + moonSharpEyes ;
			g_text += spacer2 + 'عين مسلحة=' + moonPoweredEyes ;
			g_text += spacer2 + 'موجود ولا يرى=' + moonImpossible ;
			g_text += spacer2 + 'غير موجود=' + moonNotExist ;
			g_text += spacer2 + 'غير معروف=' + moonUnknown ;
			g_text += spacer2 + 'تحديد يدوي=' + moonManual ;
			g_text += spacer2 + 'غير أكيد=' + moonUncertain + '<br>' ;

			if ( showType==1 || showType==2 )
			{
				g_text += '<u>' + 'أقرب أعلى رؤية بالأفق (كم):' + '</u>' ;
				g_text += spacer1 + 'شمال=' 		+ moonClosest[0] + (moonClosest[0]>999?'':spacer1) + (moonClosest[0]>99?'':spacer1) ;
				g_text += spacer1 + 'شمال:شرق=' + moonClosest[1] + (moonClosest[1]>999?'':spacer1) + (moonClosest[1]>99?'':spacer1) ;
				g_text += spacer1 + 'شرق=' 			+ moonClosest[2] + (moonClosest[2]>999?'':spacer1) + (moonClosest[2]>99?'':spacer1) ;
				g_text += spacer1 + 'شرق:جنوب=' + moonClosest[3] + (moonClosest[3]>999?'':spacer1) + (moonClosest[3]>99?'':spacer1) ;
				g_text += spacer1 + 'جنوب=' 		+ moonClosest[4] + (moonClosest[4]>999?'':spacer1) + (moonClosest[4]>99?'':spacer1) ;
				g_text += spacer1 + 'جنوب:غرب=' + moonClosest[5] + (moonClosest[5]>999?'':spacer1) + (moonClosest[5]>99?'':spacer1) ;
				g_text += spacer1 + 'غرب=' 			+ moonClosest[6] + (moonClosest[6]>999?'':spacer1) + (moonClosest[6]>99?'':spacer1) ;
				g_text += spacer1 + 'غرب:شمال=' + moonClosest[7] + '<br>' ;
			}
		}
		else g_text += spacer2 + 'معلومات الأفق غير مطلوبة حسب تضبيطات رؤية الهلال' + '<br>' + '<br>' ;


		if ( showType==1 || showType==2 )
		{
			var visibilityArray = moonData[6].split('-') ;
			g_text += 'الرؤية في مدينتنا=' + '<b><u>' + arabicTrans(visibilityArray[0]) ;
			if ( visibilityArray.length > 1 )  g_text += ' أو ' + arabicTrans(visibilityArray[1]) ;
			g_text += '</b></u>' ;
		}


		g_text += spacer2 + 'أعلى رؤية بالأفق=' + '<b><u>' + arabicTrans(horizVis) + '</b></u>' ;

		if ( showType==1 || showType==2 )
		{
			moonVis[1] = visibilityUncertain(moonVis[1]) ;
			g_text += spacer2 + 'الرؤية النهائية=' + '<b><u>' + arabicTrans(moonVis[1]) + '</b></u>' ;
			g_text += spacer2 + 'مطابق لرؤية الهجري=' + '<b><u>' + arabicTrans(moonVis[0]) + '</b></u>' ;
			if (moonVis[0]=='Yes')
			g_text += spacer2 + 'اليوم الهجري=' + '<b><u>' + (hijriCount<=0?"0":hijriCount + spacer1 + hijriMonthNames[monthHijri-1]) + '</b></u>' ;
		}
	
		g_text += '</td><td>' ;

		if ( showType==1 || showType==2 )
		{
			var observer = jd2observer(moonData[7],tz,g_dblLongDeg,g_dblLatDeg);
			//if ( showType==1 ) g_text += showMoon(observer,i+1,855,-120+0*(i),56,0,false);
			//if ( showType==2 ) g_text += showMoon(observer,i+1,40,-120+0*(i),56,0,false);
			if ( showType==1 )
			{
				g_text += '<div id="canvas'+i+'" style="position:relative;left:'+(65)+';top:'+(-25)+'">\r\n';
				g_text += '</div>\r\n' ;
			}
			if ( showType==2 ) 
			{
				g_text += '<div id="canvas'+i+'" style="position:relative;left:'+(50)+';top:'+(-15)+'">\r\n';
				g_text += showMoon(observer,i,000,000,56,0,false) ;
				g_text += '</div>\r\n' ;
			}
		}

		g_text += '</td></tr></table>\r\n' ;

		if ( showType==2 || showType==3 ) g_text += showMapGraphics(i,g_dblLongDeg,g_dblLatDeg,moonData,showType) ;

		str += g_text ;
	}



	if ( showType==1 )
	{
		document.body.style.width = "875px" ;
		document.body.style.height = "750px" ;
		document.body.style.background = "lightblue" ;

		document.getElementById('textArea').dir = "rtl" ;
		document.getElementById('textArea').align = "right" ;
		document.getElementById('textArea').style.font = "normal small Times" ;
		document.getElementById('textArea').style.color = "#0055CC" ;
		document.getElementById('textArea').innerHTML = str ;
		for (var i=0; i<daysCount; i++) 
		{
			var observer = jd2observer(moonData[7]-daysCount+i+1,tz,g_dblLongDeg,g_dblLatDeg);
			showMoon(observer,i,000,000,56,0,true) ;
		}
	}
	else
	{
		var str3 = htmlInit + str + '</body></html>\r\n' ;
		showHTML( str3 , htmlFilename , true ) ;
	}

	quickenDataSave();
}




/*
function showMoonBirthGraphics(jdDate,tz,longitude,latitude,moonID,showFlag)
{
	var moonID				=	moonID+1;
	var moonPosX			=	-10;
	var moonPosY			=	4+0*(moonID-1);
	var moonSize			=	56;
	var rotationSteps	=	0;
	var obs1 = jd2observer(jdDate,tz,longitude,latitude);
	var html = showMoon(obs1,moonID,moonPosX,moonPosY,moonSize,rotationSteps,showFlag);
	return html ;
}
*/






var mapHorizionVisibility = [] ;
var horizonMoonVisi = [] ;

function daysHorizonVisibility(daysCount, jdMoonBirth, cityLong, cityLat, mapFlag)
{
	var daysHorizonVisi = [] ;
	var	horizonMoonBirth1 = [] ;
	var	horizonMoonBirth2 = [] ;
	var	horizonMoonBirth3 = [] ;
	var	horizonMoonBirth4 = [] ;
	var	horizonMoonBirth5 = [] ;
	var	horizonMoonBirth6 = [] ;
	var	horizonMoonBirth7 = [] ;
	var	horizonMoonBirth8 = [] ;
	var	horizonMoonBirth9 = [] ;
	var	horizonMoonBirth10 = [] ;
	var	horizonMoonBirth11 = [] ;
	for (var p=0; p<=pointsCount; p++) horizonMoonBirth1[p] = 'No' ;

	if (mapFlag==3) var horizPoints = pointsHorizonLinear(Xpoints,Ypoints) ;
	else var horizPoints = pointsHorizonArray(cityLong, cityLat, horizonEast, horizonWest, horizonSouth, horizonNorth) ;

	for (var i=0; i<daysCount; i++)
	{
		var exist = false ;
		var length = Math.floor(horizonMoonVisi.length/11) ;
		var index = Number(jdMoonBirth+i)+Number(cityLong)+Number(cityLat) ;
		if (mapFlag==1)
		{
			for (var j=0 ; j<length ; j++)
			{
				if ( index==horizonMoonVisi[11*j+0] )
				{
					var moonHighestVis 	= 			 horizonMoonVisi[11*j+1] ;
					var moonNormalEyes 	= Number(horizonMoonVisi[11*j+2]) ;
					var moonSharpEyes 	= Number(horizonMoonVisi[11*j+3]) ;
					var moonPoweredEyes = Number(horizonMoonVisi[11*j+4]) ;
					var moonImpossible 	= Number(horizonMoonVisi[11*j+5]) ;
					var moonNotExist 		= Number(horizonMoonVisi[11*j+6]) ;
					var moonUncertain		= Number(horizonMoonVisi[11*j+7]) ;
					var moonUnknown			= Number(horizonMoonVisi[11*j+8]) ;
					var moonManual			= Number(horizonMoonVisi[11*j+9]) ;
					var moonClosest			= 			 horizonMoonVisi[11*j+10] ;
					var exist = true ;
					j = length ;
				}
			}
		}
		if (!exist)
		{
			var moonNormalEyes=0 ;
			var moonSharpEyes=0 ;
			var moonPoweredEyes=0 ;
			var moonImpossible=0 ;
			var moonNotExist=0 ;
			var moonUncertain=0 ;
			var moonUnknown=0 ;
			var moonManual=0 ;
			var moonClosest16Dir=[] ;
			var moonClosest8Dir=[] ;
			for (var p=0; p<16; p++) moonClosest16Dir[p]=99999 ;
			for (var p=1; p<=pointsCount; p++)
			{
				var visible		 	= horizonMoonBirth1[p] ;
				var visibility 	= horizonMoonBirth2[p] ;
				var angle		 		= horizonMoonBirth3[p] ;
				var dist			 	= horizonMoonBirth4[p] ;
				if ( (visibility!='Normal Eyes' && mapFlag==1) || mapFlag==2 || mapFlag==3 )
				{
					var angle	= horizPoints[4*p+0] ;
					var dist 	= horizPoints[4*p+1] ;
					var lon  	= horizPoints[4*p+2] ;
					var lat  	= horizPoints[4*p+3] ;
					var moonData = moonBirthVisibilityData(jdMoonBirth+i, lon, lat, false) ;
					var visible = moonData[0] ;
					var visibility = moonData[1] ;
					var moonIllumFrac = moonData[2] ;
					var t_moonAltitude = moonData[3] ;
					var ageMoonValue = moonData[4] ;
					var availableMoonValue = moonData[5] ;
					var jdMoonCheck = moonData[6] ;
					var t_moonAzmoth = moonData[7] ;
					var sunAzmoth = moonData[8] ;
					horizonMoonBirth1[p] = visible ;
					horizonMoonBirth2[p] = visibility ;
					horizonMoonBirth3[p] = angle ;
					horizonMoonBirth4[p] = dist ;
					horizonMoonBirth5[p] = moonIllumFrac ;
					horizonMoonBirth6[p] = t_moonAltitude ;
					horizonMoonBirth7[p] = ageMoonValue ;
					horizonMoonBirth8[p] = availableMoonValue ;
					horizonMoonBirth9[p] = jdMoonCheck ;
					horizonMoonBirth10[p] = t_moonAzmoth ;
					horizonMoonBirth11[p] = sunAzmoth ;
				}
				if (visibility.split('-').length>1)
				{
					moonUncertain++ ;
					visibility = visibilityUncertain(visibility) ;
				}
				switch (visibility)
				{
					case	'Not Exist'		:	moonNotExist++ 		;  break ;
					case	'Impossible'	:	moonImpossible++ 	;  break ;
					case	'Powered Eyes':	moonPoweredEyes++ ;  break ;
					case	'Sharp Eyes'	:	moonSharpEyes++ 	;  break ;
					case	'Normal Eyes'	:	moonNormalEyes++ 	;  break ;
					case	'Manual'			:	moonManual++ 			;  break ;
					case	'Unknown'			:	moonUnknown++ 		;  break ;
				}
			}
			if (moonUnknown>0) 			var moonHighestVis = 'Unknown' 			;
			if (moonUncertain>0) 		var moonHighestVis = 'Uncertain' 		;
			if (moonNotExist>0) 		var moonHighestVis = 'Not Exist' 		;
			if (moonImpossible>0) 	var moonHighestVis = 'Impossible' 	;
			if (moonPoweredEyes>0) 	var moonHighestVis = 'Powered Eyes' ;
			if (moonSharpEyes>0) 		var moonHighestVis = 'Sharp Eyes' 	;
			if (moonNormalEyes>0) 	var moonHighestVis = 'Normal Eyes' 	;
			if (moonManual>0) 			var moonHighestVis = 'Manual' 			;
			for (var p=1; p<=pointsCount; p++)
				if ( moonHighestVis==horizonMoonBirth2[p] && moonHighestVis!='Not Exist' && moonHighestVis!='Uncertain' && moonHighestVis!='Unknown' )
				{
					var angle = Number(horizonMoonBirth3[p]) ;
					var distance 	= Number(horizonMoonBirth4[p]) ;
					moonClosest16Dir[angle/22.5] = Math.min(distance ,moonClosest16Dir[angle/22.5] ) ;
				}
			for (var p=0; p<4; p++)
			{
				var least=moonClosest16Dir[4*p+1] ;
				for (var j=2; j<4; j++) var least = Math.min(moonClosest16Dir[4*p+j],least) ;
				moonClosest8Dir[2*p+0]=moonClosest16Dir[4*p+0] ;
				moonClosest8Dir[2*p+1]=least ;
			}
			var moonClosest = '' ;
			for (var p=0; p<8; p++) moonClosest += (moonClosest8Dir[p]==99999?'---':Math.round(moonClosest8Dir[p])) + ':' ;
			horizonMoonVisi[11*length+0] = index ;
			horizonMoonVisi[11*length+1] = moonHighestVis ;
			horizonMoonVisi[11*length+2] = moonNormalEyes ;
			horizonMoonVisi[11*length+3] = moonSharpEyes ;
			horizonMoonVisi[11*length+4] = moonPoweredEyes ;
			horizonMoonVisi[11*length+5] = moonImpossible ;
			horizonMoonVisi[11*length+6] = moonNotExist ;
			horizonMoonVisi[11*length+7] = moonUncertain ;
			horizonMoonVisi[11*length+8] = moonUnknown ;
			horizonMoonVisi[11*length+9] = moonManual ;
			horizonMoonVisi[11*length+10] = moonClosest ;
			if (mapFlag==2 || mapFlag==3)
			{
				for (var p=1; p<=pointsCount; p++)
				{
					mapHorizionVisibility[pointsCount*10*i+10*p+0-10] = horizPoints[4*p+2] ; // lon
					mapHorizionVisibility[pointsCount*10*i+10*p+1-10] = horizPoints[4*p+3] ; // lat
					mapHorizionVisibility[pointsCount*10*i+10*p+2-10] = horizonMoonBirth2[p] ; // visibility
					mapHorizionVisibility[pointsCount*10*i+10*p+3-10] = horizonMoonBirth5[p] ; // moonIllumFrac
					mapHorizionVisibility[pointsCount*10*i+10*p+4-10] = anglestring(horizonMoonBirth6[p]) ; // t_moonAltitude
					mapHorizionVisibility[pointsCount*10*i+10*p+5-10] = Math.floor(horizonMoonBirth7[p]/24) + 'يوم' + hmstring(horizonMoonBirth7[p]-Math.floor(horizonMoonBirth7[p]/24)*24) + 'ساعة' ; // ageMoonValue
					mapHorizionVisibility[pointsCount*10*i+10*p+6-10] = hmstring(horizonMoonBirth8[p]/60) + 'ساعة' ; // availableMoonValue
					mapHorizionVisibility[pointsCount*10*i+10*p+7-10] = jd2datetimeString(horizonMoonBirth9[p]+tz/60/24) ; // jdMoonCheck
					mapHorizionVisibility[pointsCount*10*i+10*p+8-10] = anglestring(horizonMoonBirth10[p]) ; // t_moonAzmoth
					mapHorizionVisibility[pointsCount*10*i+10*p+9-10] = anglestring(horizonMoonBirth11[p]-horizonMoonBirth10[p]) ; // azmothDiff = azmothSun - t_moonAzmoth
				}
			}
		}
		daysHorizonVisi[10*i+0] = moonHighestVis ;
		daysHorizonVisi[10*i+1] = moonNormalEyes ;
		daysHorizonVisi[10*i+2] = moonSharpEyes ;
		daysHorizonVisi[10*i+3] = moonPoweredEyes ;
		daysHorizonVisi[10*i+4] = moonImpossible ;
		daysHorizonVisi[10*i+5] = moonNotExist ;
		daysHorizonVisi[10*i+6] = moonUncertain ;
		daysHorizonVisi[10*i+7] = moonUnknown ;
		daysHorizonVisi[10*i+8] = moonManual ;
		daysHorizonVisi[10*i+9] = moonClosest ;
	}
	return daysHorizonVisi ;
}





function showMapGraphics(dayID, cityLong, cityLat, cityMoonData, mapFlag)
{
	var XmapSize = 900 ;
	var YmapSize = 451 ;

	var XmoonSize = 8 ;
	var YmoonSize = 8 ;

	var XmoonText = 12 ;
	var YmoonText = 12 ;

	var XmapCenter = XmapSize/2 ;
	var YmapCenter = YmapSize/2 ;

	var str = '' ;
	str += '<div style="font-size:12pt">' + '\r\n' ;
	str += '<img src="'+moonIconNormal+'" border=2 style="position:relative;top:0;left:0;width:'+XmoonText+';height:'+YmoonText+';" />\r\n' ;
	str += ':'+arabicTrans('Normal Eyes')+spacer4+'\r\n' ;
	str += '<img src="'+moonIconSharp+'" border=2 style="position:relative;top:0;left:0;width:'+XmoonText+';height:'+YmoonText+';" />\r\n' ;
	str += ':'+arabicTrans('Sharp Eyes')+spacer4+'\r\n' ;
	str += '<img src="'+moonIconPowered+'" border=2 style="position:relative;top:0;left:0;width:'+XmoonText+';height:'+YmoonText+';" />\r\n' ;
	str += ':'+arabicTrans('Powered Eyes')+spacer4+'\r\n' ;
	str += '<img src="'+moonIconImpossible+'" border=2 style="position:relative;top:0;left:0;width:'+XmoonText+';height:'+YmoonText+';" />\r\n' ;
	str += ':'+arabicTrans('Impossible')+spacer4+'\r\n' ;
	str += '<img src="'+moonIconNot+'" border=2 style="position:relative;top:0;left:0;width:'+XmoonText+';height:'+YmoonText+';" />\r\n' ;
	str += ':'+arabicTrans('Not Exist')+spacer4+'\r\n' ;
	str += '<img src="'+moonIconManual+'" border=2 style="position:relative;top:0;left:0;width:'+XmoonText+';height:'+YmoonText+';" />\r\n' ;
	str += ':'+arabicTrans('Manual')+spacer4+'\r\n' ;
	str += '<img src="'+moonIconUnknown+'" border=2 style="position:relative;top:0;left:0;width:'+XmoonText+';height:'+YmoonText+';" />\r\n' ;
	str += ':'+arabicTrans('Unknown')+spacer4+'\r\n' ;
	str += '<img src="'+moonIconUncertain+'" border=0 style="position:relative;top:0;left:0;width:'+XmoonText*7+';height:'+(YmoonText+4)+';" />\r\n' ;
	str += ':'+arabicTrans('Uncertain')+'\r\n' ;
	str += '</div>\r\n' ;
	str += '<table dir=ltr><tr><td>\r\n' ;



	if (horizonMethod=='None') pointsCount=0 ;

	if (mapFlag==2) pp = 0 ;
	else pp = 1 ;

	for (var p=pp; p<=pointsCount; p++)
	{
		if (p==0)
		{
			var lon = 								cityLong ;
			var lat = 								cityLat ;
			var visibility = 					cityMoonData[6] ;
			var moonIllumFrac = 			cityMoonData[2] ;
			var t_moonAltitude = 			anglestring(cityMoonData[3]) ; // t_moonAltitude
			var ageMoonValue = 				Math.floor(cityMoonData[4]/24) + 'يوم' + hmstring(cityMoonData[4]-Math.floor(cityMoonData[4]/24)*24) + 'ساعة' ; // ageMoonValue
			var availableMoonValue = 	hmstring(cityMoonData[5]/60) + 'ساعة' ; // availableMoonValue
			var dateMoonCheck = 			jd2datetimeString(cityMoonData[7]+tz/60/24) ; // jdMoonCheck
			var t_moonAzmoth = 				anglestring(cityMoonData[9]) ; // t_moonAzmoth
			var azmothDiff = 					anglestring(cityMoonData[10]-cityMoonData[9]) ; // azmothDiff = azmothSun - t_moonAzmoth
		}
		else
		{
			var lon = 								mapHorizionVisibility[pointsCount*10*dayID+10*p+0-10] ;
			var lat = 								mapHorizionVisibility[pointsCount*10*dayID+10*p+1-10] ;
			var visibility = 					mapHorizionVisibility[pointsCount*10*dayID+10*p+2-10] ;
			var moonIllumFrac = 			mapHorizionVisibility[pointsCount*10*dayID+10*p+3-10] ;
			var t_moonAltitude = 			mapHorizionVisibility[pointsCount*10*dayID+10*p+4-10] ;
			var ageMoonValue = 				mapHorizionVisibility[pointsCount*10*dayID+10*p+5-10] ;
			var availableMoonValue = 	mapHorizionVisibility[pointsCount*10*dayID+10*p+6-10] ;
			var dateMoonCheck = 			mapHorizionVisibility[pointsCount*10*dayID+10*p+7-10] ;
			var t_moonAzmoth = 				mapHorizionVisibility[pointsCount*10*dayID+10*p+8-10] ;
			var azmothDiff = 					mapHorizionVisibility[pointsCount*10*dayID+10*p+9-10] ;
		}

		var Xmoon = - XmoonSize/2 + (lon+180)/360*XmapCenter*2 ;
		var Ymoon = - YmoonSize/2 + (90-lat)/180*YmapCenter*2 ;

		var htmlAlt='' ;
		if (visibility=='Unknown')
		{
			htmlAlt+='\n'+'خط الطول= '+anglestring(lon) ;
			htmlAlt+='\n'+'خط العرض= '+anglestring(lat) ;
			htmlAlt+='\n'+'وقت الرؤية(جرينتش)= ' + 'وقت الغروب مجهول' ;
		}
		else
		{
			htmlAlt+='\n'+'خط الطول= '+anglestring(lon) ;
			htmlAlt+='\n'+'خط العرض= '+anglestring(lat) ;
			htmlAlt+='\n'+'بقاء= '+availableMoonValue ;
			htmlAlt+='\n'+'وقت الرؤية(جرينتش)= '+dateMoonCheck ;
			htmlAlt+='\n'+'إضاءة= '+moonIllumFrac ;
			htmlAlt+='\n'+'ارتفاع= '+t_moonAltitude ;
			htmlAlt+='\n'+'عمر= '+ageMoonValue ;
			htmlAlt+='\n'+'موقع= '+t_moonAzmoth ;
			htmlAlt+='\n'+'بعد عن الشمس= '+azmothDiff ;
		}

		var visibilityArray = visibility.split('-') ;
		if ( visibilityArray.length > 1 )
		{
			var visibility1 = visibilityArray[0] ;
			var visibility2 = visibilityArray[1] ;
			var moonFilename1 = moonFilename(visibility1) ;
			var moonFilename2 = moonFilename(visibility2) ;
			var htmlAlt = 'الرؤية='+arabicTrans(visibility1)+'  أو  '+arabicTrans(visibility2) + htmlAlt ;
			if (moonFilename1!=moonIconUnknown && moonFilename2!=moonIconUnknown)
			{
				str += getMoonHTML(moonFilename1,Xmoon,Ymoon,XmoonSize,YmoonSize/2,htmlAlt) ;
				str += getMoonHTML(moonFilename2,Xmoon,Ymoon+YmoonSize/2,XmoonSize,YmoonSize/2,htmlAlt) ;
			}
		}
		else
		{
			var moonFilename1 = moonFilename(visibility) ;
			var htmlAlt = 'الرؤية='+arabicTrans(visibility) + htmlAlt ;
			str += getMoonHTML(moonFilename1,Xmoon,Ymoon,XmoonSize,YmoonSize,htmlAlt) ;
		}
	}


	str += '<img src="map.png" style="width:'+XmapSize.toFixed(0)+';height:'+YmapSize.toFixed(0)+';" />\r\n' ;
	str += '</td></tr></table>\r\n' ;

	return str ;
}





function pointsHorizonLinear(dimensionX, dimensionY)
{
	var points = [] ;
	var i = 0 ;
	for (var x=1; x<=dimensionX; x++)
	for (var y=1; y<=dimensionY; y++)
	{
		i++;
		points[4*i+0] = 0 ;
		points[4*i+1] = 0 ;
		points[4*i+2] = -171 + (360/dimensionX)*(x-1) ;
		points[4*i+3] = -90 + (180/dimensionY)*(y-0.5) ;
	}
	return points ;
}





function getMoonHTML(filename,posX,posY,sizeX,sizeY,htmlAlt)
{
	var strHTML = '<img title="'+htmlAlt+'" src="'+filename+'" style="position:absolute;margin-left:'+posX.toFixed(0)+';margin-top:'+posY.toFixed(0)+';width:'+sizeX.toFixed(0)+';height:'+sizeY.toFixed(0)+';" />\r\n' ;
	strHTML += '\r\n' ;
	return strHTML
}





function moonFilename(visibility)
{
	var moonFilename1 = moonIconUnknown ;
	switch (visibility)
	{
		case	'Not Exist'		:	var moonFilename1 = moonIconNot ; break ;
		case	'Impossible'	:	var moonFilename1 = moonIconImpossible ; break ;
		case	'Powered Eyes':	var moonFilename1 = moonIconPowered ; break ;
		case	'Sharp Eyes'	:	var moonFilename1 = moonIconSharp ; break ;
		case	'Normal Eyes'	:	var moonFilename1 = moonIconNormal ; break ;
		case	'Manual'			:	var moonFilename1 = moonIconManual ; break ;
	}
	return moonFilename1
}




