




function ahadethMouseOver()
{
	if (document.getElementById('ahadethText').style.color != 'blue') 
		{
			document.getElementById('ahadethText').style.color = 'blue' ;
			setTimeout("document.getElementById('ahadethText').style.color='red'",10*60*1000);
		}
	else
		document.getElementById('ahadethText').style.color = 'red' ;
}





function ahadeth(action)
{
	var showAhadeth = (SettingsManager.getValue("Home", "showAhadeth")=='true') ;
	var ahadethColor = System.Gadget.document.getElementById('ahadethText').style.color ;
	if (action==1)
	{
		var showAhadeth = !showAhadeth;
		SettingsManager.setValue("Home", "showAhadeth", showAhadeth);
		System.Gadget.document.getElementById('ahadethText').style.color = 'red' ;
		SettingsManager.saveFile() ;
		SettingsManager.loadFile() ;
		adjustHeight();
		document.getElementById('showAhadeth').checked = showAhadeth ;
	}
	if (!showAhadeth) System.Gadget.document.getElementById('ahadethText').innerText ='' ;
	else if (ahadethColor!='blue' || action==2)
	{
		var hadethSize = 999 ;
		while (hadethSize>80)
		{
			var hadeth = hadethText[Math.floor(Math.random()*ahadethSize)] ;
			var hadethSize = arabicTextClean(hadeth).length ;
		}
		System.Gadget.document.getElementById('ahadethText').innerText = hadeth ;
	}
}





var	hadethBook = [];
var	hadethChapter = [];
var	hadethSection = [];
var	hadethText = [];
var	hadethTextClean = [];
var	ahadethSections = [];
var ahadethChapters = [];
var ahadethBooks = [];

function readAhadeth(loadFlag)
{
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var dat = new Array();
	var f = fs.GetFile(installationPath() + "\\data\\ahadeth.data");
	var ts = fs.OpenTextFile(f,1,true,-1); // 1 = ForReading
	var book=0 ;
	var chapter=0 ;
	var section=0 ;
	var j=0 ;
	while (!ts.AtEndOfStream)
	{
		dat = ts.ReadLine();
		var lin = dat.split("\t");
		if (lin[0]=='@@@')
		{
			ahadethBooks[book] = lin[1] ;
			book++ ;
		}
		else if (lin[0]=='###')
		{
			ahadethChapters[chapter] = lin[1] ;
			chapter++ ;
		}
		else if (lin[0]=='%%%')
		{
			ahadethSections[section] = lin[1] ;
			section++ ;
		}
		else
		{
			hadethText[j] = lin[0] ;
			if (loadFlag>=1)
			{
				hadethSection[j]=section-1 ;
				hadethChapter[j]=chapter-1 ;
				hadethBook[j]=book-1 ;
			}
			if (loadFlag==2) hadethTextClean[j] = arabicTextClean(lin[0]) ;
			j++ ;
		}
	}
	ts.Close();
	return j ;
}





function readAhadethSample()
{
hadethText = 
["أخوك من واساك في الشدّة"
,"أحسن إلى المسيء تَسُده"
,"أكثر مصارع العقول تحت بروق الأطماع"
,"أدّب عيالك تنفعهم"
,"أدب المرء خير من ذهبه"
,"بالبرّ يُسْتَعْبَد الحرّ"
,"باكر بالخير تسعد"
,"بركة العمر في حسن العمل"
,"بلاء الإنسان من اللسان"
,"بركة المال في أداء الزكاة"
,"تفاءل بالخير تنله"
,"تزاحم الأيدي على الطعام بركة"
,"تواضع المرء يكرمه"
,"توكل على اللّه يكفيك"
,"ثلمة الدين موت العلماء"
,"ثبات المُلك بالعدل"
,"ثوب السلامة لا يبلى"
,"ثواب الآخرة خير من نعيم الدنيا"
,"جودة الكلام في الإختصار"
,"جالس الفقراء تزدد شكراً"
,"جليس الخير غنيمة"
,"جليس السوء شيطان"
,"حسن الخلق غنيمة"
,"حرفة المرء كنز له"
,"حلم المرء عونه"
,"حلي الرجال الأدب"
,"خير الأصحاب من يسددك على الخير"
,"خير النساء الودود الولود"
,"خليل المرء دليل عقله"
,"دولة الأرذال آفة الرجال"
,"دُم على كظم الغيظ تُحمد عواقبك"
,"دواء القلب الرضا بالقضاء"
,"ذل المرء في الطمع والعزّة في القناعة"
,"ذلاقة اللسان رأس المال"
,"ذكر الموت جلاء القلب"
,"رفاهية العيش في الأمن"
,"رفيق المرء دليل عقله"
,"راع أباك يرعاك إبنك"
,"رُبّ رجاء يؤدي إلى الحرمان"
,"زينة الباطن خير من زينة الظاهر"
,"زيارة الضعفاء من التواضع"
,"زُر المرء على قدر إكرامه لك"
,"سادة القوم الفقهاء"
,"سوء الخلق وحشة لا خلاص منها"
,"سيرة المرء تُنبئ عن سريرته"
,"السعيد مَن اتعظ بغيره"
,"شرط الألفة ترك الكلفة"
,"شفاء الجَنان في قراءة القرآن"
,"شر الناس من يتقيه الناس"
,"صلاح الإنسان في حفظ اللسان"
,"صِل الأرحام تكثر حشمك"
,"صلاح الدين في الورع وفساده في الطمع"
]

return hadethText.length ;
}





