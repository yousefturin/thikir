const items = [
  {
    name: 'أذكار الاستيقاظ من النوم',
    subItems: [
      { name: '3أذكار الاستيقاظ من النوم',repTime:'مرة واحدة',count:1 ,subItemName: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.', subItemDescription:  'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.'},
      { name: '2أذكار الاستيقاظ من النوم',repTime:'مرة واحدة',count:'1',subItemName: 'لا إلَهَ إلاَّ الله وحْدَهُ لا شَرِيكَ لَهُ، لَهُ المُلْكُ ولَهُ الحَمْدُ وهُوَ على كلِّ شيءٍ قَدير،سُبْحانَ الله والحَمْدُ لله ولا إله إلا الله والله أكبر ولا حَولَ ولا قُوةَ إلا بالله العلي العظيم. رب اغفر لي.', subItemDescription: 'رواه البخاري مع الفتح 3/ 144 وغيرها واللفظ لابن ماجه انظر صحيح ابن ماجه 2/ 335 .' },
      { name: '1أذكار الاستيقاظ من النوم',repTime:'مرة واحدة',count:'1',subItemName: 'الحَمْدُ لله الذِي عَافَانِي في جَسَدِي ورَدَّ عَلَيَّ رُوحِي، وأَذِنَ لي بِذِكْرهِ.', subItemDescription:  'الترمذي 5/ 473 وانظر صحيح الترمذي3/144'},
      { name: '4أذكار الاستيقاظ من النوم',repTime:'مرة واحدة',count:'1',subItemName:'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالأَرْضِ وَاخْتِلاَفِ اللَّيْلِ وَالنَّهَارِ لآيَاتٍ لِّأُوْلِي الألْبَابِ *الَّذِينَ يَذْكُرُونَ اللّهَ قِيَاماً وَقُعُوداً وَعَلَىَ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالأَرْضِ رَبَّنَا مَا خَلَقْتَ هَذا بَاطِلاً سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ*رَبَّنَا إِنَّكَ مَن تُدْخِلِ النَّارَ فَقَدْ أَخْزَيْتَهُ وَمَا لِلظَّالِمِينَ مِنْ أَنصَارٍ *رَّبَّنَا إِنَّنَا سَمِعْنَا مُنَادِياً يُنَادِي لِلإِيمَانِ أَنْ آمِنُواْ بِرَبِّكُمْ فَآمَنَّا رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الأبْرَارِ * رَبَّنَا وَآتِنَا مَا وَعَدتَّنَا عَلَى رُسُلِكَ وَلاَ تُخْزِنَا يَوْمَ الْقِيَامَةِ إِنَّكَ لاَ تُخْلِفُ الْمِيعَادَ *فَاسْتَجَابَ لَهُمْ رَبُّهُمْ أَنِّي لاَ أُضِيعُ عَمَلَ عَامِلٍ مِّنكُم مِّن ذَكَرٍ أَوْ أُنثَى بَعْضُكُم مِّن بَعْضٍ فَالَّذِينَ هَاجَرُواْ وَأُخْرِجُواْ مِن دِيَارِهِمْ وَأُوذُواْ فِي سَبِيلِي وَقَاتَلُواْ وَقُتِلُواْ لأُكَفِّرَنَّ عَنْهُمْ سَيِّئَاتِهِمْ وَلأُدْخِلَنَّهُمْ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الأَنْهَارُ ثَوَاباً مِّن عِندِ اللّهِ وَاللّهُ عِندَهُ حُسْنُ الثَّوَابِ *لاَ يَغُرَّنَّكَ تَقَلُّبُ الَّذِينَ كَفَرُواْ فِي الْبِلاَدِ *مَتَاعٌ قَلِيلٌ ثُمَّ مَأْوَاهُمْ جَهَنَّمُ وَبِئْسَ الْمِهَادُ *لَكِنِ الَّذِينَ اتَّقَوْاْ رَبَّهُمْ لَهُمْ جَنَّاتٌ تَجْرِي مِن تَحْتِهَا الأَنْهَارُ خَالِدِينَ فِيهَا نُزُلاً مِّنْ عِندِ اللّهِ وَمَا عِندَ اللّهِ خَيْرٌ لِّلأَبْرَارِ * وَإِنَّ مِنْ أَهْلِ الْكِتَابِ لَمَن يُؤْمِنُ بِاللّهِ وَمَا أُنزِلَ إِلَيْكُمْ وَمَا أُنزِلَ إِلَيْهِمْ خَاشِعِينَ لِلّهِ لاَ يَشْتَرُونَ بِآيَاتِ اللّهِ ثَمَناً قَلِيلاً أُوْلَـئِكَ لَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ إِنَّ اللّهَ سَرِيعُ الْحِسَابِ *يَا أَيُّهَا الَّذِينَ آمَنُواْ اصْبِرُواْ وَصَابِرُواْ وَرَابِطُواْ وَاتَّقُواْ اللّهَ لَعَلَّكُمْ تُفْلِحُونَ ', subItemDescription:  'الآيات من سورة آل عمران ،190 - 200 ، البخاري مع الفتح 8/ 238 ومسلم 1/ 530'}
    ],
  },
  {
    name: 'أذكار النوم',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { name: 'أذكار النوم',subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { name: 'أذكار النوم',subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },
  {
    name: 'أذكار الصباح',
    description: 'البخاري مع الفتح 11/ 113 ومسلم 4/ 2083.',
    title: 'الحمـد لله الذي أحـيانا بعـد ما أماتـنا وإليه النـشور.',
    subItems: [
      { subItemName: 'Subitem 1', subItemDescription: 'Description 1' },
      { subItemName: 'Subitem 2', subItemDescription: 'Description 2' },
      // Add more sub-items as needed
    ],
  },
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
    name: ' الأذكار بعد السلام من الصلاة', 
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


