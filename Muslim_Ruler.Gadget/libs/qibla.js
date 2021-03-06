

//--------------------------- Globals --------------------------------

function Qibla()
{
	this.kabaLat = 21.42252;
	this.kabaLng = 39.82621; 

	// display options
	this.distanceMode  = 0;     // 0: kilometers, 1: miles
	this.directionMode = 2;     // 0: 180 degrees, 1: 90 degrees, 2: 45 degrees
	this.geodesicMode  = true;  // true: curve, false: line
	this.showRotation  = false; // show CW/CCW info
	this.qiblaLineColor = '#FF0000';

	// constants
	this.consts = { 
		north: 'North',
		south: 'South',
		east: 'East',
		west: 'West',
		cw:   'CW',  // Clockwise
		ccw:  'CCW', // CounterClockwise
		from: 'from'
	}
}


/*
//-------------------------- Public Methods --------------------------


// specify html objects into which information is written 
Qibla.prototype.setDisplay = function(objects)
{
	this.directionObj = $(objects.qiblaDirection);
	this.curLatObj = $(objects.currentLat);
	this.curLngObj = $(objects.currentLng);
	this.distanceObj = $(objects.distanceToKaba);
}


// start displaying qibla on map
Qibla.prototype.startMap = function()
{
	this.initMap();
}


// reurn qibla direction for a given location
Qibla.prototype.getQiblaDirection = function(lat, lng)
{
	var qiblaDir = -this.getDirection(lat, lng, this.kabaLat, this.kabaLng);
	if (qiblaDir < 0) 
		qiblaDir += 360;
	return qiblaDir;
}


//--------------------------- Initializer -----------------------------


// initialize the map 
Qibla.prototype.initMap = function()
{
	this.map = new GMap2();
	this.kaba = new GLatLng(this.kabaLat, this.kabaLng);

	var icon = new GIcon(null, 'http://tanzil.info.googlepages.com/kaba.png');
	icon.iconSize = new GSize(17, 17);
	icon.iconAnchor = new GPoint(8, 8);
	this.kabaMarker = new GMarker(this.kaba, {icon: icon, clickable: false});

	var icon = new GIcon(null, 'http://tanzil.info.googlepages.com/cross.gif');
	icon.iconSize = new GSize(17, 17);
	icon.iconAnchor = new GPoint(8, 8);
	this.centerMarker = new GMarker(this.kaba, {icon: icon, clickable: false});

	GEvent.addListener(this.map, 'moveend', function(){ qibla.update(); });

	this.update()
}


//------------------------- Update Functions -----------------------------


// update map 
Qibla.prototype.update = function()
{
	GAsync(this.map, 'getCenter', 'getSize', 'getZoom', function(center, size, zoom) {
		qibla.size = size;
		qibla.zoom = zoom;
		qibla.draw(center);
	});
}


// draw map 
Qibla.prototype.draw = function(center)
{
	var lng = center.lng();
	var lat = center.lat();
		
	var qiblaDir = this.getQiblaDirection(lat, lng);
	var line = this.createLine(lat, lng, qiblaDir);

	this.map.clearOverlays();
	this.map.addOverlay(line);	
	this.map.addOverlay(this.centerMarker);
	this.map.addOverlay(this.kabaMarker);
	this.centerMarker.setPoint(center);

	this.writeData(center, qiblaDir);
}


// create a direction line
Qibla.prototype.createLine = function(lat, lng, angle, zoom, size)
{
	var mapScale = Math.max(this.size.width, this.size.height)/ 120; 
	var dLng = mapScale/ Math.pow(2, this.zoom- 7);
	//if (this.zoom < 7) dLng = mapScale;

	dLng = dLng* Math.sin(this.dtr(angle));

	var from = new GPoint(lng, lat);
	var lat2 = this.getLat(lat, angle, dLng)
	var to = new GPoint(lng+ dLng, lat2);
	if (Math.abs(dLng) > Math.abs(lng- this.kabaLng))
		to = new GPoint(this.kabaLng, this.kabaLat);

	var polyOptions = {geodesic: true};
	var line = new GPolyline([ from, to ], this.qiblaLineColor, 4, 0.8, polyOptions);
	return line;
}


//------------------------- Display Functions -----------------------------


// write information
Qibla.prototype.writeData = function(center, qiblaDir)
{
	var distance = center.distanceFrom(this.kaba)/ 1000; 

	if (this.curLatObj) this.curLatObj.innerHTML = center.lat().toFixed(4);						
	if (this.curLngObj) this.curLngObj.innerHTML = center.lng().toFixed(4);
	if (this.directionObj) this.directionObj.innerHTML = this.formatDirection(qiblaDir);	
	if (this.distanceObj) this.distanceObj.innerHTML = this.formatDistance(distance);
}
*/


// format direction 
Qibla.prototype.formatDirection = function(dir)
{
	var baseAngle = [180, 90, 45][this.directionMode];
	var directions = [
			[this.consts.north, this.consts.north],
			[this.consts.north, this.consts.south, this.consts.north],
			[this.consts.north, this.consts.east, this.consts.south, this.consts.west, this.consts.north]
		];

	for (var i=0; dir>baseAngle; i++)
		dir -= baseAngle;
	var tag = (i%2 == 0) ? this.consts.cw : this.consts.ccw;
	var dir = (i%2 == 0) ? dir : baseAngle- dir;
	var label = directions[this.directionMode][parseInt((i+1)/2)];
	label = this.consts.from+ ' '+ label + (this.showRotation ? ' '+ tag : '');
	return dir.toFixed(2)+'&deg; '+ label;
}


// format distance 
Qibla.prototype.formatDistance = function(dist)
{
	var tags = ['km', 'mi'];
	if (this.distanceMode)
		dist = dist/ 1.609344;
	return dist.toFixed(0)+ ' '+ tags[this.distanceMode];
}



//-------------------------- Calculating Functions -----------------------

// definitions:
// point1 = (lat1, lng1), point2 = (lat2, lng2)
// dLng = lng1- lng2
// direction = angle of the line connecting point1 to point2 (CW from North)


// find the direction between two points
Qibla.prototype.getDirection = function(lat1, lng1, lat2, lng2) 
{
	var dLng = lng1- lng2;
	return this.rtd(this.getDirectionRad(this.dtr(lat1), this.dtr(lat2), this.dtr(dLng)));
}


// find the direction between two points
Qibla.prototype.getDirectionRad = function(lat1, lat2, dLng) 
{
	return Math.atan2(Math.sin(dLng), Math.cos(lat1)* Math.tan(lat2)- Math.sin(lat1)* Math.cos(dLng));
}



/*
// find latitude of the second point
Qibla.prototype.getLat = function(lat1, angle, dLng) 
{
	return this.rtd(this.getLatRad(this.dtr(lat1), this.dtr(angle), this.dtr(dLng)));
}


// find latitude of the second point
Qibla.prototype.getLatRad = function(lat1, angle, dLng) 
{
	return Math.atan((Math.sin(dLng)+ Math.tan(angle)* Math.sin(lat1)* Math.cos(dLng))/ (Math.tan(angle)* Math.cos(lat1)));
}
*/

// convert degree to radian
Qibla.prototype.dtr = function(d)
{
    return (d* Math.PI)/ 180.0;
}

// convert radian to degree
Qibla.prototype.rtd = function(r)
{
    return (r* 180.0)/ Math.PI;
}


/*
//-------------------------- Misc Functions  -----------------------


// Prototype $ method
function $(element)
{
	return document.getElementById(element);
}


//-------------------------- Main Code  -------------------------

//var qibla = new Qibla();

//var displayObjects = {
//	currentLat: 'curLat',
//	currentLng: 'curLng',
//	qiblaDirection: 'direction',
//	distanceToKaba: 'distance'
} 

//qibla.setDisplay(displayObjects);
//qibla.startMap();
*/

