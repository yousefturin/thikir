import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "@/navigation/AppNavigation";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { i18n } from "@/lib/i18n";
import "@/lib/i18n/index";
import { applyRTL } from "@/lib/i18n/rtl";
import * as Notifications from "expo-notifications";
import { colorSachem } from "./src/styles";
import LottieView from "lottie-react-native";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true); // Splash
  const [isAppReady, setIsAppReady] = React.useState(false); // Fonts + i18n
  const [fontsLoaded] = useFonts({
    "Lateef-Regular": require("./assets/fonts/Lateef-Regular.ttf"),
  });

  React.useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  // Handle fonts + i18n
  React.useEffect(() => {
    const handleReady = () => {
      const lang = i18n.language as "en" | "ar";
      applyRTL(lang);
      setIsAppReady(true); // app is ready
    };

    if (i18n.isInitialized && fontsLoaded) {
      handleReady();
    } else {
      i18n.on("initialized", () => {
        if (fontsLoaded) handleReady();
      });
    }

    return () => i18n.off("initialized", handleReady);
  }, [fontsLoaded]);

  // Splash screen timeout after app is ready
  React.useEffect(() => {
    if (isAppReady) {
      const timeout = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isAppReady]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider style={styles.container}>
        <>
          {/* Splash overlay */}
          {isLoading && (
            <View style={styles.loaderContainer}>
              <StatusBar
                barStyle="dark-content"
                backgroundColor={colorSachem.inkInverse}
              />
              <View style={styles.splashContainer}>
                <LottieView
                  source={require("./assets/Animations/SplashScreen.json")}
                  autoPlay
                  loop={false}
                  style={styles.lottieView}
                />
              </View>
            </View>
          )}

          {/* App content */}
          {isAppReady && !isLoading && <AppNavigation />}
        </>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSachem.inkInverse,
  },
  loaderContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colorSachem.inkInverse,
  },
  lottieView: { width: ScreenWidth, height: ScreenHeight },
  splashContainer: {
    transform: [{ scale: 0.8 }],
  },
});
