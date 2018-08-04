




function convertToGreg()
{
	var yearHijri = Number(hijriYear1000.value + hijriYear100.value + hijriYear10.value + hijriYear1.value) ;
	var monthHijri = Number(hijriMonth.value) ;
	var dayHijri = Number(hijriDay.value) ;

	var todayGreg = hijriToGreg(yearHijri, monthHijri, dayHijri) ;
	var weekDay = todayGreg[3] ;
	var todayHijri = [yearHijri, monthHijri, dayHijri, weekDay] ;

	quickenDataSave();
	showDates(todayGreg, todayHijri);
}





function convertToHijri()
{
	var yearGreg = Number(gregYear1000.value + gregYear100.value + gregYear10.value + gregYear1.value) ;
	var monthGreg = Number(gregMonth.value) ;
	var dayGreg = Number(gregDay.value) ;

	var todayHijri = gregToHijri(yearGreg, monthGreg, dayGreg) ;
	var weekDay = todayHijri[3] ;
 	var todayGreg = [yearGreg, monthGreg, dayGreg, weekDay] ;

	quickenDataSave();
	showDates(todayGreg, todayHijri);
}





function showDates(todayGreg, todayHijri)
{
	var strTodayJD = jd0(todayGreg[0],todayGreg[1],todayGreg[2]) ;
	var strTodayGreg =  String(todayGreg[2]) + spacer2 + '-' + spacer2 + monthNames[todayGreg[1]-1] + spacer2 + '-' + spacer2 + todayGreg[0] ;
	var strTodayHijri = todayHijri[2] + spacer2 + '-' + spacer2 + hijriMonthNames[todayHijri[1]-1] + spacer2 + '-' + spacer2 + (todayHijri[0]>0?todayHijri[0]:'('+todayHijri[0]+')') ;

	g_strTextPage += '<b><br>' ;
	g_strTextPage += spacer8 + spacer8 + spacer8 + daysNames[todayGreg[3]] + '<br>' ;
	g_strTextPage += '<br><hr><br>' ;
	g_strTextPage += 'ميلادي:' + spacer8 + strTodayGreg + '<br>' ;
	g_strTextPage += '<br><hr><br>' ;
	g_strTextPage += 'هجري:' + spacer8 + strTodayHijri + '<br>' ;
	g_strTextPage += '<br><hr><br>' ;
	g_strTextPage += 'جوليان:' + spacer8 + strTodayJD + ' - ' + (strTodayJD+1) + '<br>' ;
	g_strTextPage += '<br><hr><br>' ;
	g_strTextPage += 'جميع حسابات التاريخ الميلادي والهجري مبنية على' + '<br>' ;
	g_strTextPage += 'الطريقة الحديثة ومطابقة لطريقة القرن العشرين' + '<br>' ;
	g_strTextPage += '</b>' ;


	document.body.style.width = "340px" ;
	document.body.style.height = "420px" ;
	document.getElementById('textArea').innerHTML = g_strTextPage ;

}





function changeGregItems(y,m,d)
{
	var yearGreg = String(y) ;
	document.getElementById('gregDay').value = d ;
	document.getElementById('gregMonth').value = m ;
	document.getElementById('gregYear1').value = yearGreg.substr(3,1) ;
	document.getElementById('gregYear10').value = yearGreg.substr(2,1) ;
	document.getElementById('gregYear100').value = yearGreg.substr(1,1) ;
	document.getElementById('gregYear1000').value = yearGreg.substr(0,1) ;
}





function changeHijriItems(y,m,d)
{
	var yearHijri = String(y) ;
	document.getElementById('hijriDay').value = d ;
	document.getElementById('hijriMonth').value = m ;
	document.getElementById('hijriYear1').value = yearHijri.substr(3,1) ;
	document.getElementById('hijriYear10').value = yearHijri.substr(2,1) ;
	document.getElementById('hijriYear100').value = yearHijri.substr(1,1) ;
	document.getElementById('hijriYear1000').value = yearHijri.substr(0,1) ;
	quickenDataSave();
}




