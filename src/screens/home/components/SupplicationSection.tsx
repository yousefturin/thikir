import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colorSachem, fontSachem } from "@/styles/*";
import HeaderSection from "@/components/UI/HeaderSection";
import { items } from "@/db/thikir";
import SvgComponent, { SvgKey } from "@/utils/SvgComponent";
import { useAppNavigation } from "@/hooks/useNavigation";
import { useTranslation } from "react-i18next";

const SupplicationSection = () => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const pinnedSupplicationsIds = [28, 27, 25, 29];
  const pinnedIdSet = React.useMemo(() => new Set(pinnedSupplicationsIds), []);
  const pinnedItems = React.useMemo(
    () => items.filter((item) => pinnedIdSet.has(item.id)),
    [items, pinnedIdSet]
  );

  // SVG key mapping for each supplication
  const getSupplicationIcon = (id: number): SvgKey => {
    const iconMap: Record<number, SvgKey> = {
      28: "Moon", // Moon placeholder for evening
      27: "Dawn", // Sun placeholder for morning
      25: "Prayer", // Prayer placeholder
      29: "Bed", // Bed placeholder for night
    };
    return iconMap[id] || "MenuTab";
  };

  // Get current hour to determine which supplication to prioritize
  const getCurrentPrioritySupplication = React.useMemo(() => {
    const currentHour = new Date().getHours();

    let priorityId: number;
    if (currentHour >= 6 && currentHour <= 10) {
      priorityId = 27; // morning supplication
    } else if (currentHour >= 16 && currentHour <= 19) {
      priorityId = 28; // evening supplication
    } else if (currentHour >= 20 && currentHour <= 23) {
      priorityId = 29; // night supplication
    } else {
      priorityId = 25; // after prayer supplication
    }

    return priorityId;
  }, []);

  // Sort pinned items based on time priority
  const sortedPinnedItems = React.useMemo(() => {
    return [...pinnedItems].sort((a, b) => {
      if (a.id === getCurrentPrioritySupplication) return -1;
      if (b.id === getCurrentPrioritySupplication) return 1;
      return 0;
    });
  }, [pinnedItems, getCurrentPrioritySupplication]);

  const renderSupplicationItem = ({ item }: { item: (typeof items)[0] }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("SupplicationItem", { id: item.id })}
    >
      <View style={styles.iconContainer}>
        <SvgComponent
          svgKey={getSupplicationIcon(item.id)}
          width={22}
          height={22}
          stroke={colorSachem.ink}
        />
      </View>
      <Text style={styles.itemTitle}>{item.name}</Text>
      {/* <Text style={styles.itemSubtext}>
        {item.subItems.length}{" "}
        {item.subItems.length === 1 ? "supplication" : "supplications"}
      </Text> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderSection
        title={t("Tabs.Home.supplication.title")}
        actionTitle={t("general.more")}
        onPressAction={() => navigation.navigate("Supplication")}
      />
      <FlatList
        data={sortedPinnedItems}
        renderItem={renderSupplicationItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default SupplicationSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorSachem.primary,
    paddingBottom: 24,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  itemContainer: {
    backgroundColor: colorSachem.inkInverse,
    borderRadius: 20,
    padding: 16,
    marginEnd: 16,
    width: 170,
    position: "relative",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 13.33,
    backgroundColor: colorSachem.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    marginTop: 12,
    fontSize: fontSachem.labelLarge,
    color: colorSachem.ink,
    marginBottom: 4,
  },
});
