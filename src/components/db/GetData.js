const items = [
  {
    name: 'أذكار المساء',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },
  {
    name: 'أذكار الصباح',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      {  name: 'أذكار الصباح', repTime: 'مرة واحدة', count: 1, subItemName: '﴿اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْـــــــــــدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ﴾.', subItemDescription: 'سورة البقرة ، آية 255 '  },
      {  name: 'أذكار الصباح', repTime: 'مرة واحدة', count: 1, subItemName: '', subItemDescription: ''  },
      {  name: 'أذكار الصباح', repTime: 'مرة واحدة', count: 1, subItemName: '', subItemDescription: ''  },
      {  name: 'أذكار الصباح', repTime: 'مرة واحدة', count: 1, subItemName: '', subItemDescription: ''  },
      {  name: 'أذكار الصباح', repTime: 'مرة واحدة', count: 1, subItemName: '', subItemDescription: ''  },
      {  name: 'أذكار الصباح', repTime: 'مرة واحدة', count: 1, subItemName: '', subItemDescription: ''  },
      {  name: 'أذكار الصباح', repTime: 'مرة واحدة', count: 1, subItemName: '', subItemDescription: ''  },
      {  name: 'أذكار الصباح', repTime: 'مرة واحدة', count: 1, subItemName: '', subItemDescription: ''  },
      {  name: 'أذكار الصباح', repTime: 'مرة واحدة', count: 1, subItemName: '', subItemDescription: ''  },
      {  name: 'أذكار الصباح', repTime: 'مرة واحدة', count: 1, subItemName: '', subItemDescription: ''  },
      {  name: 'أذكار الصباح', repTime: 'مرة واحدة', count: 1, subItemName: '', subItemDescription: ''  },
      
      // Add more sub-items as needed
    ],
  },
  {
    name: ' أذكار بعد الصلاة',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },
  {
    name: 'أذكار النوم',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      {
        name: 'أذكار النوم', repTime: 'ثلاث مرات', count: 3, subItemName: 'يَجْمَعُ كَفَّيْهِ ثُمَّ يَنْفُثُ فِيهِمَا فَيَقْرَأُ فِيهِمَا:\n\nبسم الله الرحمن الرحيم\n ﴿قُلْ هُوَ اللَّهُ أَحَدٌ * اللَّهُ الصَّمَدُ* لَمْ يَلِدْ وَلَمْ يُولَدْ* وَلَمْ يَكُن لَّهُ كُفُواً أَحَدٌ﴾.\n\n بسم الله الرحمن الرحيم\n ﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ* مِن شَرِّ مَا خَلَقَ* وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ* وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ* وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ﴾. \n\nبسم الله الرحمن الرحيم \n﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ* مَلِكِ النَّاسِ* إِلَهِ النَّاسِ* مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ* الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ* مِنَ الْجِنَّةِ وَ النَّاسِ﴾ \n\n\nثُمَّ يَمْسَحُ بِهِمَا مَا اسْتَطَاعَ مِنْ جَسَدِهِ يَبْدَأُ بِهِمَا عَلَى رَأْسِهِ وَوَجْهِهِ وَمَا أَقبَلَ مِنْ جَسَدِهِ'
        , subItemDescription: ' البخاري مع الفتح 9/62ومسلم 4/1723'
      },
      {
        name: 'أذكار النوم', repTime: 'مرة واحدة', count: 1, subItemName: '﴿اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْـــــــــــدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ﴾.'
        , subItemDescription: 'من قرأها إذا أوى إلى فراشه فإنه لن يزال عليه من الله حافظ ولا يقربه شيطان حتى يصبح البخاري مع الفتح 4/487'
      },
      {
        name: 'أذكار النوم', repTime: 'مرة واحدة', count: 1, subItemName: '﴿آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللَّهِ وَمَلآئِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لاَ نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ وَقَالُواْ سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ* لاَ يُكَلِّفُ اللَّهُ نَفْساً إِلاَّ وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لاَ تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلاَ تَحْمِلْ عَلَيْنَا إِصْراً كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا رَبَّنَا وَلاَ تُحَمِّلْنَا مَا لاَ طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَآ أَنتَ مَوْلاَنَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ﴾.'
        , subItemDescription: ' من قرأها في ليلة كفتاه، البخاري مع الفتح 9/ 94 ومسلم 1/ 554 ، والآيتان من سورة البقرة 285-286'
      },
      {
        name: 'أذكار النوم', repTime: 'مرة واحدة', count: 1, subItemName: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِن أَمْسَكْتَ نَفْسِي فارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا، بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ'
        , subItemDescription: ' البخاري 11/ 126 .ومسلم 4/ 2084'
      },
      {
        name: 'أذكار النوم', repTime: 'مرة واحدة', count: 1, subItemName: 'اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْياهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا، وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا. اللَّهُمَّ إِنِّي أَسْأَلُكَ العَافِيَةَ'
        , subItemDescription: ' رواه مسلم4/ 2083وأحمد بلفظه 2/79'
      },
      {
        name: 'أذكار النوم', repTime: 'ثلاث مرات', count: 3, subItemName: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ'
        , subItemDescription: ' أبو داود بلفظه 4/311 وانظر صحيح الترمذي3/ 143'
      },
      {
        name: 'أذكار النوم', repTime: 'مرة واحدة', count: 1, subItemName: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا'
        , subItemDescription: 'البخاري مع الفتح 11/113 ومسلم 4/ 2083'
      },
      {
        name: 'أذكار النوم', repTime: '33 مرة', count: 33, subItemName: 'سُبْحَانَ اللَّهِ '
        , subItemDescription: ' من قال ذلك عندما يأوي إلى فراشه كان خيراً له من خادم البخاري مع الفتح 7/71 ومسلم 4/ 2091'
      },
      {
        name: 'أذكار النوم', repTime: '33 مرة', count: 33, subItemName: 'وَالْحَمْدُ لِلَّهِ '
        , subItemDescription: ' من قال ذلك عندما يأوي إلى فراشه كان خيراً له من خادم البخاري مع الفتح 7/71 ومسلم 4/ 2091'
      },
      {
        name: 'أذكار النوم', repTime: '34 مرة', count: 34, subItemName: ' وَاللَّهُ أَكْبَرُ'
        , subItemDescription: ' من قال ذلك عندما يأوي إلى فراشه كان خيراً له من خادم البخاري مع الفتح 7/71 ومسلم 4/ 2091'
      },
      {
        name: 'أذكار النوم', repTime: 'مرة واحدة', count: 1, subItemName: 'اللَّهُمَّ رَبَّ السَّمَوَاتِ السَّبْعِ وَرَبَّ الأَرْضِ، وَرَبَّ الْعَرْشِ الْعَظِيمِ، رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ، فَالِقَ الْحَبِّ وَالنَّوَى، وَمُنْزِلَ التَّوْرَاةِ وَالْإِنْجِيلِ، وَالْفُرْقَانِ، أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتِهِ. اللَّهُمَّ أَنْتَ الأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ، وَأَنْتَ الآخِرُ فَلَيسَ بَعْدَكَ شَيْءٌ، وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ، وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ، اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ'
        , subItemDescription: 'مسلم 4/ 2084'
      },
      {
        name: 'أذكار النوم', repTime: 'مرة واحدة', count: 1, subItemName: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا، فَكَمْ مِمَّنْ لاَ كَافِيَ لَهُ وَلاَ مُؤْوِيَ'
        , subItemDescription: ' مسلم 4/ 2085'
      },
      {
        name: 'أذكار النوم', repTime: 'مرة واحدة', count: 1, subItemName: 'اللَّهُمَّ عَالِمَ الغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءاً، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ'
        , subItemDescription: ' أبو داود 4/ 317 وانظر صحيح سنن الترمذي3/ 142'
      },
      {
        name: 'أذكار النوم', repTime: 'مرة واحدة', count: 1, subItemName: 'يَقْرَأُ ﴿الم﴾ تَنْزِيلَ السَّجْدَة ِ، وَتَبَارَكَ الَّذي بِيَدِهِ الْمُلْكُ'
        , subItemDescription: ' الترمذي والنسائي وانظر صحيح الجامع4/ 255'
      },
      {
        name: 'أذكار النوم', repTime: 'مرة واحدة', count: 1, subItemName: 'اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لاَ مَلْجَأَ وَلاَ مَنْجَا مِنْكَ إِلاَّ إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ'
        , subItemDescription: ' قال صلى الله عليه وسلم لمن قال ذلك : "فإن متَّ،متَّ على الفطرة " البخاري مع الفتح 11/113 ومسلم 4/ 2081'
      },
      // Add more sub-items as needed
    ],
  },
  {
    name: 'أذكار الاستيقاظ من النوم',
    subItems: [
      { name: 'أذكار الاستيقاظ من النوم', repTime: 'مرة واحدة', count: 1, subItemName: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.', subItemDescription: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.' },
      { name: 'أذكار الاستيقاظ من النوم', repTime: 'مرة واحدة', count: 1, subItemName: 'لا إلَهَ إلاَّ الله وحْدَهُ لا شَرِيكَ لَهُ، لَهُ المُلْكُ ولَهُ الحَمْدُ وهُوَ على كلِّ شيءٍ قَدير،سُبْحانَ الله والحَمْدُ لله ولا إله إلا الله والله أكبر ولا حَولَ ولا قُوةَ إلا بالله العلي العظيم. رب اغفر لي.', subItemDescription: 'رواه البخاري مع الفتح 3/ 144 وغيرها واللفظ لابن ماجه انظر صحيح ابن ماجه 2/ 335 .' },
      { name: 'أذكار الاستيقاظ من النوم', repTime: 'مرة واحدة', count: 1, subItemName: 'الحَمْدُ لله الذِي عَافَانِي في جَسَدِي ورَدَّ عَلَيَّ رُوحِي، وأَذِنَ لي بِذِكْرهِ.', subItemDescription: 'الترمذي 5/ 473 وانظر صحيح الترمذي3/144' },
      { name: 'أذكار الاستيقاظ من النوم', repTime: 'مرة واحدة', count: 1, subItemName: 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالأَرْضِ وَاخْتِلاَفِ اللَّيْلِ وَالنَّهَارِ لآيَاتٍ لِّأُوْلِي الألْبَابِ *الَّذِينَ يَذْكُرُونَ اللّهَ قِيَاماً وَقُعُوداً وَعَلَىَ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالأَرْضِ رَبَّنَا مَا خَلَقْتَ هَذا بَاطِلاً سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ*رَبَّنَا إِنَّكَ مَن تُدْخِلِ النَّارَ فَقَدْ أَخْزَيْتَهُ وَمَا لِلظَّالِمِينَ مِنْ أَنصَارٍ *رَّبَّنَا إِنَّنَا سَمِعْنَا مُنَادِياً يُنَادِي لِلإِيمَانِ أَنْ آمِنُواْ بِرَبِّكُمْ فَآمَنَّا رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الأبْرَارِ * رَبَّنَا وَآتِنَا مَا وَعَدتَّنَا عَلَى رُسُلِكَ وَلاَ تُخْزِنَا يَوْمَ الْقِيَامَةِ إِنَّكَ لاَ تُخْلِفُ الْمِيعَادَ *فَاسْتَجَابَ لَهُمْ رَبُّهُمْ أَنِّي لاَ أُضِيعُ عَمَلَ عَامِلٍ مِّنكُم مِّن ذَكَرٍ أَوْ أُنثَى بَعْضُكُم مِّن بَعْضٍ فَالَّذِينَ هَاجَرُواْ وَأُخْرِجُواْ مِن دِيَارِهِمْ وَأُوذُواْ فِي سَبِيلِي وَقَاتَلُواْ وَقُتِلُواْ لأُكَفِّرَنَّ عَنْهُمْ سَيِّئَاتِهِمْ وَلأُدْخِلَنَّهُمْ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الأَنْهَارُ ثَوَاباً مِّن عِندِ اللّهِ وَاللّهُ عِندَهُ حُسْنُ الثَّوَابِ *لاَ يَغُرَّنَّكَ تَقَلُّبُ الَّذِينَ كَفَرُواْ فِي الْبِلاَدِ *مَتَاعٌ قَلِيلٌ ثُمَّ مَأْوَاهُمْ جَهَنَّمُ وَبِئْسَ الْمِهَادُ *لَكِنِ الَّذِينَ اتَّقَوْاْ رَبَّهُمْ لَهُمْ جَنَّاتٌ تَجْرِي مِن تَحْتِهَا الأَنْهَارُ خَالِدِينَ فِيهَا نُزُلاً مِّنْ عِندِ اللّهِ وَمَا عِندَ اللّهِ خَيْرٌ لِّلأَبْرَارِ * وَإِنَّ مِنْ أَهْلِ الْكِتَابِ لَمَن يُؤْمِنُ بِاللّهِ وَمَا أُنزِلَ إِلَيْكُمْ وَمَا أُنزِلَ إِلَيْهِمْ خَاشِعِينَ لِلّهِ لاَ يَشْتَرُونَ بِآيَاتِ اللّهِ ثَمَناً قَلِيلاً أُوْلَـئِكَ لَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ إِنَّ اللّهَ سَرِيعُ الْحِسَابِ *يَا أَيُّهَا الَّذِينَ آمَنُواْ اصْبِرُواْ وَصَابِرُواْ وَرَابِطُواْ وَاتَّقُواْ اللّهَ لَعَلَّكُمْ تُفْلِحُونَ ', subItemDescription: 'الآيات من سورة آل عمران ،190 - 200 ، البخاري مع الفتح 8/ 238 ومسلم 1/ 530' }
    ],
  },
  {
    name: 'دعاء دخول المسجد',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'الدعاء بعد التشهد الأخير وقبل السلام',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },





  {
    name: 'دعاء الخروج من المسجد',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'الدعاء عند إفطار الصائم',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: ' الدعاء إذا نزل المطر',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: ' الذكر بعد نزول المطر',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'دعاء الريح',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: ' دعاء الرعد',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'دعاء الغضب',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'دعاء الهم والحزن',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'دعاء الكرب',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'دعاء دخول السوق',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'دعاء السفر',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'ذكر الرجوع من السفر',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'الدعاء إذا تقلب ليلاً',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'ما يفعل من رأى الرؤيا أو الحلم',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'الذكر عقب السلام من الوتر',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'دعاء من أصيب بمصيبة',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'دعاء طرد الشيطان ووساوسه',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'الدعاء للميت في الصلاة عليه',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: ' الدعاء بعد دفن الميت',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },


  {
    name: 'دعاء زيارة القبور',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },



];

export const getItems = () => {
  return items;
};


