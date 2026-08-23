import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Host, Switch } from "@expo/ui";
import { AppIcon } from "@/components/app-icon";
import { EcoImage } from "@/components/eco-image";
import { ThemeModeToggleButton } from "@/components/common";
import { TYPE, useTheme } from "@/constants/theme";
import { useStore } from "@/data/store";

export default function ProfileScreen() {
  const {
    userProfile,
    userStats,
    isDarkMode,
    privacyModeEnabled,
    toggleDarkMode,
    togglePrivacyMode,
    logout,
    showToast,
  } = useStore();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 90 }}>
        <View style={styles.rowBetween}>
          <Text style={[TYPE.displayMedium, { fontWeight: "700", color: colors.primary }]}>
            Personal Dashboard
          </Text>
          <ThemeModeToggleButton isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
        </View>

        <View style={{ height: 16 }} />

        {/* Identity Card */}
        <View style={[styles.card20, { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}66` }]}>
          <View style={[styles.rowCenter, { padding: 18 }]}>
            <View style={[styles.avatar64, { backgroundColor: colors.surfaceVariant, overflow: "hidden" }]}>
              {userProfile.avatarUrl !== "" ? (
                <EcoImage url={userProfile.avatarUrl} accessibilityLabel={userProfile.name} style={styles.fill} />
              ) : (
                <AppIcon name="person" size={36} color={colors.primary} />
              )}
            </View>

            <View style={{ flex: 1, marginLeft: 16 }}>
              <View style={styles.rowCenter}>
                <Text style={[TYPE.headlineSmall, { fontWeight: "700", color: colors.onSurface }]}>
                  {userProfile.name}
                </Text>
                {userProfile.isVerified && (
                  <View style={{ marginLeft: 4 }}>
                    <AppIcon name="verified" size={18} color={colors.primary} />
                  </View>
                )}
              </View>

              <Text style={[TYPE.bodySmall, { color: colors.onSurfaceVariant }]}>
                @{userProfile.username} • {userProfile.locationName}
              </Text>

              <View style={[styles.rowCenter, { marginTop: 4 }]}>
                <AppIcon name="star" size={14} color={colors.starGold} />
                <Text style={[TYPE.labelSmall, { color: colors.onSurfaceVariant, marginLeft: 2 }]}>
                  {" "}
                  {userProfile.rating} ({userProfile.totalTrades} completed exchanges)
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 18 }} />

        {/* Eco Impact */}
        <Text style={[TYPE.headlineSmall, { fontWeight: "700", color: colors.onSurface }]}>
          Your Environmental Impact
        </Text>

        <View style={{ height: 10 }} />

        {/* Monthly CO2 Progress */}
        <View style={[styles.card20, { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}66` }]}>
          <View style={{ padding: 18 }}>
            <View style={styles.rowBetween}>
              <View style={styles.rowCenter}>
                <AppIcon name="eco" size={20} color={colors.primary} />
                <Text style={[TYPE.labelMedium, { fontWeight: "700", color: colors.primary, marginLeft: 6 }]}>
                  CO2 PREVENTED
                </Text>
              </View>
              <View style={[styles.goalPill, { backgroundColor: colors.surfaceVariant }]}>
                <Text style={{ fontSize: 11, color: colors.outline }}>Monthly Goal</Text>
              </View>
            </View>

            <View style={[styles.rowBottom, { marginTop: 10 }]}>
              <Text style={{ fontSize: 48, lineHeight: 56, fontWeight: "700", color: colors.primary }}>
                {userStats.co2PreventedKg}
              </Text>
              <Text style={[TYPE.bodyMedium, { color: colors.onSurfaceVariant, marginBottom: 6, marginLeft: 4 }]}>
                kg / {userStats.monthlyGoalKg} kg goal
              </Text>
            </View>

            <View style={{ height: 10 }} />

            <View style={[styles.progressTrack, { backgroundColor: colors.surfaceVariant }]}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.min(100, Math.max(0, userStats.progressToGoalPercent))}%`, backgroundColor: colors.primary },
                ]}
              />
            </View>
          </View>
        </View>

        <View style={{ height: 12 }} />

        {/* 3-Card Bento Row */}
        <View style={styles.bentoRow}>
          <StatCard
            icon="recycling"
            iconColor={colors.primary}
            value={`${userStats.itemsDiverted}`}
            valueColor={colors.onSurface}
            label="Items Diverted"
          />
          <StatCard
            icon="eco"
            iconColor={colors.tertiary}
            value={`${userStats.ecoPoints}`}
            valueColor={colors.tertiary}
            label="Eco-Points"
          />
          <StatCard
            icon="swap_horiz"
            iconColor={colors.primary}
            value={`${userStats.activeTrades}`}
            valueColor={colors.onSurface}
            label="Active Trades"
          />
        </View>

        <View style={{ height: 20 }} />

        {/* Settings */}
        <Text style={[TYPE.headlineSmall, { fontWeight: "700", color: colors.onSurface }]}>
          App Settings & Privacy
        </Text>

        <View style={{ height: 10 }} />

        <View style={[styles.card20, { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}66` }]}>
          <View style={{ padding: 16 }}>
            <Host style={{ flex: 1 }}>
              <View style={styles.rowBetween}>
                <View style={[styles.rowCenter, { flex: 1, paddingRight: 12 }]}>
                  <AppIcon name="dark_mode" size={22} color={colors.primary} />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={[TYPE.titleMedium, { fontWeight: "600", color: colors.onSurface }]}>
                      Dark Mode Support
                    </Text>
                    <Text style={[TYPE.bodySmall, { color: colors.onSurfaceVariant }]}>
                      High contrast theme for low-light accessibility
                    </Text>
                  </View>
                </View>
                <Switch
                  testID="dark_mode_switch"
                  value={isDarkMode}
                  onValueChange={() => toggleDarkMode()}
                />
              </View>

              <View style={[styles.divider, { marginVertical: 12, backgroundColor: `${colors.outlineVariant}4D` }]} />

              <View style={styles.rowBetween}>
                <View style={[styles.rowCenter, { flex: 1, paddingRight: 12 }]}>
                  <AppIcon name="security" size={22} color={colors.primary} />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={[TYPE.titleMedium, { fontWeight: "600", color: colors.onSurface }]}>
                      Privacy & Location Fuzzing
                    </Text>
                    <Text style={[TYPE.bodySmall, { color: colors.onSurfaceVariant }]}>
                      Fuzz exact coordinates & disable ad trackers
                    </Text>
                  </View>
                </View>
                <Switch
                  testID="privacy_mode_switch"
                  value={privacyModeEnabled}
                  onValueChange={() => togglePrivacyMode()}
                />
              </View>
            </Host>
          </View>
        </View>

        <View style={{ height: 20 }} />

        {/* Sign Out */}
        <Pressable
          onPress={() => {
            logout();
            showToast("Signed out successfully");
          }}
          style={[styles.signOutBtn, { borderColor: colors.outline }]}
          testID="profile_logout_btn"
        >
          <AppIcon name="logout" size={18} color={colors.primary} />
          <Text style={{ marginLeft: 8, fontWeight: "600", color: colors.primary }}>Switch Account / Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard(props: {
  icon: Parameters<typeof AppIcon>[0]["name"];
  iconColor: string;
  value: string;
  valueColor: string;
  label: string;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.statCard,
        { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}66` },
      ]}
    >
      <AppIcon name={props.icon} size={20} color={props.iconColor} />
      <Text style={{ fontSize: 26, lineHeight: 32, fontWeight: "700", color: props.valueColor, marginTop: 6 }}>
        {props.value}
      </Text>
      <Text style={{ fontSize: 11, color: colors.outline }}>{props.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  rowBottom: { flexDirection: "row", alignItems: "flex-end" },
  fill: { flex: 1, width: "100%", height: "100%" },

  card20: { borderRadius: 20, borderWidth: 1 },
  avatar64: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center" },
  goalPill: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },

  progressTrack: { height: 8, borderRadius: 999, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 999 },

  bentoRow: { flexDirection: "row", gap: 10 },
  statCard: { flex: 1, borderRadius: 18, borderWidth: 1, padding: 14 },

  divider: { height: StyleSheet.hairlineWidth },

  signOutBtn: {
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
