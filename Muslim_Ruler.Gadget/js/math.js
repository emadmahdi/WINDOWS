




function intPart(floatNum)
{
	if ( floatNum < -0.0000001 )
		return Math.ceil(floatNum-0.0000001) ;
	else
		return Math.floor(floatNum+0.0000001) ;
}





//convert geocentric coords to topocentric
function geo2topo(ra,dec,dist,obs,elevation)
{
	//convert dist in km to Earth radii
	dist /= 6372.8;
	var lst=local_sidereal(obs)*15.0;
	ra = ra*15.0;
	var x = dist*cosd(dec)*cosd(ra) - cosd(obs.latitude)*cosd(lst);
	var y = dist*cosd(dec)*sind(ra) - cosd(obs.latitude)*sind(lst);
	var z = dist*sind(dec) - sind(obs.latitude);
	dist = Math.sqrt(x*x+y*y+z*z);
	ra = atan2d(y,x)/15.0;
	while (ra>24) ra-=24;
	while (ra<0) ra+=24;
	dec = asind(z/dist);
	//convert dist back to km
	dist = Math.round(dist * 6372.8);
	var topoAltAz = rad2aa(ra,dec,obs,elevation) ;
	if (elevation!=0)
	{
		var topoRaDec = aa2rad(topoAltAz[0],topoAltAz[1],obs) ;
		var ra = topoRaDec[0];
		var dec = topoRaDec[1];
	}
	return new Array(ra,dec,dist,topoAltAz[0],topoAltAz[1]);
}
/*
function geo222topo(ra, dec, distance, obs, elevation)
{
  var rhoSin = rhoSinThetaPrime(obs.latitude, elevation);
  var rhoCos= rhoCosThetaPrime(obs.latitude, elevation);
  //Calculate the Sidereal time
	var lst=local_sidereal(obs)*15.0;
  //Convert to radians
  var dec = deg2rad(dec);
  var cosDelta = Math.cos(dec);
	//Parallax
	var g_AAParallax_C1 = Math.sin(deg2rad(8.794/3600.0));
  //Calculate the Parallax
  var pi = Math.asin(g_AAParallax_C1/distance);
  var sinpi = Math.sin(pi);
  //Calculate the hour angle HA
  var H = HoursToRadians(lst/15.0 - obs.longitude/15.0 - ra);
  var cosH = Math.cos(H);
  var sinH = Math.sin(H);
  //Calculate the adjustment in right ascension
  var DeltaAlpha = Math.atan2(-rhoCos*sinpi*sinH, cosDelta - rhoCos*sinpi*cosH); 
	//Calculate the adjustment in right ascension & declination
  var topoRA = MapTo0To24Range(ra + RadiansToHours(DeltaAlpha));
  var topoDEC = rad2deg(Math.atan2((Math.sin(dec) - rhoSin*sinpi) * Math.cos(DeltaAlpha),cosDelta - rhoCos*sinpi*cosH));
  return [ topoRA, topoDEC ] ;
}
function rhoSinThetaPrime(lat, elevation)
{
  var lat = deg2rad(lat);
  var U = Math.atan(0.99664719 * Math.tan(lat));
  return 0.99664719 * Math.sin(U) + (elevation/6378149 * Math.sin(lat));
}
function rhoCosThetaPrime(lat, elevation)
{
  var lat = deg2rad(lat);
  var U = Math.atan(0.99664719 * Math.tan(lat));
  return Math.cos(U) + (elevation/6378149 * Math.cos(lat));
}
function RadiansToHours(Radians)	{		return Radians * 3.8197186342054880584532103209403;	}
function HoursToRadians(Hours)	{	    return Hours * 0.26179938779914943653855361527329;	}
function HoursToDegrees(Hours)	{	    return Hours * 15;	}
function DegreesToHours(Degrees)	{    return Degrees / 15;	}
function PI()	{	    return 3.1415926535897932384626433832795;	}
function MapTo0To360Range(Degrees)
{
    var Value = Degrees;
    while (Value < 0)	      Value += 360;
    while (Value > 360)	      Value -= 360;
    return Value;
}
function MapTo0To24Range(HourAngle)
{
    var Value = HourAngle;
    while (Value < 0)	      Value += 24;
    while (Value > 24)	      Value -= 24;
    return Value;
}
*/





function aa2rad(Altitude,Azimuth,obs)
{
	var lst=local_sidereal(obs)*15.0;
	var dec = asind(sind(Altitude)*sind(obs.latitude) + cosd(Altitude)*cosd(obs.latitude)*cosd(Azimuth));
	var cosRA = (sind(Altitude) - sind(dec)*sind(obs.latitude))/(cosd(dec)*cosd(obs.latitude));
	var ra = acosd(cosRA);
	if (sind(Azimuth) > 0) ra = 360 - ra;
	var ra = lst - ra;
	if (ra < 0) ra = ra + 360;
	if (dec >= 0) dec = Math.abs(dec);
	else dec = -Math.abs(dec);
	ra = ra / 15.0 ;
	return [ ra , dec ]
}





// radtoaa converts ra and dec to altitude and azimuth
function rad2aa(ra,dec,obs,elevation)
{
  var lst=local_sidereal(obs);
  var x=cosd(15.0*(lst-ra))*cosd(dec);
  var y=sind(15.0*(lst-ra))*cosd(dec);
  var z=sind(dec);
  // rotate so z is the local zenith
  var xhor=x*sind(obs.latitude)-z*cosd(obs.latitude);
  var yhor=y;
  var zhor=x*cosd(obs.latitude)+z*sind(obs.latitude);
  var azimuth=rev(atan2d(yhor,xhor)+180.0);
 // so 0 degrees is north
  var altitude=atan2d(zhor,Math.sqrt(xhor*xhor+yhor*yhor));
	if (elevation!=0)
	{
		var angle = altitudeAdjustment(elevation) ;
		if (altitude<90 && altitude>-90) altitude = altitude - angle ;
		if (altitude>90 || altitude<-90) altitude = altitude + angle ;
	}
  return new Array(altitude,azimuth);
}





function anglestring(angle)
{
  return ( angle<0 ? "-" : "+" ) + Math.abs(angle).toFixed(2) + "°" ;
}





// Extensions to the Math routines - Trig routines in degrees
function rev(angle){return angle-Math.floor(angle/360.0)*360.0;}
function sind(angle){return Math.sin((angle*Math.PI)/180.0);}
function cosd(angle){return Math.cos((angle*Math.PI)/180.0);}
function tand(angle){return Math.tan((angle*Math.PI)/180.0);}
function asind(c){return (180.0/Math.PI)*Math.asin(c);}
function acosd(c){return (180.0/Math.PI)*Math.acos(c);}
function atand(c){return (180.0/Math.PI)*Math.atan(c);} //added by Mark Crossley
function atan2d(y,x){return (180.0/Math.PI)*Math.atan(y/x)-180.0*(x<0);}
function deg2rad(degrees)	{		return degrees * 0.017453292519943295769236907684886;	}
function rad2deg(radians)	{		return radians * 57.295779513082320876798154814105;	}





function ipart(x)
{
	var a;
    if (x> 0) a = Math.floor(x);
    else a = Math.ceil(x);
    return a;
}





function range(x)
{
	var a, b
    b = x / 360;
    a = 360 * (b - ipart(b));
    if (a  < 0 ) a = a + 360
    return a
}





function g_sidereal(year,month,day) {
// sidereal time in hours for Greenwich
  var T=(jd0(year,month,day)-2451545.0)/36525 ;
  var res=100.46061837+T*(36000.770053608+T*(0.000387933-T/38710000.0));
  return rev(res)/15.0;
}




function local_sidereal(obs) {
// sidereal time in hours for observer
  var res=g_sidereal(obs.year,obs.month,obs.day);
  res+=1.00273790935*(obs.hours+(obs.minutes+obs.tz+(obs.seconds/60.0))/60.0);
  res+=obs.longitude/15.0;
  while (res < 0) res+=24.0;
  while (res > 24) res-=24.0;
  return res;
}




