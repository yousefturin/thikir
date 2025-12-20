import { SvgKey } from "@/utils/SvgComponent";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type AppStackList = {
    Welcome: undefined;
    Home: undefined;
    AzanTimes: undefined;
    SupplicationItem: { id: number };
    Language: undefined;
};
export type BottomTabParamList = {
    HomeTab: undefined;
    Supplication: undefined;
    Glorification: undefined;
    Menu: undefined;
};
export interface displayIconProps {
    icon: {
        action: string;
        activeURL: SvgKey;
        inActiveURL: SvgKey;
        title: string;
    },
    focused: boolean
}
export const useAppNavigation = () => useNavigation<StackNavigationProp<AppStackList & Omit<BottomTabParamList, 'HomeTab'>>>();
