import React, { useCallback } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BrowseCategoryCard,
  ListingItemCard,
  RecentSearchChip,
  TopRightProfileAvatar,
  TrendingItemCard,
} from "@/components/common";
import { FilterSheet } from "@/components/filter-sheet";
import { AppIcon } from "@/components/app-icon";
import { TYPE, useTheme } from "@/constants/theme";
import { useStore } from "@/data/store";
import { browseGridCategories } from "@/data/sample-data";
import { ListingItem } from "@/models/types";

export default function SearchScreen() {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const {
    filterState,
    recentSearches,
    filteredListings,
    userProfile,
    setSearchQuery,
    commitSearch,
    resetFilter,
    setCategoryFilter,
    removeRecentSearch,
    clearAllRecentSearches,
    toggleFavorite,
    showFilterSheet,
    openFilterSheet,
    closeFilterSheet,
    updateFilter,
    showToast,
  } = useStore();

  const cardWidth = (width - 16 * 2 - 12) / 2;
  const catWidth = (width - 16 * 2 - 10 * 2) / 3;

  const isSearching =
    filterState.query.trim() !== "" ||
    filterState.category !== null ||
    filterState.brand !== null;

  const onItemClick = useCallback((item: ListingItem) => {
    router.push({ pathname: "/listing/[id]", params: { id: item.id } });
  }, []);

  const goToProfile = () => router.navigate("/(tabs)/profile");

  const activeFilterCount =
    (filterState.category !== null ? 1 : 0) +
    (filterState.brand !== null ? 1 : 0) +
    (filterState.condition !== null ? 1 : 0) +
    (filterState.tradeType !== null ? 1 : 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Search Header */}
        <View style={styles.headerWrap}>
          <View style={styles.rowBetween}>
            <Text style={[TYPE.displayMedium, { fontWeight: "700", color: colors.primary, fontSize: 36, lineHeight: 44 }]}>
              Discover
            </Text>
            <TopRightProfileAvatar avatarUrl={userProfile.avatarUrl} onClick={goToProfile} />
          </View>

          {/* Search Bar */}
          <View
            style={[
              styles.searchPill,
              { backgroundColor: `${colors.secondaryContainer}66`, borderColor: `${colors.primary}1A` },
            ]}
          >
            <AppIcon name="search" size={22} color={colors.outline} />
            <TextInput
              style={[styles.searchInput, { color: colors.onSurface }]}
              placeholder="Search items to exchange..."
              placeholderTextColor={`${colors.outlineVariant}E6`}
              value={filterState.query}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => {
                commitSearch();
              }}
              returnKeyType="search"
              autoCapitalize="none"
            />

            {filterState.query.trim() !== "" && (
              <Pressable onPress={() => setSearchQuery("")} hitSlop={6}>
                <AppIcon name="close" size={16} color={colors.outline} />
              </Pressable>
            )}

            <Pressable
              onPress={() => showToast("Voice search activated: listening for items...")}
              hitSlop={6}
              style={{ marginLeft: 8 }}
            >
              <AppIcon name="mic" size={20} color={colors.primary} />
            </Pressable>

            <View style={[styles.verticalDivider, { backgroundColor: `${colors.outlineVariant}80` }]} />

            <Pressable onPress={openFilterSheet} hitSlop={6} style={{ marginLeft: 6 }}>
              <View>
                <AppIcon name="tune" size={20} color={colors.primary} />
                {activeFilterCount > 0 && (
                  <View style={[styles.filterBadge, { backgroundColor: colors.tertiary }]}>
                    <Text style={{ fontSize: 10, fontWeight: "700", color: colors.onTertiaryContainer }}>
                      {activeFilterCount}
                    </Text>
                  </View>
                )}
              </View>
            </Pressable>
          </View>
        </View>

        {isSearching ? (
          /* Results Mode */
          filteredListings.length === 0 ? (
            <View style={styles.emptyWrap}>
              <AppIcon name="search" size={48} color={colors.outline} />
              <Text style={[TYPE.titleMedium, { fontWeight: "700", color: colors.onSurface, marginTop: 12 }]}>
                No items match your filters
              </Text>
              <Text style={[TYPE.bodySmall, { color: colors.onSurfaceVariant, marginTop: 6, textAlign: "center" }]}>
                Try adjusting the price range, category, or brand filter.
              </Text>
              <Pressable
                onPress={resetFilter}
                style={[styles.emptyBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={{ color: colors.onPrimary, fontWeight: "600" }}>Clear All Filters</Text>
              </Pressable>
            </View>
          ) : (
            <FlatList
              data={filteredListings}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
              contentContainerStyle={{ paddingBottom: 90, paddingTop: 4, rowGap: 12 }}
              ListHeaderComponent={
                <View style={[styles.rowBetween, { paddingHorizontal: 20, paddingVertical: 6 }]}>
                  <Text style={{ fontSize: 12, fontWeight: "700", color: colors.primary }}>
                    {filteredListings.length} results found
                  </Text>
                  <Pressable onPress={resetFilter}>
                    <Text style={{ fontSize: 11, fontWeight: "700", color: colors.tertiary }}>Reset</Text>
                  </Pressable>
                </View>
              }
              renderItem={({ item }) => (
                <ListingItemCard
                  item={item}
                  onItemClick={onItemClick}
                  onFavoriteToggle={toggleFavorite}
                  width={cardWidth}
                />
              )}
            />
          )
        ) : (
          /* Discovery Mode */
          <ScrollView contentContainerStyle={{ paddingBottom: 90, paddingHorizontal: 16 }}>
            {recentSearches.length > 0 && (
              <View>
                <View style={styles.rowBetween}>
                  <Text style={[TYPE.headlineSmall, { fontWeight: "700", color: colors.onSurface }]}>
                    Recent Searches
                  </Text>
                  <Pressable onPress={clearAllRecentSearches}>
                    <Text style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1, color: colors.primary }}>
                      CLEAR ALL
                    </Text>
                  </Pressable>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 8 }}>
                  {recentSearches.map((query) => (
                    <RecentSearchChip
                      key={query}
                      text={query}
                      onClick={() => setSearchQuery(query)}
                      onDelete={() => removeRecentSearch(query)}
                    />
                  ))}
                </ScrollView>
              </View>
            )}

            <Text style={[TYPE.headlineSmall, { fontWeight: "700", color: colors.onSurface, marginTop: 10, marginBottom: 4 }]}>
              Browse Categories
            </Text>

            <View style={styles.catGrid}>
              {browseGridCategories.map((cat) => {
                const isSelected = filterState.category?.toLowerCase() === cat.name.toLowerCase();
                return (
                  <BrowseCategoryCard
                    key={cat.id}
                    categoryName={cat.name}
                    iconName={cat.iconName}
                    isSelected={isSelected}
                    onClick={() => setCategoryFilter(isSelected ? null : cat.name)}
                    width={catWidth}
                  />
                );
              })}
            </View>

            <View style={[styles.rowBetween, { marginTop: 14 }]}>
              <Text style={[TYPE.headlineSmall, { fontWeight: "700", color: colors.onSurface }]}>
                Trending Near You
              </Text>
              <Pressable onPress={() => setCategoryFilter(null)}>
                <Text style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1, color: colors.primary }}>
                  SEE ALL
                </Text>
              </Pressable>
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={filteredListings.slice(0, 4)}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ gap: 14, paddingVertical: 10 }}
              renderItem={({ item }) => (
                <TrendingItemCard item={item} onItemClick={onItemClick} onFavoriteToggle={toggleFavorite} />
              )}
            />
          </ScrollView>
        )}

        {showFilterSheet && (
          <FilterSheet
            key="filter_sheet"
            initialFilter={filterState}
            onApplyFilter={updateFilter}
            onDismiss={closeFilterSheet}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerWrap: { paddingHorizontal: 20, paddingVertical: 12 },
  searchPill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 8,
  },
  searchInput: { flex: 1, fontSize: 14, marginLeft: 8, paddingVertical: 8 },
  verticalDivider: { width: 1, height: 20, marginLeft: 8 },
  filterBadge: {
    position: "absolute",
    top: -5,
    right: -7,
    minWidth: 15,
    height: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },

  emptyWrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  emptyBtn: { marginTop: 16, borderRadius: 999, paddingHorizontal: 20, paddingVertical: 10 },

  catGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
});
