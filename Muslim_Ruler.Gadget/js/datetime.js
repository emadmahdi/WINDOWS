




function jd(obs)
{
	// The Julian date at observer local time
	return Number(jd0(obs.year,obs.month,obs.day) + obs.hours/24 + obs.minutes/60.0/24 + obs.seconds/3600.00/24 + obs.tz/60/24) ;
}





function jd0(year,month,day)
{
	// The Julian date at midnight (0 hours UT) at Greenwich
	// supports all years ( before 1582 and after )
  var y  = year;
  var m = month;
  var d = day;
	if ((y>1582)||((y==1582)&&(m>10))||((y==1582)&&(m==10)&&(d>14)))
		var jd = intPart((1461*(y+4800+intPart((m-14)/12)))/4)+intPart((367*(m-2-12*(intPart((m-14)/12))))/12)- intPart( (3* (intPart( (y+4900+ intPart( (m-14)/12) )/100) ) ) /4)+d-32075 ;
	else
		var jd = 367*y-intPart((7*(y+5001+intPart((m-9)/7)))/4)+intPart((275*m)/9)+d+1729777 ;
	var jd = jd - 0.5 ;
  return jd ;
}




/*
function jd0(year,month,day)
{
	// The Julian date at midnight (0 hours UT) at Greenwich
	// does not support dates before 15 October 1582
  var y  = year;
  var m = month;
  var d = day;
  if (m < 3) {m += 12; y -= 1};
  var a = Math.floor(y/100);
  var b = 2-a+Math.floor(a/4);
  var j = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+b-1524.5;
  return j;
}
*/




function dateAddJD(inDate,diffJD)
{
	var outDateJD = Number( jd0(inDate.getFullYear(),inDate.getMonth()+1,inDate.getDate()) + 0.5 + diffJD ) ;
	return jdToDate(outDateJD)[7] ;
}





// The calendar date from julian date
// Returns year, month, day, day of week, hours, minutes, seconds, date
function jdToDate(jd) {
  var Z=Math.floor(jd+0.5);
  var F=jd+0.5-Z;
  if (Z < 2299161) var A=Z;
  else
	{
    var alpha=Math.floor((Z-1867216.25)/36524.25);
    var A=Z+1+alpha-Math.floor(alpha/4);
  }
  var B=A+1524;
  var C=Math.floor((B-122.1)/365.25);
  var D=Math.floor(365.25*C);
  var E=Math.floor((B-D)/30.6001);
  var d=B-D-Math.floor(30.6001*E)+F;
  if (E < 14) var month=E-1; else var month=E-13;
  if ( month>2) var year=C-4716; else var year=C-4715;
  var day=Math.floor(d);
  var h=(d-day)*24;
  var hours=Math.floor(h);
  var m=(h-hours)*60;
  var minutes=Math.floor(m);
  var seconds=Math.round((m-minutes)*60);
  if (seconds >= 60) { minutes=minutes+1; seconds=seconds-60; }
  if (minutes >= 60) { hours=hours+1; minutes=0; }
  var dw=Math.floor(jd+1.5)-7*Math.floor((jd+1.5)/7);
	var date = new Date();
	date.setFullYear(year,month-1,day);
	date.setHours(hours,minutes,seconds);
  return new Array(year,month,day,dw,hours,minutes,seconds,date);
}





function leapyear(year) {
  var leap=false;
  if (year % 4 == 0) leap = true;
  if (year % 100 ==0 ) leap = false;
  if (year % 400 == 0) leap = true;
  return leap;
}





function dayno(year,month,day,hours) {
// Day number is a modified Julian date, day 0 is 2000 January 0.0
// which corresponds to a Julian date of 2451543.5
	var d= 367*year-Math.floor(7*(year+Math.floor((month+9)/12))/4) +Math.floor((275*month)/9)+day-730530+hours/24;
	return d;
}





function jd2dateString(jd)
{
	var g_strTextPage1 = '' ;
	var nextm = jdToDate(jd);
	var locDate = nextm[7];
	g_strTextPage1 += locDate.getFullYear();
	g_strTextPage1 += '\/' + (((locDate.getMonth()+1)<10) ? "0" : "") + (locDate.getMonth()+1);
	g_strTextPage1 += '\/' + ((locDate.getDate()<10) ? "0" : "") + locDate.getDate() ;
	return g_strTextPage1;
}





function jd2datetimeString(jd)
{
	var g_strTextPage1 = '' ;
	var nextm = jdToDate(jd);
	var locDate = nextm[7];
	g_strTextPage1 += ((locDate.getHours()<10) ? "0" : "") + locDate.getHours();
	g_strTextPage1 += ':' + ((locDate.getMinutes()<10) ? "0" : "") + locDate.getMinutes();
	g_strTextPage1 += spacer2 + locDate.getFullYear();
	g_strTextPage1 += '\/' + (((locDate.getMonth()+1)<10) ? "0" : "") + (locDate.getMonth()+1);
	g_strTextPage1 += '\/' + ((locDate.getDate()<10) ? "0" : "") + locDate.getDate() ;
	return g_strTextPage1;
}





function jd2timeString(jd)
{
	var g_strTextPage1 = '' ;
	var nextm = jdToDate(jd);
	var locDate = nextm[7];
	g_strTextPage1 += ((locDate.getHours()<10) ? "0" : "") + locDate.getHours();
	g_strTextPage1 += ':' + ((locDate.getMinutes()<10) ? "0" : "") + locDate.getMinutes();
	return g_strTextPage1;
}




function jd2observer(jd,tz,gLongitude,gLatitude)
{
	var nextm = jdToDate(jd) ;
	var obs = {} ;
	obs.year 			= nextm[0];
	obs.month 		= nextm[1];
	obs.day 			= nextm[2];
	obs.hours 		= nextm[4];
	obs.minutes 	= nextm[5];
	obs.seconds 	= nextm[6];
	obs.tz 				= Number(tz);
	obs.latitude 	= Number(gLatitude);
	obs.longitude = Number(gLongitude);
	return obs;
}




function obs2date(obs)
{
	var date = new Date();
	date.setFullYear(obs.year,obs.month-1,obs.day);
	date.setHours(obs.hours,obs.minutes,obs.seconds);
  return date;
}





function jdMidnight(jdDate)
{
  return Math.floor(jdDate-0.5) + 0.5 ;
}





// Converting Terrestrial Time (TT or TDT) To Universal Time (UT)
// Adapted from "Five Millennium Canon of Solar Eclipses" [Espenak and Meeus]
// http://eclipse.gsfc.nasa.gov/SEhelp/deltatpoly2004.html
function jdTD2UT(jdTD)
{
	var dateMaximum = jdToDate(jdTD);
	var year = dateMaximum[0] ;
	var month = dateMaximum[1] ;

	var y = year + (month - 0.5)/12 ;
	if (year<-500)
	{
		var u = (year-1820)/100 ;
		var deltaT = -20 + 32 * u*u ;
	}
	else if (year>=-500 && year<500)
	{
		var u = y/100 ;
		var deltaT = 10583.6 - 1014.41 * u + 33.78311 * u*u - 5.952053 * u*u*u
		- 0.1798452 * u*u*u*u + 0.022174192 * u*u*u*u*u + 0.0090316521 * u*u*u*u*u*u ;
	}
	else if (year>=500 && year<1600)
	{
		var u = (y-1000)/100 ;
		var deltaT = 1574.2 - 556.01 * u + 71.23472 * u*u + 0.319781 * u*u*u
		- 0.8503463 * u*u*u*u - 0.005050998 * u*u*u*u*u + 0.0083572073 * u*u*u*u*u*u ;
	}
	else if (year>=1600 && year<1700)
	{
		var t = y - 1600 ;
		var deltaT = 120 - 0.9808 * t - 0.01532 * t*t + t*t*t / 7129 ;
	}
	else if (year>=1700 && year<1800)
	{
		var t = y - 1700 ;
		var deltaT = 8.83 + 0.1603 * t - 0.0059285 * t*t + 0.00013336 * t*t*t - t*t*t*t / 1174000 ;
	}
	else if (year>=1800 && year<1860)
	{
		var t = y - 1800 ;
		var deltaT = 13.72 - 0.332447 * t + 0.0068612 * t*t + 0.0041116 * t*t*t - 0.00037436 * t*t*t*t 
		+ 0.0000121272 * t*t*t*t*t - 0.0000001699 * t*t*t*t*t*t + 0.000000000875 * t*t*t*t*t*t*t ;
	}
	else if (year>=1860 && year<1900)
	{
		var t = y - 1860 ;
		var deltaT = 7.62 + 0.5737 * t - 0.251754 * t*t + 0.01680668 * t*t*t
		- 0.0004473624 * t*t*t*t + t*t*t*t*t / 233174 ;
	}
	else if (year>=1900 && year<1920)
	{
		var t = y - 1900 ;
		var deltaT = -2.79 + 1.494119 * t - 0.0598939 * t*t + 0.0061966 * t*t*t - 0.000197 * t*t*t*t ;
	}
	else if (year>=1920 && year<1941)
	{
		var t = y - 1920 ;
		var deltaT = 21.20 + 0.84493*t - 0.076100 * t*t + 0.0020936 * t*t*t ;
	}
	else if (year>=1941 && year<1961)
	{
		var t = y - 1950 ;
		var deltaT = 29.07 + 0.407*t - t*t/233 + t*t*t / 2547 ;
	}
	else if (year>=1961 && year<1986)
	{
		var t = y - 1975 ;
		var deltaT = 45.45 + 1.067*t - t*t/260 - t*t*t / 718 ;
	}
	else if (year>=1986 && year<2005)
	{
		var t = y - 2000 ;
		var deltaT = 63.86 + 0.3345 * t - 0.060374 * t*t + 0.0017275 * t*t*t + 0.000651814 * t*t*t*t + 0.00002373599 * t*t*t*t*t ;
	}
	else if (year>=2005 && year<2050)
	{
		var t = y - 2000 ;
		var deltaT = 62.92 + 0.32217 * t + 0.005589 * t*t ;
	}
	else if (year>=2050 && year<2150)
	{
		var deltaT = -20 + 32 * ((y-1820)/100)*((y-1820)/100) - 0.5628 * (2150 - y) ;
	}
	else if (year>=2150)
	{
		var u = (year-1820)/100 ;
		var deltaT = -20 + 32 * u*u ;
	}
	return jdTD+deltaT/60/60/24 ;
}

