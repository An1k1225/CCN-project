import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopRightProfileAvatar } from "@/components/common";
import { TYPE, useTheme } from "@/constants/theme";
import { useStore } from "@/data/store";

export default function SearchTab() {
  const { colors } = useTheme();
  const { userProfile } = useStore();

  const goToProfile = () => router.navigate("/(tabs)/profile");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.headerWrap}>
          <View style={styles.rowBetween}>
            <Text style={[TYPE.displayMedium, { fontWeight: "700", color: colors.primary, fontSize: 36, lineHeight: 44 }]}>
              Discover
            </Text>
            <TopRightProfileAvatar avatarUrl={userProfile.avatarUrl} onClick={goToProfile} />
          </View>
        </View>

        {/* TODO: Add the Search screen content here. */}
        <View style={styles.body} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerWrap: { paddingHorizontal: 20, paddingVertical: 12 },
  body: { flex: 1 },
});