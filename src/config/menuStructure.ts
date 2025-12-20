import { AppStackList, BottomTabParamList } from "@/hooks/useNavigation";
import { SvgKey } from "@/utils/SvgComponent";

export type MenuItemType = {
    title: string;
    actionParam: keyof (AppStackList & Omit<BottomTabParamList, 'HomeTab'>);
    svgKey: SvgKey;
    testID?: string;
}
export type MenuSection = {
    id: string;
    title: string;
    data: MenuItemType[];
}
export type MenuStructure = MenuSection[];

export const menuStructure: MenuStructure = [
    // {
    //     id: "storedData",
    //     title: 'Tabs.MenuScreen.sections.storedData.title',
    //     data: [
    //         {
    //             title: 'Tabs.MenuScreen.sections.storedData.myCars',
    //             actionParam: 'CarList',
    //             svgKey: 'CarNew',
    //             testID: 'car-list-item'
    //         }, {
    //             title: 'Tabs.MenuScreen.sections.storedData.myIbans',
    //             actionParam: 'IbanList',
    //             svgKey: 'IbanNew',
    //             testID: 'iban-list-item'
    //         }
    //     ]
    // }, 
    {
        id: "settings",
        title: 'Tabs.MenuTab.sections.settings.title',
        data: [
            {
                title: 'Tabs.MenuTab.sections.settings.language',
                actionParam: 'Language',
                svgKey: 'Language',
                testID: 'language-item'
            },
        ]
    },
    //  {
    //     id: "helpAndSupport",
    //     title: 'Tabs.MenuScreen.sections.helpAndSupport.title',
    //     data: [
    //         {
    //             title: 'Tabs.MenuScreen.sections.helpAndSupport.fqa',
    //             actionParam: 'FrequentlyAskedQuestions',
    //             svgKey: 'InfoCircle',
    //             testID: 'faq-item'
    //         },
    //         {
    //             title: 'Tabs.MenuScreen.sections.helpAndSupport.privacy',
    //             actionParam: 'PrivacyMenu',
    //             svgKey: 'PrivacyNew',
    //             testID: 'privacy-item'
    //         }
    //     ]
    // }, {
    //     id: "offers",
    //     title: 'Tabs.MenuScreen.sections.offers.title',
    //     data: [
    //         // {
    //         //     title: 'Tabs.MenuScreen.sections.offers.referenceCode',
    //         //     actionParam: 'Reward',
    //         //     svgKey: 'ReferralCodeNew'
    //         // },
    //         {
    //             title: 'Tabs.MenuScreen.sections.offers.BrandAmbassadorCode',
    //             actionParam: 'BrandEmbassador',
    //             svgKey: 'ReferralCodeNew',
    //             testID: 'brand-ambassador-item'
    //         },
    //     ]
    // }
] as const;