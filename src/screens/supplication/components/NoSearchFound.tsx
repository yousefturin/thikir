import { colorSachem, fontSachem } from "@/styles/*";
import SvgComponent from "@/utils/SvgComponent";
import { Text, View } from "react-native";

export const NoSearchFound = ({ query }: { query: string }) => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      marginTop: 120,
    }}
  >
    <SvgComponent svgKey={"Search"} width={40} height={40} />
    <Text
      style={{
        fontSize: fontSachem.displayLarge,
        fontWeight: "700",
        marginBottom: 5,
        marginTop: 20,
      }}
    >
      {`No Results for "${query}"`}
    </Text>
    <Text
      style={{ fontSize: fontSachem.labelSmall, color: colorSachem.inkMedium }}
    >
      Check the spelling or try a new search.
    </Text>
  </View>
);
