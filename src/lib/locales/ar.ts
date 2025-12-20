
const ar = {
    Tabs: {
        "Home": {
            tabTitle: "الرئيسية",
            "title": "أذان {{azanName}}",
            "description": "الأذان التالي بعد {{timeRemaining}} {{timeUnit}}",
            supplication: {
                title: "الاذكار",
            },
            verse: {
                title: "الورد اليومي",
            },
            dua: {
                title: "دعاء اليوم",
            },
            namesOfAllah: {
                title: "أسماء الله",
            }
        },
        Supplications: {
            title: "الأذكار",
            description: "حصن المسلم"
        },
        GlorificationTab: {
            title: "التسبيحات",
            description: "تتبع تسبيحاتك",
        },
        MenuTab: {
            title: "القائمة",
            sections: {
                settings: {
                    title: "الإعدادات",
                    language: "اللغة"
                }
            }
        }
    },
    screens: {
        AzanScreen: {
            title: "مواقيت الأذان",
            description: "اضغط على أي وقت صلاة لإجراء تعديلات يدوية."
        },
        "LanguageScreen": {
            "title": "اختر اللغة",
            "description": "اختر لغتك المفضلة للتطبيق.",
            "languages": {
                "ar": "العربية",
                "en": "الإنجليزية"
            }
        }
    },
    models: {
        GlorificationModal: {
            title: "اختر التسبيح",
            description: "اختر تسبيحًا أدناه. اسحب لليسار للحذف.",
            noGlorifications: "لم يتم إضافة أي تسبيحات بعد. اضغط على أضف جديد للبدء.",
            glorificationText: "نص التسبيح",
            targetCount: "العدد المستهدف",
            targeCountOptional: "(اختياري)",
            addNewGlorification: "تسبيح جديد",
            addNewGlorificationDescription: "أضف تسبيحًا جديدًا إلى قائمتك.",
            errorEmptyText: "يرجى إدخال نص التسبيح."
        }
    },
    alerts: {
        resetGlorificationCount: {
            title: "إعادة تعيين عدد التسبيحات",
            message: "هل أنت متأكد أنك تريد إعادة تعيين عدد التسبيحات إلى 0؟",
        },
        deleteGlorification: {
            title: "حذف التسبيح",
            message: "هل أنت متأكد أنك تريد حذف هذا التسبيح؟ لن تتمكن من التراجع عن هذا الإجراء.",
        },
        noGlorificationSelected: {
            title: "لم يتم اختيار تسبيح",
            message: "يرجى اختيار تسبيح للمتابعة.",
        }
    },
    general: {

        save: "حفظ",
        addNew: "أضف جديد",
        cancel: "إلغاء",
        delete: "حذف",
        reset: "إعادة تعيين",
        timesSaid: "عدد التكرار",
        next: "التالي",
        previous: "السابق",
        of: "من",
        repeat: "كرر",
        completed: "مكتمل",
        read: " قراءة",
        close: "إغلاق",
        select: "اختر",
        "more": "المزيد",
        "minute": "دقيقة",
        "minute_plural": "دقائق",
        "hour": "ساعة",
        "hour_plural": "ساعات",
        "now": "الآن",
        originalTime: "الوقت الأصلي",
        adjustedTime: "الوقت المعدل",
        timeAdjustment: "تعديل وقت {{prayer}}",
        noOffset: "بدون تعويض",
        supplication: "ذكر",
        searchSupplications: "ابحث في الأذكار"
    },
    azanNames: {
        IMSAK: "الإمساك",
        FAJR: "الفجر",
        SUNRISE: "الشروق",
        DHUHR: "الظهر",
        ASR: "العصر",
        MAGHRIB: "المغرب",
        SUNSET: "الغروب",
        ISHA: "العشاء",
        FIRST_THIRD: "الثلث الأول",
        LAST_THIRD: "الثلث الأخير",
        MIDNIGHT: "منتصف الليل"
    },
    azanNamesDescription: {
        IMSAK: "وقت التوقف عن الأكل قبل الفجر",
        FAJR: "وقت صلاة الفجر",
        SUNRISE: "وقت شروق الشمس",
        DHUHR: "وقت صلاة الظهر",
        ASR: "وقت صلاة العصر",
        MAGHRIB: "وقت صلاة المغرب",
        SUNSET: "وقت الغروب",
        ISHA: "وقت صلاة العشاء",
        FIRST_THIRD: "الثلث الأول من الليل",
        MIDNIGHT: "منتصف الليل",
        LAST_THIRD: "الثلث الأخير من الليل",
    }
}

export default ar;