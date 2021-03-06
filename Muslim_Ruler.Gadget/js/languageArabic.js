




function arabicTrans(inText)
{
var trans = [
/////////////////////////////////////////////////
	'Yes'										,	'نعم'
,	'No'										,	'لا'
/////////////////////////////////////////////////
,	'Lunar'									,	'خسوف قـمــر'
,	'Solar'									,	'كسوف شمس'
,	'Total'									,	'كـلــي'
,	'Partial'								,	'جزئي'
,	'Annular'								,	'حلقـة'
,	'Penumbral'							,	'ناقص'
,	'Not Visible'						,	'مستحيل'
,	'unknown eclipse type'	,	'مجهول'
,	'unknown eclipse visibility'	,	'الرؤية مجهـولة'
/////////////////////////////////////////////////
,	'Andromeda'							,	'المرأة المسلسلة'
,	'Antlia'								,	'مفرغة الهواء'
,	'Apus'									,	'طائر الفردوس'
,	'Aquarius'							,	'الدلو'
,	'Aquila'								,	'العقاب'
,	'Ara'										,	'المجمرة'
,	'Aries'									,	'الحمل'
,	'Auriga'								,	'ممسك الأعنة'
,	'Bootes'								,	'العواء'
,	'Caelum'								,	'آلة النقاش'
,	'Camelopardalis'				,	'الزرافة'
,	'Cancer'								,	'السرطان'
,	'Canes Venatici'				,	'السلوقيان'
,	'Canis Major'						,	'الكلب الأكبر'
,	'Canis Minor'						,	'الكلب الأصغر'
,	'Capricorn'							,	'الجدي'
,	'Carina'								,	'القاعدة'
,	'Cassiopeia'						,	'ذات الكرسي'
,	'Centaurus'							,	'قنطورس'
,	'Cepheus'								,	'الملتهب'
,	'Cetus'									,	'قيطس'
,	'Chamaeleon'						,	'الحرباء'
,	'Circinus'							,	'البيكار'
,	'Columba'								,	'الحمامة'
,	'Coma Berenices'				,	'الهلبة'
,	'Corona Australis'			,	'الإكليل الجنوبي'
,	'Corona Borealis'				,	'الإكليل الشمالي'
,	'Corvus'								,	'الغراب'
,	'Crater'								,	'الباطية'
,	'Crux'									,	'الصليب الجنوبي'
,	'Cygnus'								,	'الدجاجة'
,	'Delphinus'							,	'الدلفين'
,	'Dorado'								,	'أبو سيف'
,	'Draco'									,	'التنين'
,	'Equuleus'							,	'قطعة الفرس'
,	'Eridanus'							,	'النهر'
,	'Fornax'								,	'الكور'
,	'Gemini'								,	'التوأمان'
,	'Grus'									,	'الكركي'
,	'Hercules'							,	'الجاثي'
,	'Horologium'						,	'الساعة'
,	'Hydra'									,	'الشجاع'
,	'Hydrus'								,	'حية الماء'
,	'Indus'									,	'الهندي'
,	'Lacerta'								,	'العظاءة'
,	'Leo'										,	'الأسد'
,	'Leo Minor'							,	'الأسد الأصغر'
,	'Lepus'									,	'الأرنب'
,	'Libra'									,	'الميزان'
,	'Lupus'									,	'السبع'
,	'Lynx'									,	'الوشق'
,	'Lyra'									,	'القيثارة'
,	'Mensa'									,	'الجبل'
,	'Microscopium'					,	'المجهر'
,	'Monoceros'							,	'وحيد القرن' 
,	'Musca'									,	'الذبابة'
,	'Norma'									,	'مربع النجار'
,	'Octans'								,	'الثمن'
,	'Ophiuchus'							,	'الحواء'
,	'Orion'									,	'الجبار'
,	'Pavo'									,	'الطاووس'
,	'Pegasus'								,	'الفرس الأعظم'
,	'Perseus'								,	'حامل رأس الغول'
,	'Phoenix'								,	'العنقاء'
,	'Pictor'								,	'آلة الرسام'
,	'Pisces'								,	'الحوت'
,	'Piscis Austrinus'			,	'الحوت الجنوبي'
,	'Puppis'								,	'الكوثل'
,	'Pyxis'									,	'بيت الإبرة'
,	'Reticulum'							,	'الشبكة'
,	'Sagitta'								,	'السهم '
,	'Sagittarius'						,	'الرامي'
,	'Scorpius'							,	'العقرب'
,	'Scorpio'								,	'العقرب'
,	'Sculptor'							,	'معمل النحات'
,	'Scutum'								,	'الترس'
,	'Serpens'								,	'الحية'
,	'Sextans'								,	'السدس'
,	'Taurus'								,	'الثور'
,	'Telescopium'						,	'المرقب'
,	'Triangulum'						,	'المثلث'
,	'Triangulum Australe'		,	'المثلث الجنوبي'
,	'Tucana'								,	'الطوقان'
,	'Ursa Major'						,	'الدب الأكبر'
,	'Ursa Minor'						,	'الدب الأصغر'
,	'Vela'									,	'الشراع'
,	'Virgo'									,	'العذراء'
,	'Volans'								,	'السمكة الطائرة'
,	'Vulpecula'							,	'الثعلب'
,	'Unknown Constellation'	, 'غير معروف'
/////////////////////////////////////////////////
,	'New Moon' 							,	'محاق'
,	'Full Moon' 						,	'بدر كامل'
,	'Waning Gibbous' 				,	'أحدب متناقص'
,	'Last Quarter' 					, 'تربيع أخير'
,	'Waning Crescent' 			, 'هلال متناقص'
,	'Waxing Crescent' 			, 'هلال متزايد'
,	'First Quarter' 				, 'تربيع أول'
,	'Waxing Gibbous' 				, 'أحدب متزايد'
,	'Unknown Phase'					,	'غير معروف'
/////////////////////////////////////////////////
,	'Unknown'	 							, 'غير معروفة'
,	'Uncertain'	 						, 'غير أكيد'
,	'Not Exist' 						,	'غير موجود'
,	'Impossible' 						,	'موجود ولا يرى'
,	'Powered Eyes' 					,	'العين المسلحة'
,	'Sharp Eyes' 						, 'العين الحادة'
,	'Normal Eyes'	 					, 'العين المجردة'
/////////////////////////////////////////////////
,	'Birth' 								, 'بمجرد الولادة'
,	'Exist' 								, 'بمجرد الوجود'
,	'Math' 									, 'حسابات فلكية'
,	'Manual'								,	'تحديد يدوي'
] ;
	var outText=inText;
	var size=Math.floor(trans.length/2) ;
	for (var i=0; i<size; i++) if (inText==trans[2*i]) var outText=trans[2*i+1];
	return outText ;
}





