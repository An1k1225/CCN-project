import React, { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppIcon } from "@/components/app-icon";
import { EcoImage } from "@/components/eco-image";
import { TopRightProfileAvatar } from "@/components/common";
import { TradeProposalSheet } from "@/components/trade-proposal-sheet";
import { TYPE, useTheme } from "@/constants/theme";
import { useStore } from "@/data/store";

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    allListingsWithFavorites,
    userProfile,
    hasAccount,
    toggleFavorite,
    openTradeProposal,
    closeTradeProposal,
    tradeProposalTarget,
    submitTradeProposal,
  } = useStore();
  const { colors } = useTheme();

  // Reset selected image when switching items
  const [selectedImageIndexByItemId, setSelectedImageIndexByItemId] = useState<Record<string, number>>({});

  const item = allListingsWithFavorites.find((l) => l.id === id);

  const images = useMemo(() => {
    if (!item) return [] as string[];
    if (item.additionalImages.length > 0) return item.additionalImages;
    return [item.imageUrl];
  }, [item]);

  const selectedImageIndex = id ? (selectedImageIndexByItemId[id] ?? 0) : 0;

  if (!item) {
    // Item missing → go back to dashboard
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.missingWrap}>
          <Text style={{ color: colors.onSurfaceVariant }}>Listing not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const heroUrl = images[selectedImageIndex] ?? item.imageUrl;

  const backToTabs = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top", "bottom"]}>
      {/* Top App Bar */}
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable onPress={backToTabs} hitSlop={8} testID="detail_back_btn">
          <AppIcon name="arrow_back" size={24} color={colors.onSurface} />
        </Pressable>

        <Text style={[TYPE.titleLarge, { fontWeight: "700", color: colors.onSurface, flex: 1, textAlign: "center" }]}>
          Listing Details
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable onPress={() => {}} hitSlop={8} testID="detail_share_btn">
            <AppIcon name="share" size={22} color={colors.onSurfaceVariant} />
          </Pressable>
          <Pressable onPress={() => toggleFavorite(item.id)} hitSlop={8} testID="detail_fav_btn" style={{ marginLeft: 14 }}>
            <AppIcon
              name={item.isFavorite ? "favorite" : "favorite_border"}
              size={22}
              color={item.isFavorite ? colors.tertiary : colors.onSurfaceVariant}
            />
          </Pressable>
          <View style={{ marginLeft: 12, marginRight: 8 }}>
            <TopRightProfileAvatar
              avatarUrl={userProfile.avatarUrl}
              onClick={() => router.navigate("/(tabs)/profile")}
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Hero Image */}
        <View style={[styles.hero, { backgroundColor: colors.surfaceVariant }]}>
          <EcoImage url={heroUrl} accessibilityLabel={item.title} style={styles.fill} />

          <View style={[styles.ecoBadge, { backgroundColor: `${colors.surface}F0` }]}>
            <AppIcon name="eco" size={16} color={colors.primary} />
            <Text style={{ fontSize: 11, fontWeight: "700", color: colors.primary, marginLeft: 4 }}>
              {item.co2SavedKg} kg CO2 Saved
            </Text>
          </View>
        </View>

        {/* Thumbnails */}
        {images.length > 1 && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={(_, index) => `${item.id}_img_${index}`}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8, gap: 8 }}
            renderItem={({ item: imgUrl, index }) => {
              const isSelected = index === selectedImageIndex;
              return (
                <Pressable
                  onPress={() =>
                    setSelectedImageIndexByItemId((prev) => ({ ...prev, [item.id]: index }))
                  }
                  style={[
                    styles.thumb,
                    isSelected ? { borderWidth: 2, borderColor: colors.primary } : { borderWidth: 0 },
                  ]}
                >
                  <EcoImage url={imgUrl} accessibilityLabel={`Angle ${index}`} style={styles.fill} />
                </Pressable>
              );
            }}
          />
        )}

        {/* Details Body */}
        <View style={{ padding: 20 }}>
          <View style={styles.rowBetween}>
            <View style={[styles.tagChip, { backgroundColor: `${colors.primaryContainer}33` }]}>
              <Text style={{ fontSize: 12, fontWeight: "700", color: colors.primary }}>{item.category}</Text>
            </View>
            <View style={[styles.tagChip, { backgroundColor: colors.secondaryContainer }]}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: colors.onSecondaryContainer }}>
                {item.condition}
              </Text>
            </View>
          </View>

          <Text style={[TYPE.headlineMedium, { fontWeight: "700", color: colors.onBackground, marginTop: 10 }]}>
            {item.title}
          </Text>

          <View style={[styles.rowCenter, { marginTop: 4 }]}>
            <AppIcon name="location_on" size={16} color={colors.outline} />
            <Text style={[TYPE.bodyMedium, { color: colors.onSurfaceVariant, marginLeft: 4 }]}>
              {item.distanceKm} km away • Portland, OR
            </Text>
          </View>

          <View style={{ height: 16 }} />

          {/* Owner Card */}
          <View style={[styles.ownerCard, { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}66` }]}>
            <View style={[styles.rowCenter, { padding: 16 }]}>
              <View style={[styles.ownerAvatar, { backgroundColor: colors.surfaceVariant, overflow: "hidden" }]}>
                {item.ownerAvatarUrl !== "" ? (
                  <EcoImage url={item.ownerAvatarUrl} accessibilityLabel={item.ownerName} style={styles.fill} />
                ) : (
                  <AppIcon name="person" size={28} color={colors.onSecondaryContainer} />
                )}
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={styles.rowCenter}>
                  <Text style={[TYPE.titleMedium, { fontWeight: "700", color: colors.onSurface }]}>
                    {item.ownerName}
                  </Text>
                  {item.isVerifiedTrader && (
                    <View style={{ marginLeft: 4 }}>
                      <AppIcon name="verified" size={16} color={colors.primary} />
                    </View>
                  )}
                </View>
                <View style={[styles.rowCenter, { marginTop: 2 }]}>
                  <AppIcon name="star" size={14} color={colors.starGold} />
                  <Text style={[TYPE.bodySmall, { color: colors.onSurfaceVariant, marginLeft: 2 }]}>
                    {" "}
                    {item.ownerRating} ({item.ownerTradesCount} trades)
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ height: 18 }} />

          {/* Description */}
          <Text style={[TYPE.titleMedium, { fontWeight: "700", color: colors.onSurface }]}>Description</Text>
          <View style={{ height: 6 }} />
          <Text style={[TYPE.bodyMedium, { color: colors.onSurfaceVariant, lineHeight: 22 }]}>
            {item.description}
          </Text>

          <View style={{ height: 18 }} />

          {/* Looking For */}
          {item.lookingFor.length > 0 && (
            <>
              <Text style={[TYPE.titleMedium, { fontWeight: "700", color: colors.onSurface }]}>
                Looking to Trade For
              </Text>
              <View style={{ height: 8 }} />
              {item.lookingFor.map((need) => (
                <View key={need} style={[styles.rowCenter, { paddingVertical: 3, alignItems: "flex-start" }]}>
                  <AppIcon name="check_circle" size={16} color={colors.primary} />
                  <Text style={[TYPE.bodyMedium, { color: colors.onSurface, marginLeft: 8, flex: 1 }]}>
                    {need}
                  </Text>
                </View>
              ))}
            </>
          )}

          <View style={{ height: 20 }} />

          {/* Valuation Box */}
          <View style={[styles.valuationBox, { backgroundColor: colors.surfaceContainerHigh }]}>
            <View style={[styles.rowBetween, { padding: 16 }]}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 11, color: colors.outline }}>Estimated Exchange Value</Text>
                <Text style={[TYPE.titleLarge, { fontWeight: "700", color: colors.primary }]}>
                  {item.ecoPointsValue} Eco-Points (~${Math.trunc(item.estimatedPrice)})
                </Text>
              </View>
              <View style={[styles.valuationIconCircle, { backgroundColor: colors.primaryContainer }]}>
                <AppIcon name="eco" size={24} color={colors.onPrimaryContainer} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { backgroundColor: colors.surfaceContainer, borderTopColor: `${colors.outlineVariant}59` }]}>
        <Pressable
          onPress={() => router.navigate("/(tabs)/chat")}
          style={[styles.chatBtn, { borderColor: colors.outline }]}
          testID="detail_chat_btn"
        >
          <AppIcon name="chat_bubble_outline" size={18} color={colors.onSurface} />
          <Text style={{ marginLeft: 6, fontWeight: "600", color: colors.onSurface }}>Chat</Text>
        </Pressable>

        {hasAccount ? (
          <Pressable
            onPress={() => openTradeProposal(item)}
            style={[styles.proposeBtn, { backgroundColor: colors.primary }]}
            testID="detail_propose_exchange_btn"
          >
            <AppIcon name="swap_horiz" size={20} color={colors.onPrimary} />
            <Text style={{ marginLeft: 6, fontWeight: "700", color: colors.onPrimary }}>Propose Exchange</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => router.push("/auth")}
            style={[styles.proposeBtn, { backgroundColor: colors.secondary }]}
            testID="detail_signup_to_trade_btn"
          >
            <AppIcon name="person_add" size={20} color={colors.onSecondaryContainer} />
            <Text style={{ marginLeft: 6, fontWeight: "700", color: colors.onSecondaryContainer }}>Sign Up to Trade</Text>
          </Pressable>
        )}
      </View>

      {/* Trade Proposal Bottom Sheet */}
      {tradeProposalTarget != null && (
        <TradeProposalSheet
          key={tradeProposalTarget.id}
          listing={tradeProposalTarget}
          onDismiss={closeTradeProposal}
          onSubmit={(offeredItem, points, message) =>
            submitTradeProposal(tradeProposalTarget.id, offeredItem, points, message)
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  fill: { flex: 1, width: "100%", height: "100%" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  hero: { width: "100%", height: 260 },
  ecoBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  thumb: { width: 54, height: 54, borderRadius: 10, overflow: "hidden" },

  tagChip: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },

  ownerCard: { borderRadius: 20, borderWidth: 1 },
  ownerAvatar: { width: 50, height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" },

  valuationBox: { borderRadius: 16 },
  valuationIconCircle: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  chatBtn: {
    flex: 1,
    height: 50,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  proposeBtn: {
    flex: 1.6,
    height: 50,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  missingWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
});
