import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { BottomSheet, Host, Slider } from "@expo/ui";
import { AppIcon } from "@/components/app-icon";
import { EcoImage } from "@/components/eco-image";
import { TYPE, useTheme } from "@/constants/theme";
import { ListingItem } from "@/models/types";

export function TradeProposalSheet({
  listing,
  onDismiss,
  onSubmit,
}: {
  listing: ListingItem;
  onDismiss: () => void;
  onSubmit: (offeredItem: string, points: number, message: string) => void;
}) {
  const { colors } = useTheme();

  const [offeredItem, setOfferedItem] = useState("Fiddle Leaf Fig Plant + Ceramic Pot");
  const [ecoPointsOffer, setEcoPointsOffer] = useState(50);
  const [tradeMessage, setTradeMessage] = useState(
    "Hi Sarah, I would love to trade my potted fig tree for your vintage wood coffee table!"
  );

  return (
    <BottomSheet
      isPresented
      onDismiss={onDismiss}
      snapPoints={["full"]}
      contentPadding={0}
      testID="trade_proposal_sheet"
    >
      <View style={{ backgroundColor: colors.surfaceContainerLowest, flex: 1 }}>
        <ScrollView contentContainerStyle={styles.sheetContent} keyboardShouldPersistTaps="handled">
          {/* Header */}
          <View style={styles.rowBetween}>
            <Text style={[TYPE.titleLarge, { fontWeight: "700", color: colors.onSurface }]}>
              Propose an Exchange
            </Text>
            <Pressable onPress={onDismiss} hitSlop={10}>
              <AppIcon name="close" size={24} color={colors.outline} />
            </Pressable>
          </View>

          <View style={[styles.divider, { backgroundColor: `${colors.outlineVariant}4D`, marginVertical: 10 }]} />

          {/* Target Item Summary */}
          <View style={[styles.targetCard, { backgroundColor: colors.surfaceContainerLow }]}>
            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
              <View style={[styles.targetImage, { overflow: "hidden" }]}>
                <EcoImage url={listing.imageUrl} accessibilityLabel={listing.title} style={styles.fill} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[TYPE.titleMedium, { fontWeight: "600", color: colors.onSurface }]} numberOfLines={1}>
                  {listing.title}
                </Text>
                <Text style={[TYPE.bodySmall, { color: colors.primary }]}>
                  Trading with {listing.ownerName} • {listing.ecoPointsValue} pts
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: 16 }} />

          {/* Offered Item */}
          <Text style={[TYPE.labelLarge, { fontWeight: "700", color: colors.onSurface }]}>
            Item You Are Offering
          </Text>
          <View style={{ height: 6 }} />
          <TextInput
            style={[styles.input, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceVariant, color: colors.onSurface }]}
            placeholder="e.g., Ceramic Planter, Floor Lamp..."
            placeholderTextColor={`${colors.onSurfaceVariant}99`}
            value={offeredItem}
            onChangeText={setOfferedItem}
            testID="trade_offered_item_input"
          />

          <View style={{ height: 14 }} />

          {/* Eco Points */}
          <View style={styles.rowBetween}>
            <Text style={[TYPE.labelLarge, { fontWeight: "700", color: colors.onSurface }]}>
              Include Eco-Points
            </Text>
            <Text style={[TYPE.labelLarge, { fontWeight: "700", color: colors.primary }]}>
              +{Math.round(ecoPointsOffer)} pts
            </Text>
          </View>
          <Host matchContents>
            <Slider
              value={ecoPointsOffer}
              min={0}
              max={200}
              step={10}
              onValueChange={(v) => setEcoPointsOffer(v)}
              testID="trade_points_slider"
            />
          </Host>

          <View style={{ height: 12 }} />

          {/* Note */}
          <Text style={[TYPE.labelLarge, { fontWeight: "700", color: colors.onSurface }]}>Note to Trader</Text>
          <View style={{ height: 6 }} />
          <TextInput
            style={[
              styles.input,
              styles.multiline,
              { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceVariant, color: colors.onSurface },
            ]}
            value={tradeMessage}
            onChangeText={setTradeMessage}
            multiline
            textAlignVertical="top"
            testID="trade_message_input"
          />

          <View style={{ height: 20 }} />

          {/* Submit */}
          <Pressable
            onPress={() => {
              if (offeredItem.trim()) {
                onSubmit(offeredItem.trim(), Math.round(ecoPointsOffer), tradeMessage);
              }
            }}
            style={[styles.submitBtn, { backgroundColor: colors.tertiary }]}
            testID="trade_submit_proposal_btn"
          >
            <AppIcon name="swap_horiz" size={20} color={colors.onTertiaryContainer} />
            <Text style={{ color: colors.onTertiaryContainer, fontWeight: "700", fontSize: 16, marginLeft: 8 }}>
              Send Trade Proposal
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 40,
  },
  sheetContent: { paddingHorizontal: 24, paddingBottom: 32, paddingTop: 8 },
  divider: { height: StyleSheet.hairlineWidth },

  targetCard: { borderRadius: 14 },
  targetImage: { width: 56, height: 56, borderRadius: 8 },
  fill: { flex: 1, width: "100%", height: "100%" },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  multiline: { minHeight: 90 },

  submitBtn: {
    height: 50,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
