




 var L_PREVIOUS_text = "Previous";
 var L_NEXT_text = "Next";
 var g_filter = 1;
 var g_todayView = true;
// var g_calendar_top_margin_unDocked = 20;
 var g_dayView_monthHdr = 5;
 var g_dayView_dayOfWeekHdr = 90;
 var g_calendar_date = new Date().toDateString();
 var g_initDate = new Date().toDateString();
 var g_defaultView = "";
 var g_defaultDOW = "";
 var gView = "month";
 var g_curl_img = null;
 var g_curl_hitRegion = null;
 var g_day_view = null;
 var BIDI = "";
 var temp;
 var g_calendarAlarm = null;
// var g_mySettings = new calendarSettings();
 var g_monthYearLayout = "";
 var loc = new locClass();
 var g_userLanguage = "";




////////////////////////////////////////////////////////////////////////////////
//
// Calendar Object
//
////////////////////////////////////////////////////////////////////////////////
function locClass()
{
    this.load = function()
    {
        this.day=
        {
            first: null,
            short: null,
            long : null,
            dayofweek: null
        };
        this.month=
        {
            short: null,
            long : null
        };
    };
    
    this.parseNode = function(xmlStr, nloc)
    {
        var dayStr = nloc.selectSingleNode(xmlStr);
        
        if (dayStr)
        {
            return dayStr.text.split(";");
        }
        else
        {
            return [];
        }
    };
}
////////////////////////////////////////////////////////////////////////////////
//
// Initialize calendar to user locale settings
//
////////////////////////////////////////////////////////////////////////////////
function reLoad()
{         
//    clearTimeout(g_calendarAlarm);
//   setCalendarAlarm(true);
    
    if (g_userLanguage != navigator.userLanguage )
    {  
        g_userLanguage = navigator.userLanguage;
        
        vbsSetLocale("");
        
        loc.day.first = 6; // week first day
        
        if (loc.day.short != null)
        {
            loc.day.short.splice();
            loc.day.long.splice();
            loc.month.short.splice();
            loc.month.long.splice();
        }
        
        loc.day.short = buildWeekDayNameShort();
        loc.day.long = buildWeekDayNameLong();
        loc.month.short = buildMonthNameShort();
        loc.month.long = buildMonthNameLong();
        
        loc.day.dayofweek = null;
        
        var nloc = xloc.documentElement.selectSingleNode("lang[@id='ar-iq']");
        
        if (nloc)
        {
            loc.day.dayofweek = loc.parseNode("day/@dayofweek", nloc);
        }
        
        setYearBeforeMonthFlag();   
    }
} 

////////////////////////////////////////////////////////////////////////////////
//
// Initialize Year before Month flag
//
////////////////////////////////////////////////////////////////////////////////
function setYearBeforeMonthFlag()
{
   var testDate = new Date("january 25, 1999").toLocaleString();
    
   if (testDate.indexOf("25") < testDate.indexOf("99") )
   {
        g_monthYearLayout = "MM YY";
   }
   else
   {
        g_monthYearLayout = "YY MM";
   }
}

////////////////////////////////////////////////////////////////////////////////
//
// Initialize Long Name Day of Week Array
//
////////////////////////////////////////////////////////////////////////////////
function buildWeekDayNameLong()
{
    var arr = [];
    for (var i = 0 ; i < 7 ; i++)
    {
        arr[i] = vbsWeekDayNameLong(i+1);
    }   
    return arr;
}
////////////////////////////////////////////////////////////////////////////////
//
// Initialize Short Name Day of Week Array
//
////////////////////////////////////////////////////////////////////////////////
function buildWeekDayNameShort()
{
    var arr = [];
    for (var i = 0 ; i < 7 ; i++)
    {
        arr[i] = vbsWeekDayNameShort(i+1,true);
    }   
    return arr;
}
////////////////////////////////////////////////////////////////////////////////
//
// Initialize Short Month Name Array
//
////////////////////////////////////////////////////////////////////////////////
function buildMonthNameShort()
{
    var arr = [];
    
    setYearBeforeMonthFlag();
    
    for (var i = 0 ; i < 12 ; i++)
    {
        arr[i] = gregMonthNamesSmall[i];//vbsMonthNameShort(i+1,true);
    }   
    return arr;
}
////////////////////////////////////////////////////////////////////////////////
//
// Initialize Long Month Name Array
//
////////////////////////////////////////////////////////////////////////////////
function buildMonthNameLong()
{
    var arr = [];
    for (var i = 0 ; i < 12 ; i++)
    {
        arr[i] = vbsMonthNameLong(i+1);
    }   
    return arr;
}         
                

////////////////////////////////////////////////////////////////////////////////
function unDock()
{
    docked.style.display = "none";
    g_curl_img = curlUnDocked;
    g_curl_hitRegion = unDockedHitRegion;
    g_day_view = DAY_UNDOCKED;
    gView = "month";
    tID.divType = "year";
  
    with(document.body.style)
       backgroundImage = checkBackground(); 

    divPrevNext.className = "prevnext_unDocked";
    divPrevNext.style.visibility = "hidden";

    Calendar(YEAR_UNDOCKED).year.initYear(new Date(g_initDate));
    Calendar(MONTH_UNDOCKED).month.initMonth(new Date(g_initDate));
    Calendar(DAY_UNDOCKED).day.initDay(new Date(g_initDate));
    
    MONTH_UNDOCKED.style.visibility   = "hidden";
    YEAR_UNDOCKED.style.visibility    = "hidden";

    swap( eval( "MONTH_UNDOCKED")); //g_mySettings.unDockedCalendarView ) );

    unDocked.style.display = "";  
//    g_mySettings.save("","");
};
////////////////////////////////////////////////////////////////////////////////
//
//
//
////////////////////////////////////////////////////////////////////////////////
function checkBackground()
{
    var sRetVal = "";
    var initDate = new Date(g_initDate);
    var isToday = ( initDate.toDateString()== new Date().toDateString() );    

            if ( isToday )
            {
                sRetVal = "url(images/calendar/calendar_double_orange.png)";
                divBgImageUnDocked.style.backgroundImage = "url(images/calendar/calendar_single_bkg_orange.png)";
            }
            else
            {
                sRetVal = "url(images/calendar/calendar_double.png)";
                divBgImageUnDocked.style.backgroundImage = "url(images/calendar/calendar_single_bkg.png)";
                g_curl_img.style.visibility              = "visible";
                g_curl_hitRegion.style.visibility        = "visible";   
            }           

    return sRetVal; 
}

////////////////////////////////////////////////////////////////////////////////
//
// Calendar object 
//
////////////////////////////////////////////////////////////////////////////////
function Calendar(o)
{
////////////////////////////////////////////////////////////////////////////////
//
// Day view
//
////////////////////////////////////////////////////////////////////////////////
    o.day={
        d:new Date(),
        
        html:function(d)
        {
            
            
            this.d = new Date(d);
            
            g_day_view.d = d.toDateString();
            
            var isToday=d.toDateString() == new Date().toDateString();
            var layout = g_monthYearLayout;
            
            

            if (isToday)
            {
                g_curl_img.style.visibility = "hidden";
                g_curl_hitRegion.style.visibility   = "hidden";
            }
            else
            {
                g_curl_img.style.visibility = "visible";
                g_curl_hitRegion.style.visibility   = "visible";
                g_curl_img.d = ( new Date().toDateString() );
            }
       
            layout = layout.replace("YY",d.getFullYear());
            layout = layout.replace("MM",loc.month.long[d.getMonth()]);            
            
			/////////////////////////////////////////////////////////
			//------ get gregorian values

			var gd = d.getDate();			// day
			var gm = d.getMonth()+1;	// month
			var gy = d.getFullYear(); // year

			//---- get Hijri date
			var arrayHD = gregToHijri(gy,gm,gd) ;
			var hijriYear = arrayHD[0] ;
			var hijriMonth = arrayHD[1] ;
			var hijriDay = arrayHD[2] ;
			var wd = arrayHD[3] ;			// get week day
			var hijriShort = arrayHD[5] ;

			//---- get next occasion if not set
			var hDay = hijriDay ;
			for(z=hijriMonth ; z <= 13 ; z++ , hDay=1)
			{
				if(z>12) z=1;
				for(i=hDay ; i<= 30 ; i++)
				{
					var y = hijriOccasion(i, z) ;
					if ( y != "") break; 
				}
			 	if ( y != "")
				{
					var nextOccasion = "<u>" + "المناسبة القادمة" + spacer2 + " { " + i + " " + hijriMonthNames[z-1] + " }</u><br><br>" + y ;
					break;
				}
			}

			var y = hijriOccasion(hijriDay, hijriMonth) ;
			var dayOccasion = "<u>" + "مناسبة اليوم" + spacer2 + " { " + i + " " + hijriMonthNames[z-1] + " }</u><br><br>" + y ;
			if (y!="") var isOccasion=true ; else var isOccasion=false ;


			//---- get day name in arabic
			var dayName = daysNames[wd] ;

			var gregShort = d.getDate() + "  " + monthNames[d.getMonth()] + "  " + d.getYear() ;

			/////////////////////////////////////////////////////////
			var str = "" ;
			str += "<table lang=ar id='dowId' valign=center width='100%' cellpadding=0 cellspacing=0>" ;
			str += "<tr><td align=center dir=rtl style='" + (isToday?"color:white;":"color:black;") + "'>" ;
			str += "<span id='myellipsisHeadingTop'>" + gregShort + "<br>" + hijriShort + "</span></td></tr>" ;
			str += "<tr><td align=center valign=top style='" + (isToday?"color:white;":"color:black;") + "'>" ;
			str += "<span id='myellipsisHeadingBottom'>" + dayName + "</span></td></tr>" ;
			str += "<tr><td align=center dir=rtl style='" + (isOccasion?(isToday?"color:lime;":"color:green;"):(isToday?"color:white;":"color:black;")) + "'>" ;
			str += "<span id='myellipsisMiddle'>" + (isOccasion?dayOccasion:nextOccasion) + "</span>" ;
			str += "</td></tr></table>" ;

			return str ;
    },

        initDay:function(d)
        {
            o.innerHTML = this.html(d);
        }

    };
    
////////////////////////////////////////////////////////////////////////////////
//
// Month view
//
////////////////////////////////////////////////////////////////////////////////
    o.month=
    {
        html:function(d)
        {
            var layout = g_monthYearLayout;
            if(d)this.d=new Date(d);else d=this.d;
            layout = loc.month.short[d.getMonth()];
            layout += spacer4+d.getFullYear().toString().substr(0);
            return "<span dir='rtl' UNSELECTABLE='on'>"+prevNext(layout,monthGrid(d.getYear(),d.getMonth(),d.getDate()) )+"</span>";
        },

        initMonth:function(d)
        {
             tID.omo = "";             
             o.innerHTML=this.html(d);
        }
    };
////////////////////////////////////////////////////////////////////////////////
//
// Year view
//
////////////////////////////////////////////////////////////////////////////////
    o.year=
    {
        html:function(d){
            if(d)this.d=new Date(d); else d=this.d;
            var s="<div dir='rtl' UNSELECTABLE='on' style='margin:5 0 0 5'>",m=0,y,x;
            for(y=0; y<3; y++, s+="<br>")
                for(x=0; x<4; x++, m++)
                    s+="<var omo tabindex=1 divType='zoomMonth' onkeypress='swap(this);' onclick='swap(this)' m='"+m+"'>"+loc.month.short[m]+"</var>";
            s+="</div>";
            return "<span>"+prevNext(this.d.getFullYear(),s)+"</span>";
        },
        initYear:function(d){
          tID.removeAttribute("omo");
          tID.className = "";
          o.innerHTML = this.html(d);
        }
    };
////////////////////////////////////////////////////////////////////////////////
    function prevNext(tIDle,body)
    {
       tID.innerHTML = tIDle;
       return "<div UNSELECTABLE='on' class='divMonthView_docked'>"+ body + "</div>";
    };
////////////////////////////////////////////////////////////////////////////////
    function monthGrid(year,month,day)
    {
        var hijri = gregToHijri(year,month,day) ;
        var d=new Date() ; d.setFullYear(year,month,1-new Date(year,month,1).getDay()+loc.day.first);
        if(d.getMonth()==month && d.getDate()>1) d.setDate(d.getDate()-7);
        var s="",today=new Date();
        for(var y=0; y<7 && (d.getMonth()<=month || d.getYear()<year); y++)
        {
            for(var x=0; x<7; x++)
            {
                s+="<q lang=ar divType='dow' class='day " ;
                if ( x==6 ) s += "we " ;
                if (y)
                {
									if (hijri[0]>28) var hijri = gregToHijri(d.getFullYear(),d.getMonth()+1,d.getDate()) ;
									else { hijri[2]++ ; hijri[3]=(hijri[3]+1)%7 ; }
									if ( hijriOccasion(hijri[2],hijri[1]) != "" ) 	s += "occ " ;
	                if(d.getMonth()!=month) 												s += "dim " ;
                  //else if(d.getDate()==today.getDate())					s += "today " ;
                  else if(d.getDate()==day || d==today) 					s += "sel " ;
                  s+="' omo tabindex=1 d='"+d.toDateString()+"' onkeypress='swap(this);' onclick='swap(this);' >"+d.getDate()+"</q>";
                  d.setDate(d.getDate()+1);
                }
                else
                {
                    if (((new Date(year,month,day)).getDay()+1)%7==x) s += "dow " ; else s += "name " ; //(dow != x ? "name " : ckCurrentMonth(year,month) ) ;
                    s += "' title='" + daysNames[(x+loc.day.first)%7] + "'>" ;
                    s += (loc.day.dayofweek != null ? loc.day.dayofweek[(x+loc.day.first)%7] : loc.day.short[(x+loc.day.first)%7].substr(0,1) ) ;
                    s += "</q>";
                }
            }
            s+="<br>";
        }
        return s;
    };
////////////////////////////////////////////////////////////////////////////////    
    function ckCurrentMonth(year,month)
    { 
        var oDate = new Date(g_calendar_date);
        var sRetVal = " name";
        if (year == oDate.getFullYear() && month == oDate.getMonth() )   sRetVal = " dow";
        return sRetVal;
    }
////////////////////////////////////////////////////////////////////////////////
    function dayPos(d){
        var x=(d.getDay()-loc.day.first)%7,
            y=parseInt((d.getDate()+6+loc.day.first-d.getDay())/7);
        if(x<0)x+=7,y--;
        return {x:2+x*17,y:39+y*13}
    };
////////////////////////////////////////////////////////////////////////////////
    function monthPos(d){
        var x=d.getMonth()%4,
            y=parseInt(d.getMonth()/4);
        return {x:7+x*28,y:27+y*28}
    };
    o.tabIndex=1;
    return o;
}
////////////////////////////////////////////////////////////////////////////////
//
//
//
////////////////////////////////////////////////////////////////////////////////
function evalPrevNext(direction,o)
{
    var oDate = new Date(g_initDate);

//    if (BIDI == "rtl")
    {
        direction *= -1;
    }
      
    
    switch (gView)
    {
        case "month":
                o.divType = "changeMonth";
                oDate.setMonth(oDate.getMonth()+ direction);
                
                break;
        case "year":
                o.divType = "changeYear";
                oDate.setFullYear(oDate.getFullYear()+ direction);
                break;                
    }

    g_initDate = oDate.toDateString();

    if (event.button == 2)
    {
        if (direction == -1)
        {
            o.src = 'images/calendar/bprev.png';
        }
        else
        {
            o.src = 'images/calendar/bnext-hot.png';
        }
    }
    swap(o);
}
////////////////////////////////////////////////////////////////////////////////
//
//
//
////////////////////////////////////////////////////////////////////////////////
function swap(o)
{
    if (event)
    {
        if (event.button == 2)
        {
            return;
        }
    }
    renderUnDocked(o);
    g_filter = 1;
}
////////////////////////////////////////////////////////////////////////////////
//
//
//
////////////////////////////////////////////////////////////////////////////////
function setInitDate(o)
{
    g_filter = 0;
    oDate = new Date(g_initDate);
    oDOW  = new Date(o.d);
	
    if (oDate.getMonth() != oDOW.getMonth() | oDate.getFullYear() != oDOW.getFullYear() | gView == "year" )
    {  
        g_initDate = oDOW.toDateString();
        swap(o);
    }
}
////////////////////////////////////////////////////////////////////////////////
//
//
//
////////////////////////////////////////////////////////////////////////////////
function renderUnDocked(o)
{
    var sType = o.divType;
    var today = null;
    var isToday = null;
    var oDate = null;
    var viewMode = "";

    if (o.id == "btnPrevious" || o.id == "btnNext")
    {
         if (sType == "changeMonth")
         {
            viewMode = "MONTH_UNDOCKED";
         }
         else if (sType == "year")
         {
            viewMode = "tID";
         }
     }
     else
     {
         viewMode = o.id;
     }

//    g_mySettings.saveUnDocked(viewMode);

    switch (sType)
    {
        case "dow": 
								if ( (new Date(g_initDate)).getMonth() != (new Date(o.d)).getMonth() )  var isQuickenDataSave = true ;
                gView = "month";
                //if (! System.Gadget.docked) g_filter = 1;
                //divFilterBottomUndocked.filters[g_filter].enabled = true;
                //divFilterBottomUndocked.filters[g_filter].Apply(); 
                DAY_UNDOCKED.day.initDay(new Date(o.d));
                today=new Date(o.d);
                g_initDate = today.toDateString();
                isToday=today.toDateString()==new Date().toDateString();  

                if (isToday)
                {                                            
                    divBgImageUnDocked.style.backgroundImage = "url(images/calendar/calendar_single_bkg_orange.png)";
                    g_todayView = true;
                    setTimeout("showBackground(0);",300);
                }
                else
                {
                    divBgImageUnDocked.style.backgroundImage = "url(images/calendar/calendar_single_bkg.png)";
                    g_todayView = false;
                    setTimeout("showBackground(1);",300);
                }
                //divFilterBottomUndocked.filters[g_filter].Play(); 
                if (o.id == "curlUnDocked")
                {
                    swap(DAY_UNDOCKED);
                }
								MONTH_UNDOCKED.month.initMonth(new Date(g_initDate));
								if ( isQuickenDataSave )  quickenDataSave();
                break;
                    
        case "year":
                gView = "year";
                //divFilterTopUndocked.filters[g_filter].enabled = true;
                divPrevNext.className = "prevnext_unDocked";
                divPrevNext.style.visibility = "visible";                 
                //divFilterTopUndocked.filters[g_filter].Apply();
                YEAR_UNDOCKED.year.initYear(new Date(g_initDate));
                YEAR_UNDOCKED.style.visibility = "visible";
                MONTH_UNDOCKED.style.visibility = "hidden";
                //divFilterTopUndocked.filters[g_filter].Play();
                tID.divType="reset"; 
                break;
                
        case "zoomMonth":
                oDate = new Date(g_initDate);
                oDate.setMonth(o.m);
                g_initDate = oDate.toDateString();
                o.divType = 'day';
	              if (g_initDate!=(new Date()).toDateString())
                	divBgImageUnDocked.style.backgroundImage = "url(images/calendar/calendar_single_bkg.png)";
                else
									divBgImageUnDocked.style.backgroundImage = "url(images/calendar/calendar_single_bkg_orange.png)";
	             	DAY_UNDOCKED.day.initDay(new Date(g_initDate));
                swap(o);
								quickenDataSave();
                break;

        case "changeMonth": 
                o.divType = 'day';
                g_filter = 0;
	              if (g_initDate!=(new Date()).toDateString())
                	divBgImageUnDocked.style.backgroundImage = "url(images/calendar/calendar_single_bkg.png)";
                else
									divBgImageUnDocked.style.backgroundImage = "url(images/calendar/calendar_single_bkg_orange.png)";
	             	DAY_UNDOCKED.day.initDay(new Date(g_initDate));
                swap(o);
								quickenDataSave();
                break;
                
        case "changeYear": 
                o.divType = 'year';
                g_filter = 0;
                swap(o);
                break;   
                
        case "day":
                gView = "month";
                MONTH_UNDOCKED.month.initMonth(new Date(g_initDate));
                //divFilterTopUndocked.filters[g_filter].enabled = true;               
                //divFilterTopUndocked.filters[g_filter].Apply();
                YEAR_UNDOCKED.style.visibility = "hidden";
                MONTH_UNDOCKED.style.visibility = "visible";
                //divFilterTopUndocked.filters[g_filter].Play();
                showControls(true);
                tID.divType="year";
                break;
    }
}

////////////////////////////////////////////////////////////////////////////////
//
//
//
////////////////////////////////////////////////////////////////////////////////
function showBackground(skin)
{
    var bgFile =  "url(images/calendar/calendar_single.png)";
    
    switch (skin)
    {
        case 0 :

           
                bgFile = "url(images/calendar/calendar_double_orange.png)";
            
            break;
            
        case 1 :
            
            
                bgFile = "url(images/calendar/calendar_double.png)";
                   
            break;     
    }
    
    document.body.style.backgroundImage = bgFile;
}
////////////////////////////////////////////////////////////////////////////////
//
//
//
////////////////////////////////////////////////////////////////////////////////
function showControls(show)
{
    var showHide = "hidden";
    
    if (show)
    {
        showHide = "visible";
    }
    
    divPrevNext.style.visibility = showHide;
}
////////////////////////////////////////////////////////////////////////////////
//
//
//
////////////////////////////////////////////////////////////////////////////////
document.onmouseover=document.onmouseout=function(){
    var e=event.srcElement;
    if(e.omo!=null)
        e.className=event.type=="mouseout"?e.className.replace(/ hot/,""):e.className+" hot";
}
