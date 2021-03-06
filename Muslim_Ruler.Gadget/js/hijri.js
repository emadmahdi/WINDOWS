




hijriMonthNames = new Array(
'محرم',
'صفر',
'ربيع الأول',
'ربيع الآخر',
'جمادى أول',
'جمادى آخرة',
'رجب',
'شعبان',
'رمضان',
'شوال',
'ذو القعدة',
'ذو الحجة'
);





var hijriMonthCorrData = [] ;

function hijriMonthCorrection(daysCount, jdMoonBirth, cityLong, cityLat)
{
	var exist = false ;
	var length = Math.floor(hijriMonthCorrData.length/2) ;
	var index = Number(jdMoonBirth)+Number(cityLong)+Number(cityLat) ;
	for (var i=0 ; i<length ; i++)
	{
		if ( index==hijriMonthCorrData[2*i+0] )
		{
			var hijriCorrection = Number(hijriMonthCorrData[2*i+1]) ;
			var exist = true ;
			i = length ;
		}
	}
	if (!exist)
	{
		var hijriCorrection = 0 ;
		for (var i=0; i<daysCount; i++)
		{
			var visible = isMoonVisibile(jdMoonBirth+i, cityLong, cityLat) ;
			if ( visible=='No' ) hijriCorrection++ ;
			else i=daysCount ;
		}
		hijriMonthCorrData[2*length+0]=index ;
		hijriMonthCorrData[2*length+1]=hijriCorrection ;
	}
	return hijriCorrection ;
}





function moonHijri(yearHij, monthHij, tz)
{
//	var hijriYear_daysCount = 12 * 29.530587981 ; // 354.367055772 = 10631/30
//	var gregYear_daysCount = 12 * 30.43686416666667 ; // 365.24237
	var mathGreg = hijriToGregMath(yearHij,monthHij,1) ;
	var mathJD = jd0(mathGreg[0],mathGreg[1],mathGreg[2]) ;
	var startJD = jd0(1,1,1) ;
	var yearsGreg = ( mathJD - startJD ) / 365.25 + 1 ;
	var mfn = moons(yearsGreg,tz) ;
	return mfn[2] ;
}





function gregToHijri(y,m,d)
{
	var hijriCalcMethod = SettingsManager.getValue("Home", "hijriCalcMethod") ;
	var hijriCorrection = Number(SettingsManager.getValue("Home", "hijriCorrection")) ;
	var tz = -60 * Number(SettingsManager.getValue("Home", "tzone")) ;

	var hijriMath = gregToHijriMath(y,m,d,hijriCorrection) ;

	var hijriYear = hijriMath[0] ;
	var hijriMonth = hijriMath[1] ;
	var hijriDay = hijriMath[2] ;

	var jdMoonCheck = jd0(y,m,d) + hijriCorrection ;

	var hijriWeekDay = (jdMoonCheck+1.5) % 7 ;

	if (hijriCalcMethod!='Math')
	{
		var long = Number(SettingsManager.getValue("Home", "lng")) ;
 		var lat = Number(SettingsManager.getValue("Home", "lat")) ;


		var observer = jd2observer(jdMoonCheck,tz,long,lat) ;

		var mfn = moons(observer.year+(observer.month-3)/12+observer.day/365.25,tz) ;
		for (var i=0; i<28; i++)
		{
			if (mfn[i] > jdMoonCheck) break;
			if (mfn[i] <= jdMoonCheck && !(i%2)) var iNew = i;
		}

		var jdMoonBirth = mfn[iNew] ;
		var hijriMoonCorrection = hijriMonthCorrection(6, jdMoonBirth, long, lat) ;
		var ageMoonValue = jdMoonCheck - jdMoonBirth - tz/60/24 ;

		// if moon is not visible then continue the previous hijri month
		if (ageMoonValue<hijriMoonCorrection)
		{
			var jdMoonBirth = mfn[iNew-2] ;
			var hijriMoonCorrection = hijriMonthCorrection(6, jdMoonBirth, long, lat) ;
			var ageMoonValue = jdMoonCheck - jdMoonBirth - tz/60/24;
		}

		var jdMoonHijri = moonHijri(hijriYear, hijriMonth, tz) ;

		if (Math.abs(jdMoonHijri-jdMoonBirth)<0.01) var hijriMonth = hijriMonth ;
		else if (jdMoonHijri-jdMoonBirth<=-1) var hijriMonth = hijriMonth+1 ;
		else if (jdMoonHijri-jdMoonBirth>=1) var hijriMonth = hijriMonth-1 ;

		var hijriDay = Math.floor(ageMoonValue) - hijriMoonCorrection + 1 ;
	}

	if (hijriDay>30) {hijriDay-=30;hijriMonth+=1} ;
	if (hijriDay<1) {hijriDay+=30;hijriMonth-=1} ;

	if (hijriMonth>12) {hijriMonth-=12;hijriYear+=1} ;
	if (hijriMonth<1) {hijriMonth+=12;hijriYear-=1} ;

	var hijriShort = hijriDay + " " + hijriMonthNames[hijriMonth-1]+ " " + hijriYear ;

 	hijriMonth = hijriMonth%12 ;
	if (hijriMonth==0) hijriMonth=12 ;

 	return [ hijriYear , hijriMonth , hijriDay , hijriWeekDay , hijriMonthNames[hijriMonth-1] , hijriShort ] ;
}





function hijriToGreg(y, m, d)
{
	var lon = Number(SettingsManager.getValue("Home","lng"));
	var lat = Number(SettingsManager.getValue("Home","lat"));
	var hijriCalcMethod = SettingsManager.getValue("Home", "hijriCalcMethod");
	var tz = -60 * Number(SettingsManager.getValue("Home", "tzone")) ;
	if (hijriCalcMethod=='Math')
	{
		var gregDate = hijriToGregMath(y,m,d) ;
	}
	else
	{
		var jdMoonBirth = moonHijri(y, m, tz) ;
		var hijriCorrection = hijriMonthCorrection(6, jdMoonBirth, lon, lat) ;
		var gregDate = jdToDate( jdMoonBirth + hijriCorrection + Number(d) + tz/60/24 );
	}
	var yy = gregDate[0] ;
	var mm = gregDate[1] ;
	var dd = gregDate[2] ;
	var ww = gregDate[3] ;
	return [yy,mm,dd,ww] ;
}





function gregToHijriMath(y,m,d,addCorrectionDays)
{
	if ((y>1582)||((y==1582)&&(m>10))||((y==1582)&&(m==10)&&(d>14)))
		var jd=intPart((1461*(y+4800+intPart((m-14)/12)))/4)+intPart((367*(m-2-12*(intPart((m-14)/12))))/12)- intPart( (3* (intPart( (y+4900+ intPart( (m-14)/12) )/100) ) ) /4)+d-32075 ;
	else
		var jd = 367*y-intPart((7*(y+5001+intPart((m-9)/7)))/4)+intPart((275*m)/9)+d+1729777 ;
	var l=jd-1948440+10632 ;
	var l = l + addCorrectionDays ;
	var n=intPart((l-1)/10631) ;
	var l=l-10631*n+354 ;
	var j=(intPart((10985-l)/5316))*(intPart((50*l)/17719))+(intPart(l/5670))*(intPart((43*l)/15238)) ;
	var l=l-(intPart((30-j)/15))*(intPart((17719*j)/50))-(intPart(j/16))*(intPart((15238*j)/43))+29 ;
	var mm = intPart((24*l)/709) ;
	var dd = l-intPart((709*mm)/24) ;
	var yy = 30*n+j-30 ;
  var ww=Math.floor(jd+1.5)-7*Math.floor((jd+1.5)/7);
	return [yy,mm,dd,ww];
}





function hijriToGregMath(y,m,d)
{
	var jd=intPart((11*y+3)/30)+354*y+30*m-intPart((m-1)/2)+d+1948440-385;
	if ( jd > 2299160 )
	{
		var l=jd+68569;
		var n=intPart((4*l)/146097);
		var l=l-intPart((146097*n+3)/4);
		var i=intPart((4000*(l+1))/1461001);
		var l=l-intPart((1461*i)/4)+31;
		var j=intPart((80*l)/2447);
		var dd=l-intPart((2447*j)/80);
		var l=intPart(j/11);
		var mm=j+2-12*l;
		var yy=100*(n-49)+i+l;
	}
	else
	{
		var j=jd+1402;
		var k=intPart((j-1)/1461);
		var l=j-1461*k;
		var n=intPart((l-1)/365)-intPart(l/1461);
		var i=l-365*n+30;
		var j=intPart((80*i)/2447);
		var dd=i-intPart((2447*j)/80);
		var i=intPart(j/11);
		var mm=j+2-12*i;
		var yy=4*k+n+i-4716;
	}
  var ww=Math.floor(jd+1.5)-7*Math.floor((jd+1.5)/7);
	return [yy,mm,dd,ww];
}




