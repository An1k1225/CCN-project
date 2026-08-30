import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopRightProfileAvatar } from "@/components/common";
import { TYPE, useTheme } from "@/constants/theme";
import { useStore } from "@/data/store";

export default function ChatTab() {
  const { colors } = useTheme();
  const { userProfile } = useStore();

  const goToProfile = () => router.navigate("/(tabs)/profile");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 12, backgroundColor: colors.background }}>
        <View style={styles.rowBetween}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={[TYPE.displayMedium, { fontWeight: "700", color: colors.primary, fontSize: 32, lineHeight: 40 }]}>
              Messages
            </Text>
            <Text style={[TYPE.bodyMedium, { color: colors.onSurfaceVariant }]}>
              Direct trade coordination & neighbor chats
            </Text>
          </View>
          <TopRightProfileAvatar avatarUrl={userProfile.avatarUrl} onClick={goToProfile} />
        </View>

        {/* TODO: Add the Chat screen content here. */}
        <View style={styles.body} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  body: { flex: 1 },
});