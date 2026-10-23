import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StoreProvider, useStore } from "@/data/store";
import { LIGHT_COLORS } from "@/constants/theme";

function ToastHost() {
  const { toastMessage } = useStore();
  const insets = useSafeAreaInsets();

  if (!toastMessage) return null;

  return (
    <View pointerEvents="none" style={[styles.toastWrap, { bottom: insets.bottom + 84 }]}>
      <View style={styles.toast}>
        <Text style={styles.toastText}>{toastMessage}</Text>
      </View>
    </View>
  );
}

function RootNavigation() {
  const palette = LIGHT_COLORS;

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: palette.primary,
      background: palette.background,
      card: palette.surfaceContainer,
      text: palette.onSurface,
      border: palette.outlineVariant,
      notification: palette.primary,
    },
  };

  return (
    <ThemeProvider value={navTheme}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: palette.background } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="listing/[id]" />
      </Stack>
      <ToastHost />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <StoreProvider>
      <RootNavigation />
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  toastWrap: {
    position: "absolute",
    left: 24,
    right: 24,
    alignItems: "center",
  },
  toast: {
    backgroundColor: "#322F35",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: "100%",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  toastText: { color: "#FFFFFF", fontSize: 14 },
});
