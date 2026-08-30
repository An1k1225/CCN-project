import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeModeToggleButton } from "@/components/common";
import { TYPE, useTheme } from "@/constants/theme";
import { useStore } from "@/data/store";

export default function ProfileTab() {
  const { colors } = useTheme();
  const { isDarkMode, toggleDarkMode } = useStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.headerWrap}>
          <View style={styles.rowBetween}>
            <Text style={[TYPE.displayMedium, { fontWeight: "700", color: colors.primary }]}>
              Personal Dashboard
            </Text>
            <ThemeModeToggleButton isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
          </View>
        </View>

        {/* TODO: Add the Profile screen content here. */}
        <View style={styles.body} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerWrap: { paddingHorizontal: 20, paddingVertical: 16 },
  body: { flex: 1 },
});