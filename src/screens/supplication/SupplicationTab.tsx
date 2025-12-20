import {
  Animated,
  Platform,
  SectionList,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import HeaderNavigation from "@/components/UI/HeaderNavigation";
import { colorSachem } from "@/styles/*";
import { items } from "@/db/thikir";
import SupplicationItem from "./components/SupplicationItem";
import HeaderSubtitle from "@/components/UI/HeaderSubtitle";
import Format from "@/utils/Format";
import SearchInput from "@/components/Inputs/SearchInput";
import debounce from "lodash.debounce";
import { View } from "moti";
import { NoSearchFound } from "./components/NoSearchFound";
import { useAppNavigation } from "@/hooks/useNavigation";
import { useTranslation } from "react-i18next";

type SupplicationItemType = {
  id: number;
  name: string;
  category: string;
  subItems: Array<{
    id: number;
    name: string;
    repTime: string;
    count: number;
    subItemName: string;
    subItemTranslation: string;
    subItemDescription?: string;
  }>;
};

type SectionData = {
  category: string;
  data: SupplicationItemType[];
};
const AnimatedSectionList = Animated.createAnimatedComponent(
  SectionList
) as React.ComponentType<
  React.ComponentProps<typeof SectionList<SupplicationItemType, SectionData>>
>;

const SupplicationTab = () => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const [searchQuery, setSearchQuery] = React.useState("");
  const searchInputRef = React.useRef<TextInput>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const handleCancel = () => {
    searchInputRef.current?.blur();
    setSearchQuery("");
  };
  const filteredSupplications = React.useMemo(() => {
    if (!searchQuery) return items ?? [];
    return items?.filter((item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  const debouncedSetSearchQuery = React.useMemo(
    () => debounce((q) => setSearchQuery(q), 300),
    []
  );

  //prevent memory leak
  React.useEffect(() => {
    return () => {
      debouncedSetSearchQuery.cancel();
    };
  }, []);

  const keyExtractor = (item: SupplicationItemType) => String(item.id);

  const renderItem = ({ item }: { item: SupplicationItemType }) => (
    <SupplicationItem
      item={item}
      onPress={(id) => navigation.navigate("SupplicationItem", { id })}
    />
  );

  const sections = Format.GroupSupplicationsByCategory(
    filteredSupplications as SupplicationItemType[]
  ) as SectionData[];

  //#region header animation (hide and show on scroll)

  const [headerHeight, setHeaderHeight] = React.useState(0);
  const scrollRef = React.useRef<SectionList>(null);
  const lastFocusAt = React.useRef<number>(0);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const headerAnim = React.useRef(new Animated.Value(0)).current; // 0 shown, 1 hidden
  const lastScrollYRef = React.useRef(0);
  const scrollDirectionRef = React.useRef<"up" | "down" | null>(null);
  const SCROLL_DIR_THRESHOLD = 4; // Lower threshold for more reactive behavior
  const headerTranslateY = headerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(headerHeight || 1)],
    extrapolate: "clamp",
  });
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  const lastHeaderTarget = React.useRef<number>(0);

  const onListScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event: {
        nativeEvent: {
          contentOffset: { y: number };
          contentSize: { height: number };
          layoutMeasurement: { height: number };
        };
      }) => {
        if (!filteredSupplications || filteredSupplications.length === 0)
          return; // ignore while empty
        const { contentOffset, contentSize, layoutMeasurement } =
          event.nativeEvent as unknown as {
            contentOffset: { y: number };
            contentSize: { height: number };
            layoutMeasurement: { height: number };
          };
        const offsetY = contentOffset.y;
        const lastY = lastScrollYRef.current;
        const diff = offsetY - lastY;
        const distanceFromBottom =
          contentSize.height - (offsetY + layoutMeasurement.height);

        // If we're very close to bottom and a small upward diff occurs (< 40px from end), treat it as bounce and ignore upward reveal
        const NEAR_END_THRESHOLD = 40;

        // Prevent hiding header when content is too short to scroll meaningfully.
        // Otherwise with few items the header may hide after a tiny downward gesture and cannot reappear.
        const SCROLLABLE_SLACK = 8; // small extra space tolerance
        const effectiveScrollableHeight =
          contentSize.height - layoutMeasurement.height;
        const contentTooShort =
          effectiveScrollableHeight <= headerHeight + SCROLLABLE_SLACK;
        if (contentTooShort) {
          // Force header visible if previously hidden
          if (lastHeaderTarget.current !== 0) {
            lastHeaderTarget.current = 0;
            Animated.timing(headerAnim, {
              toValue: 0,
              duration: 120,
              useNativeDriver: true,
            }).start();
          }
          lastScrollYRef.current = offsetY <= 0 ? 0 : offsetY; // maintain baseline
          return;
        }

        // Ignore negative bounce so refresh gesture still works visually
        if (offsetY < 0) {
          lastScrollYRef.current = 0;
          return;
        }

        if (Math.abs(diff) >= SCROLL_DIR_THRESHOLD) {
          let newDirection: "up" | "down" = diff > 0 ? "down" : "up";
          if (
            newDirection === "up" &&
            distanceFromBottom < NEAR_END_THRESHOLD
          ) {
            newDirection = "down";
          }
          if (newDirection !== scrollDirectionRef.current) {
            scrollDirectionRef.current = newDirection;
            const target = newDirection === "down" ? 1 : 0;
            if (lastHeaderTarget.current !== target) {
              lastHeaderTarget.current = target;
              Animated.timing(headerAnim, {
                toValue: target,
                duration: 180,
                useNativeDriver: true,
              }).start();
            }
          }
        }

        lastScrollYRef.current = offsetY;
      },
    }
  );
  //#endregion

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: colorSachem.inkInverse }}
    >
      <Animated.View
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
        style={[
          styles.headerContainer,
          {
            transform: [{ translateY: headerTranslateY }],
            backgroundColor: colorSachem.inkInverse,
            borderBottomColor: colorSachem.tertiary,
            paddingTop: statusBarHeight,
          },
        ]}
        pointerEvents="box-none"
      >
        <HeaderNavigation
          title={t("Tabs.Supplications.title")}
          description={t("Tabs.Supplications.description")}
        />
        <View style={styles.searchInputsContainer}>
          <SearchInput
            searchQuery={searchQuery}
            onSearch={(query) => handleSearch(query)}
            onCancel={() => handleCancel()}
            onFocus={() => (lastFocusAt.current = Date.now())}
            ref={searchInputRef}
            showCancelButton
            style={{ borderWidth: 0 }}
            placeholder={t("general.searchSupplications")}
            leftIcon={"Search"}
            autoFocus={false}
          />
        </View>
      </Animated.View>
      <AnimatedSectionList
        //@ts-expect-error : TypeScript bug with Animated.createAnimatedComponent and generics
        ref={scrollRef}
        contentContainerStyle={{
          paddingBottom: 16,
          paddingTop: Platform.select({
            ios: headerHeight - 40,
            android: headerHeight,
            default: headerHeight,
          }),
        }}
        decelerationRate="fast"
        disableScrollViewPanResponder
        alwaysBounceVertical
        scrollEventThrottle={16}
        sections={sections}
        renderSectionHeader={({ section: { category } }) => (
          <HeaderSubtitle
            style={{
              backgroundColor: colorSachem.inkInverse,
            }}
            title={category}
          />
        )}
        ListEmptyComponent={<NoSearchFound query={searchQuery} />}
        initialNumToRender={10}
        onEndReachedThreshold={0.1}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={5}
        windowSize={10}
        onScroll={onListScroll}
      />
    </SafeAreaView>
  );
};

export default SupplicationTab;
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colorSachem.inkInverse,
    position: "absolute",
    // top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
    borderBottomWidth: 1,
    borderColor: colorSachem.tertiary,
    minHeight: 158,
  },
  searchInputsContainer: {
    borderWidth: 1.6,
    borderColor: colorSachem.tertiary,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 10,
    marginBottom: 10,
  },
});
