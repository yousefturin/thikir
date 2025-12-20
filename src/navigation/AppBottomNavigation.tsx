import { BottomTabParamList, displayIconProps } from "@/hooks/useNavigation";
import SvgComponent, { SvgKey } from "@/utils/SvgComponent";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colorSachem } from "@/styles/index";
import { Platform, View } from "react-native";
import GlorificationTab from "@/screens/glorification/GlorificationTab";
import MenuTab from "@/screens/menu/MenuTab";
import HomeTab from "@/screens/home/HomeTab";
import SupplicationTab from "@/screens/supplication/SupplicationTab";
import { useTranslation } from "react-i18next";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const AppBottomNavigation = () => {
  const { t } = useTranslation();
  const headerTintColor = colorSachem.primary;
  const headerStyle = {
    backgroundColor: colorSachem.brand,
  };
  const insets = useSafeAreaInsets();

  const icons = [
    {
      action: "HomeTab",
      activeURL: "HomeTab" as SvgKey,
      inActiveURL: "HomeTabInactive" as SvgKey,
      title: t("Tabs.Home.tabTitle"),
    },
    {
      action: "Supplication",
      activeURL: "SupplicationTab" as SvgKey,
      inActiveURL: "SupplicationTabInactive" as SvgKey,
      title: t("Tabs.Supplications.title"),
    },
    {
      action: "Glorification",
      activeURL: "GlorificationTab" as SvgKey,
      inActiveURL: "GlorificationTabInactive" as SvgKey,
      title: t("Tabs.GlorificationTab.title"),
    },
    {
      action: "Menu",
      activeURL: "MenuTab" as SvgKey,
      inActiveURL: "MenuTabInactive" as SvgKey,
      title: t("Tabs.MenuTab.title"),
    },
  ];

  const displayIcon = (
    icon: displayIconProps["icon"],
    focused: displayIconProps["focused"]
  ) => {
    const iconSize = 25; // Default icon size

    return (
      <View
        style={{
          backgroundColor: colorSachem.transparent,
          width: iconSize,
          height: iconSize,
          borderRadius: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SvgComponent
          svgKey={focused ? icon?.activeURL : icon?.inActiveURL}
          width={24}
          height={24}
        />
      </View>
    );
  };
  return (
    <BottomTab.Navigator
      id={undefined}
      screenOptions={({ route }) => {
        const icon = icons.find((icon) => icon?.action === route.name);
        return {
          headerTintColor,
          headerTitle: null,
          headerStyle: headerStyle,
          tabBarIcon: ({ focused }) => displayIcon(icon, focused),
          tabBarLabel: icon?.title || "",
          tabBarStyle: {
            height: 80,
            alignItems: "center",
            paddingBottom: Platform.OS !== "ios" ? 60 + insets.bottom : 0,
            backgroundColor: colorSachem.inkInverse,
          },
          tabBarActiveTintColor: colorSachem.brand,
          tabBarInactiveTintColor: colorSachem.disabled,
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 10,
          },
          tabBarIconStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarLabelPosition: "below-icon",
        };
      }}
    >
      <BottomTab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Supplication"
        component={SupplicationTab}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Glorification"
        component={GlorificationTab}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Menu"
        component={MenuTab}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
};
