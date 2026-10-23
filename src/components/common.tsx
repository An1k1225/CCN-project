import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { ListingItem } from "@/models/types";
import { AppIcon } from "@/components/app-icon";
import { EcoImage } from "@/components/eco-image";
import { Palette, TYPE, useTheme } from "@/constants/theme";

export function TopRightProfileAvatar({
  avatarUrl,
  onClick,
}: {
  avatarUrl: string;
  onClick: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onClick} style={[styles.avatar42, { borderColor: `${colors.primary}D9` }]}>
      {avatarUrl ? (
        <EcoImage url={avatarUrl} accessibilityLabel="Profile Picture - View Profile" style={styles.fill} />
      ) : (
        <View style={[styles.fill, styles.center, { backgroundColor: colors.primaryContainer }]}>
          <AppIcon name="person" size={22} color={colors.onPrimaryContainer} />
        </View>
      )}
    </Pressable>
  );
}

export function TopEcoHeader({
  title = "EcoTrade",
  locationName = "0.5 mi • Portland",
  onLocationClick = () => {},
  onProfileClick,
  avatarUrl = "",
}: {
  title?: string;
  locationName?: string;
  onLocationClick?: () => void;
  onProfileClick: () => void;
  avatarUrl?: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.headerRow}>
      <View>
        <Text style={[TYPE.labelSmall, { color: colors.primary, fontWeight: "700", fontSize: 9, letterSpacing: 1.5 }]}>
          PRIVACY SECURED
        </Text>
        <Pressable onPress={onLocationClick} style={styles.locationRow}>
          <AppIcon name="location_on" size={16} color={colors.primary} />
          <Text style={[TYPE.labelSmall, { color: colors.onSurfaceVariant, fontWeight: "500", marginLeft: 4 }]}>
            {locationName}
          </Text>
        </Pressable>
      </View>

      <View style={styles.headerCenterRow}>
        <AppIcon name="eco" size={22} color={colors.primary} />
        <Text style={[TYPE.titleLarge, { fontWeight: "700", color: colors.onSurface, marginLeft: 6 }]}>
          {title}
        </Text>
      </View>

      <View style={styles.headerRightRow}>
        <TopRightProfileAvatar avatarUrl={avatarUrl} onClick={onProfileClick} />
      </View>
    </View>
  );
}

export function ListingItemCard({
  item,
  onItemClick,
  onFavoriteToggle,
  width,
}: {
  item: ListingItem;
  onItemClick: (item: ListingItem) => void;
  onFavoriteToggle: (id: string) => void;
  width: number | `${number}%`;
}) {
  const { colors } = useTheme();

  const tagBg =
    item.tradeType === "TRADE"
      ? colors.primaryContainer
      : item.tradeType === "FREE"
        ? colors.tertiaryContainer
        : colors.secondaryContainer;
  const tagColor =
    item.tradeType === "TRADE"
      ? colors.onPrimaryContainer
      : item.tradeType === "FREE"
        ? colors.onTertiaryContainer
        : colors.onSecondaryContainer;
  const tagLabel =
    item.tradeType === "TRADE"
      ? "TRADE"
      : item.tradeType === "FREE"
        ? "FREE"
        : `${item.ecoPointsValue} PTS`;

  return (
    <Pressable onPress={() => onItemClick(item)} style={[cardOuterStyle(width), { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}66` }]}>
      <View style={{ padding: 8 }}>
        <View
          style={[
            styles.imageBox130,
            { backgroundColor: colors.surface, borderColor: `${colors.outlineVariant}4D` },
          ]}
        >
          <EcoImage url={item.imageUrl} accessibilityLabel={item.title} style={styles.fill} />

          <View
            style={[
              styles.pill,
              styles.ecoPill,
              { backgroundColor: `${colors.surfaceContainerHighest}EB`, borderColor: `${colors.outlineVariant}80` },
            ]}
          >
            <AppIcon name="eco" size={11} color={colors.primary} />
            <Text style={{ fontSize: 9, fontWeight: "700", color: colors.onSurface, marginLeft: 3 }}>
              {item.ecoImpactLevel}
            </Text>
          </View>

          {item.inventoryCount >= 1 && item.inventoryCount <= 2 && (
            <View style={[styles.lowStockBadge, { backgroundColor: colors.primaryContainer }]}>
              <Text style={{ fontSize: 8, fontWeight: "700", color: colors.onPrimaryContainer }}>LOW STOCK</Text>
            </View>
          )}
        </View>

        <View style={styles.cardInfo}>
          <Text numberOfLines={1} style={[TYPE.titleMedium, { fontWeight: "600", color: colors.onSurface }]}>
            {item.title}
          </Text>

          <View style={styles.rowCenter}>
            <AppIcon name="location_on" size={12} color={colors.onSurfaceVariant} />
            <Text style={{ fontSize: 11, color: colors.onSurfaceVariant, marginLeft: 2 }}>
              {item.distanceKm} km away
            </Text>
          </View>

          {item.isVerifiedTrader && (
            <View style={[styles.pill, styles.selfStart, { backgroundColor: `${colors.primaryContainer}40`, borderColor: `${colors.primary}4D`, marginTop: 4 }]}>
              <AppIcon name="verified" size={11} color={colors.primary} />
              <Text style={{ fontSize: 8, fontWeight: "700", color: colors.primary, marginLeft: 3 }}>VERIFIED</Text>
            </View>
          )}

          <View style={[styles.rowCenter, { marginTop: 4 }]}>
            <AppIcon name="star" size={12} color={colors.starGold} />
            <Text style={{ fontSize: 11, color: colors.onSurfaceVariant, marginLeft: 2 }}>{item.ownerRating}</Text>
          </View>

          <View style={[styles.rowBetween, { marginTop: 8 }]}>
            <View style={[styles.tagBox, { backgroundColor: tagBg }]}>
              <Text style={{ fontSize: 9, fontWeight: "700", color: tagColor, letterSpacing: 0.5 }}>{tagLabel}</Text>
            </View>

            <Pressable
              onPress={() => onFavoriteToggle(item.id)}
              style={[styles.favBtn30, { backgroundColor: colors.surfaceVariant, borderColor: `${colors.outlineVariant}66` }]}
            >
              <AppIcon
                name={item.isFavorite ? "favorite" : "favorite_border"}
                size={15}
                color={item.isFavorite ? colors.primary : colors.onSurfaceVariant}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export function TrendingItemCard({
  item,
  onItemClick,
  onFavoriteToggle,
}: {
  item: ListingItem;
  onItemClick: (item: ListingItem) => void;
  onFavoriteToggle: (id: string) => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={() => onItemClick(item)} style={[styles.trendingCard, { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}66` }]}>
      <View style={{ padding: 8 }}>
        <View style={[styles.imageBox140, { backgroundColor: colors.surface, borderColor: `${colors.outlineVariant}4D` }]}>
          <EcoImage url={item.imageUrl} accessibilityLabel={item.title} style={styles.fill} />
          <Pressable
            onPress={() => onFavoriteToggle(item.id)}
            style={[styles.trendFavBtn, { backgroundColor: colors.surfaceVariant, borderColor: `${colors.outlineVariant}80` }]}
          >
            <AppIcon
              name={item.isFavorite ? "favorite" : "favorite_border"}
              size={16}
              color={item.isFavorite ? colors.primary : colors.onSurfaceVariant}
            />
          </Pressable>
        </View>

        <View style={styles.cardInfo}>
          <View style={styles.rowBetween}>
            <Text numberOfLines={1} style={[TYPE.titleMedium, { fontWeight: "600", color: colors.onSurface, flex: 1 }]}>
              {item.title}
            </Text>
            {item.isVerifiedTrader && (
              <View style={{ marginLeft: 4 }}>
                <AppIcon name="verified" size={16} color={colors.primary} />
              </View>
            )}
          </View>

          <Text style={{ fontSize: 12, color: colors.onSurfaceVariant, marginTop: 2 }}>
            {item.distanceMiles} miles away
          </Text>

          <View style={[styles.rowBetween, { marginTop: 8 }]}>
            <View style={styles.rowCenter}>
              <View style={[styles.ownerAvatar22, { backgroundColor: colors.secondaryContainer }]}>
                {item.ownerAvatarUrl ? (
                  <EcoImage url={item.ownerAvatarUrl} accessibilityLabel={item.ownerName} style={styles.fill} />
                ) : (
                  <AppIcon name="person" size={14} color={colors.onSecondaryContainer} />
                )}
              </View>
              <Text style={[TYPE.labelSmall, { color: colors.onSurfaceVariant, marginLeft: 6 }]}>{item.ownerName}</Text>
            </View>

            <View style={styles.rowCenter}>
              <AppIcon name="star" size={14} color={colors.starGold} />
              <Text style={{ fontSize: 12, fontWeight: "700", color: colors.onSurfaceVariant, marginLeft: 2 }}>
                {item.ownerRating}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export function BrowseCategoryCard({
  categoryName,
  iconName,
  isSelected,
  onClick,
  width,
}: {
  categoryName: string;
  iconName: string;
  isSelected: boolean;
  onClick: () => void;
  width: number | `${number}%`;
}) {
  const { colors } = useTheme();
  const iconMap: Record<string, any> = {
    chair: "chair",
    local_florist: "local_florist",
    menu_book: "menu_book",
    restaurant: "restaurant",
    devices: "devices",
    checkroom: "checkroom",
    verified: "verified",
  };
  return (
    <Pressable
      onPress={onClick}
      style={[
        browseCatCardStyle(width),
        {
          backgroundColor: isSelected ? colors.primaryContainer : colors.surfaceContainer,
          borderColor: isSelected ? colors.primary : `${colors.outlineVariant}59`,
        },
      ]}
    >
      <View
        style={[
          styles.browseCatIconWrap,
          { backgroundColor: isSelected ? `${colors.primary}26` : colors.surfaceVariant },
        ]}
      >
        <AppIcon
          name={(iconMap[iconName.toLowerCase()] ?? "eco") as any}
          size={24}
          color={isSelected ? colors.primary : colors.onSurfaceVariant}
        />
      </View>
      <Text
        numberOfLines={1}
        style={{
          marginTop: 8,
          fontSize: 12,
          fontWeight: isSelected ? "700" : "500",
          color: isSelected ? colors.onPrimaryContainer : colors.onSurface,
        }}
      >
        {categoryName}
      </Text>
    </Pressable>
  );
}

export function RecentSearchChip({
  text,
  onClick,
  onDelete,
}: {
  text: string;
  onClick: () => void;
  onDelete: () => void;
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.recentChip, { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}80` }]}>
      <Pressable onPress={onClick} style={styles.rowCenter}>
        <AppIcon name="history" size={16} color={colors.outline} />
        <Text style={[TYPE.bodySmall, { color: colors.onSurfaceVariant, marginLeft: 6 }]}>{text}</Text>
      </Pressable>
      <Pressable onPress={onDelete} style={styles.chipDelete}>
        <AppIcon name="close" size={14} color={colors.outline} />
      </Pressable>
    </View>
  );
}

export function LoadingIndicator({ color }: { color?: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.loadingWrap}>
      <ActivityIndicator color={color ?? colors.primary} />
    </View>
  );
}

const cardOuterStyle = (width: number | `${number}%`): ViewStyle => ({
  width: width as number,
  borderRadius: 20,
  borderWidth: 1,
  overflow: "hidden",
});

const browseCatCardStyle = (width: number | `${number}%`): ViewStyle => ({
  width: width as number,
  borderRadius: 18,
  borderWidth: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: 14,
});

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center" },
  fill: { flex: 1, width: "100%", height: "100%" },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  selfStart: { alignSelf: "flex-start" },

  avatar42: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    overflow: "hidden",
    backgroundColor: "#00000011",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerCenterRow: { flexDirection: "row", alignItems: "center" },
  headerRightRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  locationRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },

  imageBox130: {
    height: 130,
    borderRadius: 14,
    borderWidth: 0.5,
    overflow: "hidden",
  },
  imageBox140: {
    height: 140,
    borderRadius: 14,
    borderWidth: 0.5,
    overflow: "hidden",
  },
  cardInfo: { paddingHorizontal: 4, paddingTop: 8, paddingBottom: 4 },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 0.5,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  ecoPill: { position: "absolute", top: 6, right: 6 },
  lowStockBadge: {
    position: "absolute",
    bottom: 6,
    left: 6,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  favBtn30: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tagBox: { borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },

  trendingCard: { width: 250, borderRadius: 20, borderWidth: 1, overflow: "hidden" },
  trendFavBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ownerAvatar22: {
    width: 22,
    height: 22,
    borderRadius: 11,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  browseCatIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },

  recentChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    paddingLeft: 12,
    paddingRight: 4,
    paddingVertical: 4,
    marginRight: 8,
  },
  chipDelete: { width: 24, height: 24, alignItems: "center", justifyContent: "center" },

  loadingWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
});

// Re-export palette type for consumers building screen styles
export type { Palette };
