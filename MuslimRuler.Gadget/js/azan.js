




var player0 = new ActiveXObject("WMPlayer.OCX.7");

var player11 = new ActiveXObject("WMPlayer.OCX.7");
var player12 = new ActiveXObject("WMPlayer.OCX.7");
var player13 = new ActiveXObject("WMPlayer.OCX.7");
var player14 = new ActiveXObject("WMPlayer.OCX.7");
var player21 = new ActiveXObject("WMPlayer.OCX.7");
var player22 = new ActiveXObject("WMPlayer.OCX.7");
var player23 = new ActiveXObject("WMPlayer.OCX.7");
var player24 = new ActiveXObject("WMPlayer.OCX.7");
var player31 = new ActiveXObject("WMPlayer.OCX.7");
var player32 = new ActiveXObject("WMPlayer.OCX.7");
var player33 = new ActiveXObject("WMPlayer.OCX.7");
var player34 = new ActiveXObject("WMPlayer.OCX.7");

var playing = [];
var azanTimeoutID = [];
enableAzan();





function azanPrayers(times)
{
	var azan0active = SettingsManager.getValue("Home", "azan0Enabled") ;
	var azan1active = SettingsManager.getValue("Home", "azan1Enabled") ;
	var azan2active = SettingsManager.getValue("Home", "azan2Enabled") ;
	var azan3active = SettingsManager.getValue("Home", "azan3Enabled") ;

	if ( azan0active=='true' || azan1active=='true' || azan2active=='true' || azan3active=='true' )
	{
		var lat = SettingsManager.getValue("Home", "lat");
		var lng = SettingsManager.getValue("Home", "lng");
		var timeZone  = SettingsManager.getValue("Home", "tzone");

		var today = new Date() ;
		var nowTimeHours = today.getHours() ;
		var nowTimeMinutes = today.getMinutes() ;
		var nowTime = nowTimeHours + nowTimeMinutes/60 + 5/3600 ;

		for (var i=0; i<=times.length-1; i++) if (times[i]>=24) times[i] -= 24 ;

		var times0 = [ Number(SettingsManager.getValue("Home", "azan0Hours"))+Number(SettingsManager.getValue("Home", "azan0Minutes"))/60 ] ;
		var azan0 = [	SettingsManager.getValue("Home", "azan0Enabled") ] ;

		var times1 = [times[0],times[1],times[2],times[3],times[4],times[5],times[6],times[7],times[8]] ;
		var azan1 = [	'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false' ] ;
		if ( azan1active=='true' )
		{
			times1[0] += Number(SettingsManager.getValue("Home", "azan1TuneFajr"))/60 ;
		  times1[2] += Number(SettingsManager.getValue("Home", "azan1TuneDhuhr"))/60 ;
			times1[3] += Number(SettingsManager.getValue("Home", "azan1TuneAsr"))/60 ;
			times1[5] += Number(SettingsManager.getValue("Home", "azan1TuneMaghrib"))/60 ;
			times1[6] += Number(SettingsManager.getValue("Home", "azan1TuneIsha"))/60 ;
			times1[8] += Number(SettingsManager.getValue("Home", "azan1TuneImsak"))/60 ;

			azan1[0] = SettingsManager.getValue("Home", "azan1Fajr");
		  azan1[2] = SettingsManager.getValue("Home", "azan1Dhuhr");
			azan1[3] = SettingsManager.getValue("Home", "azan1Asr");
			azan1[5] = SettingsManager.getValue("Home", "azan1Maghrib");
			azan1[6] = SettingsManager.getValue("Home", "azan1Isha");
			azan1[8] = SettingsManager.getValue("Home", "azan1Imsak");
		}

		var times2 = [times[0],times[1],times[2],times[3],times[4],times[5],times[6],times[7],times[8]] ;
		var azan2 = [	'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false' ] ;
		if ( azan2active=='true' )
		{
			times2[0] += Number(SettingsManager.getValue("Home", "azan2TuneFajr"))/60 ;
		  times2[2] += Number(SettingsManager.getValue("Home", "azan2TuneDhuhr"))/60 ;
			times2[3] += Number(SettingsManager.getValue("Home", "azan2TuneAsr"))/60 ;
			times2[5] += Number(SettingsManager.getValue("Home", "azan2TuneMaghrib"))/60 ;
			times2[6] += Number(SettingsManager.getValue("Home", "azan2TuneIsha"))/60 ;
			times2[8] += Number(SettingsManager.getValue("Home", "azan2TuneImsak"))/60 ;

			azan2[0] = SettingsManager.getValue("Home", "azan2Fajr");
		  azan2[2] = SettingsManager.getValue("Home", "azan2Dhuhr");
			azan2[3] = SettingsManager.getValue("Home", "azan2Asr");
			azan2[5] = SettingsManager.getValue("Home", "azan2Maghrib");
			azan2[6] = SettingsManager.getValue("Home", "azan2Isha");
			azan2[8] = SettingsManager.getValue("Home", "azan2Imsak");
		}

		var times3 = [times[0],times[1],times[2],times[3],times[4],times[5],times[6],times[7],times[8]] ;
		var azan3 = [	'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false' ] ;
		if ( azan3active=='true' )
		{
			times3[0] += Number(SettingsManager.getValue("Home", "azan3TuneFajr"))/60 ;
		  times3[2] += Number(SettingsManager.getValue("Home", "azan3TuneDhuhr"))/60 ;
			times3[3] += Number(SettingsManager.getValue("Home", "azan3TuneAsr"))/60 ;
			times3[5] += Number(SettingsManager.getValue("Home", "azan3TuneMaghrib"))/60 ;
			times3[6] += Number(SettingsManager.getValue("Home", "azan3TuneIsha"))/60 ;
			times3[8] += Number(SettingsManager.getValue("Home", "azan3TuneImsak"))/60 ;

			azan3[0] = SettingsManager.getValue("Home", "azan3Fajr");
		  azan3[2] = SettingsManager.getValue("Home", "azan3Dhuhr");
			azan3[3] = SettingsManager.getValue("Home", "azan3Asr");
			azan3[5] = SettingsManager.getValue("Home", "azan3Maghrib");
			azan3[6] = SettingsManager.getValue("Home", "azan3Isha");
			azan3[8] = SettingsManager.getValue("Home", "azan3Imsak");
		}

		var delay = 0 ;

		for (var j=0; j<=3; j++)
		{
			switch (j)
			{
				case 0 : var times9=times0 ; var azan9=azan0 ; var azan9active=azan0active ; break ;
				case 1 : var times9=times1 ; var azan9=azan1 ; var azan9active=azan1active ; break ;
				case 2 : var times9=times2 ; var azan9=azan2 ; var azan9active=azan2active ; break ;
				case 3 : var times9=times3 ; var azan9=azan3 ; var azan9active=azan3active ; break ;
			}
			if ( azan9active=='true' ) for (var i=0; i<times9.length; i++)
			{
				if ( azan9[i]=='true' && nowTime>=times9[i] && nowTime<times9[i]+50/3600 )
				{
					if (j==0) azanTimeoutID[0] = setTimeout("azanPlay(0,0)",delay);
					else azanTimeoutID[j+"1"] = setTimeout("azanPlay("+j+",1)",delay);
					delay += 12000 ;
				}
			}
		}
	}
}





function azanPlay(fileNumber, sequenceMultiple)
{
	var player = 10*fileNumber+sequenceMultiple ;
	if (!playing[player])
	{
		var url = SettingsManager.getValue("Home", "azan"+fileNumber+"File") ;
		var url = url.replace(/\\/g,'\\\\');
		switch (sequenceMultiple)
		{
			case 0 : var volume = 1+0.99*Number(SettingsManager.getValue("Home", "azan"+fileNumber+"Volume")) ; break ;
			case 1 : var volume = 1+0.99*Number(SettingsManager.getValue("Home", "azan"+fileNumber+"Volume")) ; break ;
			case 2 : var volume = 1+0.19*Number(SettingsManager.getValue("Home", "azan"+fileNumber+"Volume")) ; break ;
			case 3 : var volume = 1+0.39*Number(SettingsManager.getValue("Home", "azan"+fileNumber+"Volume")) ; break ;
			case 4 : var volume = 1+0.09*Number(SettingsManager.getValue("Home", "azan"+fileNumber+"Volume")) ; break ;
		}
		setTimeout("play1("+player+",'"+url+"',"+volume+")",10) ;
		setTimeout("playing["+player+"]=false",57000-1000*(new Date()).getSeconds());
		azanMultiple = (SettingsManager.getValue("Home", "azan"+fileNumber+"Multiple")=='true') ;
		if (sequenceMultiple==1 && azanMultiple)
		{
				azanTimeoutID[fileNumber+"2"] = setTimeout("azanPlay("+fileNumber+",2)",7000);
				azanTimeoutID[fileNumber+"3"] = setTimeout("azanPlay("+fileNumber+",3)",14000);
				azanTimeoutID[fileNumber+"4"] = setTimeout("azanPlay("+fileNumber+",4)",21000);
		}
	}
}





function azanTest(fileNumber, sequenceMultiple)
{
	var player = 10*fileNumber+sequenceMultiple ;
	if (!playing[player])
	{
		var url = document.getElementById('azan'+fileNumber+'File').value ;
		var url = url.replace(/\\/g,'\\\\');
		switch (sequenceMultiple)
		{
			case 0 : var volume = 1+0.99*document.getElementById('azan'+fileNumber+'Volume').value ; break ;
			case 1 : var volume = 1+0.99*document.getElementById('azan'+fileNumber+'Volume').value ; break ;
			case 2 : var volume = 1+0.19*document.getElementById('azan'+fileNumber+'Volume').value ; break ;
			case 3 : var volume = 1+0.39*document.getElementById('azan'+fileNumber+'Volume').value ; break ;
			case 4 : var volume = 1+0.09*document.getElementById('azan'+fileNumber+'Volume').value ; break ;
		}
		setTimeout("play1("+player+",'"+url+"',"+volume+")",10) ;
		setTimeout("playing["+player+"]=false",57000-1000*(new Date()).getSeconds());
		if (sequenceMultiple==1)
		{
			azanMultiple = document.getElementById("azan"+fileNumber+"Multiple").checked ;
			if (azanMultiple)
			{
				azanTimeoutID[fileNumber+"2"] = setTimeout("azanTest("+fileNumber+",2)",7000);
				azanTimeoutID[fileNumber+"3"] = setTimeout("azanTest("+fileNumber+",3)",14000);
				azanTimeoutID[fileNumber+"4"] = setTimeout("azanTest("+fileNumber+",4)",21000);
			}
			document.getElementById('azanTest'+fileNumber).value = 'إيقاف' ;
		}
		else if (sequenceMultiple==0)
		{
			document.getElementById('azanTest'+fileNumber).value = 'إيقاف' ;
		}
	}
	else if (sequenceMultiple==1 && playing[player])
	{
		setTimeout("stop1("+fileNumber+"1)",10) ;
		setTimeout("stop1("+fileNumber+"2)",10) ;
		setTimeout("stop1("+fileNumber+"3)",10) ;
		setTimeout("stop1("+fileNumber+"4)",10) ;
		document.getElementById('azanTest'+fileNumber).value = 'فحص الصوت' ;
	}
	else if (sequenceMultiple==0 && playing[player])
	{
		setTimeout("stop1("+fileNumber+")",10) ;
		document.getElementById('azanTest'+fileNumber).value = 'فحص الصوت' ;
	}
}





function play1(player,url,volume)
{
	setTimeout("player"+player+".settings.Volume="+volume,10) ;
	setTimeout("player"+player+".URL='"+url.replace(/\\/g,'\\\\')+"'",10) ;
	azanTimeoutID[player] = setTimeout("player"+player+".controls.play()",100) ;
	playing[player] = true ;
}





function stop1(player)
{
	setTimeout("player"+player+".controls.stop()",10) ;
	playing[player] = false ;
	clearTimeout(azanTimeoutID[player]) ;
}





function stopAzan()
{
	stop1(00) ;
	stop1(11) ;
	stop1(12) ;
	stop1(13) ;
	stop1(14) ;
	stop1(21) ;
	stop1(22) ;
	stop1(23) ;
	stop1(24) ;
	stop1(31) ;
	stop1(32) ;
	stop1(33) ;
	stop1(34) ;
	disableAzan();
	setTimeout("enableAzan()",57000-1000*(new Date()).getSeconds());
}





function disableAzan()
{
	playing[00] = true ;
	playing[11] = true ;
	playing[12] = true ;
	playing[13] = true ;
	playing[14] = true ;
	playing[21] = true ;
	playing[22] = true ;
	playing[23] = true ;
	playing[24] = true ;
	playing[31] = true ;
	playing[32] = true ;
	playing[33] = true ;
	playing[34] = true ;
}





function enableAzan()
{
	playing[00] = false ;
	playing[11] = false ;
	playing[12] = false ;
	playing[13] = false ;
	playing[14] = false ;
	playing[21] = false ;
	playing[22] = false ;
	playing[23] = false ;
	playing[24] = false ;
	playing[31] = false ;
	playing[32] = false ;
	playing[33] = false ;
	playing[34] = false ;
}





