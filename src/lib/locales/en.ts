
const en = {
    Tabs: {
        Home: {
            tabTitle: "Home",
            title: "{{azanName}} Azan",
            description: "Next azan in {{timeRemaining}} {{timeUnit}}",
            supplication: {
                title: "Supplications",
            },
            verse: {
                title: "Verse of the Day",
            },
            dua: {
                title: "Today's Dua",
            },
            namesOfAllah: {
                title: "Names of Allah",
            }
        },
        Supplications: {
            title: "Supplications",
            description: "Husn al-Muslim"
        },
        GlorificationTab: {
            title: "Glorifications",
            description: "Track your Glorifications"
        },
        MenuTab: {
            title: "Menu",
            sections: {
                settings: {
                    title: "Settings",
                    language: "Language"
                }
            }
        }
    },
    models: {
        GlorificationModal: {
            title: "Select Glorification",
            description: "Select a glorification below. Swipe left to delete.",
            noGlorifications: "No glorifications added yet. Tap Add New Glorification to get started.",
            glorificationText: "Glorification Text",
            targetCount: "Target Count",
            targeCountOptional: "(optional)",
            addNewGlorification: "New Glorification",
            addNewGlorificationDescription: "Add a new glorification to your list.",
            errorEmptyText: "Please enter glorification text."
        }
    },
    screens: {
        AzanScreen: {
            title: "Azan Times",
            description: "Tap any prayer time to make manual adjustments."
        },
        LanguageScreen: {
            title: "Select Language",
            description: "Choose your preferred language for the app.",
            languages: {
                ar: "Arabic",
                en: "English",
            }
        }
    },
    alerts: {
        resetGlorificationCount: {
            title: "Reset Glorification Count",
            message: "Are you sure you want to rest glorification count to 0?",
        },
        deleteGlorification: {
            title: "Delete Glorification",
            message: "Are you sure you want to delete this glorification? This action cannot be undone.",
        },
        noGlorificationSelected: {
            title: "No Glorification Selected",
            message: "Please select a glorification to proceed.",
        }
    },
    general: {
        save: "Save",
        addNew: "Add New",
        reset: "Reset",
        cancel: "Cancel",
        delete: "Delete",
        timesSaid: "times said",
        next: "Next",
        previous: "Previous",
        of: "of",
        repeat: "Repeat",
        completed: "Completed",
        read: "Read",
        more: "More",
        close: "Close",
        select: "Select",
        "minute": "minute",
        "minute_plural": "minutes",
        "hour": "hour",
        "hour_plural": "hours",
        "now": "now",
        originalTime: "Original Time",
        noOffset: "No offset",
        adjustedTime: "Adjusted Time",
        timeAdjustment: "{{prayer}} Time Adjustment",
        supplication: "Supplication",
        searchSupplications: "Search Supplications"
    },
    azanNames: {
        IMSAK: "Imsak",
        FAJR: "Fajr",
        SUNRISE: "Sunrise",
        DHUHR: "Dhuhr",
        ASR: "Asr",
        MAGHRIB: "Maghrib",
        SUNSET: "Sunset",
        ISHA: "Isha",
        FIRST_THIRD: "First Third",
        MIDNIGHT: "Midnight",
        LAST_THIRD: "Last Third",
    },
    azanNamesDescription: {
        IMSAK: "Time to stop eating before Fajr",
        FAJR: "Dawn prayer time",
        SUNRISE: "Time of sunrise",
        DHUHR: "Noon prayer time",
        ASR: "Afternoon prayer time",
        MAGHRIB: "Sunset prayer time",
        SUNSET: "Time of sunset",
        ISHA: "Night prayer time",
        FIRST_THIRD: "First third of the night",
        MIDNIGHT: "Midnight time",
        LAST_THIRD: "Last third of the night",
    }
}
export default en;