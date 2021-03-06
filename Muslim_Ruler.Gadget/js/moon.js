




// returns an array containing rise and set times or one of the
// following codes.
// -100 rise or set event not found and moon was down at 00:00
// -200 rise or set event not found and moon was up   at 00:00
function moonrise(obs,elevation)
{
	var twilight = moonTwilight() ;
	var obscopy=new Object();
	for (var i in obs) obscopy[i] = obs[i];
	obscopy.hours=0;
	obscopy.minutes=0;
	obscopy.seconds=0;
	var riseset=new Array();
	// elh is the height at the hour elhdone is true if elh calculated
	var elh=new Array();
	var elhdone=new Array();
	for (var i=0; i<=24; i++) {elhdone[i]=false;}
	moontab=topoMoonPos(obscopy,elevation,false);
	elh[0]=moontab[3];
	elhdone[0]=true;
	// set the return code to allow for always up or never rises
	if (elh[0] >= twilight) { riseset=new Array(-200,-200); }
	else { riseset=new Array(-100,-100); }
	obscopy.hours=24;
	moontab=topoMoonPos(obscopy,elevation,false);
	elh[24]=moontab[3];
	elhdone[24]=true;
	// search for moonrise and set
	for (var rise=0; rise<2; rise++)
	{
		var found=false;
		var hfirst=0;
		var hlast=24;
		obscopy.minutes=0;
		obscopy.seconds=0;
		// Try a binary chop on the hours to speed the search
		while (Math.ceil((hlast-hfirst)/2) > 1)
		{
			var hmid=hfirst+Math.round((hlast-hfirst)/2);
			if (!elhdone[hmid])
			{
				obscopy.hours=hmid;
				moontab=topoMoonPos(obscopy,elevation,false);
				elh[hmid]=moontab[3];
				elhdone[hmid]=true;
			}
			if (((rise == 0) && (elh[hfirst] <= twilight) && (elh[hmid] >= twilight)) || ((rise == 1) && (elh[hfirst] >= twilight) && (elh[hmid] <= twilight)))
			{
				hlast=hmid;
				found=true;
				continue;
			}
			if (((rise == 0) && (elh[hmid] <= twilight) && (elh[hlast] >= twilight)) || ((rise == 1) && (elh[hmid] >= twilight) && (elh[hlast] <= twilight)))
			{
				hfirst=hmid;
				found=true;
				continue;
			}
			break;
		}
		// If the binary chop did not find a 1 hour interval
		if ((hlast-hfirst) > 1)
		{
			for (var i=hfirst; i<hlast; i++)
			{
				found=false;
				if (!elhdone[i+1])
				{
					obscopy.hours=i+1;
					moontab=topoMoonPos(obscopy,elevation,false);
					elh[i+1]=moontab[3];
					elhdone[i+1]=true;
				}
				if (((rise == 0) && (elh[i] <= twilight) && (elh[i+1] >= twilight)) || ((rise == 1) && (elh[i] >= twilight) && (elh[i+1] <= twilight)))
				{
					hfirst=i;
					hlast=i+1;
					found=true;
					break;
				}
			}
		}
		var elfirst=elh[hfirst];
		var ellast=elh[hlast];
		// simple linear interpolation for the minutes
		if (found)
		{
			for (var step=1; step<=2*2; step+=step)
			{
				obscopy.hours=hfirst;
				obscopy.minutes=30/step;
				moontab=topoMoonPos(obscopy,elevation,false);
				if (rise == 0 && moontab[3] <= twilight) {hfirst=hfirst+0.5/step; elfirst=moontab[3];};
		 		if (rise == 0 && moontab[3] >  twilight) {hlast=hfirst+0.5/step; ellast=moontab[3];};
				if (rise == 1 && moontab[3] <= twilight) {hlast=hfirst+0.5/step; ellast=moontab[3];};
		 		if (rise == 1 && moontab[3] >  twilight) {hfirst=hfirst+0.5/step; elfirst=moontab[3];};
			}
			var speed=(hlast-hfirst)/(ellast-elfirst);
			if (Math.abs(elfirst-twilight)<Math.abs(ellast-twilight)) riseset[rise]=hfirst+Math.abs(elfirst-twilight)*Math.abs(speed);
			else riseset[rise]=hlast-Math.abs(ellast-twilight)*Math.abs(speed);
		}
	} // End of rise/set loop
	return [ riseset[0] , riseset[1] ] ;
}





// Returns:
// Topocentirc Moon position
// RA, Dec, distance
// Altitude, Azmiuth
// Moons Position Angle
// Moons argument of Latitiude
function topoMoonPos(obs,elevation,lbFlag)
{
	var geoMoonData = geoMoonPos(obs,lbFlag) ;
	var topoMoonData = geo2topo(geoMoonData[0], geoMoonData[1], geoMoonData[2], obs, elevation) ;
	return [ topoMoonData[0], topoMoonData[1], topoMoonData[2], topoMoonData[3], topoMoonData[4], geoMoonData[3], geoMoonData[4], geoMoonData[5], geoMoonData[6], geoMoonData[7] ] ;
}





// return both Geocentric & Topocentric moon position
// Geoocentric RA, Dec, distance, Alt, Az, Pa
// Topocentric RA, Dec, distance, Alt, Az
function GeoTopo_MoonPos(obs,elevation)
{
	var geoMoonData = geoMoonPos(obs,false) ;
	var geoAltAz = rad2aa(geoMoonData[0], geoMoonData[1], obs, 0);
	var topoMoonData = geo2topo(geoMoonData[0], geoMoonData[1], geoMoonData[2], obs, elevation) ;
	return [ geoMoonData[0], geoMoonData[1], geoMoonData[2], geoAltAz[0], geoAltAz[1], geoMoonData[3], topoMoonData[0], topoMoonData[1], topoMoonData[2], topoMoonData[3], topoMoonData[4] ] ; 
}





//convert ra & dec equiterial to ecliptic long & lat
function ecliptic(ra,dec,obs)
{
  var jdobs=jd(obs);
  // Obliquity of Ecliptic
  var obl=23.4393-3.563E-7*(jdobs-2451543.5);
  var raequat = ra * 15 ;
  var decequat = dec ;
	var xequat = cosd(raequat) * cosd(decequat) ;
  var yequat = sind(raequat) * cosd(decequat) ;
  var zequat = sind(decequat) ;
  var xeclip = xequat ;
	var yeclip = yequat * cosd(-obl) - zequat * sind(-obl) ;
	var zeclip = yequat * sind(-obl) + zequat * cosd(-obl) ;
  var raeclip = atan2d( yeclip, xeclip ) ;
  var dececlip = atan2d( zeclip, Math.sqrt( xeclip*xeclip + yeclip*yeclip ) ) ;
	var longeclip = (raeclip>0?raeclip:360+raeclip) ;
	var lateclip = dececlip ;
	return [ longeclip , lateclip ]
}





//convert a phase angle to a common name
function phaseName(pa)
{
	//allows 5 degree leaway for the quarters
	if (pa >= 357.5) return "Full Moon";
	if (pa > 272.5)  return "Waning Gibbous";
	if (pa >= 267.5) return "Last Quarter";
	if (pa > 182.5)  return "Waning Crescent";
	if (pa >= 177.5) return "New Moon";
	if (pa > 92.5)   return "Waxing Crescent";
	if (pa >= 87.5)  return "First Quarter";
	if (pa > 2.5)    return "Waxing Gibbous";
	if (pa >= 0)     return "Full Moon";
	return "Unknown Phase";
}





// moons() function added by Mark Crossley for Moon Phase II widget
// Returns the dates for New and Full Moons.
// Converted from Basic Sky & Telescope, March, 1985
function moons(year,tz) {
  var moondates=new Array();
  var R1=Math.PI/180;
  var U=false;
  var Y=year;
  var K0=Math.floor((Y-1900)*12.3685);
  var T=(Y-1899.5)/100;
  var T2=T*T;
  var T3=T*T*T;
  var J0=2415020+29*K0;
  var F0=0.0001178*T2-0.000000155*T3;
  var F0=F0+0.75933+0.53058868*K0;
  var F0=F0-0.000837*T-0.000335*T2;
  var M0=K0*0.08084821133;
  M0=360*(M0-Math.floor(M0))+359.2242;
  M0=M0-0.0000333*T2;
  M0=M0-0.00000347*T3;
  var M1=K0*0.07171366128;
  M1=360*(M1-Math.floor(M1))+306.0253;
  M1=M1+0.0107306*T2;
  M1=M1+0.00001236*T3;
  var B1=K0*0.08519585128;
  B1=360*(B1-Math.floor(B1))+21.2964;
  B1=B1-0.0016528*T2;
  B1=B1-0.00000239*T3;
  for (var K9=0; K9<=28; K9+=1)
  {
    var J=J0+14*K9;
    var F=F0+0.765294*K9;
    var K=K9/2;
    var M5=(M0+K*29.10535608)*R1;
    var M6=(M1+K*385.81691806)*R1;
    var B6=(B1+K*390.67050646)*R1;
    var F=F-0.4068*Math.sin(M6);
    F=F+(0.1734-0.000393*T)*Math.sin(M5);
    F=F+0.0161*Math.sin(2*M6);
    F=F+0.0104*Math.sin(2*B6);
    F=F-0.0074*Math.sin(M5-M6);
    F=F-0.0051*Math.sin(M5+M6);
    F=F+0.0021*Math.sin(2*M5);
    F=F+0.0010*Math.sin(2*B6-M6);
    J=J+F;
    moondates[K9]=J - tz/60/24 ;
    U=!U;
  }
  return moondates;
}





// Meeus first edition table 45.A Longitude and distance of the moon
// (Table 47.A 2nd Edition)

   var T45AD = new Array(0, 2, 2, 0, 0, 0, 2, 2, 2, 2,
                         0, 1, 0, 2, 0, 0, 4, 0, 4, 2,
                         2, 1, 1, 2, 2, 4, 2, 0, 2, 2,
                         1, 2, 0, 0, 2, 2, 2, 4, 0, 3,
                         2, 4, 0, 2, 2, 2, 4, 0, 4, 1,
                         2, 0, 1, 3, 4, 2, 0, 1, 2, 2);

   var T45AM = new Array(0,  0,  0,  0,  1,  0,  0, -1,  0, -1,
                         1,  0,  1,  0,  0,  0,  0,  0,  0,  1,
                         1,  0,  1, -1,  0,  0,  0,  1,  0, -1,
                         0, -2,  1,  2, -2,  0,  0, -1,  0,  0,
                         1, -1,  2,  2,  1, -1,  0,  0, -1,  0,
                         1,  0,  1,  0,  0, -1,  2,  1,  0,  0);

   var T45AMP = new Array( 1, -1,  0,  2,  0,  0, -2, -1,  1,  0,
                          -1,  0,  1,  0,  1,  1, -1,  3, -2, -1,
                           0, -1,  0,  1,  2,  0, -3, -2, -1, -2,
                           1,  0,  2,  0, -1,  1,  0, -1,  2, -1,
                           1, -2, -1, -1, -2,  0,  1,  4,  0, -2,
                           0,  2,  1, -2, -3,  2,  1, -1,  3, -1);

   var T45AF  = new Array( 0,  0,  0,  0,  0,  2,  0,  0,  0,  0,
                           0,  0,  0, -2,  2, -2,  0,  0,  0,  0,
                           0,  0,  0,  0,  0,  0,  0,  0,  2,  0,
                           0,  0,  0,  0,  0, -2,  2,  0,  2,  0,
                           0,  0,  0,  0,  0, -2,  0,  0,  0,  0,
                          -2, -2,  0,  0,  0,  0,  0,  0,  0, -2);

   var T45AL = new Array(6288774, 1274027, 658314, 213618, -185116,
                         -114332,   58793,  57066,  53322,   45758,
                          -40923,  -34720, -30383,  15327,  -12528,
                           10980,   10675,  10034,   8548,   -7888,
                           -6766,   -5163,   4987,   4036,    3994,
                            3861,    3665,  -2689,  -2602,    2390,
                           -2348,    2236,  -2120,  -2069,    2048,
                           -1773,   -1595,   1215,  -1110,    -892,
                            -810,     759,   -713,   -700,     691,
                             596,     549,    537,    520,    -487,
                            -399,    -381,    351,   -340,     330,
                             327,    -323,    299,    294,       0);

   var T45AR = new Array(-20905355, -3699111, -2955968, -569925,   48888,
                             -3149,   246158,  -152138, -170733, -204586,
                           -129620,   108743,   104755,   10321,       0,
                             79661,   -34782,   -23210,  -21636,   24208,
                             30824,    -8379,   -16675,  -12831,  -10445,
                            -11650,    14403,    -7003,       0,   10056,
                              6322,    -9884,     5751,       0,   -4950,
                              4130,        0,    -3958,       0,    3258,
                              2616,    -1897,    -2117,    2354,       0,
                                 0,    -1423,    -1117,   -1571,   -1739,
                                 0,    -4421,        0,       0,       0,
                                 0,     1165,        0,       0,    8752);

// Meeus table 45B latitude of the moon
// (Table 47.B 2nd Edition)

   var T45BD = new Array(0, 0, 0, 2, 2, 2, 2, 0, 2, 0,
                         2, 2, 2, 2, 2, 2, 2, 0, 4, 0,
                         0, 0, 1, 0, 0, 0, 1, 0, 4, 4,
                         0, 4, 2, 2, 2, 2, 0, 2, 2, 2,
                         2, 4, 2, 2, 0, 2, 1, 1, 0, 2,
                         1, 2, 0, 4, 4, 1, 4, 1, 4, 2);

   var T45BM = new Array( 0,  0,  0,  0,  0,  0,  0, 0,  0,  0,
                         -1,  0,  0,  1, -1, -1, -1, 1,  0,  1,
                          0,  1,  0,  1,  1,  1,  0, 0,  0,  0,
                          0,  0,  0,  0, -1,  0,  0, 0,  0,  1,
                          1,  0, -1, -2,  0,  1,  1, 1,  1,  1,
                          0, -1,  1,  0, -1,  0,  0, 0, -1, -2);

   var T45BMP = new Array(0,  1, 1,  0, -1, -1,  0,  2,  1,  2,
                          0, -2, 1,  0, -1,  0, -1, -1, -1,  0,
                          0, -1, 0,  1,  1,  0,  0,  3,  0, -1,
                          1, -2, 0,  2,  1, -2,  3,  2, -3, -1,
                          0,  0, 1,  0,  1,  1,  0,  0, -2, -1,
                          1, -2, 2, -2, -1,  1,  1, -1,  0,  0);

   var T45BF = new Array( 1,  1, -1, -1,  1, -1,  1,  1, -1, -1,
                         -1, -1,  1, -1,  1,  1, -1, -1, -1,  1,
                          3,  1,  1,  1, -1, -1, -1,  1, -1,  1,
                         -3,  1, -3, -1, -1,  1, -1,  1, -1,  1,
                          1,  1,  1, -1,  3, -1, -1,  1, -1, -1,
                          1, -1,  1, -1, -1, -1, -1, -1, -1,  1);

   var T45BL = new Array(5128122, 280602, 277693, 173237, 55413,
                           46271,  32573,  17198,   9266,  8822,
                            8216,   4324,   4200,  -3359,  2463,
                            2211,   2065,  -1870,   1828, -1794,
                           -1749,  -1565,  -1491,  -1475, -1410,
                           -1344,  -1335,   1107,   1021,   833,
                             777,    671,    607,    596,   491,
                            -451,    439,    422,    421,  -366,
                            -351,    331,    315,    302,  -283,
                            -229,    223,    223,   -220,  -220,
                            -185,    181,   -177,    176,   166,
                            -164,    132,   -119,    115,   107);





// MoonPos calculates the Moon position, based on Meeus chapter 45
// and the illuminated percentage from Meeus equations 46.4 and 46.1
//
// Returns:
// Geocentirc Moon position
// RA, Dec, distance
// Moons Position Angle
// Moons argument of Latitiude
function geoMoonPos(obs,lbFlag) {
  // julian date
  var jdobs=jd(obs);
	  var T=(jdobs-2451545.0)/36525;
  	var T2=T*T;
		var T3=T2*T;
  	var T4=T3*T;
	  // Moons mean longitude L'
  	var LP=218.3164477+481267.88123421*T-0.0015786*T2+T3/538841.0-T4/65194000.0;
	  // Moons mean elongation
  	var D=297.8501921+445267.1114034*T-0.0018819*T2+T3/545868.0-T4/113065000.0;
	  // Suns mean anomaly
  	var M=357.5291092+35999.0502909*T-0.0001536*T2+T3/24490000.0;
	  // Moons mean anomaly M'
  	var MP=134.9633964+477198.8675055*T+0.0087414*T2+T3/69699.0-T4/14712000.0;
	  // Moons argument of latitude
  	var F=93.2720950+483202.0175233*T-0.0036539*T2-T3/3526000.0+T4/863310000.0;
  	// Additional arguments
  	var A1=119.75+131.849*T;
  	var A2=53.09+479264.290*T;
  	var A3=313.45+481266.484*T;
  	var E=1-0.002516*T-0.0000074*T2;
  	var E2=E*E;
  	// Sums of periodic terms from table 45.A and 45.B
  	var Sl=0.0;
  	var Sr=0.0;
  	for (var i=0; i<60; i++) {
    	var Eterm=1;
    	if (Math.abs(T45AM[i])==1) Eterm=E;
    	if (Math.abs(T45AM[i])==2) Eterm=E2;
    	Sl+=T45AL[i] * Eterm * sind(  rev(   T45AD[i]*D + T45AM[i]*M + T45AMP[i]*MP + T45AF[i]*F  ));
    	Sr+=T45AR[i]*Eterm*cosd(rev(T45AD[i]*D+T45AM[i]*M+T45AMP[i]*MP+T45AF[i]*F));
  	}
  	var Sb=0.0;
  	for (var i=0; i<60; i++) {
    	var Eterm=1;
    	if (Math.abs(T45BM[i])==1) Eterm=E;
    	if (Math.abs(T45BM[i])==2) Eterm=E2;
    	Sb+=T45BL[i]*Eterm*sind(rev(T45BD[i]*D+T45BM[i]*M+T45BMP[i]*MP+T45BF[i]*F));
  	}
  	// Additional additive terms
  	Sl=Sl+3958*sind(rev(A1))+1962*sind(rev(LP-F))+318*sind(rev(A2));
  	Sb=Sb-2235*sind(rev(LP))+382*sind(rev(A3))+175*sind(rev(A1-F))+
  	   175*sind(rev(A1+F))+127*sind(rev(LP-MP))-115*sind(rev(LP+MP));
  	// geocentric longitude, latitude and distance
  	var mglong=rev(LP+Sl/1000000.0);
  	var mglat=rev(Sb/1000000.0);
  	if (mglat > 180.0) mglat=mglat-360;
  	var mr=Math.round(385000.56+Sr/1000.0);
  	// Obliquity of Ecliptic
  	var obl=23.4393-3.563E-7*(jdobs-2451543.5);
  	// RA and dec
  	var ra=rev(atan2d(sind(mglong)*cosd(obl)-tand(mglat)*sind(obl),cosd(mglong)))/15.0;
  	var dec=rev(asind(sind(mglat)*cosd(obl)+cosd(mglat)*sind(obl)*sind(mglong)));
  	if (dec > 180.0) dec=dec-360;
		var l=0;
		var b=0;
  	// phase angle
  	var pa=rev(180.0-D-6.289*sind(MP)+2.1*sind(M)-1.274*sind(2*D-MP)
  	       -0.658*sind(2*D)-0.214*sind(2*MP)-0.11*sind(D));
		if (lbFlag)
		{
	  	// Physical libration (Meeus 2nd Ed, 53.2) - too small for us! <0.04 degrees - Mark Crossley
  		// Topocentric libration - Added by Mark Crossley
  		// Get Moons Topocentric RA/Dec
  		var bet=5.128122*sind(F) + 0.280602*sind(MP + F) + 0.277693*sind(MP - F) + 0.173237*sind(D*2 - F);
    		  bet+=0.055413*sind(D*2 - MP + F)+0.046271*sind(D*2 - MP - F) + 0.032573*sind(D*2 + F);
  		var lam=6.288874*sind(MP) + 1.274027*sind(D*2 -MP) + 0.658314*sind(D*2);
  	  	  lam+=0.213618*sind(2*MP) - 0.185116*sind(M) - 0.114332*sind(2 * F);
    	  	lam+=0.05793*sind(D*2 - 2*MP) + 0.057066*sind(D*2 - M - MP) + 0.053322*sind(D*2 + MP) + LP;
      		lam=rev(lam);
  		var I=1.54242;
  		// Moons longitude of mean ascending node - Added by Mark Crossley
	  	var Om= range(125.0445479 - 1934.1362891*T + 0.0020754*T2 +T3/467441.0 -T4/60616000.0);
  		var W=lam-Om;
  		var Y=cosd(W)*cosd(bet);
  		var X=sind(W)*cosd(bet)*cosd(I)-sind(bet)*sind(I);
  		var A=atan2d(X,Y);
  		var l=rev(A-F);
  		if (l>180) {l=360-l;l=-l;}
  		var b=asind(-sind(W)*cosd(bet)*sind(I)-sind(bet)*cosd(I));
  	}
  	return new Array(ra,dec,mr,pa,mglong,mglat,l,b);
}





function moonBirthData(jdDate, cityLong, cityLat, nowFlag)
{
	var moonVisibilityMethod = SettingsManager.getValue("Home", "moonVisibilityMethod");
	var moonCheckDelay = Number(SettingsManager.getValue("Home", "moonCheckDelay")) ;
  var tz = -60 * Number(SettingsManager.getValue("Home", "tzone")) ;
	var lat = SettingsManager.getValue("Home", "lat");
	var lng = SettingsManager.getValue("Home", "lng");
	var cityElevation = 0 ;

	if (nowFlag==true) var jdMoonCheck = jdDate ;
	else
	{
		var jdMidnight1 = jdMidnight(jdDate+tz/60/24) ;
		var observer = jd2observer(jdMidnight1,tz,cityLong,cityLat) ;
		var arrSunRiseSet = sunrise(observer,cityElevation);
		if ( arrSunRiseSet[1] == -100 || arrSunRiseSet[1] == -200 ) return [ jdMidnight1, jdMidnight1, 0, 0, 0, 0, 'Unknown', jdMidnight1, moonCheckDelay, 0, 0 ] ;
		var jdSunSet = jdMidnight1 + arrSunRiseSet[1]/24 ;

  	// BestTime calculations with respect to the Sun Set (in minutes)
		//var arrMoonRiseSet = moonrise(observer,cityElevation);
		//var jdMoonSet = jdMidnight1 + arrMoonRiseSet[1]/24 ;
		//var moonCheckDelay = ( 4/9 * (jdMoonSet-jdSunSet) ) *24*60 ;

		var jdMoonCheck = jdSunSet + moonCheckDelay/60/24 ;
	}

	var observer = jd2observer(jdMoonCheck,tz,cityLong,cityLat) ;

	var mfn = moons(observer.year+(observer.month-1)/12,tz) ;
	for (var i=0; i<28; i++)
	{
		if (mfn[i] > jdMoonCheck) break;
		if (mfn[i] <= jdMoonCheck && !(i%2)) var iNew = i;
	}
	var jdMoonBirth = mfn[iNew] ;

	var ageMoonValue = ( jdMoonCheck - jdMoonBirth ) * 24 ;
	//if (ageMoonValue<=0) ageMoonValue=0 ;

	var gt_arrMoonPos = GeoTopo_MoonPos(observer,cityElevation) ;

	var moonIllumFrac = (50+50*cosd(gt_arrMoonPos[5])) ;

	//var g_moonRa = gt_arrMoonPos[0] ;
	//var g_moonDec = gt_arrMoonPos[1] ;
	var g_moonAltitude = gt_arrMoonPos[3] ;
	var g_moonAzmoth = gt_arrMoonPos[4] ;

	//var t_moonRa = gt_arrMoonPos[6] ;
	//var t_moonDec = gt_arrMoonPos[7] ;
	var t_moonAltitude = gt_arrMoonPos[9] ;
	var t_moonAzmoth = gt_arrMoonPos[10] ;

	var availableMoonValue = 0 ;
	var moonVisibility = 'Not Exist' ;

	var sunData = topoSunPos(observer,cityElevation);

	//var sunRa = sunData[0] ;
	//var sunDec = sunData[1] ;
	var sunAltitude = sunData[3] ;
	var sunAzmoth = sunData[4] ;

	//var separationSunMoon=angularSeparation(sunRa, sunDec, moonRa, moonDec);

	var t_DAZ = t_moonAzmoth - sunAzmoth ;
	var t_ARCV = t_moonAltitude - sunAltitude ;
	var t_ARCL = acosd( cosd(t_DAZ) * cosd(t_ARCV) ) ;
	var t_WOC = 15*(1-cosd(t_ARCV)*cosd(t_DAZ)) ;

	var g_DAZ = g_moonAzmoth - sunAzmoth ;
	var g_ARCV = g_moonAltitude - sunAltitude ;
	var g_ARCL = acosd( cosd(g_DAZ) * cosd(g_ARCV) ) ;
	var g_WOC = 15*(1-cosd(g_ARCV)*cosd(g_DAZ)) ;



	if (isMoonUp(t_moonAltitude))
	{

//	if ( moonVisibilityMethod=='Manual' || (cityLong==lng && cityLat==lat) )
//	{
			var arrMoonRiseSet = moonrise(observer,cityElevation);
			var jdMoonSet = jdMidnight(jdMoonCheck) + arrMoonRiseSet[1]/24 ;
			if ( arrMoonRiseSet[1]==-100 || arrMoonRiseSet[1]==-200 || jdMoonSet<jdMoonCheck )
			{
				var observerTemp = jd2observer(jdMoonCheck+1,tz,cityLong,cityLat) ;
				var arrMoonRiseSetTemp = moonrise(observerTemp,cityElevation);
				if ( arrMoonRiseSetTemp[1]!=-100 && arrMoonRiseSetTemp[1]!=-200 )
				{
					var jdMoonSet = jdMidnight(jdMoonCheck+1) + arrMoonRiseSetTemp[1]/24 ;
					var availableMoonValue = ( jdMoonSet - jdSunSet ) * 24*60 ;
				}
				else var availableMoonValue = 23*60 + 59 ; // maximum availibility ( 23:59 ) because moon is up but no moon set for today & tomorrow
			}
			else var availableMoonValue = ( jdMoonSet - jdSunSet ) * 24*60 ;
//	}



		if (moonVisibilityMethod=='Manual')
		{
			var moonVisibility = 'Impossible' ;
			var data=moonVisibilitySetup('Manual',1) ;
			if ( moonIllumFrac>=data[1] && t_moonAltitude>=data[0] && ageMoonValue>=data[2] && availableMoonValue>=data[3] && Math.abs(t_DAZ)>=Math.abs(data[4]) ) moonVisibility = 'Manual' ;
			//var data=moonVisibilitySetup('Powered Eyes',1) ;
			//if ( moonIllumFrac>=data[1] && t_moonAltitude>=data[0] && ageMoonValue>=data[2] && availableMoonValue-60*24>=data[3] && -t_DAZ>=data[4] ) moonVisibility = 'Powered Eyes' ;
			//var data=moonVisibilitySetup('Sharp Eyes',1) ;
			//if ( moonIllumFrac>=data[1] && t_moonAltitude>=data[0] && ageMoonValue>=data[2] && availableMoonValue-60*24>=data[3] && -t_DAZ>=data[4] ) moonVisibility = 'Sharp Eyes' ;
			//var data=moonVisibilitySetup('Normal Eyes',1) ;
			//if ( moonIllumFrac>=data[1] && t_moonAltitude>=data[0] && ageMoonValue>=data[2] && availableMoonValue-60*24>=data[3] && -t_DAZ>=data[4] ) moonVisibility = 'Normal Eyes' ;
		}

//		if (availableMoonValue==9999) var availableMoonValue = 0 ;

		if ( moonVisibilityMethod!='Manual' )
		{
			// Shaukat
			var moonVisibility1 = 'Impossible' ;
			var Q = ( t_ARCV - ( 11.8371 - 6.3226*t_WOC + 0.7319*t_WOC*t_WOC - 0.1018*t_WOC*t_WOC*t_WOC ) ) / 10 ;
			if (Q>-0.480) moonVisibility1 = 'Powered Eyes' ;
			if (Q>-0.212) moonVisibility1 = 'Sharp Eyes' ;
			if (Q>-0.024) moonVisibility1 = 'Normal Eyes' ;

			// Odeh
			var moonVisibility2 = 'Impossible' ;
			var Q = t_ARCV - ( 7.1651 - 6.3226*t_WOC + 0.7319*t_WOC*t_WOC - 0.1018*t_WOC*t_WOC*t_WOC ) ;
			if (Q>=-0.96) moonVisibility2 = 'Powered Eyes' ;
			if (Q>=+2.00) moonVisibility2 = 'Sharp Eyes' ;
			if (Q>=+5.65) moonVisibility2 = 'Normal Eyes' ;

			// Yallop
			var moonVisibility3 = 'Impossible' ;
			var Q = ( g_ARCV - ( 11.8371 - 6.3226*t_WOC + 0.7319*t_WOC*t_WOC - 0.1018*t_WOC*t_WOC*t_WOC ) ) / 10 ;
			if (Q>-0.232) moonVisibility3 = 'Powered Eyes' ;
			if (Q>-0.160) moonVisibility3 = 'Sharp Eyes' ;
			if (Q>-0.014) moonVisibility3 = 'Normal Eyes' ;
		}

		if (moonVisibilityMethod=='Shaukat') moonVisibility = moonVisibility1 ;
		if (moonVisibilityMethod=='Odeh') moonVisibility = moonVisibility2 ;
		if (moonVisibilityMethod=='Yallop') moonVisibility = moonVisibility3 ;
		var moonVisibilityWorst = moonVisibility ;
		var moonVisibilityBest = moonVisibility ;

		if (moonVisibilityMethod=='Shaukat-Odeh')
		{
			if (moonVisibility1=='Normal Eyes' || moonVisibility2=='Normal Eyes') var moonVisibilityWorst = 'Normal Eyes' ;
			if (moonVisibility1=='Sharp Eyes' || moonVisibility2=='Sharp Eyes') var moonVisibilityWorst = 'Sharp Eyes' ;
			if (moonVisibility1=='Powered Eyes' || moonVisibility2=='Powered Eyes') var moonVisibilityWorst = 'Powered Eyes' ;
			if (moonVisibility1=='Impossible' || moonVisibility2=='Impossible') var moonVisibilityWorst = 'Impossible' ;
			if (moonVisibility1=='Impossible' || moonVisibility2=='Impossible') var moonVisibilityBest = 'Impossible' ;
			if (moonVisibility1=='Powered Eyes' || moonVisibility2=='Powered Eyes') var moonVisibilityBest = 'Powered Eyes' ;
			if (moonVisibility1=='Sharp Eyes' || moonVisibility2=='Sharp Eyes') var moonVisibilityBest = 'Sharp Eyes' ;
			if (moonVisibility1=='Normal Eyes' || moonVisibility2=='Normal Eyes') var moonVisibilityBest = 'Normal Eyes' ;
		}

		if (moonVisibilityMethod=='Shaukat-Yallop')
		{
			if (moonVisibility1=='Normal Eyes' || moonVisibility3=='Normal Eyes') var moonVisibilityWorst = 'Normal Eyes' ;
			if (moonVisibility1=='Sharp Eyes' || moonVisibility3=='Sharp Eyes') var moonVisibilityWorst = 'Sharp Eyes' ;
			if (moonVisibility1=='Powered Eyes' || moonVisibility3=='Powered Eyes') var moonVisibilityWorst = 'Powered Eyes' ;
			if (moonVisibility1=='Impossible' || moonVisibility3=='Impossible') var moonVisibilityWorst = 'Impossible' ;
			if (moonVisibility1=='Impossible' || moonVisibility3=='Impossible') var moonVisibilityBest = 'Impossible' ;
			if (moonVisibility1=='Powered Eyes' || moonVisibility3=='Powered Eyes') var moonVisibilityBest = 'Powered Eyes' ;
			if (moonVisibility1=='Sharp Eyes' || moonVisibility3=='Sharp Eyes') var moonVisibilityBest = 'Sharp Eyes' ;
			if (moonVisibility1=='Normal Eyes' || moonVisibility3=='Normal Eyes') var moonVisibilityBest = 'Normal Eyes' ;
		}

		if (moonVisibilityMethod=='Odeh-Yallop')
		{
			if (moonVisibility3=='Normal Eyes' || moonVisibility2=='Normal Eyes') var moonVisibilityWorst = 'Normal Eyes' ;
			if (moonVisibility3=='Sharp Eyes' || moonVisibility2=='Sharp Eyes') var moonVisibilityWorst = 'Sharp Eyes' ;
			if (moonVisibility3=='Powered Eyes' || moonVisibility2=='Powered Eyes') var moonVisibilityWorst = 'Powered Eyes' ;
			if (moonVisibility3=='Impossible' || moonVisibility2=='Impossible') var moonVisibilityWorst = 'Impossible' ;
			if (moonVisibility3=='Impossible' || moonVisibility2=='Impossible') var moonVisibilityBest = 'Impossible' ;
			if (moonVisibility3=='Powered Eyes' || moonVisibility2=='Powered Eyes') var moonVisibilityBest = 'Powered Eyes' ;
			if (moonVisibility3=='Sharp Eyes' || moonVisibility2=='Sharp Eyes') var moonVisibilityBest = 'Sharp Eyes' ;
			if (moonVisibility3=='Normal Eyes' || moonVisibility2=='Normal Eyes') var moonVisibilityBest = 'Normal Eyes' ;
		}

		if (moonVisibilityMethod=='Shaukat-Odeh-Yallop')
		{
			if (moonVisibility1=='Normal Eyes' || moonVisibility2=='Normal Eyes' || moonVisibility3=='Normal Eyes') var moonVisibilityWorst = 'Normal Eyes' ;
			if (moonVisibility1=='Sharp Eyes' || moonVisibility2=='Sharp Eyes' || moonVisibility3=='Sharp Eyes') var moonVisibilityWorst = 'Sharp Eyes' ;
			if (moonVisibility1=='Powered Eyes' || moonVisibility2=='Powered Eyes' || moonVisibility3=='Powered Eyes') var moonVisibilityWorst = 'Powered Eyes' ;
			if (moonVisibility1=='Impossible' || moonVisibility2=='Impossible' || moonVisibility3=='Impossible') var moonVisibilityWorst = 'Impossible' ;
			if (moonVisibility1=='Impossible' || moonVisibility2=='Impossible' || moonVisibility3=='Impossible') var moonVisibilityBest = 'Impossible' ;
			if (moonVisibility1=='Powered Eyes' || moonVisibility2=='Powered Eyes' || moonVisibility3=='Powered Eyes') var moonVisibilityBest = 'Powered Eyes' ;
			if (moonVisibility1=='Sharp Eyes' || moonVisibility2=='Sharp Eyes' || moonVisibility3=='Sharp Eyes') var moonVisibilityBest = 'Sharp Eyes' ;
			if (moonVisibility1=='Normal Eyes' || moonVisibility2=='Normal Eyes' || moonVisibility3=='Normal Eyes') var moonVisibilityBest = 'Normal Eyes' ;
		}

		if (moonVisibilityBest==moonVisibilityWorst) moonVisibility = moonVisibilityWorst ;
		else moonVisibility = moonVisibilityBest + '-' + moonVisibilityWorst ;

	}

	return [ jdMoonSet, jdSunSet, moonIllumFrac.toFixed(2), t_moonAltitude, ageMoonValue, availableMoonValue, moonVisibility, jdMoonCheck, moonCheckDelay.toFixed(0), t_moonAzmoth, sunAzmoth] ;
}





function moonVisibility(cityVisi, horizonVisi)
{
	cityVisi = visibilityUncertain(cityVisi) ;
	horizonVisi = visibilityUncertain(horizonVisi) ;

	var visibility = 'Not Exist' ;
	if (cityVisi=='Not Exist'			|| horizonVisi=='Not Exist') 		visibility = 'Not Exist' 		;
	if (cityVisi=='Impossible' 		|| horizonVisi=='Impossible') 	visibility = 'Impossible' 	;
	if (cityVisi=='Powered Eyes'	|| horizonVisi=='Powered Eyes') visibility = 'Powered Eyes' ;
	if (cityVisi=='Sharp Eyes' 		|| horizonVisi=='Sharp Eyes') 	visibility = 'Sharp Eyes' 	;
	if (cityVisi=='Normal Eyes' 	|| horizonVisi=='Normal Eyes') 	visibility = 'Normal Eyes' 	;
	if (cityVisi=='Manual' 				|| horizonVisi=='Manual') 			visibility = 'Manual' 	;

	var visible = isVisible(visibility) ;

	return [ visible, visibility ] ;
}





function isVisible(anyVisibility)
{
	var visible = 'No' ;
	var visiType = 0 ;
	var calcType = 0 ;
	var hijriCalcMethod = SettingsManager.getValue("Home", "hijriCalcMethod");
	anyVisibility = visibilityUncertain(anyVisibility) ;
	switch (anyVisibility)
	{
		case	'Not Exist'		:	var visiType = 1 ;  break ;
		case	'Impossible'	:	var visiType = 2 ;  break ;
		case	'Powered Eyes':	var visiType = 3 ;  break ;
		case	'Sharp Eyes'	:	var visiType = 4 ;  break ;
		case	'Normal Eyes'	:	var visiType = 5 ;  break ;
		case	'Manual'			:	var visiType = 6 ;  break ;
	}
	switch (hijriCalcMethod)
	{
		case	'Birth'				:	var calcType = 1 ;  break ;
		case	'Exist'				:	var calcType = 2 ;  break ;
		case	'Powered Eyes':	var calcType = 3 ;  break ;
		case	'Sharp Eyes'	:	var calcType = 4 ;  break ;
		case	'Normal Eyes'	:	var calcType = 5 ;  break ;
		case	'Manual'			:	var calcType = 6 ;  break ;
	}
	if (visiType>=calcType) visible = 'Yes' ;
	return visible ;
}





var moonVisiData = [];

function moonBirthVisibilityData(jdMoonBirth, cityLong, cityLat, nowFlag)
{
//	var exist = false ;
//	var length = Math.floor(moonVisiData.length/3) ;
//	var index = Number(jdMoonBirth)+Number(cityLong)+Number(cityLat) ;
//	for (var i=0 ; i<length ; i++)
//	{
//		if ( index==moonVisiData[3*i+0] )
//		{
//			var visible = moonVisiData[3*i+1] ;
//			var visibility = moonVisiData[3*i+2] ;
//			var exist = true ;
//			i = length ;
//		}
//	}
//	if (!exist)
//	{
		var moonData = moonBirthData(jdMoonBirth, cityLong, cityLat, nowFlag) ;
		var visible = isVisible(moonData[6]) ;
		var visibility = moonData[6] ;
		var moonIllumFrac = moonData[2] ;
		var t_moonAltitude = moonData[3] ;
		var ageMoonValue = moonData[4] ;
		var availableMoonValue = moonData[5] ;
		var jdMoonCheck = moonData[7] ;
		var t_moonAzmoth = moonData[9] ;
		var sunAzmoth = moonData[10] ;
//		moonVisiData[3*length+0]=index ;
//		moonVisiData[3*length+1]=visible ;
//		moonVisiData[3*length+2]=visibility ;
//	}
	return [ visible , visibility , moonIllumFrac , t_moonAltitude , ageMoonValue , availableMoonValue , jdMoonCheck , t_moonAzmoth , sunAzmoth ] ;
}





var isMoonVisiData = [];

function isMoonVisibile(jdMoonBirth, cityLong, cityLat)
{
	var exist = false ;
	var length = Math.floor(isMoonVisiData.length/2) ;
	var index = Number(jdMoonBirth)+Number(cityLong)+Number(cityLat) ;
	for (var i=0 ; i<length ; i++)
	{
		if ( index==isMoonVisiData[2*i+0] )
		{
			var visible = isMoonVisiData[2*i+1] ;
			var exist = true ;
			i = length ;
		}
	}
	if (!exist)
	{
	 	var horizonMethod = SettingsManager.getValue("Home", "horizonMethod") ;
		var moonData = moonBirthVisibilityData(jdMoonBirth, cityLong, cityLat, false) ;
		var visible = moonData[0] ;
		if (visible=='No' && horizonMethod!='None')
		{
			var exist1 = false ;
			var length1 = Math.floor(horizonMoonVisi.length1/11) ;
			var index1 = Number(jdMoonBirth)+Number(cityLong)+Number(cityLat) ;
			for (var i=0 ; i<length1 ; i++)
			{
				if ( index1==horizonMoonVisi[11*i+0] )
				{
					var moonHighestVis 	= 			 horizonMoonVisi[11*i+1] ;
					var moonNormalEyes 	= Number(horizonMoonVisi[11*i+2]) ;
					var moonSharpEyes 	= Number(horizonMoonVisi[11*i+3]) ;
					var moonPoweredEyes = Number(horizonMoonVisi[11*i+4]) ;
					var moonImpossible 	= Number(horizonMoonVisi[11*i+5]) ;
					var moonNotExist 		= Number(horizonMoonVisi[11*i+6]) ;
					var moonUncertain 	= Number(horizonMoonVisi[11*i+7]) ;
					var moonUnknown		 	= Number(horizonMoonVisi[11*i+8]) ;
					var moonManual		 	= Number(horizonMoonVisi[11*i+9]) ;
					var moonClosest		 	= Number(horizonMoonVisi[11*i+10]) ;
					var exist1 = true ;
					i = length1 ;
					var visible = isVisible(moonHighestVis) ;
				}
			}
			if (!exist1)
			{
				var horizPoints = pointsHorizon(cityLong, cityLat) ;
				for (var ppp=0; ppp<3; ppp+=1)
					for (var pp=0; pp<6; pp+=3)
						for (var p=160-pp-ppp; p>0; p-=6)
						{
							var lon = horizPoints[4*p+2] ;
							var lat = horizPoints[4*p+3] ;
							var moonData = moonBirthVisibilityData(jdMoonBirth, lon, lat, false) ;
							var visible = moonData[0] ;
							if (visible=='Yes') { p=0 ; pp=6 ; ppp=3 ; }
						}
			}
			isMoonVisiData[2*length+0]=index ;
			isMoonVisiData[2*length+1]=visible ;
		}
	}
	return visible ;
}





function geoMoonSemiDiameter(distance)
{
	return rad2deg(0.272481*6378.149/distance);
}





function topoMoonSemiDiameter(geoRA, geoDEC, geoDistance, obs, elevation)
{
  var rhoSin = rhoSinThetaPrime(obs.latitude, elevation);
  var rhoCos= rhoCosThetaPrime(obs.latitude, elevation);
  var dec = deg2rad(geoDEC);
	var lst=local_sidereal(obs)*15.0;
  var H = HoursToRadians(lst/15.0 - obs.longitude/15.0 - geoRA);
  var pi = Math.asin(6378.149/geoDistance);
  var A = Math.cos(dec)*Math.sin(H);
  var B = Math.cos(dec)*Math.cos(H) - rhoCos*Math.sin(pi);
  var C = Math.sin(dec) - rhoSin*Math.sin(pi);
  var q = Math.sqrt(A*A + B*B + C*C);
  var s = deg2rad(geoMoonSemiDiameter(geoDistance));
  return rad2deg(Math.asin(Math.sin(s)/q));
}





function angularSeparation(ra1, dec1, ra2, dec2)
{
  var Alpha1 = deg2rad(ra1*15);
  var Alpha2 = deg2rad(ra2*15);

  var Delta1 = deg2rad(dec1);
  var Delta2 = deg2rad(dec2);

  var x = Math.cos(Delta1)*Math.sin(Delta2) - Math.sin(Delta1)*Math.cos(Delta2)*Math.cos(Alpha2 - Alpha1);
  var y = Math.cos(Delta2)*Math.sin(Alpha2 - Alpha1);
  var z = Math.sin(Delta1)*Math.sin(Delta2) + Math.cos(Delta1)*Math.cos(Delta2)*Math.cos(Alpha2 - Alpha1);

  var value = Math.atan2(Math.sqrt(x*x + y*y), z);
  value = rad2deg(value);
  if (value < 0) value += 180;

  return value;
}





function visibilityUncertain(anyVisibility)
{
	var visibilityArray = anyVisibility.split('-') ;
	if ( visibilityArray.length > 1 )	anyVisibility = visibilityArray[1] ;
	return anyVisibility ;
}





function moonTimes(obs,elevation)
{
  var obscopy=new Object();
  for (var i in obs) obscopy[i] = obs[i];
	var g_strTextPage1 = spacer5 + "(القمر هذا اليوم)" ;
	var arrMoonRiseSet1 = moonrise(obscopy,elevation);
	var swapFlag=0 ;
	if (arrMoonRiseSet1[0]==-100 && arrMoonRiseSet1[1]==-100) g_strTextPage1 += spacer4 + 'لا يطلع اليوم';
	else if (arrMoonRiseSet1[0]==-200 && arrMoonRiseSet1[1]==-200) g_strTextPage1 += spacer4 + 'لا يغرب اليوم';
  else
  {
		// A 'normal' day, there is a rise and/or set
		if (arrMoonRiseSet1[0]>=0 && arrMoonRiseSet1[0]<24) var temp1 = 'طلوع' + spacer2 + hmstring(arrMoonRiseSet1[0]) ;
		else var temp1 = 'طلوع: ' + spacer2 + "--:--";
		if (arrMoonRiseSet1[1]>=0 && arrMoonRiseSet1[1]<24) var temp2 = 'غروب' + spacer2 + hmstring(arrMoonRiseSet1[1]) ;
		else { var temp2 = 'غروب: ' + spacer2 + "--:--"; var shiftFlag=1; }
		if (arrMoonRiseSet1[0]<arrMoonRiseSet1[1]) g_strTextPage1 += spacer6 + temp1 + spacer3 + temp2 ;
		else { g_strTextPage1 += spacer5 + temp2 + spacer4 + temp1 ; var swapFlag=1 ; }
	}
	obscopy.day++;
	g_strTextPage1 += spacer12 + "(القمر يوم غد)" ;
	var arrMoonRiseSet2 = moonrise(obscopy,elevation);
	if (arrMoonRiseSet2[0]==-100 && arrMoonRiseSet2[1]==-100) g_strTextPage1 += spacer4 + 'لا يطلع اليوم';
	else if (arrMoonRiseSet2[0]==-200 && arrMoonRiseSet2[1]==-200) g_strTextPage1 += spacer4 + 'لا يغرب اليوم';
  else
  {
		// A 'normal' day, there is a rise and/or set
		if (arrMoonRiseSet2[0]>=0 && arrMoonRiseSet2[0]<24) var temp3 = 'طلوع' + spacer2 + hmstring(arrMoonRiseSet2[0]) ;
		else var temp3 = 'طلوع: ' + spacer2 + "--:--";
		if (arrMoonRiseSet2[1]>=0 && arrMoonRiseSet2[1]<24) var temp4 = 'غروب' + spacer2 + hmstring(arrMoonRiseSet2[1]) ;
		else var temp4 = 'غروب: ' + spacer2 + "--:--";
		if (arrMoonRiseSet2[0]<arrMoonRiseSet2[1] || swapFlag==0) g_strTextPage1 += spacer6 + temp3 + spacer3 + temp4 ;
		else g_strTextPage1 += spacer5 + temp4 + spacer4 + temp3 ;
	}
	return g_strTextPage1 ;
}





function isMoonUp(altitude,twilight)
{
	if (typeof twilight == 'undefined') twilight = moonTwilight() ;
	if (altitude>twilight) return true; 
	else return false;
}





function moonTwilight()
{
	return -0.55430 ;
}




