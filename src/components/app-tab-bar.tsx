import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs/types";
import { AppIcon } from "@/components/app-icon";
import { useTheme } from "@/constants/theme";

const TAB_ITEMS = [
  { name: "index", label: "Home", icon: "home" },
  { name: "search", label: "Search", icon: "search" },
] as const;

const RIGHT_TAB_ITEMS = [
  { name: "chat", label: "Chat", icon: "chat_bubble" },
  { name: "profile", label: "Profile", icon: "person" },
] as const;

export function AppTabBar({ state, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const activeRoute = state.routes[state.index]?.name;

  const go = (routeName: string) => {
    const event = navigation.emit({
      type: "tabPress",
      target: routeName,
      canPreventDefault: true,
    });
    if (!event.defaultPrevented) {
      navigation.navigate(routeName as never);
    }
  };

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: colors.surfaceContainer,
          borderColor: `${colors.outlineVariant}66`,
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
      pointerEvents="box-none"
    >
      <View style={styles.row} pointerEvents="box-none">
        {TAB_ITEMS.map((tab) => (
          <NavTabItem
            key={tab.name}
            label={tab.label}
            icon={tab.icon}
            isSelected={activeRoute === tab.name}
            onPress={() => go(tab.name)}
          />
        ))}

        {/* Center Raised Trade Action */}
        <View style={styles.tradeColumn} pointerEvents="box-none">
          <Pressable
            onPress={() => go("trade")}
            style={[styles.tradeBtn, { backgroundColor: colors.primary, borderColor: `${colors.outlineVariant}80` }]}
          >
            <AppIcon name="swap_horiz" size={26} color={colors.onPrimary} />
          </Pressable>
          <Text style={{ fontSize: 11, fontWeight: "700", color: colors.primary, marginTop: 2 }}>Trade</Text>
        </View>

        {RIGHT_TAB_ITEMS.map((tab) => (
          <NavTabItem
            key={tab.name}
            label={tab.label}
            icon={tab.icon}
            isSelected={activeRoute === tab.name}
            onPress={() => go(tab.name)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderTopWidth: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  tradeColumn: {
    alignItems: "center",
    transform: [{ translateY: -8 }],
  },
  tradeBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
});

function NavTabItem({
  label,
  icon,
  isSelected,
  onPress,
}: {
  label: string;
  icon: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} style={styles2.tabItem}>
      <AppIcon
        name={icon as any}
        size={24}
        color={isSelected ? colors.primary : `${colors.onSurfaceVariant}99`}
      />
      <Text
        style={{
          marginTop: 3,
          fontSize: 10,
          fontWeight: isSelected ? "700" : "400",
          color: isSelected ? colors.primary : `${colors.onSurfaceVariant}99`,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles2 = StyleSheet.create({
  tabItem: { alignItems: "center", paddingVertical: 4, paddingHorizontal: 12 },
});
