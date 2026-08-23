import React, { useCallback } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppIcon, getCategoryIconName } from "@/components/app-icon";
import { ListingItemCard, TopEcoHeader } from "@/components/common";
import { TYPE, useTheme } from "@/constants/theme";
import { useStore } from "@/data/store";
import { categories } from "@/data/sample-data";
import { ListingItem } from "@/models/types";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const {
    allListingsWithFavorites,
    userProfile,
    filterState,
    setCategoryFilter,
    toggleFavorite,
    toggleDarkMode,
    isDarkMode,
    togglePrivacyMode,
    openFilterSheet,
  } = useStore();

  const cardWidth = (width - 16 * 2 - 12) / 2;

  const activeCategory = filterState.category;
  const displayListings =
    !activeCategory || activeCategory.toLowerCase() === "all"
      ? allListingsWithFavorites
      : activeCategory.toLowerCase() === "verified"
        ? allListingsWithFavorites.filter((l) => l.isVerifiedTrader)
        : allListingsWithFavorites.filter(
            (l) => l.category.toLowerCase() === activeCategory.toLowerCase()
          );

  const onItemClick = useCallback((item: ListingItem) => {
    router.push({ pathname: "/listing/[id]", params: { id: item.id } });
  }, []);

  const goToSearch = () => router.navigate("/(tabs)/search");
  const goToProfile = () => router.navigate("/(tabs)/profile");

  const header = (
    <View>
      <TopEcoHeader
        locationName="Portland, OR"
        onLocationClick={togglePrivacyMode}
        onProfileClick={goToProfile}
        avatarUrl={userProfile.avatarUrl}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleDarkMode}
      />

      {/* Search Bar Trigger + Filter */}
      <View style={styles.searchRow}>
        <Pressable
          onPress={goToSearch}
          style={[
            styles.searchTrigger,
            { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}80` },
          ]}
        >
          <AppIcon name="search" size={20} color={colors.outline} />
          <Text style={[TYPE.bodyMedium, { color: colors.outline, marginLeft: 10, flex: 1 }]}>
            Search items nearby...
          </Text>
        </Pressable>

        <Pressable onPress={() => { goToSearch(); openFilterSheet(); }} style={[styles.filterBtn, { backgroundColor: colors.primary }]}>
          <AppIcon name="tune" size={22} color={colors.onPrimary} />
        </Pressable>
      </View>

      {/* Real-time Inventory Status Alert */}
      <View
        style={[
          styles.inventoryAlert,
          { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}66` },
        ]}
      >
        <AppIcon name="eco" size={16} color={colors.primary} />
        <Text style={{ fontSize: 12, fontWeight: "500", color: colors.onSurface, marginLeft: 8 }}>
          Real-time inventory: {allListingsWithFavorites.length} items available nearby
        </Text>
      </View>

      {/* Categories */}
      <Text
        style={[
          TYPE.labelMedium,
          { fontWeight: "700", letterSpacing: 1, color: colors.onSurfaceVariant, marginTop: 4, marginBottom: 8 },
        ]}
      >
        CATEGORIES
      </Text>

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(c) => c.id}
          contentContainerStyle={{ gap: 8, paddingBottom: 6 }}
          renderItem={({ item: cat }) => {
            const isSelected =
              (cat.id === "all" && filterState.category === null) ||
              filterState.category?.toLowerCase() === cat.name.toLowerCase();
            return (
              <Pressable
                onPress={() => setCategoryFilter(cat.id === "all" ? null : cat.name)}
                style={[
                  styles.catChip,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.surfaceContainer,
                    borderColor: isSelected ? colors.primary : `${colors.outlineVariant}66`,
                  },
                ]}
              >
                <AppIcon
                  name={getCategoryIconName(cat.iconName)}
                  size={16}
                  color={isSelected ? colors.onPrimary : colors.onSurface}
                />
                <Text
                  style={{
                    marginLeft: 6,
                    fontSize: 12,
                    fontWeight: "600",
                    color: isSelected ? colors.onPrimary : colors.onSurface,
                  }}
                >
                  {cat.name}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* New Listings Header */}
      <View style={[styles.rowBetween, { marginTop: 8, marginBottom: 4 }]}>
        <Text style={[TYPE.labelMedium, { fontWeight: "700", letterSpacing: 1, color: colors.onSurfaceVariant }]}>
          NEW LISTINGS
        </Text>
        <Pressable onPress={goToSearch}>
          <Text style={{ fontSize: 12, fontWeight: "700", color: colors.primary }}>View All</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          data={displayListings}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ListHeaderComponent={header}
          columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingBottom: 90, paddingTop: 4, rowGap: 12 }}
          ItemSeparatorComponent={null}
          renderItem={({ item }) => (
            <ListingItemCard
              item={item}
              onItemClick={onItemClick}
              onFavoriteToggle={toggleFavorite}
              width={cardWidth}
            />
          )}
          style={{ marginBottom: 12 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
  },
  searchTrigger: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterBtn: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  inventoryAlert: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 12,
  },
  catChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
});
