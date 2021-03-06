




function showMoonData1()
{
	var yearGreg = Number(gregYear1000.value + gregYear100.value + gregYear10.value + gregYear1.value) ;
	var monthGreg = Number(gregMonth.value) ;
	var dayGreg = Number(gregDay.value) ;
	var hourGreg = Number(gregHour.value) ;
	var minuteGreg = Number(gregMinute.value) ;

	observer.year 		= yearGreg;
	observer.month 		= monthGreg;
	observer.day 			= dayGreg;
	observer.hours 		= hourGreg;
	observer.minutes 	= minuteGreg;
	observer.seconds 	= 0;
	observer.tz 			= tz;

	EclipseDataFile = 'LE'+Number(Math.floor(observer.year/100)*100+1);
	var head = document.getElementsByTagName("head")[0];
 	var script = document.createElement("script");
 	script.setAttribute("language","JavaScript");
 	script.setAttribute("src","eclipses\\"+EclipseDataFile+".js");
 	script.type = "text/javascript";
 	script.defer = false;
	head.appendChild(script);
}





function showMoonData2()
{
	EclipseDataFile = 'SE'+Number(Math.floor(observer.year/100)*100+1);
	var head = document.getElementsByTagName("head")[0];
 	var script = document.createElement("script");
 	script.setAttribute("language","JavaScript");
 	script.setAttribute("src","eclipses\\"+EclipseDataFile+".js");
 	script.type = "text/javascript";
 	script.defer = false;
	head.appendChild(script);
}





function showMoonData3()
{
	var sealevel = (SettingsManager.getValue("Home", "sealevel") == 'true');
	if (sealevel) var elevation = 0 ;
	else var elevation = Number(SettingsManager.getValue("Home", "elevation")) ;

	var jdNow = jd(observer) - tz/60/24 ;

	//Get the dates of the next New and Full Moons
	var mfn = moons(observer.year+(observer.month-2)/12,tz) ;

	//find age of this lunation
	for (var i=0; i<28; i++)
	{
		if (mfn[i] > jdNow) break;
		if (mfn[i] <= jdNow && !(i%2)) var iNew = i;  //find last new Moon
	}

	var jdMoonBirth = mfn[iNew] ;
	var age = jdNow - jdMoonBirth ;
	var dayWeek = ( jdNow - observer.hours/24 - observer.minutes/60/24 + 1.5 ) % 7 ;

	var gt_arrMoonPos = GeoTopo_MoonPos(observer,elevation) ;
	var flag=false ;
	var eclipCoord = ecliptic(gt_arrMoonPos[0],gt_arrMoonPos[1],observer) ;
	var illumFrac = 100.0*(1.0+cosd(gt_arrMoonPos[5]))/2.0;
	var illumFrac = illumFrac.toFixed(2);
	var phase = gt_arrMoonPos[5];
	var strPhaseName = phaseName(Math.round(phase));
	var phase = phase.toFixed(2);
	var nextm = jdToDate(jdMoonBirth);
	if (hijriCalcMethod == 'Math')
		visibilityString = 'غير مطلوبة' ;
	else
	{
		var visibilityArray = moonBirthVisibilityData(jdNow, g_dblLongDeg, g_dblLatDeg, true)[1].split('-') ;
		visibilityString = arabicTrans(visibilityArray[0]) ;
		if ( visibilityArray.length > 1 ) visibilityString += ' أو ' + arabicTrans(visibilityArray[1]) ;
	}
	if (!isMoonUp(gt_arrMoonPos[9])) var flag=true ;
	var location = SettingsManager.getValue("Home", "location")



	g_strTextPage1 += "<div align='right' style='color:3030A0;font-size:medium;'>" + 'معلومات القمر للساعة:' + spacer2 ;
	g_strTextPage1 += (observer.hours<10?"0"+observer.hours:observer.hours) + ':' + (observer.minutes<10?"0"+observer.minutes:observer.minutes) ;
	g_strTextPage1 += spacer2 + 'ليوم' + spacer2 ;
	g_strTextPage1 += daysNames[dayWeek] + spacer2 + observer.day + spacer1 + '-' + spacer1 + monthNames[observer.month-1] + spacer1 + '-' + spacer1 + observer.year ;
	g_strTextPage1 += spacer7 + 'في مدينة'+ spacer2 + location ;
	g_strTextPage1 += '</div>' ;



	g_strTextPage1 += "<div style='color:3030A0;font-size:large;'>" + 'الشكل والعمر ومعلومات أخرى:' + "</div>";
	g_strTextPage1 += spacer9 + spacer6 + 'الولادة:' ;
	g_strTextPage1 += spacer2 + (nextm[4]<10?"0"+nextm[4]:nextm[4]) + ':' + (nextm[5]<10?"0"+nextm[5]:nextm[5]) ;
	g_strTextPage1 += spacer2 + 'في يوم' + spacer2 ;
	g_strTextPage1 += daysNames[nextm[3]] + spacer2 + nextm[2] + spacer1 + '-' + spacer1 + monthNames[nextm[1]-1] + spacer1 + '-' + spacer1 + nextm[0] +'<br>' ;
	g_strTextPage1 += spacer8 + spacer8 + 'العمر:' + spacer2 + age.toFixed(2) + ' يوم' ;
	g_strTextPage1 += spacer12 + "( " + Math.floor(age) + "يوم و " + hmstring((age-Math.floor(age))*24) + "ساعة" + " )" ;
	if (flag) g_strTextPage1 += spacer7 + '(القمر تحت الأفق)' ;
	g_strTextPage1 += '<br>' ;
	g_strTextPage1 += spacer5 + 'الشكل والطور:' + spacer2 + arabicTrans(strPhaseName) ;
	g_strTextPage1 += spacer12 + 'الإضاءة:' + spacer2 + illumFrac + "%" + "<br>" ;
	g_strTextPage1 += spacer5 + 'إمكانية الرؤية:' + spacer2 + visibilityString ;
	g_strTextPage1 += spacer10 + 'الدوران:' + spacer2 + anglestring(phase) + "<br>" ;
	g_strTextPage1 += 'المجموعة النجمية:' + spacer2 + arabicTrans(constellation(jdNow,tz,g_dblLongDeg,g_dblLatDeg)) ;
	g_strTextPage1 += spacer12 + spacer10 + 'البرج:' + spacer2 + arabicTrans(zodiac(jdNow,g_dblLongDeg,g_dblLatDeg)) + "<br>" ;



	g_strTextPage1 += "<div style='color:3030A0;font-size:large;'>" + 'الموقع:' + "</div>";
	//add Topocentric
	g_strTextPage1 += spacer4 + "(نسبة للسطح)" ;
	g_strTextPage1 += spacer4 + "الإتجاه للشمال:" + spacer2 + anglestring(gt_arrMoonPos[10]) ;
	g_strTextPage1 += spacer20 + spacer6 + "الارتفاع:" + spacer2 + anglestring(gt_arrMoonPos[9]) ;
	if (flag) g_strTextPage1 += spacer4 + '(تحت الأفق)' ;
	g_strTextPage1 += '<br>' ;
	g_strTextPage1 += spacer4 + "(نسبة للسطح)" ;
	g_strTextPage1 += spacer7 + "درجة المدار:" + spacer2 + anglestring(15*gt_arrMoonPos[6]) + spacer2 + "(" + hmsstring(gt_arrMoonPos[6]) + ")" ;
	g_strTextPage1 += spacer5 + "الإنحراف:" + spacer2 + anglestring(gt_arrMoonPos[7] ) ;
	//g_strTextPage1 += spacer6 + 'المسافة:' + spacer2 + gt_arrMoonPos[8] + " كم " ;
	g_strTextPage1 += '<br>' ;
	//add Geocentric
	g_strTextPage1 += spacer4 + "(نسبة للمركز)" ;
	g_strTextPage1 += spacer4 + "الإتجاه للشمال:" + spacer2 + anglestring(gt_arrMoonPos[4]) ;
	g_strTextPage1 += spacer20 + spacer6 + "الارتفاع:" + spacer2 + anglestring(gt_arrMoonPos[3]) ;
	if (!isMoonUp(gt_arrMoonPos[3])) g_strTextPage1 += spacer4 + '(تحت الأفق)' ;
	g_strTextPage1 += '<br>' ;
	g_strTextPage1 += spacer4 + "(نسبة للمركز)" ;
	g_strTextPage1 += spacer7 + "درجة المدار:" + spacer2 + anglestring(15*gt_arrMoonPos[0]) + spacer2 + "(" + hmsstring(gt_arrMoonPos[0]) + ")" ;
	g_strTextPage1 += spacer5 + "الإنحراف:" + spacer2 + anglestring(gt_arrMoonPos[1] ) ;
	g_strTextPage1 += spacer6 + 'المسافة:' + spacer2 + gt_arrMoonPos[2] + " كم " + "<br>" ;
	g_strTextPage1 += spacer4 + "(نسبة للمركز)" ;
	g_strTextPage1 += spacer5 + spacer5 + 'خط الطول:' + spacer2 + anglestring(eclipCoord[0]) ;
	g_strTextPage1 +=  spacer20 + spacer3 + 'خط العرض:' + spacer2 + anglestring(eclipCoord[1]) + "<br>" ;



	//showMoon(obs1,moonID,moonPosX,moonPosY,moonSize,rotationSteps,showFlag)
	//g_strTextPage1 += showMoon(observer,0,640,-15,150,0,false) ;   //using html page
	//showMoon(observer,0,60,180,150,20,true) ;   //using sidebar page



	g_strTextPage1 += "<div style='color:3030A0;;font-size:large;'>" + "أوقات الطلوع والغروب:" + "</div>";



  //find the Sun rise and set times
	g_strTextPage1 += sunTimes(observer,elevation) + '<br>' ;



	//find the Moon rise and set times
	g_strTextPage1 += moonTimes(observer,elevation) + '<br>' ;



  var aa=[iNew,iNew+2,iNew+4,iNew+1,iNew+3,iNew+5] ;
	g_strTextPage1 += "<div style='color:3030A0;;font-size:large;'>" + 'أوقات ولادة الهلال والبدر:' + "</div>" ;
	for (var i=0; i<6; i++)
	{
		g_strTextPage1 += spacer4 + ( i>=3 ? spacer2+'بدر' : 'ولادة' ) + spacer3 ;
		g_strTextPage1 += jd2datetimeString(mfn[aa[i]]);
		g_strTextPage1 += (i%3==2?'<br>':spacer4) ;
	}





	var zodiacData = zodiacsDates(9,jdNow,tz,g_dblLongDeg,g_dblLatDeg);
	g_strTextPage1 += "<div style='color:3030A0;;font-size:large;'>" + 'الأبراج وأوقات انتقال القمر إليها:' + "</div>" ;
	for (var i=0; i<9; i++)
	{
		g_strTextPage1 += spacer4 + arabicTrans(zodiacData[2*i+0]) + spacer2 ;
		g_strTextPage1 += jd2datetimeString(zodiacData[2*i+1]);
		g_strTextPage1 += (i%3==2?'<br>':spacer4) ;
	}





	var constellationData = constellationsDates(9,jdNow,tz,g_dblLongDeg,g_dblLatDeg);
	g_strTextPage1 += "<div style='color:3030A0;;font-size:large;'>" + 'المجاميع (الصور) النجمية وأوقات انتقال القمر إليها:' + "</div>" ;
	for (var i=0; i<9; i++)
	{
		g_strTextPage1 += spacer4 + arabicTrans(constellationData[2*i+0]) + spacer2 ;
		g_strTextPage1 += jd2datetimeString(constellationData[2*i+1]);
		g_strTextPage1 += (i%3==2?'<br>':spacer1) ;
	}





	var eclipseCount=5;
	var eclipsesData = eclipsesList(eclipseCount,jdNow,g_dblLongDeg,g_dblLatDeg);
	g_strTextPage1 += "<div style='color:3030A0;;font-size:large;'>" + 'أوقات خسوف القمر وكسوف الشمس:' + "</div>" ;
	for (var i=0; i<eclipseCount; i++)
	{
		if (eclipsesData[6*i+0]!==undefined)
		{
			g_strTextPage1 += spacer1 + arabicTrans(eclipsesData[6*i+0]) ;
			g_strTextPage1 += spacer1 + arabicTrans(eclipsesData[6*i+1]) ;
			g_strTextPage1 += spacer1 + 'ورؤيته' ;
			g_strTextPage1 += spacer1 + arabicTrans(eclipsesData[6*i+2]) ;
			if ( eclipsesData[6*i+2] == 'Total' || eclipsesData[6*i+2] == 'Partial' ) g_strTextPage1 += spacer3 ;
			if ( eclipsesData[6*i+2] == 'Annular' || eclipsesData[6*i+2] == 'Penumbral' ) g_strTextPage1 += spacer3 ;
			g_strTextPage1 += spacer3 ;
			g_strTextPage1 += spacer5 + 'بداية' + spacer2 + jd2datetimeString(eclipsesData[6*i+3]+59/60/60/24) ;
			if (eclipsesData[6*i+5] == 0)  g_strTextPage1 += spacer20 + spacer20 + spacer4 ;
			else g_strTextPage1 += spacer5 + 'أقصى' + spacer2 + jd2datetimeString(eclipsesData[6*i+5]) ;
			g_strTextPage1 += spacer5 + 'نهاية' + spacer2 + jd2datetimeString(eclipsesData[6*i+4]-59/60/60/24) ;
			g_strTextPage1 += (i%1==0?'<br>':spacer6);
		}
	}


	g_strTextPage1 += '<div align=left id="canvas'+0+'" style="position:relative;left:'+(5)+';top:'+(-650)+'">\r\n';
	g_strTextPage1 += '</div>\r\n' ;


	document.body.style.width = "740px" ;
	document.body.style.height = "690px" ;

	document.getElementById('textArea').dir = "rtl" ;
	document.getElementById('textArea').align = "right" ;
	document.getElementById('textArea').style.font = "bold small Times" ;
	document.getElementById('textArea').style.color = "#0055CC" ;
	document.getElementById('textArea').innerHTML = g_strTextPage1 ;

	showMoon(observer,0,000,000,170,0,true) ;
}




