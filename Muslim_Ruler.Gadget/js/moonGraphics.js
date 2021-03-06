




var objectDark = [] ;
var objectMask = [] ;
var objectMoon = [] ;
var objectExti = [] ;

function showMoon(obs1,moonID,moonPosX,moonPosY,moonSize,rotationSteps,showFlag)
{

	var moonView 				= 0 ;		// 0=ActualView 1=SkyNorthUp 2=LunarNorthUp 3=SkySouthUp 4=LunarSouthUp
	var moonExtinction 	= 1 ;		// 0=disable 1=enable the extinction
	var moonDimming 		= 10 ;	// dimming density percentage when the moon is below horizon
	var moonDark				= 35 ;	// brightness level of the dark side of the moon

	var gDark = {} ;
	var gMask = {} ;
	var gMoon = {} ;
	var gExti = {} ;

	gDark.width = moonSize+8 ; gDark.height = moonSize+8 ;
	gMask.width = moonSize ; gMask.height = moonSize ;
	gMoon.width = moonSize	; gMoon.height = moonSize ;
	gExti.width = moonSize ; gExti.height = moonSize ;


	//set shadow density
	gDark.opacity = 100;
	gMask.opacity = 100;
	gMoon.opacity = moonDark;
	gExti.opacity = moonDark;

	var sealevel = (SettingsManager.getValue("Home", "sealevel") == 'true');
	if (sealevel) var elevation = 0 ;
	else var elevation = Number(SettingsManager.getValue("Home", "elevation")) ;

	var arrMoonPos = topoMoonPos(obs1,elevation,true);
	if (arrMoonPos[5] < 180) var imgNameMask = Math.ceil(arrMoonPos[5]/2)*2;
	else var imgNameMask = 360 - Math.floor(arrMoonPos[5]/2)*2;

	gMask.rotation = 180 ;
	imgNameMask = 180 - imgNameMask ;

	imgNameMask = "00" + imgNameMask;
	imgNameMask = imgNameMask.substring(imgNameMask.length, imgNameMask.length - 3) + ".png";

	var l = arrMoonPos[8]; var b = arrMoonPos[9];
	l = Math.round(l/2)*2; b = Math.round(b/2)*2
	var imgNameDisk = "" + l + b + ".png";

	gDark.src = "images/moon/black.png" ;
	gMask.src	= "images/moon/masks/" + imgNameMask ;
	gMoon.src = "images/moon/disks/" + imgNameDisk ;

	//atmospheric extinction & below horizon
	//if below horizon and horizon mask enabled...
	if (arrMoonPos[3] < 0  && moonDimming > 0)
	{
		//darken the whole image
		gExti.src = "images/moon/black.png"
		gExti.opacity = moonDimming;
	}
	else if (moonExtinction == "1")
	{ //show atmospheric extinction?
		var extinc = Extinction(arrMoonPos[3]);
		gExti.src = "images/moon/extinction.png";
		gExti.opacity = extinc[0];
	}
	else
		//show as normal
		gExti.opacity = 0;

	var moonEndAngles = moonPhaseAngles(obs1,arrMoonPos[0],arrMoonPos[1],arrMoonPos[7],moonView) ;

	gExti.opacity = gExti.opacity / 1.6 ;    //added by emad to decrease the feeling of the Extinction

	var html = '' ;
	if (showFlag)
	{
		var paper = Raphael("canvas"+moonID,gDark.width,gDark.height) ;
		paper.image(installationPath()+'/'+gDark.src,0,0,gDark.width,gDark.height);
		paper.image(installationPath()+'/'+gMoon.src,4,4,gMoon.width,gMoon.height).attr({opacity:(gMoon.opacity/100).toFixed(3),transform:'r'+Math.round(moonEndAngles[0])});
		paper.image(installationPath()+'/'+gMask.src,4,4,gMask.width,gMask.height).attr({opacity:(gMask.opacity/100).toFixed(3),transform:'r'+Math.round(moonEndAngles[1])});
		if (moonExtinction == "1") paper.image(installationPath()+'/'+gExti.src,4,4,gExti.width,gExti.height).attr({opacity:(gExti.opacity/100).toFixed(3)});
	}
	else
	{
		html += '<script>\r\n';
		html += 'var paper = Raphael("canvas'+moonID+'",'+gDark.width+','+gDark.height+');';
		html += 'var robot = paper.image("'+installationPath()+'/'+gDark.src+'",0,0,'+gDark.width+','+gDark.height+');\r\n';
		html += 'var robot = paper.image("'+installationPath()+'/'+gMoon.src+'",4,4,'+gMoon.width+','+gMoon.height+').attr({opacity:'+(gMoon.opacity/100).toFixed(3)+',transform:"r'+Math.round(moonEndAngles[0])+'"});\r\n';
		html += 'var robot = paper.image("'+installationPath()+'/'+gMask.src+'",4,4,'+gMask.width+','+gMask.height+').attr({opacity:'+(gMask.opacity/100).toFixed(3)+',transform:"r'+Math.round(moonEndAngles[1])+'"});\r\n';
		if (moonExtinction == "1") html += 'var robot = paper.image("'+installationPath()+'/'+gExti.src+'",4,4,'+gExti.width+','+gExti.height+').attr({opacity:'+(gExti.opacity/100).toFixed(3)+'});\r\n';
		html += '</script>\r\n';
	}
	return html ;
}





function moonPhaseAngles(obs1,ra,dec,mglat,skyView)
{
	//rotate the image to correct orientation - if required
	var rotation = moonPA(obs1,ra,dec,mglat);

	if (skyView == "0")	// Apparant view
	{	
		var gIendAngle = rotation[0];
		var gMendAngle = rotation[1];
	}
	if (skyView == "1")		// Sky North up
	{
		var gIendAngle = rotation[2];
		var gMendAngle = rotation[3];
	}
	if (skyView == "2")		// Lunar North up
	{
		var gIendAngle = 0;
		var gMendAngle = rev(0-rotation[2]+rotation[3]);
	}
	if (skyView == "3")		// Sky South up
	{
		var gIendAngle = rev(rotation[2] + 180);
		var gMendAngle = rev(rotation[3] + 180);
	}
	if (skyView == "4")		// Lunar South up
	{
		var gIendAngle = 180;
		var gMendAngle = rev(0-rotation[2]+rotation[3] + 180);
	}
	var gMendAngle = rev(180+gMendAngle) ;
	return [ gIendAngle , gMendAngle ] ;
}





function rotateMoon(moonID,endAngle,rotationSteps)
{
	var imageObj = objectMoon[moonID] ;
	if (rotationSteps==0)
		imageObj.rotation = endAngle ;
	else
	{
		var arrAngles = longWayRound(imageObj.rotation, endAngle);
		var startAngle = arrAngles[0];
		var endAngle = arrAngles[1];
		var diffAngle = endAngle-startAngle ;
		var stepsCount = Math.floor( Math.abs(diffAngle)/rotationSteps ) ;
		var steps = rotationSteps * diffAngle / Math.abs(diffAngle) ;
		for (i=0;i<stepsCount;i++) setTimeout("rotateMoon("+moonID+","+(startAngle+i*steps)+",0)",i*100+100) ;
		setTimeout("rotateMoon("+moonID+","+endAngle+",0)",stepsCount*100+500) ;
	}
}





function rotateMask(moonID,endAngle,rotationSteps)
{
	var imageObj = objectMask[moonID] ;
	if (rotationSteps==0)
		imageObj.rotation = endAngle ;
	else
	{
		var arrAngles = longWayRound(imageObj.rotation, endAngle);
		var startAngle = arrAngles[0];
		var endAngle = arrAngles[1];
		var diffAngle = endAngle-startAngle ;
		var stepsCount = Math.floor( Math.abs(diffAngle)/rotationSteps ) ;
		var steps = rotationSteps * diffAngle / Math.abs(diffAngle) ;
		for (i=0;i<stepsCount;i++) setTimeout("rotateMask("+moonID+","+(startAngle+i*steps)+",0)",i*100+100) ;
		setTimeout("rotateMask("+moonID+","+endAngle+",0)",stepsCount*100+500) ;
	}
}





function longWayRound(start, end)
{
	if (end-start > 180) start = start + 360;
	else if (start-end > 180) end = end + 360;
	return new Array(start,end);
}





function Extinction(alt) {
    //var alt;			// altitude in degrees
    var index;			// index into extinction arrays (calc from alt)
    var frac;			// left over amount to interpolate
    var Rval, Gval, Bval;	// extinction values
    var airmass;

	/*
    // extinction values from Al Kelly's web site
    var RExt = new Array (1.000, 1.000, 1.001, 1.003, 1.005, 1.009, 1.013, 1.018,
                          1.025, 1.034, 1.046, 1.063, 1.085, 1.118, 1.170, 1.263, 0);
    var GExt = new Array (1.000, 1.001, 1.002, 1.006, 1.010, 1.017, 1.025, 1.036, 
                          1.050, 1.068, 1.092, 1.125, 1.172, 1.242, 1.356, 1.574, 0);
    var BExt = new Array (1.000, 1.001, 1.003, 1.008, 1.014, 1.024, 1.035, 1.050, 
                          1.070, 1.097, 1.132, 1.180, 1.249, 1.356, 1.535, 1.892, 0);
	
	
   // extinction values from Al Kelly's web site - normalised to Red, and converted to RGB values
    var RExt = new Array (255, 255, 255, 254, 254, 253, 252, 250,
                          249, 247, 244, 240, 235, 228, 218, 202, 0);
    var GExt = new Array (255, 255, 255, 254, 254, 253, 252, 251, 
                          249, 247, 244, 241, 236, 230, 220, 205, 0);
    var BExt = new Array (255, 255, 254, 254, 253, 251, 250, 247, 
                          244, 240, 236, 230, 222, 210, 194, 170, 0);
	*/
	
	// Opacity varies from 0 to 100
	var RExt = new Array (0, 0, 0, 1, 2, 4, 6, 9, 12, 16, 21, 29, 38, 51, 70, 100, 0)

    // some error checking...
    if (alt < 15) alt = 15;
    if (alt > 90) alt = 90;

    // calculate table index
    frac = (90.0 - alt) / 5.0;
    index = Math.floor(frac);
    frac -= index;

    // get interpolated extinctions
    Rval = RExt[index] + ((RExt[index + 1] - RExt[index]) * frac);
    //Gval = GExt[index] + ((GExt[index + 1] - GExt[index]) * frac);
    //Bval = BExt[index] + ((BExt[index + 1] - BExt[index]) * frac);
    
	// round off
	Rval = Math.round(Rval);
	//Gval = Math.round(Gval);
	//Bval = Math.round(Bval);
	
    // calculate airmass
    airmass = Math.round((1.0 / Math.sin(alt * Math.PI / 180.0)) * 100.0) / 100.0;

    // passback the results
    return new Array (Rval, airmass);
}





//moonPA() added by Mark Crossley for Moon Phase II widget
//Returns:
//  Position Angle of Moons axis relative to the zenith
//  PA of the bright limb relative to the zenith
//  PA of Moons axis relative to north
//  PA of the bright limb relative to North
function moonPA(obs,ra,dec,mglat)
{
	//hour angle
	var lsd = local_sidereal(obs);
	var HA = lsd - ra;
	//parallactic angle
	HA *= 15;
	var a = sind(HA);
	var b = (tand(obs.latitude)*cosd(dec)) - (sind(dec)*cosd(HA));
	var q = atan2d(a,b);
//alert("parallactic="+q);
	var arrSunPos = geoSunPos(obs)
	//convert both ra's to degrees
	ra *= 15;
	arrSunPos[0] *= 15;
	//position angle of Moons bright limb
	a = cosd(arrSunPos[1])*sind(arrSunPos[0]-ra);
	b = sind(arrSunPos[1])*cosd(dec) - cosd(arrSunPos[1])*sind(dec)*cosd(arrSunPos[0]-ra);
	//PA of the bright limb
	var paBL = atan2d(a,b);

//alert("paBL="+paBL);

	//shift from anticlockwise convention to clockwise for widget
	paBL = 360 -paBL;
	//the widget images are 90 degrees out from BL PA
	paBL = paBL-90;
	//save for return this angle relative to North
	paBL_North = rev(paBL);
	//add on the the parallactic angle
	paBL = rev(paBL+q);

	//	I	- Inclination of (mean) lunar orbit to ecliptic
	var I = 1.54242;
	var d = dayno(obs.year,obs.month,obs.day,obs.hours);
	var Om2 = rev(125.045 - 1934.14 * d + 0.002071 * d * d + d * d * d/450000);
	var oblecl = 23.4393-3.563E-7*d;

	var X = sind(I) * sind(Om2);
	var Y = sind(I) * cosd(Om2) * cosd(oblecl) - cosd(I) * sind(oblecl);
	var W = atan2d(X, Y);
	var A = Math.sqrt(X*X + Y*Y) * cosd(ra - W);
	var paAx = asind(A / cosd(mglat));

//alert("paAxis="+paAx);

	//shift from anticlockwise convention to clockwise for widget
	paAx = 360-paAx;
	//save for return this angle relative to North
	var paAx_North = rev(paAx);
	paAx = rev(paAx+q);


//alert("q="+q);

	return new Array(paAx, paBL, paAx_North, paBL_North);
}





