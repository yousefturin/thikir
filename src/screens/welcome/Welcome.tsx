import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, ScrollView, Animated } from "react-native";
import { ScreenHeight } from "react-native-elements/dist/helpers";

import SvgComponent from "@/utils/SvgComponent";

const Welcome = () => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating animation for the logo
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    // Breathing/scaling animation
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Subtle rotation animation
    const rotationAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );

    // Initial entrance animations
    const entranceAnimation = Animated.stagger(300, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    // Start all animations
    floatingAnimation.start();
    breathingAnimation.start();
    rotationAnimation.start();
    entranceAnimation.start();

    return () => {
      floatingAnimation.stop();
      breathingAnimation.stop();
      rotationAnimation.stop();
    };
  }, []);

  // Animation interpolations
  const floatTranslate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [
                { translateY: floatTranslate },
                { scale: breatheAnim },
                { rotate: rotateInterpolate },
              ],
            },
          ]}
        >
          <SvgComponent svgKey="yusefturin" width={120} height={120} />
        </Animated.View>
        <Animated.Text
          style={[
            styles.title,
            {
              transform: [{ translateY: floatTranslate }],
            },
          ]}
        >
          Welcome
        </Animated.Text>
        <Animated.Text
          style={[
            styles.subtitle,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          React Native Template
        </Animated.Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                { translateY: floatTranslate },
                { scale: breatheAnim },
              ],
            },
          ]}
        >
          <Text style={styles.cardTitle}>Ready to Build</Text>
          <Text style={styles.cardDescription}>
            This is a production-ready React Native template with TypeScript,
            path aliases, and modern development tools configured.
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                { translateY: floatTranslate },
                { scale: breatheAnim },
              ],
            },
          ]}
        >
          <Text style={styles.cardTitle}>Next Steps</Text>
          <Text style={styles.cardDescription}>
            • Replace this screen with your own content{"\n"}• Update the
            initialRouteName in App.tsx{"\n"}• Start building your amazing app!
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.footer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.footerText}>
            Created by <Text style={styles.authorText}>yusefturin</Text>
          </Text>
          <Text style={styles.versionText}>Template v1.0.0</Text>
        </Animated.View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    paddingTop: ScreenHeight * 0.1,
    paddingBottom: 40,
  },
  logoContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 80,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#3b82f6",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 3,
    borderColor: "rgba(59, 130, 246, 0.1)",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748b",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#3b82f6",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.05)",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#475569",
  },
  footer: {
    alignItems: "center",
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  footerText: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  authorText: {
    fontWeight: "600",
    color: "#3b82f6",
  },
  versionText: {
    fontSize: 12,
    color: "#94a3b8",
  },
});

export default Welcome;
