



function eclipsesList(count,jdDate,longitude,latitude)
{
	jdDate-=15;
	var i=0;
	var list=[];
	while (i<count)
	{
		var eclipseData = FindLunarEclipse(jdDate,longitude,latitude);
		if (eclipseData[5]=='Yes') i++ ;
		if (eclipseData[0]!='None')
		{
			list[6*i+0]='Lunar';
			list[6*i+1]=eclipseData[0];
			list[6*i+2]=eclipseData[1];
			list[6*i+3]=eclipseData[2];
			list[6*i+4]=eclipseData[3];
			list[6*i+5]=eclipseData[4];
			i++;
		}
		var eclipseData = FindSolarEclipse(jdDate,longitude,latitude);
		if (eclipseData[5]=='Yes') i++ ;
		if (eclipseData[0]!='None')
		{
			list[6*i+0]='Solar';
			list[6*i+1]=eclipseData[0];
			list[6*i+2]=eclipseData[1];
			list[6*i+3]=eclipseData[2];
			list[6*i+4]=eclipseData[3];
			list[6*i+5]=eclipseData[4];
			i++;
		}
		jdDate+=29.530587981;
	}
	return list;
}




/*
// Old Meeus Function ... replaced with "Eclipse Predictions by Fred Espenak, NASA's GSFC"
function FindEclipse(eclipseChoice,jdDate,longitude,latitude)
{

  var eclipseType = 'None';
	var eclipseVisibility = 'Not Visible';
	var TotalPhaseSemiDuration = 0;
	var PartialPhaseSemiDuration = 0; 
	var PartialPhasePenumbraSemiDuration = 0;

  // julian date
  var T = (jdDate-2451545.0)/36525;
	var T2 = T*T;
  var T3 = T2*T;
  var T4 = T3*T;

	var k=Math.floor(T*1236.85);
	if (eclipseChoice=='Solar') k+=1;
	else if (eclipseChoice=='Lunar') k+=0.5;

  var E = 1 - 0.002516*T - 0.0000074*T2;
  var M = range(2.5534 + 29.10535670*k - 0.0000014*T2 - 0.00000011*T3);
  var Mdash = range(201.5643 + 385.81693528*k + 0.0107582*T2 + 0.00001238*T3 - 0.000000058*T4); 
  var F = range(160.7108 + 390.67050284*k - 0.0016118*T2 - 0.00000227*T3 + 0.000000011*T4);
  var omega = range(124.7746 - 1.56375588*k + 0.0020672*T2 + 0.00000215*T3);
  var F1 = F - 0.02665*sind(omega);

  //Do the first check to see if we have an eclipse
  if (Math.abs(sind(F)) > 0.36) return [ eclipseType, eclipseVisibility ];

  var A1 = range(299.77 + 0.107408*k - 0.009173*T2);
	var jdEclipseMaximum = 2451550.09766 + 29.530588861*k + 0.00015437*T2 - 0.000000150*T3 + 0.00000000073*T4;

  if (eclipseChoice=='Solar') var DeltaJD = -0.4075*sind(Mdash) + 0.1721*E*sind(M);
  else if (eclipseChoice=='Lunar') var DeltaJD = -0.4065*sind(Mdash) + 0.1727*E*sind(M);

  DeltaJD += 0.0161*sind(2*Mdash) +
             -0.0097*sind(2*F1) +
             0.0073*E*sind(Mdash - M) +
             -0.0050*E*sind(Mdash + M) +
             -0.0023*sind(Mdash - 2*F1) +
             0.0021*E*sind(2*M) +
             0.0012*sind(Mdash + 2*F1) +
             0.0006*E*sind(2*Mdash + M) +
             -0.0004*sind(3*Mdash) +
             -0.0003*E*sind(M + 2*F1) +
             0.0003*sind(A1) +
             -0.0002*E*sind(M - 2*F1) +
             -0.0002*E*sind(2*Mdash - M) +
             -0.0002*sind(omega);

  jdEclipseMaximum += DeltaJD;

  var P = 0.2070*E*sind(M) +
             0.0024*E*sind(2*M) +
             -0.0392*sind(Mdash) +
             0.0116*sind(2*Mdash) +
             -0.0073*E*sind(Mdash + M) +
             0.0067*E*sind(Mdash - M) +
             0.0118*sind(2*F1);

  var Q = 5.2207 +
             -0.0048*E*cosd(M) +
             0.0020*E*cosd(2*M) +
             -0.3299*cosd(Mdash) +
             -0.0060*E*cosd(Mdash + M) +
             0.0041*E*cosd(Mdash - M);

  var W = Math.abs(cosd(F1));

  var Y = (P*cosd(F1) + Q*sind(F1))*(1 - 0.0048*W);

  var u = 0.0059 +
  				 0.0046*E*cosd(M) +
  				 -0.0182*cosd(Mdash) +
  				 0.0004*cosd(2*Mdash) +
  				 -0.0005*cosd(M + Mdash);

  var absY = Math.abs(Y);
	var n = 0.5458 + 0.0400*cosd(Mdash);

	var method = '1/50' ;
	if (method == '') 
	{
		// using meeus default method (page 383 jean meeus astromincal algorithms 2nd edition)
		var pr = 1.2848 + u ;
		var ur = 0.7403 - u ;
		var h = 1.5573 + u ;
		var p = 1.0128 - u ;
		var t = 0.4678 - u ;
	}
	else
	{
		// using 1/50 method (page 383 jean meeus astromincal algorithms 2nd edition)
		var pr = 1.2985 + u ;
		var ur = 0.7432 - u ;
		var h = 1.5710 + u ;
		var p = 1.0157 - u ;
		var t = 0.4707 - u ;
	}

	var p2 = p*p;
	var t2 = t*t;
	var h2 = h*h;
	var Y2 = Y*Y;

	var PenumbralMagnitude = (h - absY) / 0.5450;
	var UmbralMagnitude = (p - absY) / 0.5450;

	if (eclipseChoice=='Solar' && (absY > (1.5433 + u))) return [ eclipseType, eclipseVisibility ];
	else if (eclipseChoice=='Lunar'&& (PenumbralMagnitude<0.02)) return [ eclipseType, eclipseVisibility ];

	var eclipseType='Partial';
	var PartialPhaseSemiDuration = 60/n*Math.sqrt(Y2);
	if (h2>=Y2) var PartialPhasePenumbraSemiDuration = 60/n*Math.sqrt(h2-Y2);
	var GreatestMagnitude = (1.5433 + u - absY) / (0.5461 + 2*u);

	if (eclipseChoice=='Solar')
	{
		// var PenumbralRadii = u + 0.5461 ;
		// var UmbralRadii = u ;
		if (h2>=Y2) var PartialPhaseSemiDuration = 60/n*Math.sqrt(h2-Y2);
		if (p2>=Y2) var TotalPhaseSemiDuration = 60/n*Math.sqrt(p2-Y2);
  	if (Y >= -0.9972 && Y <= +0.9972)
  	{
  		var eclipseType='Central';
  		var eclipseType='Annular';
			if (u<0) var eclipseType='Total';
			else if (u>=0 && u<=0.0047 && 1>=Y2)
			{
				var w=0.00464*Math.sqrt(1-Y2);
				if (u<=w) var eclipseType='Total';
			}
  	}
  	else if (absY>=0.9972 && absY<=(1.5433 + u))
  	{
  		var eclipseType='Not Central';
  		var eclipseType='Partial';
			if (absY<=1.0260 && absY<=(0.9972+Math.abs(u))) var eclipseType='Total';
  	}
  	if (eclipseType=='Annular') var eclipseType='Total';
	}

	if (eclipseChoice=='Lunar')
	{
		// var PenumbralRadii = pr ;
		// var UmbralRadii = ur ;
		if (p2>=Y2) var PartialPhaseSemiDuration = 60/n*Math.sqrt(p2-Y2);
		if (t2>=Y2) var TotalPhaseSemiDuration = 60/n*Math.sqrt(t2-Y2);
  	//if (PenumbralMagnitude<0 || UmbralMagnitude<0) return [ eclipseType, eclipseVisibility ];
  	var eclipseType = 'Penumbral' ;
  	if ( PenumbralMagnitude>1 && PenumbralMagnitude<2 && UmbralMagnitude>0 && UmbralMagnitude<1 ) var eclipseType='Partial';
  	if (eclipseType=='Penumbral') var eclipseType='Partial';
		if (TotalPhaseSemiDuration>0) var eclipseType = 'Total';
	}

	// Converting Terrestrial Time (TT, TDT, TDB, or TD) To Universal Time (UT)
	var jdEclipseMaximum = jdTD2UT(jdEclipseMaximum) ;

	if (UmbralMagnitude>=0) var duration=PartialPhaseSemiDuration; else var duration=PartialPhasePenumbraSemiDuration;

	var jdEclipseStart = jdEclipseMaximum-duration/60/24 ;
	var jdEclipseEnd = jdEclipseMaximum+duration/60/24 ;

	// convert from GMT (UT time) to local time
	jdEclipseStart -= tz/60/24 ;
	jdEclipseEnd -= tz/60/24 ;
	jdEclipseMaximum -= tz/60/24 ;

	var obsStart = jd2observer(jdEclipseStart,tz,longitude,latitude);
	var obsEnd = jd2observer(jdEclipseEnd,tz,longitude,latitude);
	var obsMaximum = jd2observer(jdEclipseMaximum,tz,longitude,latitude);

	var sealevel = (SettingsManager.getValue("Home", "sealevel") == 'true');
	if (sealevel) var elevation = 0 ;
	else var elevation = Number(SettingsManager.getValue("Home", "elevation")) ;

	if (eclipseChoice=='Lunar')
	{
		var moonData = topoMoonPos(obsStart,elevation,false);
		var isMoonUpStart = isMoonUp(moonData[3]);
		var moonData = topoMoonPos(obsEnd,elevation,false);
		var isMoonUpEnd = isMoonUp(moonData[3]);
		if ( isMoonUpStart || isMoonUpEnd ) var eclipseVisibility='Partial';
		if ( eclipseType=='Total' )
		{
			var moonData = topoMoonPos(obsMaximum,elevation,false);
			var isMoonUpMaximum = isMoonUp(moonData[3]);
			if ( isMoonUpMaximum ) var eclipseVisibility='Total';
		}
	}
	else if (eclipseChoice=='Solar')
	{
		var sunData = topoSunPos(obsStart,elevation);
		var isSunUpStart = isSunUp(sunData[3]);
		var sunData = topoSunPos(obsEnd,elevation);
		var isSunUpEnd = isSunUp(sunData[3]);
		if ( isSunUpStart || isSunUpEnd ) var eclipseVisibility='Partial';
		if ( eclipseType=='Total' )
		{
			var sunData = topoSunPos(obsMaximum,elevation);
			var isSunUpMaximum = isSunUp(sunData[3]);
			if ( isSunUpMaximum ) var eclipseVisibility='Total';
		}
	}

  return [ eclipseType, eclipseVisibility, jdEclipseStart, jdEclipseEnd, jdEclipseMaximum ];
}
*/




//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////





// run when executing the function of eclipse data
function calculatefor(filedata)
{
	if (EclipseDataFile.substr(0,2)=="LE")
	{
		filedata.shift();
		if (EclipseLunarData.length==0)	EclipseLunarData = filedata ;
		else EclipseLunarData = EclipseLunarData.concat(filedata) ;
	}
	else if (EclipseDataFile.substr(0,2)=="SE")
	{
		if (EclipseSolarData.length==0)	EclipseSolarData = filedata ;
		else EclipseSolarData = EclipseSolarData.concat(filedata);
	}
}





// Run after loading any eclipse data js file
function recalculate()
{
	if (EclipseDataFile.substr(0,2)=="LE")
	{
		if (EclipseLunarData.length==0)
		{
			eval(EclipseDataFile+"()");
			if ( 100*((observer.year/100)-Math.floor(observer.year/100)) > 90 )
			{
				EclipseDataFile = 'LE'+Number(Math.floor(observer.year/100)*100+101);
				var head = document.getElementsByTagName("head")[0];
		 		var script = document.createElement("script");
			 	script.setAttribute("language","JavaScript");
	 			script.setAttribute("src","eclipses\\"+EclipseDataFile+".js");
			 	script.type = "text/javascript";
	 			script.defer = false;
				head.appendChild(script);
			}
			else showMoonData2();
		}
		else
		{
			eval(EclipseDataFile+"()");
			showMoonData2();
		}
	}
	else if (EclipseDataFile.substr(0,2)=="SE")
	{
		if (EclipseSolarData.length==0)
		{
			eval(EclipseDataFile+"()");
			if ( 100*((observer.year/100)-Math.floor(observer.year/100)) > 90 )
			{
				EclipseDataFile = 'SE'+Number(Math.floor(observer.year/100)*100+101);
				var head = document.getElementsByTagName("head")[0];
		 		var script = document.createElement("script");
			 	script.setAttribute("language","JavaScript");
	 			script.setAttribute("src","eclipses\\"+EclipseDataFile+".js");
			 	script.type = "text/javascript";
	 			script.defer = false;
				head.appendChild(script);
			}
			else showMoonData3();
		}
		else
		{
			eval(EclipseDataFile+"()");
			showMoonData3();
		}		
	}
}





//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////





function FindLunarEclipse(jdDate,longitude,latitude)
{
	var eclipseType = 'None';
	var eclipseVisibility = 'Not Visible';
	var jdEclipseStart = 0 ;
	var jdEclipseEnd = 0 ;
	var jdEclipseMaximum = 0 ;
	var Done='No';
	var sealevel = (SettingsManager.getValue("Home", "sealevel") == 'true');
	if (sealevel) var elevation = 0 ;
	else var elevation = Number(SettingsManager.getValue("Home", "elevation")) ;
	obsvconstLunar[0] = latitude*Math.PI/180.0 ;
	obsvconstLunar[1] = -longitude*Math.PI/180.0 ;
	obsvconstLunar[2] = elevation ;
	obsvconstLunar[3] = tz/60 ;
	obsvconstLunar[4] = 0 ;
	obsvconstLunar[5] = 4 ;
	for (i = 0 ; i < EclipseLunarData.length ; i+=22) if (EclipseLunarData[i] >= jdDate) break ;
	if (i >= EclipseLunarData.length) var Done='Yes' ;
	if (EclipseLunarData[i]-jdDate <= 29.530587981 && i < EclipseLunarData.length)
	{
		obsvconstLunar[4]=i ;
		getallLunar(EclipseLunarData);
		// Is there an event...
		if (mid[5] != 1)
		{
			var eclipseType = 'Yes';
			var eclipseVisibility = 'Visible';
			if (EclipseLunarData[5+i] == 1) eclipseType = 'Total';
			else if (EclipseLunarData[5+i] == 2) eclipseType = 'Partial';
			else eclipseType = 'Penumbral';
			var PenumbralMagnitude=EclipseLunarData[3+i];
			var UmbralMagnitude=EclipseLunarData[4+i];
			var PenumbralStartTime = gettimeLunar(EclipseLunarData, p1);
			var PenumbralStartAltitude = getaltLunar(p1);
			if (u1[5] != 1)
			{
				var PartialStartTime=gettimeLunar(EclipseLunarData,u1);
				var PartialStartAltitude=getaltLunar(u1);
			}
			if (u2[5] != 1)
			{
				var TotalStartTime=gettimeLunar(EclipseLunarData,u2);
				var TotalStartAltitude=getaltLunar(u2);
			}
			var MaximumTime = gettimeLunar(EclipseLunarData, mid);
			var MaximumAltitude = getaltLunar(mid);
			if (u3[5] != 1)
			{
				var TotalEndTime=gettimeLunar(EclipseLunarData,u3);
				var TotalEndAltitude=getaltLunar(u3);
			}
			if (u4[5] != 1)
			{
				var PartialEndTime=gettimeLunar(EclipseLunarData,u4);
				var PartialEndAltitude=getaltLunar(u4);
			}
			var PenumbralEndTime = gettimeLunar(EclipseLunarData, p4);
			var PenumbralEndAltitude = getaltLunar(p4);
			var eclipseVisibility = eclipseType ;
			var jdEclipseMaximum = MaximumTime/24 + Math.floor(-tz/60/24+EclipseLunarData[i]+0.5)-0.5 ;
			if (MaximumTime<0) jdEclipseMaximum+=1 ;
			if (eclipseType=='Total' || eclipseType=='Partial')
			{
				var jdEclipseEnd = (PartialEndTime-MaximumTime)/24 + jdEclipseMaximum ;
				var jdEclipseStart = (PartialStartTime-MaximumTime)/24 + jdEclipseMaximum ;
			}
			else if (eclipseType=='Penumbral')
			{
				var jdEclipseEnd = (PenumbralEndTime-MaximumTime)/24 + jdEclipseMaximum ;
				var jdEclipseStart = (PenumbralStartTime-MaximumTime)/24 + jdEclipseMaximum ;
				var eclipseType = 'None';
				var eclipseVisibility = 'Not Visible';
			}
			else
			{
				var eclipseType = 'None';
				var eclipseVisibility = 'Not Visible';
			}
 		}
	}
	var isMoonUpStart = isMoonUp(PartialStartAltitude);
	var isMoonUpMaximum = isMoonUp(MaximumAltitude);
	var isMoonUpEnd = isMoonUp(PartialEndAltitude);
	if ( isMoonUpStart || isMoonUpEnd ) var eclipseVisibility='Partial';
	if ( eclipseType=='Total' && isMoonUpMaximum ) var eclipseVisibility='Total';
	var jdEclipseStartMidnight = Math.floor(jdEclipseStart+0.5)-0.5;
	var jdEclipseMaximumMidnight = Math.floor(jdEclipseMaximum+0.5)-0.5;
	var jdEclipseEndMidnight = Math.floor(jdEclipseEnd+0.5)-0.5;
	if ( isMoonUpStart && isMoonUpMaximum && !isMoonUpEnd)
	{
		var obsMaximum = jd2observer(jdEclipseMaximum,tz,longitude,latitude);
		var jdEclipseEnd = jdEclipseMaximumMidnight+moonrise(obsMaximum,elevation)[1]/24;
	}
	else if ( isMoonUpStart && !isMoonUpMaximum && !isMoonUpEnd )
	{
		var obsStart = jd2observer(jdEclipseStart,tz,longitude,latitude);
		var jdEclipseEnd = jdEclipseStartMidnight+moonrise(obsStart,elevation)[1]/24;
		var jdEclipseMaximum = 0;
	}
	else if ( !isMoonUpStart && !isMoonUpMaximum && isMoonUpEnd )
	{
		var obsEnd = jd2observer(jdEclipseEnd,tz,longitude,latitude);
		var jdEclipseStart = jdEclipseEndMidnight+moonrise(obsEnd,elevation)[0]/24;
		var jdEclipseMaximum = 0;
	}
	else if ( !isMoonUpStart && isMoonUpMaximum && isMoonUpEnd )
	{
		var obsMaximum = jd2observer(jdEclipseMaximum,tz,longitude,latitude);
		var jdEclipseStart = jdEclipseMaximumMidnight+moonrise(obsMaximum,elevation)[0]/24;
	}
	else if ( !isMoonUpStart && isMoonUpMaximum && !isMoonUpEnd )
	{
		var obsMaximum = jd2observer(jdEclipseMaximum,tz,longitude,latitude);
		var jdEclipseStart = jdEclipseMaximumMidnight+moonrise(obsMaximum,elevation)[0]/24;
		var obsMaximum = jd2observer(jdEclipseMaximum,tz,longitude,latitude);
		var jdEclipseEnd = jdEclipseMaximumMidnight+moonrise(obsMaximum,elevation)[1]/24;
	}
	else if ( !isMoonUpStart && !isMoonUpMaximum && !isMoonUpEnd )
	{
		var eclipseType = 'None';
		var eclipseVisibility = 'Not Visible';
	}
	return [ eclipseType, eclipseVisibility, jdEclipseStart, jdEclipseEnd, jdEclipseMaximum, Done ];
}





// Lunar Observer constants -
// (0) North Latitude (radians)
// (1) West Longitude (radians)
// (2) Altitude (metres)
// (3) West time zone (hours)
// (4) index into the elements array for the eclipse in question
// (5) maximum eclipse type

var obsvconstLunar = new Array();

// Lunar Eclipse circumstances
//  (0) Event type (p1=-3, u1=-2, u2=-1, mid=0, u3=1, u4=2, p4=3)
//  (1) t
//  (2) hour angle
//  (3) declination
//  (4) alt
//  (5) visibility
//      (0 = above horizon, 1 = no event, 2 = below horizon)

var p1 = new Array();
var u1 = new Array();
var u2 = new Array();
var mid = new Array();
var u3 = new Array();
var u4 = new Array();
var p4 = new Array();
var EclipseDataFile;
var EclipseLunarData = new Array();
var EclipseSolarData = new Array();

// Populate the circumstances array
// entry condition - circumstances[1] must contain the correct value
function populatecircumstancesLunar(elements, circumstances) {
  var index, t, ra, dec, h;

  index = obsvconstLunar[4]
  t = circumstances[1]
  ra = elements[18+index] * t + elements[17+index]
  ra = ra * t + elements[16+index]
  dec = elements[21+index] * t + elements[20+index]
  dec = dec * t + elements[19+index]
  dec = dec * Math.PI / 180.0
  circumstances[3] = dec
  h = 15.0*(elements[6+index] + (t - elements[2+index]/3600.0)*1.00273791) - ra
  h = h * Math.PI / 180.0 - obsvconstLunar[1]
  circumstances[2] = h
  circumstances[4] = Math.asin(Math.sin(obsvconstLunar[0]) * Math.sin(dec) + Math.cos(obsvconstLunar[0]) * Math.cos(dec) * Math.cos(h))
  circumstances[4] -= Math.asin(Math.sin(elements[7+index]*Math.PI/180.0) * Math.cos(circumstances[4]))
  if (circumstances[4] * 180.0 / Math.PI < elements[8+index] - 0.5667) {
    circumstances[5] = 2
  } else if (circumstances[4] < 0.0) {
    circumstances[4] = 0.0
    circumstances[5] = 0
  } else {
    circumstances[5] = 0
  }
}

// Populate the p1, u1, u2, mid, u3, u4 and p4 arrays
function getallLunar(elements) {
  var pattern, index

  index = obsvconstLunar[4]
  p1[1] = elements[index+9]
  populatecircumstancesLunar(elements,p1)
  mid[1] = elements[index+12]
  populatecircumstancesLunar(elements,mid)
  p4[1] = elements[index+15]
  populatecircumstancesLunar(elements,p4)
  if (elements[index+5] < 3) {
    u1[1] = elements[index+10]
    populatecircumstancesLunar(elements,u1)
    u4[1] = elements[index+14]
    populatecircumstancesLunar(elements,u4)
    if (elements[index+5] < 2) {
      u2[1] = elements[index+11]
      u3[1] = elements[index+13]
      populatecircumstancesLunar(elements,u2)
      populatecircumstancesLunar(elements,u3)
    } else {
      u2[5] = 1
      u3[5] = 1
    }
  } else {
    u1[5] = 1
    u2[5] = 1
    u3[5] = 1
    u4[5] = 1
  }
  if ((p1[5] != 0) && (u1[5] != 0) && (u2[5] != 0) && (mid[5] != 0) && (u3[5] != 0) && (u4[5] != 0) && (p4[5] != 0)) {
    mid[5] = 1
  }
}


// Get the local time of an event
function gettimeLunar(elements,circumstances)
{
  var t, index
  index = obsvconstLunar[4]
  t = circumstances[1] + elements[1+index] - obsvconstLunar[3] - (elements[2+index] - 30.0) / 3600.0
	return t
}

// Get the altitude
function getaltLunar(circumstances)
{
  var t
  t = circumstances[4] * 180.0 / Math.PI
  t = Math.floor(t+0.5)
  return t;
}





//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////





function FindSolarEclipse(jdDate,longitude,latitude)
{
	var eclipseType = 'None';
	var eclipseVisibility = 'Not Visible';
	var jdEclipseStart = 0 ;
	var jdEclipseEnd = 0 ;
	var jdEclipseMaximum = 0 ;
	var Done='No';
	var sealevel = (SettingsManager.getValue("Home", "sealevel") == 'true');
	if (sealevel) var elevation = 0 ;
	else var elevation = Number(SettingsManager.getValue("Home", "elevation")) ;
	obsvconstSolar[0] = latitude*Math.PI/180.0 ;
	obsvconstSolar[1] = -longitude*Math.PI/180.0 ;
	obsvconstSolar[2] = elevation ;
	obsvconstSolar[3] = tz/60 ;
	var tmp=Math.atan(0.99664719*Math.tan(obsvconstSolar[0]));
	obsvconstSolar[4]=0.99664719*Math.sin(tmp)+(obsvconstSolar[2]/6378140.0)*Math.sin(obsvconstSolar[0]);
	obsvconstSolar[5]=Math.cos(tmp)+(obsvconstSolar[2]/6378140.0*Math.cos(obsvconstSolar[0]));
	obsvconstSolar[6] = 0 ;
	for (i = 0 ; i < EclipseSolarData.length ; i+=28) if (EclipseSolarData[i] >= jdDate) break ;
	if (i >= EclipseSolarData.length) var Done='Yes';
	if (EclipseSolarData[i]-jdDate <= 29.530587981 && i < EclipseSolarData.length)
	{
		obsvconstSolar[6]=i ;
		getallSolar(EclipseSolarData);
		// Is there an event...
		if (midd[39] > 0)
		{
			var eclipseType = 'Yes';
			var eclipseVisibility = 'Visible';
			if (midd[39] == 1) eclipseType = 'Partial';
			else if (midd[39] == 2) eclipseType = 'Annular';
			else eclipseType = 'Total';
			if (c1[40] != 4)
			{
				var PartialStartTime=gettimeSolar(EclipseSolarData,c1);
				var PartialStartAltitude=getaltSolar(c1);
			}
			if ((midd[39] > 1) && (c2[40] != 4)) var CentralStartTime=gettimeSolar(EclipseSolarData,c2);
			var MaximumTime = gettimeSolar(EclipseSolarData,midd);
			var MaximumAltitude = getaltSolar(midd);
			var MaximumAzi = getaziSolar(midd);
			if ((midd[39] > 1) && (c3[40] != 4)) var CentralEndTime=gettimeSolar(EclipseSolarData,c3);
			if (c4[40] != 4)
			{
				var PartialEndTime=gettimeSolar(EclipseSolarData,c4);
				var PartialEndAltitude=getaltSolar(c4);
			}
			Magnitude = getmagnitudeSolar();
			Coverage = getcoverageSolar();
			if (midd[39] > 1) var CentralDuration = getdurationSolar();
			if (eclipseType=='Total' || eclipseType=='Partial' || eclipseType=='Annular')
			{
				var jdEclipseMaximum = MaximumTime/24 + Math.floor(-tz/60/24+EclipseSolarData[i]+0.5)-0.5 ;
				if (MaximumTime<0) jdEclipseMaximum+=1 ;
				var jdEclipseEnd = (PartialEndTime-MaximumTime)/24 + jdEclipseMaximum ;
				var jdEclipseStart = (PartialStartTime-MaximumTime)/24 + jdEclipseMaximum ;
			}
			else
			{
				var eclipseType = 'None';
				var eclipseVisibility = 'Not Visible';
			}
 		}
	}
	var isSunUpStart = isSunUp(PartialStartAltitude);
	var isSunUpMaximum = isSunUp(MaximumAltitude);
	var isSunUpEnd = isSunUp(PartialEndAltitude);
	if ( isSunUpStart || isSunUpEnd ) var eclipseVisibility='Partial';
	if ( eclipseType=='Total' && isSunUpMaximum ) var eclipseVisibility='Total';
	if ( eclipseType=='Annular' && isSunUpMaximum ) var eclipseVisibility='Annular';
	if ( eclipseType != 'None' && ( !isSunUpStart || !isSunUpMaximum || !isSunUpEnd ) ) var eclipseVisibility='Problem';
	if ( Done == 'Yes' && ( !isSunUpStart || !isSunUpMaximum || !isSunUpEnd ) ) var eclipseVisibility='Problem';
	return [ eclipseType, eclipseVisibility, jdEclipseStart, jdEclipseEnd, jdEclipseMaximum, Done ];
}





// Observer constants -
// (0) North Latitude (radians)
// (1) West Longitude (radians)
// (2) Altitude (metres)
// (3) West time zone (hours)
// (4) rho sin O'
// (5) rho cos O'
// (6) index into the elements array for the eclipse in question
//
// Note that correcting for refraction will involve creating a "virtual" altitude
// for each contact, and hence a different value of rho and O' for each contact!

var obsvconstSolar = new Array();

// Eclipse circumstances
//  (0) Event type (C1=-2, C2=-1, midd=0, C3=1, C4=2)
//  (1) t
// -- time-only dependent circumstances (and their per-hour derivatives) follow --
//  (2) x
//  (3) y
//  (4) d
//  (5) sin d
//  (6) cos d
//  (7) mu
//  (8) l1
//  (9) l2
// (10) dx
// (11) dy
// (12) dd
// (13) dmu
// (14) dl1
// (15) dl2
// -- time and location dependent circumstances follow --
// (16) h
// (17) sin h
// (18) cos h
// (19) xi
// (20) eta
// (21) zeta
// (22) dxi
// (23) deta
// (24) u
// (25) v
// (26) a
// (27) b
// (28) l1'
// (29) l2'
// (30) n^2
// -- observational circumstances follow --
// (31) p
// (32) alt
// (33) q
// (34) v
// (35) azi
// (36) m (mid eclipse only) or limb correction applied (where available!)
// (37) magnitude (mid eclipse only)
// (38) moon/sun (mid eclipse only)
// (39) calculated local event type for a transparent earth (mid eclipse only)
//      (0 = none, 1 = partial, 2 = annular, 3 = total)
// (40) event visibility
//      (0 = above horizon, 1 = below horizon, 2 = sunrise, 3 = sunset, 4 = below horizon, disregard)

var c1 = new Array();
var c2 = new Array();
var midd = new Array();
var c3 = new Array();
var c4 = new Array();

// Populate the circumstances array with the time-only dependent circumstances (x, y, d, m, ...)
function timedependentSolar(elements, circumstances) {
  var type, index, t, ans;

  t = circumstances[1]
  index = obsvconstSolar[6]
  // Calculate x
  ans = elements[9+index] * t + elements[8+index]
  ans = ans * t + elements[7+index]
  ans = ans * t + elements[6+index]
  circumstances[2] = ans
  // Calculate dx
  ans = 3.0 * elements[9+index] * t + 2.0 * elements[8+index]
  ans = ans * t + elements[7+index]
  circumstances[10] = ans
  // Calculate y
  ans = elements[13+index] * t + elements[12+index]
  ans = ans * t + elements[11+index]
  ans = ans * t + elements[10+index]
  circumstances[3] = ans
  // Calculate dy
  ans = 3.0 * elements[13+index] * t + 2.0 * elements[12+index]
  ans = ans * t + elements[11+index]
  circumstances[11] = ans
  // Calculate d
  ans = elements[16+index] * t + elements[15+index]
  ans = ans * t + elements[14+index]
  ans = ans * Math.PI / 180.0
  circumstances[4] = ans
  // sin d and cos d
  circumstances[5] = Math.sin(ans)
  circumstances[6] = Math.cos(ans)
  // Calculate dd
  ans = 2.0 * elements[16+index] * t + elements[15+index]
  ans = ans * Math.PI / 180.0
  circumstances[12] = ans
  // Calculate m
  ans = elements[19+index] * t + elements[18+index]
  ans = ans * t + elements[17+index]
  if (ans >= 360.0) {
    ans = ans - 360.0
  }
  ans = ans * Math.PI / 180.0
  circumstances[7] = ans
  // Calculate dm
  ans = 2.0 * elements[19+index] * t + elements[18+index]
  ans = ans * Math.PI / 180.0
  circumstances[13] = ans
  // Calculate l1 and dl1
  type = circumstances[0]
  if ((type == -2) || (type == 0) || (type == 2)) {
    ans = elements[22+index] * t + elements[21+index]
    ans = ans * t + elements[20+index]
    circumstances[8] = ans
    circumstances[14] = 2.0 * elements[22+index] * t + elements[21+index]
  }
  // Calculate l2 and dl2
  if ((type == -1) || (type == 0) || (type == 1)) {
    ans = elements[25+index] * t + elements[24+index]
    ans = ans * t + elements[23+index]
    circumstances[9] = ans
    circumstances[15] = 2.0 * elements[25+index] * t + elements[24+index]
  }
  return circumstances
}

// Populate the circumstances array with the time and location dependent circumstances
function timelocdependentSolar(elements,circumstances) {
  var ans, index, type

  timedependentSolar(elements,circumstances)
  index = obsvconstSolar[6]
  // Calculate h, sin h, cos h
  circumstances[16] = circumstances[7] - obsvconstSolar[1] - (elements[index+5] / 13713.44)
  circumstances[17] = Math.sin(circumstances[16])
  circumstances[18] = Math.cos(circumstances[16])
  // Calculate xi
  circumstances[19] = obsvconstSolar[5] * circumstances[17]
  // Calculate eta
  circumstances[20] = obsvconstSolar[4] * circumstances[6] - obsvconstSolar[5] * circumstances[18] * circumstances[5]
  // Calculate zeta
  circumstances[21] = obsvconstSolar[4] * circumstances[5] + obsvconstSolar[5] * circumstances[18] * circumstances[6]
  // Calculate dxi
  circumstances[22] = circumstances[13] * obsvconstSolar[5] * circumstances[18]
  // Calculate deta
  circumstances[23] = circumstances[13] * circumstances[19] * circumstances[5] - circumstances[21] * circumstances[12]
  // Calculate u
  circumstances[24] = circumstances[2] - circumstances[19]
  // Calculate v
  circumstances[25] = circumstances[3] - circumstances[20]
  // Calculate a
  circumstances[26] = circumstances[10] - circumstances[22]
  // Calculate b
  circumstances[27] = circumstances[11] - circumstances[23]
  // Calculate l1'
  type = circumstances[0]
  if ((type == -2) || (type == 0) || (type == 2)) {
    circumstances[28] = circumstances[8] - circumstances[21] * elements[26+index]
  }
  // Calculate l2'
  if ((type == -1) || (type == 0) || (type == 1)) {
    circumstances[29] = circumstances[9] - circumstances[21] * elements[27+index]
  }
  // Calculate n^2
  circumstances[30] = circumstances[26] * circumstances[26] + circumstances[27] * circumstances[27]
  return circumstances
}

// Iterate on C1 or C4
function c1c4iterateSolar(elements,circumstances) {
  var sign, iter, tmp, n

  timelocdependentSolar(elements,circumstances)
  if (circumstances[0] < 0) {
    sign=-1.0
  } else {
    sign=1.0
  }
  tmp=1.0
  iter=0
  while (((tmp > 0.000001) || (tmp < -0.000001)) && (iter < 50)) {
    n = Math.sqrt(circumstances[30])
    tmp = circumstances[26] * circumstances[25] - circumstances[24] * circumstances[27]
    tmp = tmp / n / circumstances[28]
    tmp = sign * Math.sqrt(1.0 - tmp * tmp) * circumstances[28] / n
    tmp = (circumstances[24] * circumstances[26] + circumstances[25] * circumstances[27]) / circumstances[30] - tmp
    circumstances[1] = circumstances[1] - tmp
    timelocdependentSolar(elements,circumstances)
    iter++
  }
  return circumstances
}

// Get C1 and C4 data
//   Entry conditions -
//   1. The midd array must be populated
//   2. The magnitude at mid eclipse must be > 0.0
function getc1c4Solar(elements) {
  var tmp, n

  n = Math.sqrt(midd[30])
  tmp = midd[26] * midd[25] - midd[24] * midd[27]
  tmp = tmp / n / midd[28]
  tmp = Math.sqrt(1.0 - tmp * tmp) * midd[28] / n
  c1[0] = -2
  c4[0] = 2
  c1[1] = midd[1] - tmp
  c4[1] = midd[1] + tmp
  c1c4iterateSolar(elements,c1)
  c1c4iterateSolar(elements,c4)
}

// Iterate on C2 or C3
function c2c3iterateSolar(elements,circumstances) {
  var sign, iter, tmp, n

  timelocdependentSolar(elements,circumstances)
  if (circumstances[0] < 0) {
    sign=-1.0
  } else {
    sign=1.0
  }
  if (midd[29] < 0.0) {
    sign = -sign
  }
  tmp=1.0
  iter=0
  while (((tmp > 0.000001) || (tmp < -0.000001)) && (iter < 50)) {
    n = Math.sqrt(circumstances[30])
    tmp = circumstances[26] * circumstances[25] - circumstances[24] * circumstances[27]
    tmp = tmp / n / circumstances[29]
    tmp = sign * Math.sqrt(1.0 - tmp * tmp) * circumstances[29] / n
    tmp = (circumstances[24] * circumstances[26] + circumstances[25] * circumstances[27]) / circumstances[30] - tmp
    circumstances[1] = circumstances[1] - tmp
    timelocdependentSolar(elements,circumstances)
    iter++
  }
  return circumstances
}

// Get C2 and C3 data
//   Entry conditions -
//   1. The mid array must be populated
//   2. There must be either a total or annular eclipse at the location!
function getc2c3Solar(elements) {
  var tmp, n

  n = Math.sqrt(midd[30])
  tmp = midd[26] * midd[25] - midd[24] * midd[27]
  tmp = tmp / n / midd[29]
  tmp = Math.sqrt(1.0 - tmp * tmp) * midd[29] / n
  c2[0] = -1
  c3[0] = 1
  if (midd[29] < 0.0) {
    c2[1] = midd[1] + tmp
    c3[1] = midd[1] - tmp
  } else {
    c2[1] = midd[1] - tmp
    c3[1] = midd[1] + tmp
  }
  c2c3iterateSolar(elements,c2)
  c2c3iterateSolar(elements,c3)
}

// Get the observational circumstances
function observationalSolar(circumstances) {
  var contacttype, coslat, sinlat

  // We are looking at an "external" contact UNLESS this is a total eclipse AND we are looking at
  // c2 or c3, in which case it is an INTERNAL contact! Note that if we are looking at mid eclipse,
  // then we may not have determined the type of eclipse (midd[39]) just yet!
  if (circumstances[0] == 0) {
    contacttype = 1.0
  } else {
    if ((midd[39] == 3) && ((circumstances[0] == -1) || (circumstances[0] == 1))) {
      contacttype = -1.0
    } else {
      contacttype = 1.0
    }
  }
  // Calculate p
  circumstances[31] = Math.atan2(contacttype*circumstances[24], contacttype*circumstances[25])
  // Calculate alt
  sinlat = Math.sin(obsvconstSolar[0])
  coslat = Math.cos(obsvconstSolar[0])
  circumstances[32] = Math.asin(circumstances[5] * sinlat + circumstances[6] * coslat * circumstances[18])
  // Calculate q
  circumstances[33] = Math.asin(coslat * circumstances[17] / Math.cos(circumstances[32]))
  if (circumstances[20] < 0.0) {
    circumstances[33] = Math.PI - circumstances[33]
  }
  // Calculate v
  circumstances[34] = circumstances[31] - circumstances[33]
  // Calculate azi
  circumstances[35] = Math.atan2(-1.0*circumstances[17]*circumstances[6], circumstances[5]*coslat - circumstances[18]*sinlat*circumstances[6])
  // Calculate visibility
  if (circumstances[32] > -0.00524) {
    circumstances[40] = 0
  } else {
    circumstances[40] = 1
  }
}

// Get the observational circumstances for mid eclipse
function midobservationalSolar() {
  observationalSolar(midd)
  // Calculate m, magnitude and moon/sun
  midd[36] = Math.sqrt(midd[24]*midd[24] + midd[25]*midd[25])
  midd[37] = (midd[28] - midd[36]) / (midd[28] + midd[29])
  midd[38] = (midd[28] - midd[29]) / (midd[28] + midd[29])
}

// Calculate mid eclipse
function getmidSolar(elements) {
  var iter, tmp

  midd[0] = 0
  midd[1] = 0.0
  iter = 0
  tmp = 1.0
  timelocdependentSolar(elements,midd)
  while (((tmp > 0.000001) || (tmp < -0.000001)) && (iter < 50)) {
    tmp = (midd[24] * midd[26] + midd[25] * midd[27]) / midd[30]
    midd[1] = midd[1] - tmp
    iter++
    timelocdependentSolar(elements,midd)
  }
}

// Calculate the time of sunrise or sunset
function getsunrisetSolar(elements,circumstances,riset) {
  var h0, diff, iter

  diff = 1.0
  iter = 0
  while ((diff > 0.00001) || (diff < -0.00001)) {
    iter++
    if (iter == 4) return
    h0 = Math.acos((Math.sin(-0.00524) - Math.sin(obsvconstSolar[0]) * circumstances[5])/Math.cos(obsvconstSolar[0])/circumstances[6])
    diff = (riset * h0 - circumstances[16])/circumstances[13];
    while (diff >= 12.0) diff -= 24.0;
    while (diff <= -12.0) diff += 24.0;
    circumstances[1] += diff
    timelocdependentSolar(elements,circumstances)
  }
}

// Calculate the time of sunrise
function getsunriseSolar(elements,circumstances) {
  getsunrisetSolar(elements,circumstances,-1.0)
}

// Calculate the time of sunset
function getsunsetSolar(elements,circumstances) {
  getsunrisetSolar(elements,circumstances,1.0)
}

// Copy a set of circumstances
function copycircumstancesSolar(circumstancesfrom, circumstancesto) {
  var i;

  for (i = 1 ; i < 41 ; i++) {
    circumstancesto[i] = circumstancesfrom[i];
  }
}

// Populate the c1, c2, midd, c3 and c4 arrays
function getallSolar(elements) {
  var pattern

  getmidSolar(elements)
  midobservationalSolar()
  if (midd[37] > 0.0) {
    getc1c4Solar(elements)
    if ((midd[36] < midd[29]) || (midd[36] < -midd[29])) {
      getc2c3Solar(elements)
      if (midd[29] < 0.0) {
        midd[39] = 3 // Total eclipse
      } else {
        midd[39] = 2 // Annular eclipse
      }
      observationalSolar(c1)
      observationalSolar(c2)
      observationalSolar(c3)
      observationalSolar(c4)
      c2[36] = 999.9
      c3[36] = 999.9
      // Calculate how much of the eclipse is above the horizon
      pattern = 0
      if (c1[40] == 0) { pattern += 10000 }
      if (c2[40] == 0) { pattern += 1000 }
      if (midd[40] == 0) { pattern += 100 }
      if (c3[40] == 0) { pattern += 10 }
      if (c4[40] == 0) { pattern += 1 }
      // Now, time to make sure that all my observational[39] and observational[40] are OK
      if (pattern == 11110) {
        getsunsetSolar(elements,c4)
        observationalSolar(c4)
        c4[40] = 3
      } else if (pattern == 11100) {
        getsunsetSolar(elements,c3)
        observationalSolar(c3)
        c3[40] = 3
        copycircumstancesSolar(c3, c4);
      } else if (pattern == 11000) {
        c3[40] = 4
        getsunsetSolar(elements,midd)
        midobservationalSolar()
        midd[40] = 3
        copycircumstancesSolar(midd, c4)
      } else if (pattern == 10000) {
        midd[39] = 1
        getsunsetSolar(elements,midd)
        midobservationalSolar()
        midd[40] = 3
        copycircumstancesSolar(midd, c4)
      } else if (pattern == 1111) {
        getsunriseSolar(elements,c1)
        observationalSolar(c1)
        c1[40] = 2
      } else if (pattern == 111) {
        getsunriseSolar(elements,c2)
        observationalSolar(c2)
        c2[40] = 2
        copycircumstancesSolar(c2, c1)
      } else if (pattern == 11) {
        c2[40] = 4
        getsunriseSolar(elements,midd)
        midobservationalSolar()
        midd[40] = 2
        copycircumstancesSolar(midd, c1)
      } else if (pattern == 1) {
        midd[39] = 1
        getsunriseSolar(elements,midd)
        midobservationalSolar()
        midd[40] = 2
        copycircumstancesSolar(midd, c1)
      } else if (pattern == 0) {
        midd[39] = 0
      }
      // There are other patterns, but those are the only ones we're covering!
   } else {
      midd[39] = 1 // Partial eclipse
      pattern = 0
      observationalSolar(c1)
      observationalSolar(c4)
      if (c1[40] == 0) { pattern += 100 }
      if (midd[40] == 0) { pattern += 10 }
      if (c4[40] == 0) { pattern += 1 }
      if (pattern == 110) {
        getsunsetSolar(elements,c4)
        observationalSolar(c4)
        c4[40] = 3
      } else if (pattern == 100) {
        getsunsetSolar(elements,midd)
        midobservationalSolar()
        midd[40] = 3
        copycircumstancesSolar(midd, c4)
      } else if (pattern == 11) {
        getsunriseSolar(elements,c1)
        observationalSolar(c1)
        c1[40] = 2
      } else if (pattern == 1) {
        getsunriseSolar(elements,midd)
        midobservationalSolar()
        midd[40] = 2
        copycircumstancesSolar(midd, c1)
      } else if (pattern == 0) {
        midd[39]=0
      }
      // There are other patterns, but those are the only ones we're covering!
    }
  } else {
    midd[39] = 0 // No eclipse
  }
  // Magnitude for total and annular eclipse is moon/sun ratio
  if ((midd[39] == 2) || (midd[39] == 3)) {
     midd[37] = midd[38]
  }
}

// Get the local time of an event
function gettimeSolar(elements,circumstances)
{
  var t, index
  index = obsvconstSolar[6]
  t = circumstances[1] + elements[1+index] - obsvconstSolar[3] - (elements[4+index] - 0.5) / 3600.0
	return t
}

// Get the altitude
function getaltSolar(circumstances)
{
  var t
  if (circumstances[40] == 2) return 0;
  if (circumstances[40] == 3) return 0;
  if ((circumstances[32] < 0.0) && (circumstances[32] >= -0.00524)) t = 0.0    // Crude correction for refraction (and for consistency's sake)
  else t = circumstances[32] * 180.0 / Math.PI
  t = Math.floor(t+0.5)
  return t;
}

// Get the azimuth
function getaziSolar(circumstances)
{
  var t
  t = circumstances[35] * 180.0 / Math.PI
  if (t < 0.0) t = t + 360.0
  if (t >= 360.0) t = t - 360.0
  t = Math.floor(t + 0.5)
  return t;
}

// Get the duration in mm:ss.s format
// Adapted from code written by Stephen McCann - 27/04/2001
function getdurationSolar() {
  var tmp;
  if (c3[40] == 4) tmp = midd[1]-c2[1]
  else if (c2[40] == 4) tmp = c3[1]-midd[1]
  else tmp=c3[1]-c2[1];
  if (tmp<0.0) tmp=tmp+24.0
  else if (tmp >= 24.0) tmp=tmp-24.0
  tmp=(tmp*60.0)-60.0*Math.floor(tmp)+0.05/60.0;
  tmp=(tmp*60.0)-60.0*Math.floor(tmp)
  return Math.floor(tmp)
}

// Get the magnitude
function getmagnitudeSolar() {
  var a
  a = Math.floor(1000.0*midd[37]+0.5)/1000.0
  if (midd[40] == 2) a = a + "(r)"
  if (midd[40] == 3) a = a + "(s)"
  return a;
}

// Get the coverage
function getcoverageSolar() {
  var a, b, c
  if (midd[37] <= 0.0) a = 0
  else if (midd[37] >= 1.0) a = 1 
  else
  {
    if (midd[39] == 2) c = midd[38] * midd[38]
    else
    {
      c = Math.acos((midd[28]*midd[28] + midd[29]*midd[29] - 2.0*midd[36]*midd[36]) / (midd[28]*midd[28] - midd[29]*midd[29]))
      b = Math.acos((midd[28]*midd[29] + midd[36]*midd[36])/midd[36]/(midd[28]+midd[29]))
      a = Math.PI - b - c
      c = ((midd[38]*midd[38]*a + b) - midd[38]*Math.sin(c))/Math.PI
    }
    a = Math.floor(1000.0*c+0.5)/1000.0
  }
  return a;
}




