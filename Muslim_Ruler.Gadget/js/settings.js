




function updateAzanFile(fileNumber)
{
document.getElementById('azan'+fileNumber+'File').value = document.getElementById('azan'+fileNumber+'File_file').value ;
}





function notValidForm()
{
	lat = document.getElementById('latitude').value;
	lng = document.getElementById('longitude').value;
	if(isNaN(lat)|| lat < -90 || lat > 90 || lat=="" ) { document.getElementById('latitude').value = "قيمة خاطئة"; return true; }
	else if(isNaN(lng)|| lng < -180 || lng > 180 || lng=="" ) { document.getElementById('longitude').value = "قيمة خاطئة"; return true; }
	else return false ;
}










function removeAllOptions(selectbox)
{
	var i;
	for(i=selectbox.options.length-1; i>=0; i--)
	{
		selectbox.remove(i);
	}
}





function setLocation()
{
	var i = selCity.value;
	if (i == 0) return;

	longitude.value = Longitude[i] ;
	latitude.value = Latitude[i] ;
	timezone.value = Timezone[i] ;
	elevation.value = Elevation[i] ;
	elevation.disabled = true ;
	sealevel.checked = true ;

	var citiesArray = Cities[i].split("\t") ;
	document.getElementById("location").innerText = citiesArray[0] + ' - ' + citiesArray[1] ;
	distanceHorizonToHours(0);
}





function setCity()
{
	var x = 1;
		removeAllOptions(selCity);
		selCity.value = '===';
		//add a dummy <Select city...> entry to force the user to change the field
		selCity.options[0] = new Option('===',0);

		latitude.value = '===';
		longitude.value = '===';
		timezone.value = '===';
		elevation.value = '===';

		for (i=0; i<Cities.length; i++)
		{
			var lin = Cities[i].split("\t");
			if (lin[0] == selCountry.value)
			{
				selCity.options[x] = new Option(lin[1],i);
				x++;
			}
		}
		//Sidebar crashes if the selection box only has one option!
		if (x==1) selCity.options[x] = new Option(selCity.options[x-1].text, selCity.options[x-1].value);
		//if (bUpdate) setLocation();
}





function methodMoonVisibility()
{
	var moonVisibilityMethod = document.getElementById('moonVisibilityMethod').value ;
	var hijriCalcMethod = document.getElementById('hijriCalcMethod').value ;
	if (moonVisibilityMethod=='Manual' || hijriCalcMethod=='Manual')
	{
		document.getElementById('moonVisibilityMethod').disabled = true ;
		document.getElementById('hijriCalcMethod').value = 'Manual' ;
		var data=moonVisibilitySetup('Manual',0) ;
		var minMoonAltitude = data[0] ; var minMoonIllum = data[1] ; var minMoonAge = data[2] ; var minMoonAvail = data[3] ; var minMoonAzmoth = data[4] ;
		document.getElementById('minMoonAltitude').value = minMoonAltitude ;
		document.getElementById('minMoonIllum').value = minMoonIllum ;
		document.getElementById('minMoonAge').value = minMoonAge ;
		document.getElementById('minMoonAvail').value = minMoonAvail ;
		document.getElementById('minMoonAzmoth').value = minMoonAzmoth ;
	}
	moonEnable();
}





function methodCalc()
{
	var calcMethod = document.getElementById('calcMethod').value ;
	switch (calcMethod)
	{
		case 'France'	:	var angleFajr = -12 	; var angleIsha = -12 		;	var angleMaghrib = '0min' ;	var angleImsak = '-10min'				;	var asrCalcMethod = 'Standard'	;	var	midnightCalcMethod = 'Standard' ;	var	highLats = 'None' ;	break ;
		case 'MWL'		:	var angleFajr = -18 	; var angleIsha = -17 		;	var angleMaghrib = '0min' ;	var angleImsak = '-10min'				;	var asrCalcMethod = 'Standard'	;	var	midnightCalcMethod = 'Standard' ;	var	highLats = 'None' ;	break ;
		case 'ISNA'		:	var angleFajr = -15 	; var angleIsha = -15 		;	var angleMaghrib = '0min' ;	var angleImsak = '-10min'				;	var asrCalcMethod = 'Standard'	;	var	midnightCalcMethod = 'Standard' ;	var	highLats = 'None' ;	break ;
		case 'Egypt'	:	var angleFajr = -19.5 ; var angleIsha = -17.5 	;	var angleMaghrib = '0min' ;	var angleImsak = '-10min'				;	var asrCalcMethod = 'Standard'	;	var	midnightCalcMethod = 'Standard' ;	var	highLats = 'None' ;	break ;
		case 'Makkah'	:	var angleFajr = -18.5 ; var angleIsha = '+90min';	var angleMaghrib = '0min' ;	var angleImsak = '-10min'				;	var asrCalcMethod = 'Standard'	;	var	midnightCalcMethod = 'Standard' ;	var	highLats = 'None' ;	break ;
		case 'Karachi':	var angleFajr = -18 	; var angleIsha = -18 		;	var angleMaghrib = '0min' ;	var angleImsak = '-10min'				;	var asrCalcMethod = 'Standard'	;	var	midnightCalcMethod = 'Standard' ;	var	highLats = 'None' ;	break ;
		case 'Sestani':	var angleFajr = -18		; var angleIsha = -14 		; var angleMaghrib = -4 		;	var angleImsak = -19.25					;	var asrCalcMethod = '2over7'		;	var	midnightCalcMethod = 'Jafari'	 	;	var	highLats = 'None' ;	break ;
		case 'Jafari'	:	var angleFajr = -16 	; var angleIsha = -14 		; var angleMaghrib = -4 		;	var angleImsak = '-10min'				;	var asrCalcMethod = 'Standard'	;	var	midnightCalcMethod = 'Jafari'	 	;	var	highLats = 'None' ;	break ;
		case 'Tehran'	:	var angleFajr = -17.7 ; var angleIsha = -15 		; var angleMaghrib = -4.5 	;	var angleImsak = '-10min'				;	var asrCalcMethod = 'Standard'	;	var	midnightCalcMethod = 'Jafari' 	;	var	highLats = 'None' ;	break ;
		case 'AllShia':	var angleFajr = -16		; var angleIsha = -15			; var angleMaghrib = -4.5 	;	var angleImsak = '-19.25-10min'	;	var asrCalcMethod = 'Standard' 	;	var	midnightCalcMethod = 'Imsak' 		;	var	highLats = 'None' ;	break ;
		case 'AllSuna':	var angleFajr = -12 	; var angleIsha = '+90min'; var angleMaghrib = '0min'	;	var angleImsak = '-19.5-10min'	;	var asrCalcMethod = 'Late' 			;	var	midnightCalcMethod = 'Imsak' 		;	var	highLats = 'None' ;	break ;
		case 'All'		:	var angleFajr = -12 	; var angleIsha = '+90min'; var angleMaghrib = -4.5		;	var angleImsak = '-19.5-10min'	;	var asrCalcMethod = 'Late' 			;	var	midnightCalcMethod = 'Imsak' 		;	var	highLats = 'None' ;	break ;
		case 'Manual'	:	break ;
	}
	if (calcMethod!='Manual')
	{
		document.getElementById('angleIsha').value = angleIsha ;
		document.getElementById('angleFajr').value = angleFajr ;
		document.getElementById('angleMaghrib').value = angleMaghrib ;
		document.getElementById('angleImsak').value = angleImsak ;
		document.getElementById('asrCalcMethod').value = asrCalcMethod ;
		methodCalcAsr();
		document.getElementById('midnightCalcMethod').value = midnightCalcMethod ;
		document.getElementById('highLats').value = highLats ;
	}
}





function newCalc(elementId,elementValue)
{
	document.getElementById(elementId).value = elementValue ;
	if (elementId=='hijriCalcMethod')
	{
		document.getElementById('moonVisibilityMethod').value = "Manual" ;
		document.getElementById('moonVisibilityMethod').disabled = true ;
	}
}





function methodCalcAsr()
{
	var asrCalcMethod = document.getElementById('asrCalcMethod').value ;
	var calcAsr = 0 ;
	switch (asrCalcMethod)
	{
		case 'Standard'	:		var calcAsr = 1 												; break ;
		case 'Late'			:		var calcAsr = 2 												; break ;
		case '2over7'		:		var calcAsr = (2/7+0.00005).toFixed(4)	; break ;
	}
	document.getElementById('calcAsr').value = calcAsr ;
}





function methodHijriCalc()
{
	var hijriCalcMethod = document.getElementById('hijriCalcMethod').value ;
	var data=moonVisibilitySetup(hijriCalcMethod,0) ;
	var minMoonAltitude = data[0] ; var minMoonIllum = data[1] ; var minMoonAge = data[2] ; var minMoonAvail = data[3] ; var minMoonAzmoth = data[4] ;
	document.getElementById('minMoonAltitude').value = minMoonAltitude ;
	document.getElementById('minMoonIllum').value = minMoonIllum ;
	document.getElementById('minMoonAge').value = minMoonAge ;
	document.getElementById('minMoonAvail').value = minMoonAvail ;
	document.getElementById('minMoonAzmoth').value = minMoonAzmoth ;
//	document.getElementById('moonVisibilityMethod').value = 'Shaukat' ;
	if (hijriCalcMethod=='Math' || hijriCalcMethod=='Birth' || hijriCalcMethod=='Exist' || hijriCalcMethod=='Manual') 
		document.getElementById('moonVisibilityMethod').value = 'Manual' ;
	moonEnable() ;
}





function methodHorizon()
{
	var horizonMethod = document.getElementById('horizonMethod').value ;
	var cityLat = Number(document.getElementById('latitude').value) ;
	var cityLong = Number(document.getElementById('longitude').value) ;
	var horizonMethodValues = methodHorizonValues(horizonMethod, cityLong, cityLat) ;
	document.getElementById('horizonEast').value = horizonMethodValues[0] ;
	document.getElementById('horizonWest').value = horizonMethodValues[1] ;
	document.getElementById('horizonSouth').value = horizonMethodValues[2] ;
	document.getElementById('horizonNorth').value = horizonMethodValues[3] ;
	distanceHorizonToHours(0) ;
}





function settingsClose(action)
{
	if ( action=='commit' && notValidForm()==false && timezone.value!='===' )
	{
		settingsSave();
		quickenDataInit();
		quickenDataLoad();
		SettingsManager.setValue("Home", "settingsChanged", true);
		quickenDataSave();
		callFlyout('');
	}
	else if (action=='defaults')
	{
		makeDefaults();
		settingsInit();
	}
	else if (action=='cancel') callFlyout('');
}





function readLocations()
{
	try
	{
		var fs = new ActiveXObject("Scripting.FileSystemObject");
		var d = new ActiveXObject("Scripting.Dictionary");

		try
		{
			var dat = new Array();
			var f = fs.GetFile(installationPath() + "\\data\\locations.data");
			var ts = fs.OpenTextFile(f,1,true,-1); // 1 = ForReading

			try
			{
				//dat = ts.ReadAll();
				var i = 0;
				while (!ts.AtEndOfStream)
				{
				     dat[i] = ts.ReadLine();
				     i++;
				}
			}
			finally
			{
				ts.Close();
			}

			if (dat.length > 0)
			{
				for (var i=0; i< dat.length; i++)
				{
					var lin = dat[i].split("\t");
					Cities[i] = lin[0] + "\t" + lin[1];
					Latitude[i] = lin[2];
					Longitude[i] = lin[3];
					Timezone[i] = lin[4];
					Elevation[i] = lin[5];
					//Timezone[i] = (lin[4]<=0 || lin[4]>=0 )?lin[4]:'===';
					//var tz = '===' ;
					if (Timezone[i]=='') Timezone[i] = tZone(Longitude[i]) ;
					if (Timezone[i]>0) Timezone[i] = '+' + Number(Timezone[i]) ;
					//if (Timezone[i]<=0) Timezone[i] = Timezone[i] ;
					//if (tz=='===') Timezone[i] = tZone(Longitude[i]);
					//Timezone[i] = tz ;
					if (Elevation[i]=='' || typeof Elevation[i]=='undefined') Elevation[i] = 0 ;
					//Check if we already have this country
					if (!d.Exists(lin[0]) && lin[0].length >0)
					{
						//No, add it to the dictionary object
						d.Add(lin[0],lin[0]);
					}
				}
			}
							
			Countries = (new VBArray(d.Items())).toArray();

			removeAllOptions(selCountry);
			for (i in Countries)
			{
				selCountry.options[i] = new Option(Countries[i],Countries[i]);
			}

			setCity();
		}
		finally
		{
			fs = null;
		}
	}
	catch (e)
	{
		// Do nothing
		//System.Sound.beep();
		//azan(e);
	}
}





function moonEnable()
{
	var hijriCalcMethod = document.getElementById('hijriCalcMethod').value ;
	var moonVisibilityMethod = document.getElementById('moonVisibilityMethod').value ;

	if (hijriCalcMethod != 'Manual')
	{
		document.getElementById('minMoonAltitude').disabled = true ;
		document.getElementById('minMoonIllum').disabled = true ;
		document.getElementById('minMoonAge').disabled = true ;
		document.getElementById('minMoonAvail').disabled = true ;
		document.getElementById('minMoonAzmoth').disabled = true ;
	}
	else
	{
		document.getElementById('minMoonAltitude').disabled = false ;
		document.getElementById('minMoonIllum').disabled = false ;
		document.getElementById('minMoonAge').disabled = false ;
		document.getElementById('minMoonAvail').disabled = false ;
		document.getElementById('minMoonAzmoth').disabled = false ;
	}

	if (moonVisibilityMethod == 'Odeh' || moonVisibilityMethod == 'Shaukat' || moonVisibilityMethod == 'Yallop' || hijriCalcMethod == 'Math')
	{
		document.getElementById('minMoonAltitude').value = '==' ;
		document.getElementById('minMoonIllum').value = '==' ;
		document.getElementById('minMoonAge').value = '==' ;
		document.getElementById('minMoonAvail').value = '==' ;
		document.getElementById('minMoonAzmoth').value = '==' ;
	}
	document.getElementById('moonVisibilityMethod').disabled = false ;
	document.getElementById('moonCheckDelay').disabled = false ;
	if (hijriCalcMethod == 'Manual' || hijriCalcMethod == 'Math' || hijriCalcMethod == 'Birth' || hijriCalcMethod == 'Exist') 
	{
		document.getElementById('moonVisibilityMethod').value = "Manual" ;
		document.getElementById('moonVisibilityMethod').disabled = true ;
	}
	if (hijriCalcMethod == 'Math') 
		document.getElementById('moonCheckDelay').disabled = true ;
}





function newHorizonMethod()
{
	if (document.getElementById('horizonMethod').value == 'None')
	{
		document.getElementById('horizonSouth').value = 0 ;
		document.getElementById('horizonNorth').value = 0 ;
		document.getElementById('horizonEast').value = 0 ;
		document.getElementById('horizonWest').value = 0 ;
	}
	document.getElementById('horizonMethod').value = 'Manual' ;
}





function manualCoords(coord)
{
	var longitude = Number(document.getElementById("longitude").value) ;
	document.getElementById("timezone").value = tZone(longitude) ;
	document.getElementById('selCountry').value = '===' ;
	document.getElementById('selCity').selectedIndex = 0 ;
	//var name=prompt("أدخل اسم البلد","");
	//if (name!=null && name!="") document.getElementById("location").innerText = name;
	document.getElementById("location").innerText = "إدخال يدوي";
}





function settingsSave()
{
			SettingsManager.setValue("Home", "lat", latitude.value);
			SettingsManager.setValue("Home", "lng", longitude.value);
			SettingsManager.setValue("Home", "tzone", timezone.value);
			SettingsManager.setValue("Home", "elevation", elevation.value);
			SettingsManager.setValue("Home", "sealevel", sealevel.checked);

			SettingsManager.setValue("Home", "location", document.getElementById("location").innerText);

			SettingsManager.setValue("Home", "selCountry", selCountry.value);
			SettingsManager.setValue("Home", "selCity", selCity.value);

			//SettingsManager.setValue("Home", "outImsak", outImsak.checked);
			//SettingsManager.setValue("Home", "outFajr", outFajr.checked);
			//SettingsManager.setValue("Home", "outSunrise", outSunrise.checked);
			//SettingsManager.setValue("Home", "outDhuhr", outDhuhr.checked);
			//SettingsManager.setValue("Home", "outAsr", outAsr.checked);
			//SettingsManager.setValue("Home", "outSunset", outSunset.checked);
			//SettingsManager.setValue("Home", "outMaghrib", outMaghrib.checked);
			//SettingsManager.setValue("Home", "outIsha", outIsha.checked);
			//SettingsManager.setValue("Home", "outMidnight", outMidnight.checked);

			SettingsManager.setValue("Home", "azan1Enabled", azan1Enabled.checked);
			SettingsManager.setValue("Home", "azan1Imsak", azan1Imsak.checked);
			SettingsManager.setValue("Home", "azan1Fajr", azan1Fajr.checked);
			SettingsManager.setValue("Home", "azan1Dhuhr", azan1Dhuhr.checked);
			SettingsManager.setValue("Home", "azan1Asr", azan1Asr.checked);
			SettingsManager.setValue("Home", "azan1Maghrib", azan1Maghrib.checked);
			SettingsManager.setValue("Home", "azan1Isha", azan1Isha.checked);
			SettingsManager.setValue("Home", "azan1Multiple", azan1Multiple.checked);

			SettingsManager.setValue("Home", "azan2Enabled", azan2Enabled.checked);
			SettingsManager.setValue("Home", "azan2Imsak", azan2Imsak.checked);
			SettingsManager.setValue("Home", "azan2Fajr", azan2Fajr.checked);
			SettingsManager.setValue("Home", "azan2Dhuhr", azan2Dhuhr.checked);
			SettingsManager.setValue("Home", "azan2Asr", azan2Asr.checked);
			SettingsManager.setValue("Home", "azan2Maghrib", azan2Maghrib.checked);
			SettingsManager.setValue("Home", "azan2Isha", azan2Isha.checked);
			SettingsManager.setValue("Home", "azan2Multiple", azan2Multiple.checked);

			SettingsManager.setValue("Home", "azan3Enabled", azan3Enabled.checked);
			SettingsManager.setValue("Home", "azan3Imsak", azan3Imsak.checked);
			SettingsManager.setValue("Home", "azan3Fajr", azan3Fajr.checked);
			SettingsManager.setValue("Home", "azan3Dhuhr", azan3Dhuhr.checked);
			SettingsManager.setValue("Home", "azan3Asr", azan3Asr.checked);
			SettingsManager.setValue("Home", "azan3Maghrib", azan3Maghrib.checked);
			SettingsManager.setValue("Home", "azan3Isha", azan3Isha.checked);
			SettingsManager.setValue("Home", "azan3Multiple", azan3Multiple.checked);

			SettingsManager.setValue("Home", "calcMethod", calcMethod.value);
			SettingsManager.setValue("Home", "angleImsak", angleImsak.value);
			SettingsManager.setValue("Home", "angleMaghrib", angleMaghrib.value);
			SettingsManager.setValue("Home", "angleFajr", angleFajr.value);
			SettingsManager.setValue("Home", "angleIsha", angleIsha.value);
			SettingsManager.setValue("Home", "midnightCalcMethod", midnightCalcMethod.value);
			SettingsManager.setValue("Home", "asrCalcMethod", asrCalcMethod.value);
			SettingsManager.setValue("Home", "calcAsr", calcAsr.value);
			SettingsManager.setValue("Home", "highLats", highLats.value);

			SettingsManager.setValue("Home", "azan0File", azan0File.value);
			SettingsManager.setValue("Home", "azan0Volume", azan0Volume.value);

			SettingsManager.setValue("Home", "azan1File", azan1File.value);
			SettingsManager.setValue("Home", "azan1Volume", azan1Volume.value);

			SettingsManager.setValue("Home", "azan2File", azan2File.value);
			SettingsManager.setValue("Home", "azan2Volume", azan2Volume.value);

			SettingsManager.setValue("Home", "azan3File", azan3File.value);
			SettingsManager.setValue("Home", "azan3Volume", azan3Volume.value);

			SettingsManager.setValue("Home", "hijriCalcMethod", hijriCalcMethod.value);
			SettingsManager.setValue("Home", "hijriCorrection", hijriCorrection.value);
			SettingsManager.setValue("Home", "minMoonAltitude", minMoonAltitude.value);
			SettingsManager.setValue("Home", "minMoonIllum", minMoonIllum.value);
			SettingsManager.setValue("Home", "minMoonAge", minMoonAge.value);
			SettingsManager.setValue("Home", "minMoonAvail", minMoonAvail.value);
			SettingsManager.setValue("Home", "minMoonAzmoth", minMoonAzmoth.value);
			SettingsManager.setValue("Home", "moonVisibilityMethod", moonVisibilityMethod.value);
			SettingsManager.setValue("Home", "moonCheckDelay", moonCheckDelay.value);

			SettingsManager.setValue("Home", "horizonMethod", horizonMethod.value);
			SettingsManager.setValue("Home", "horizonSouth", horizonSouth.value);
			SettingsManager.setValue("Home", "horizonNorth", horizonNorth.value);
			SettingsManager.setValue("Home", "horizonEast", horizonEast.value);
			SettingsManager.setValue("Home", "horizonWest", horizonWest.value);

			SettingsManager.setValue("Home", "tuneImsak", tuneImsak.value);
			SettingsManager.setValue("Home", "tuneFajr", tuneFajr.value);
			SettingsManager.setValue("Home", "tuneSunrise", tuneSunrise.value);
			SettingsManager.setValue("Home", "tuneDhuhr", tuneDhuhr.value);
			SettingsManager.setValue("Home", "tuneAsr", tuneAsr.value);
			SettingsManager.setValue("Home", "tuneSunset", tuneSunset.value);
			SettingsManager.setValue("Home", "tuneMaghrib", tuneMaghrib.value);
			SettingsManager.setValue("Home", "tuneIsha", tuneIsha.value);
			SettingsManager.setValue("Home", "tuneMidnight", tuneMidnight.value);

			SettingsManager.setValue("Home", "azan1TuneImsak", azan1TuneImsak.value);
			SettingsManager.setValue("Home", "azan1TuneFajr", azan1TuneFajr.value);
			SettingsManager.setValue("Home", "azan1TuneDhuhr", azan1TuneDhuhr.value);
			SettingsManager.setValue("Home", "azan1TuneAsr", azan1TuneAsr.value);
			SettingsManager.setValue("Home", "azan1TuneMaghrib", azan1TuneMaghrib.value);
			SettingsManager.setValue("Home", "azan1TuneIsha", azan1TuneIsha.value);

			SettingsManager.setValue("Home", "azan2TuneImsak", azan2TuneImsak.value);
			SettingsManager.setValue("Home", "azan2TuneFajr", azan2TuneFajr.value);
			SettingsManager.setValue("Home", "azan2TuneDhuhr", azan2TuneDhuhr.value);
			SettingsManager.setValue("Home", "azan2TuneAsr", azan2TuneAsr.value);
			SettingsManager.setValue("Home", "azan2TuneMaghrib", azan2TuneMaghrib.value);
			SettingsManager.setValue("Home", "azan2TuneIsha", azan2TuneIsha.value);

			SettingsManager.setValue("Home", "azan3TuneImsak", azan3TuneImsak.value);
			SettingsManager.setValue("Home", "azan3TuneFajr", azan3TuneFajr.value);
			SettingsManager.setValue("Home", "azan3TuneDhuhr", azan3TuneDhuhr.value);
			SettingsManager.setValue("Home", "azan3TuneAsr", azan3TuneAsr.value);
			SettingsManager.setValue("Home", "azan3TuneMaghrib", azan3TuneMaghrib.value);
			SettingsManager.setValue("Home", "azan3TuneIsha", azan3TuneIsha.value);

			SettingsManager.setValue("Home", "monthFormat", monthFormat.value);
			SettingsManager.setValue("Home", "timeFormat", timeFormat.value);
			SettingsManager.setValue("Home", "timeLanguage", timeLanguage.value);

			SettingsManager.setValue("Home", "summerTime", summerTime.checked);
			if (summerTime.checked) 
			{
				var newTZ = Number(timezone.value)+1;
				SettingsManager.setValue("Home", "tzone", (newTZ>0?'+':'')+newTZ );
			}
}





function settingsInit()
{
		Cities = new Array() ;
		Latitude = new Array() ;
		Longitude = new Array() ;
		Timezone = new Array() ;
		Elevation = new Array() ;
		readLocations() ;

		selCountry.value = SettingsManager.getValue("Home", "selCountry");
		setCity();
		selCity.value = SettingsManager.getValue("Home", "selCity");

		latitude.value = SettingsManager.getValue("Home", "lat");
		longitude.value = SettingsManager.getValue("Home", "lng");
		timezone.value = SettingsManager.getValue("Home", "tzone");
		elevation.value = SettingsManager.getValue("Home", "elevation");
		//sealevel.checked = (SettingsManager.getValue("Home", "sealevel") == 'true');
		sealevel.checked = SettingsManager.getValue("Home", "sealevel");

		document.getElementById("location").innerText = SettingsManager.getValue("Home", "location");

		//outImsak.checked = (SettingsManager.getValue("Home", "outImsak") == 'true');
		//outFajr.checked = (SettingsManager.getValue("Home", "outFajr") == 'true');
		//outSunrise.checked = (SettingsManager.getValue("Home", "outSunrise") == 'true');
		//outDhuhr.checked = (SettingsManager.getValue("Home", "outDhuhr") == 'true');
		//outAsr.checked = (SettingsManager.getValue("Home", "outAsr") == 'true');
		//outSunset.checked = (SettingsManager.getValue("Home", "outSunset") == 'true');
		//outMaghrib.checked = (SettingsManager.getValue("Home", "outMaghrib") == 'true');
		//outIsha.checked = (SettingsManager.getValue("Home", "outIsha") == 'true');
		//outMidnight.checked = (SettingsManager.getValue("Home", "outMidnight") == 'true');

		azan1Enabled.checked = (SettingsManager.getValue("Home", "azan1Enabled") == 'true');
		azan1Imsak.checked = (SettingsManager.getValue("Home", "azan1Imsak") == 'true');
		azan1Fajr.checked = (SettingsManager.getValue("Home", "azan1Fajr") == 'true');
		azan1Dhuhr.checked = (SettingsManager.getValue("Home", "azan1Dhuhr") == 'true');
		azan1Asr.checked = (SettingsManager.getValue("Home", "azan1Asr") == 'true');
		azan1Maghrib.checked = (SettingsManager.getValue("Home", "azan1Maghrib") == 'true');
		azan1Isha.checked = (SettingsManager.getValue("Home", "azan1Isha") == 'true');
		azan1Multiple.checked = (SettingsManager.getValue("Home", "azan1Multiple") == 'true');

		azan2Enabled.checked = (SettingsManager.getValue("Home", "azan2Enabled") == 'true');
		azan2Imsak.checked = (SettingsManager.getValue("Home", "azan2Imsak") == 'true');
		azan2Fajr.checked = (SettingsManager.getValue("Home", "azan2Fajr") == 'true');
		azan2Dhuhr.checked = (SettingsManager.getValue("Home", "azan2Dhuhr") == 'true');
		azan2Asr.checked = (SettingsManager.getValue("Home", "azan2Asr") == 'true');
		azan2Maghrib.checked = (SettingsManager.getValue("Home", "azan2Maghrib") == 'true');
		azan2Isha.checked = (SettingsManager.getValue("Home", "azan2Isha") == 'true');
		azan2Multiple.checked = (SettingsManager.getValue("Home", "azan2Multiple") == 'true');

		azan3Enabled.checked = (SettingsManager.getValue("Home", "azan3Enabled") == 'true');
		azan3Imsak.checked = (SettingsManager.getValue("Home", "azan3Imsak") == 'true');
		azan3Fajr.checked = (SettingsManager.getValue("Home", "azan3Fajr") == 'true');
		azan3Dhuhr.checked = (SettingsManager.getValue("Home", "azan3Dhuhr") == 'true');
		azan3Asr.checked = (SettingsManager.getValue("Home", "azan3Asr") == 'true');
		azan3Maghrib.checked = (SettingsManager.getValue("Home", "azan3Maghrib") == 'true');
		azan3Isha.checked = (SettingsManager.getValue("Home", "azan3Isha") == 'true');
		azan3Multiple.checked = (SettingsManager.getValue("Home", "azan3Multiple") == 'true');

		calcMethod.value = SettingsManager.getValue("Home", "calcMethod");
		angleImsak.value = SettingsManager.getValue("Home", "angleImsak");
		angleMaghrib.value = SettingsManager.getValue("Home", "angleMaghrib");
		angleFajr.value = SettingsManager.getValue("Home", "angleFajr");
		angleIsha.value = SettingsManager.getValue("Home", "angleIsha");
		midnightCalcMethod.value = SettingsManager.getValue("Home", "midnightCalcMethod");
		asrCalcMethod.value = SettingsManager.getValue("Home", "asrCalcMethod");
		calcAsr.value = SettingsManager.getValue("Home", "calcAsr");
		highLats.value = SettingsManager.getValue("Home", "highLats");

		azan0File.value = SettingsManager.getValue("Home", "azan0File") ;
		azan0Volume.value = SettingsManager.getValue("Home", "azan0Volume");

		azan1File.value = SettingsManager.getValue("Home", "azan1File") ;
		azan1Volume.value = SettingsManager.getValue("Home", "azan1Volume");

		azan2File.value = SettingsManager.getValue("Home", "azan2File") ;
		azan2Volume.value = SettingsManager.getValue("Home", "azan2Volume");

		azan3File.value = SettingsManager.getValue("Home", "azan3File") ;
		azan3Volume.value = SettingsManager.getValue("Home", "azan3Volume");

		hijriCalcMethod.value = SettingsManager.getValue("Home", "hijriCalcMethod");
		hijriCorrection.value = SettingsManager.getValue("Home", "hijriCorrection");
		minMoonAltitude.value = SettingsManager.getValue("Home", "minMoonAltitude");
		minMoonIllum.value = SettingsManager.getValue("Home", "minMoonIllum");
		minMoonAge.value = SettingsManager.getValue("Home", "minMoonAge");
		minMoonAvail.value = SettingsManager.getValue("Home", "minMoonAvail");
		minMoonAzmoth.value = SettingsManager.getValue("Home", "minMoonAzmoth");
		moonVisibilityMethod.value = SettingsManager.getValue("Home", "moonVisibilityMethod");
		moonCheckDelay.value = SettingsManager.getValue("Home", "moonCheckDelay");
		moonEnable();

		horizonMethod.value = SettingsManager.getValue("Home", "horizonMethod");
		horizonSouth.value = SettingsManager.getValue("Home", "horizonSouth");
		horizonNorth.value = SettingsManager.getValue("Home", "horizonNorth");
		horizonEast.value = SettingsManager.getValue("Home", "horizonEast");
		horizonWest.value = SettingsManager.getValue("Home", "horizonWest");

		var distanceData = distanceHorizonToHours(1);
		document.getElementById('horizonHoursEast').innerText = distanceData[0] ;
		document.getElementById('horizonHoursWest').innerText = distanceData[1] ;

		tuneImsak.value = SettingsManager.getValue("Home", "tuneImsak");
		tuneFajr.value = SettingsManager.getValue("Home", "tuneFajr");
		tuneSunrise.value = SettingsManager.getValue("Home", "tuneSunrise");
		tuneDhuhr.value = SettingsManager.getValue("Home", "tuneDhuhr");
		tuneAsr.value = SettingsManager.getValue("Home", "tuneAsr");
		tuneSunset.value = SettingsManager.getValue("Home", "tuneSunset");
		tuneMaghrib.value = SettingsManager.getValue("Home", "tuneMaghrib");
		tuneIsha.value = SettingsManager.getValue("Home", "tuneIsha");
		tuneMidnight.value = SettingsManager.getValue("Home", "tuneMidnight");

		azan1TuneImsak.value = SettingsManager.getValue("Home", "azan1TuneImsak");
		azan1TuneFajr.value = SettingsManager.getValue("Home", "azan1TuneFajr");
		azan1TuneDhuhr.value = SettingsManager.getValue("Home", "azan1TuneDhuhr");
		azan1TuneAsr.value = SettingsManager.getValue("Home", "azan1TuneAsr");
		azan1TuneMaghrib.value = SettingsManager.getValue("Home", "azan1TuneMaghrib");
		azan1TuneIsha.value = SettingsManager.getValue("Home", "azan1TuneIsha");

		azan2TuneImsak.value = SettingsManager.getValue("Home", "azan2TuneImsak");
		azan2TuneFajr.value = SettingsManager.getValue("Home", "azan2TuneFajr");
		azan2TuneDhuhr.value = SettingsManager.getValue("Home", "azan2TuneDhuhr");
		azan2TuneAsr.value = SettingsManager.getValue("Home", "azan2TuneAsr");
		azan2TuneMaghrib.value = SettingsManager.getValue("Home", "azan2TuneMaghrib");
		azan2TuneIsha.value = SettingsManager.getValue("Home", "azan2TuneIsha");

		azan3TuneImsak.value = SettingsManager.getValue("Home", "azan3TuneImsak");
		azan3TuneFajr.value = SettingsManager.getValue("Home", "azan3TuneFajr");
		azan3TuneDhuhr.value = SettingsManager.getValue("Home", "azan3TuneDhuhr");
		azan3TuneAsr.value = SettingsManager.getValue("Home", "azan3TuneAsr");
		azan3TuneMaghrib.value = SettingsManager.getValue("Home", "azan3TuneMaghrib");
		azan3TuneIsha.value = SettingsManager.getValue("Home", "azan3TuneIsha");

		monthFormat.value = SettingsManager.getValue("Home", "monthFormat");
		timeFormat.value = SettingsManager.getValue("Home", "timeFormat");
		timeLanguage.value = SettingsManager.getValue("Home", "timeLanguage");

		summerTime.checked = (SettingsManager.getValue("Home", "summerTime") == 'true');
		if (summerTime.checked)
		{
			var newTZ = Number(SettingsManager.getValue("Home", "tzone"))-1;
			timezone.value = (newTZ>0?'+':'')+newTZ;
		}

		//elevation.disabled = sealevel.checked;
}





function tZone(longitude)
{
	var tz = Math.floor(longitude * 4/60) ;
	if (tz>0) tz = '+' + tz ;
	if (tz=='-0' || tz=='+0') tz = '0' ;
	return tz;
}




