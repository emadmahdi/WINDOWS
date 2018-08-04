




function hijriOccasion(hijriDay, hijriMonth)
{
var hijirOccasions = [
01 + " " + "محرم"	, "رفع النبي إدريس (ع) إلى السماء على رواية"	,
02 + " " + "محرم"	,	"وصول سيد الشهداء الإمام الحسين (ع) إلى كربلاء سنة 61 هـ"		,
03 + " " + "محرم"	,	" وصول عمر بن سعد بن أبي وقاص مع 4 آلاف من الجيش الأموي إلى أرض كربلاء لقتل الإمام الحسين(ع) 61هـ"	,	//خلاص النبي يوسف ع من الجب الذي ألقاه فيه إخوته
05 + " " + "محرم"	,	"عبور النبي موسى(ع)البحر وغرق فرعون وجنوده"	,
07 + " " + "محرم"	,	"منع الماء عن الحسين (ع) وأهله وصحبه في كربلاء + كلم الله تعالى موسى (ع) على جبل سيناء"	,
10 + " " + "محرم"	,	"استشهاد الإمام الحسين وأهل بيته وصحبه (ع) 61 هـ ومرقدهم في العراق-كربلاء"	,
11 + " " + "محرم"	,	"سبي العترة الطاهرة (أهل البيت) إلى الكوفة بعد واقعة الطف في كربلاء 61 هـ"	,
12 + " " + "محرم"	,	"وصول سبايا العترة الطاهرة (أهل البيت) إلى الكوفة بعد واقعة الطف في كربلاء 61 هـ"	,
13 + " " + "محرم"	,	"دفن شهداء الطف (الحسين وأهل بيته عليهم السلام) على يد الإمام زين العابدين (ع) بمساعدة عشيرة بني أسد 61هـ"	,
16 + " " + "محرم"	,	"تحويل القبلة من المسجد الأقصى في القدس إلى الكعبة المشرفة في مكة المكرمة 2هـ"	,
17 + " " + "محرم"	,	"قدوم أصحاب الفيل (جيش إبرهه الحبشي) إلى مكة و هلاكهم"	,
19 + " " + "محرم"	,	"حركة قافلة السبايا من أهل البيت (ع) من الكوفة إلى الشام 61هـ"	,
23 + " " + "محرم"	,	"تفجير مرقد الإمامين العسكريين (ع) 1427هـ"	,
25 + " " + "محرم"	,	"شهادة الإمام زين العابدين (ع) 95هـ سمه مروان بن الحكم ومرقده في المدينة-البقيع"	,
01 + " " + "صفر"	,	"دخول رأس الإمام الحسين (ع) وقافلة السبايا والرؤوس إلى الشام 61هـ + واقعة صفين 37هـ"	,
03 + " " + "صفر"	,	"مولد الإمام محمد بن علي الباقر (ع) على رواية + شهادة زيد بن علي زين العابدين بن الحسين (ع)"	,
05 + " " + "صفر"	,	"شهادة رقية بنت الإمام الحسين (ع) 61هـ في سوريا-دمشق حيث مرقدها الشريف"	,
07 + " " + "صفر"	,	"شهادة الإمام الحسن المجتبى (ع) 50هـ  مسموم بتوجيه من معاوية + ميلاد الإمام الكاظم (ع) 128هـ"	,
08 + " " + "صفر"	,	"وفاة سلمان المحمدي (الفارسي) عام 35هـ على رواية"	,
09 + " " + "صفر"	,	"شهادة الصحابي عمار بن ياسر في صفين عن 93سنة"	,
13 + " " + "صفر"	,	"وفاة سلمان المحمدي (الفارسي) عام 35هـ على رواية"	,
14 + " " + "صفر"	,	"شهادة محمد بن أبي بكر والي أمير المؤمنين (عليه السلام) على مصر 37هـ"	,
17 + " " + "صفر"	,	"شهادة الإمام الرضا (عليه السلام) 203هـ"	,
20 + " " + "صفر"	,	"أربعين الإمام الحسين (ع) + ورود السبايا لكربلاء في طريقهم للمدينة 61هـ"	,
25 + " " + "صفر"	,	"وفاة السيدة مريم بنت عمران والدة السيد المسيح (ع)"	,
26 + " " + "صفر"	,	"شهادة أولاد مسلم بن عقيل (ع)"	,
27 + " " + "صفر"	,	"وفاة النبي يحيى (عليه السلام)"	,
28 + " " + "صفر"	,	"ذكرى شهادة رسول الله (صلى الله عليه و آله و سلم) سنة 11هـ"	,
29 + " " + "صفر"	,	"شهادة الإمام علي بن موسى الرضا (ع) في آخر صفر سنة 203هـ على رواية"	,
01 + " " + "ربيع الأول"	,	"الهجوم على دار فاطمة (ع) + هجرة النبي (ص) ليثرب ومبيت الإمام علي (ع) على فراشه عام 13 من البعثة"	,//هجرة النبي (ص)ليثرب و مبيت الإمام علي (ع)على فراشه عام 13 من البعثة + غزوة دومة الجندل سنة 5 هـ
03 + " " + "ربيع الأول"	,	"خروج النبي (ص) من غار ثور إلى يثرب (المدينة المنورة) ليلة 4 ربيع الأول متخفيًا"	,
05 + " " + "ربيع الأول"	,	"استشهاد السيدة سكينة بنت الحسين (عليهما السلام) سنة 117هـ"	,
08 + " " + "ربيع الأول"	,	"وفاة الإمام الحسن العسكري (ع) وبداية إمامة بقية الله الأعظم الحجة بن الحسن أرواحنا فداه سنة 260هـ"	,
09 + " " + "ربيع الأول"	,	"يوم تقليد صاحب العصر المهدي عليه السلام الإمامة 260هـ"	,
10 + " " + "ربيع الأول"	,	"زواج الرسول (ص) من خديجة الكبرى + وفاة عبد المطلب في السنة الثامنة من ولادته (ص)"	,
12 + " " + "ربيع الأول"	,	"دخول النبي (ص) يثرب مهاجراً عام 13 من البعثة"	,
15 + " " + "ربيع الأول"	,	"بناء مسجد قباء (أول مسجد في الإسلام) "	,
17 + " " + "ربيع الأول"	,	"ميلاد النبي (ص) (عام الفيل 53 قبل الهجرة) + ميلاد الإمام الصادق (ع) سنة  83هـ"	,
18 + " " + "ربيع الأول"	,	"بناء المسجد النبوي في المدينة المنورة"	,
22 + " " + "ربيع الأول"	,	"غزوة بني النضير وإخراج اليهود من المدينة سنة 3هـ"	,
26 + " " + "ربيع الأول"	,	"إبرام معاهدة الصلح بين الإمام الحسن المجتبى (ع) ومعاوية بن أبي سفيان سنة 41هـ"	,
03 + " " + "ربيع الثاني"	,	"رمي الحجّاج الكعبة بالنار في حصار بن الزبير واحتراقها "	,
////////////////////////////////////////////////////////////////////////////////////////		
04 + " " + "ربيع الثاني"	,	"شهادة الصديقة الكبرى فاطمة الزهراء (ع) (على رواية 40 يوم)"	,
08 + " " + "ربيع الثاني"	,	"ذكرى مولد الإمام الحسن العسكري (ع) 232هـ "	,
10 + " " + "ربيع الثاني"	,	"وفاة فاطمة المعصومة بنت الكاظم (ع) 201هـ + قصف الروس لمرقد الإمام الرضا (ع) 1330هـ "	,
13 + " " + "ربيع الثاني"	,	"شهادة الصديقة الكبرى فاطمة الزهراء (ع) (على رواية 45 يوم)"	,
14 + " " + "ربيع الثاني"	,	"ثورة المختار الثقفي 66هـ"	,
22 + " " + "ربيع الثاني"	,	"بناء المسجد الأقصى المبارك "	,
05 + " " + "جمادى الأولى"	,	"مولد السيدة زينب بنت أمير المؤمنين (ع) 5هـ"	,
09 + " " + "جمادى الأولى"	,	"هدم مسجد رد الشمس للإمام علي (ع) 1422هـ"	,
10 + " " + "جمادى الأولى"	,	"واقعة الجمل 36هـ (على رواية)"	,
13 + " " + "جمادى الأولى"	,	"استشهاد الصديقة الزهراء (ع) 11هـ (على رواية 75 يوم)"	,
21 + " " + "جمادى الأولى"	,	"إحراق المسجد الأقصى بيد اليهود"	,
03 + " " + "جمادى الآخرة"	,	"استشهاد الصديقة الزهراء (ع) 11هـ (على رواية 95 يوم)"	,
10 + " " + "جمادى الآخرة"	,	"واقعة مؤتة و شهادة جعفر بن أبي طالب (الطيار) 8هـ"	,
13 + " " + "جمادى الآخرة"	,	"وفاة أم البنين فاطمة بنت حزام زوجة أمير المؤمنين (والدة العباس) سنة 94هـ أو 64هـ"	,
20 + " " + "جمادى الآخرة"	,	"ذكرى مولد الصديقة الطاهرة فاطمة الزهراء (ع) بضعة النبي (ص) سنة 8 قبل الهجرة"	,
29 + " " + "جمادى الآخرة"	,	"نزول آية التطهير بحق أهل البيت (ع)"	,
01 + " " + "رجب"	,	"ذكرى مولد الإمام محمد الباقر (عليه السلام) 57هـ"	,
02 + " " + "رجب"	,	"ذكرى مولد الإمام علي الهادي (ع) 212هـ أو 232هـ"	,
03 + " " + "رجب"	,	"ذكرى شهادة الإمام علي بن محمد الهادي (ع) 254هـ"	,
10 + " " + "رجب"	,	"ذكرى مولد الإمام محمد بن علي الجواد (ع) 195هـ"	,
12 + " " + "رجب"	,	"وفاة العباس عم الرسول الله (ص) + قدوم أمير المؤمنين للكوفة واتخذها مقراً لخلافته 36هـ"	,
13 + " " + "رجب"	,	"ذكرى ميلاد أمير المؤمنين الإمام علي بن أبي طالب (ع) يوم الجمعة 30 عام بعد عام الفيل"	,
15 + " " + "رجب"	,	"وفاة العقيلة الحوراء زينب (ع) 62هـ"	,
20 + " " + "رجب"	,	"ولادة السيدة سكينة بنت الإمام الحسين (ع) 47هـ"	,
24 + " " + "رجب"	,	"فتح حصون خيبر بيد أمير المؤمنين (ع) 7هـ وعودة جعفر الطيار من الحبشه"	,
25 + " " + "رجب"	,	"شهادة الإمام موسى الكاظم (ع) 183هـ مسموماً في السجن يوم الجمعة"	,
26 + " " + "رجب"	,	"وفاة أبو طالب عم رسول الله وكافله 3 قبل الهجرة (على رواية)"	,
27 + " " + "رجب"	,	"بعثة النبي الأكرم (ص) 13 قبل الهجرة  الإسراء و المعراج"	,
28 + " " + "رجب"	,	"حركة الإمام الحسين من المدينة إلى مكة المكرمة 60هـ"	,
29 + " " + "رجب"	,	"غزوة تبوك 9هـ"	,
03 + " " + "شعبان"	,	"ذكرى مولد سبط النبي الأكرم (ص) الإمام الحسين (ع) 3هـ"	,
04 + " " + "شعبان"	,	"مولد العباس بن أمير المؤمنين (ع) 26هـ"	,
05 + " " + "شعبان"	,	"مولد الإمام علي بن الحسين (ع) السجاد 38هـ"	,
08 + " " + "شعبان"	,	"بداية الغيبة الصغرى للإمام المهدي (عج)"	,
11 + " " + "شعبان"	,	"مولد علي الأكبر بن الإمام الحسين (ع) 33هـ"	,
14 + " " + "شعبان"	,	"مولد القاسم بن الحسن (ع)"	,
15 + " " + "شعبان"	,	"ذكرى ولادة الحجة بن الحسن العسكري بقية الله الأعظم سلام الله عليه وعلى آبائه 255هـ"	,
02 + " " + "رمضان"	,	"تولي الإمام الرضا (ع) ولاية عهد المأمون العباسي عام 201هـ"	,
03 + " " + "رمضان"	,	"نزول المصحف على إبراهيم (ع)"	,
///////////////////////////////////////////////////////////////////
06 + " " + "رمضان"	,	"تولي الإمام الرضا (ع) ولاية عهد المأمون العباسي عام 201هـ"	,
07 + " " + "رمضان"	,	"وفاة أبو طالب (ع) عم الرسول وكافله (10 بعد البعثة)"	,
08 + " " + "رمضان"	,	"ولادة النبي يحيى بن زكريا (ع) + نزول الإنجيل على النبي عيسى (ع)"	,
10 + " " + "رمضان"	,	"وفاة أم المؤمنين خديجة بنت خويلد (ع) عام الحزن (10 بعد البعثة و 3 ق.هـ)"	,
12 + " " + "رمضان"	,	"المؤاخاة يبن المهاجرين والأنصار في المدينة و قد آخى الرسول (ص) بينه وبين علي (ع)"	,
15 + " " + "رمضان"	,	"ولادة الإمام الحسن المجتبى (ع) 2هـ + خروج مسلم بن عقيل رسولاً عن الحسين (ع) لأهل الكوفة 60هـ "	,
17 + " " + "رمضان"	,	"غزوة بدر الكبرى 2هـ"	,
18 + " " + "رمضان"	,	"نزول الزبور على داوود (ع) + بعد غروب هذا اليوم تبدأ أعمال ليالي القدر المباركة_الليلة الأولى"	,
19 + " " + "رمضان"	,	"جرح أمير المؤمنين (ع) بسيف عبد الرحمن بن ملجم المرادي الخارجي"	,
20 + " " + "رمضان"	,	"فتح مكة 8هـ + بعد غروب هذا اليوم تبدأ أعمال ليالي القدر المباركة_الليلة الثانية"	,
21 + " " + "رمضان"	,	"استشهاد أمير المؤمنين علي (ع) متأثراً بجرحه 40هـ"	,
22 + " " + "رمضان"	,	"ليلة نزول القرآن + بعد غروب هذا اليوم تبدأ أعمال ليالي القدر المباركة_الليلة الثالثة الكبرى"	,
24 + " " + "رمضان"	,	"فتح مكة 8 هـ على رواية"	,
30 + " " + "رمضان"	,	"مولد السيد المسيح عليه السلام عند الشرقيين التقويم اليوناني (الشرقي)"	,
03 + " " + "شوال"	,	"غزوة الخندق عام 5 هجري ومقتل عمرو بن ود العامري بيد الإمام علي (ع) "	,
04 + " " + "شوال"	,	"بداية الغيبة الكبرى للإمام المهدي (ع) بوفاة علي بن محمد السمري النائب الرابع للإمام عام 329 هجري"	,
05 + " " + "شوال"	,	"وصول مسلم بن عقيل رسولاً للإمام الحسين (ع) إلى الكوفة عام 60هـ"	,
06 + " " + "شوال"	,	"يوم حنين عام 8 هجري"	,
08 + " " + "شوال"	,	"هدم أضرحة البقيع الغرقد 1344هـ"	,
15 + " " + "شوال"	,	"معركة أحد وشهادة الحمزة عم النبي (ص) عام 3هـ + رد الشمس لعلي (ع) بمسجد الفضيخ بالمدينة"	,
25 + " " + "شوال"	,	"استشهاد الإمام جعفر بن محمد الصادق (عليه السلام) سنة 148هـ"	,
29 + " " + "شوال"	,	"ذكرى وفاة سيدنا إبراهيم بن رسول الله (ص) 10هـ آخر شوال"	,
01 + " " + "ذو القعدة"	,	"صلح الحديبية عام 6هـ + ذكرى ولادة فاطمة المعصومة بنت الإمام الكاظم (ع) عام 173هـ"	,
05 + " " + "ذو القعدة"	,	"رفع القواعد من البيت الحرام على يد إبراهيم وولده إسماعيل عليهما السلام"	,
07 + " " + "ذو القعدة"	,	"فلق البحر لنبي الله موسى (ع) على رواية"	,
08 + " " + "ذو القعدة"	,	"فرض الحج عام 8هـ "	,
11 + " " + "ذو القعدة"	,	"ذكرى مولد الإمام الرضا (ع) 148هـ"	,
22 + " " + "ذو القعدة"	,	"ميلاد النبي عيسى (ع)"	,
23 + " " + "ذو القعدة"	,	"شـهـادة الإمام الرضا (ع) على رواية + غزوة بني قريضة عام 5هـ "	,
25 + " " + "ذو القعدة"	,	"يوم دحو الأرض (انبساط الأرض من تحت الكعبة على الماء) (يستحب الصيام)"	,
25 + " " + "ذو القعدة"	,	"ولادة النبي إبراهيم + خروج الإمام الرضا من المدينة إلى خراسان + خروج النبي (ص) من المدينة لأداء حجة الوداع"	,
29 + " " + "ذو القعدة"	,	"ذكرى شهادة الإمام محمد الجواد (ع) 220هـ آخر ذو القعدة"	,
01 + " " + "ذو الحجة"	,	"زواج الإمام علي (ع) من فاطمة الزهراء (ع) عام 2هـ "	,
03 + " " + "ذو الحجة"	,	"وصول النبي (ص) مكة لحجة الوداع 10هـ + أخذ علي (ع) سورة براءة لتبليغها في الحج 9هـ"	,
07 + " " + "ذو الحجة"	,	"ذكرى شهادة الإمام محمد بن علي الباقر (ع) سنة 114هـ"	,
08 + " " + "ذو الحجة"	,	"يوم التروية + خروج الإمام الحسين (ع) من مكة إلى العراق + ظهور مسلم بن عقيل في الكوفة داعياً للإمام الحسين (ع)"	,
09 + " " + "ذو الحجة"	,	"أمر الرسول (ص) بغلق الأبواب على المسجد إلا باب علي (ع) + يوم عرفه + شهادة مسلم وهاني بن عروة سنة 60هـ"	,
10 + " " + "ذو الحجة"	,	"بلغ الإمام علي (ع) المشركين سورة براءة (سنة 9هـ) + عيد الأضحى المبارك "	,
11 + " " + "ذو الحجة"	,	"أول أيام التشريق + ثاني أيام العيد"	,
12 + " " + "ذو الحجة"	,	"ثاني أيام التشريق + ثالث أيام العيد"	,
13 + " " + "ذو الحجة"	,	"آخر أيام العيد + في مثل هذه الليلة حدثت معجزة شق الـقمر (اقتربت الساعة وانشق القمر ....) "	,
14 + " " + "ذو الحجة"	,	"انتهاك القرامطة حرمة مكة المكرمة والبيت الحرام عام 317هـ و نهب الحجر الأسود لمدة 20 سنة"	,
15 + " " + "ذو الحجة"	,	"ميلاد الإمام علي بن محمد الهادي (ع) 212هـ على رواية"	,
18 + " " + "ذو الحجة"	,	"عيد الغدير الأغر (10هـ)"	,
23 + " " + "ذو الحجة"	,	"استشهاد ميثم التمار صاحب أمير المؤمنين (ع) سنة 60هـ"	,
24 + " " + "ذو الحجة"	,	"خروج رسول الله (ص) بأهل بيته لمباهلة نصارى نجران سنة 10هـ + تصدق أمير المؤمنين (ع) بالخاتم"	,
25 + " " + "ذو الحجة"	,	"نزول الآيات الثمان عشر من سورة الدهر في فضل أهل البيت (ع) + البيعة لأمير المؤمنين (ع) بالخلافة سنة 35هـ"
] ;

	var hijriOccasionsMonthNames = new Array( '', 'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
	'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة' );

	var hijriDate = Number(hijriDay) + " " + hijriOccasionsMonthNames[hijriMonth] ;
	var todayOccasion="";
	var size=Math.floor(hijirOccasions.length/2) ;
	for (var i=0; i<size; i++)
		if (hijriDate==hijirOccasions[2*i+0])
		{
			var todayOccasion=hijirOccasions[2*i+1];
			i = size;
		}
	return todayOccasion;
}






