import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppIcon } from "@/components/app-icon";
import { EcoImage } from "@/components/eco-image";
import { TopRightProfileAvatar } from "@/components/common";
import { TYPE, useTheme } from "@/constants/theme";
import { useStore } from "@/data/store";
import { TradeOffer } from "@/models/types";

const FORM_CATEGORIES = ["Furniture", "Garden", "Books", "Kitchenware", "Electronics", "Clothing"];

export default function TradeTabScreen() {
  const [selectedSection, setSelectedSection] = useState(0);

  // Form states for Listing Item
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Furniture");
  const [newBrand, setNewBrand] = useState("");
  const [newCondition] = useState("Excellent");
  const [newPoints, setNewPoints] = useState("100");
  const [newDesc, setNewDesc] = useState("");
  const [newLookingFor, setNewLookingFor] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const {
    tradeOffers,
    userProfile,
    addNewListing,
    showToast,
  } = useStore();
  const { colors } = useTheme();

  const goToProfile = () => router.navigate("/(tabs)/profile");

  const publish = () => {
    if (newTitle.trim()) {
      const pts = parseInt(newPoints, 10) || 100;
      const wishes = newLookingFor
        .split(",")
        .map((w) => w.trim())
        .filter((w) => w);
      addNewListing(
        newTitle.trim(),
        newCategory,
        newBrand.trim() ? newBrand : "EcoTrader",
        newCondition,
        "TRADE",
        pts,
        newDesc.trim()
          ? newDesc.trim()
          : "Gently used item in great shape, looking to exchange for household necessities.",
        wishes.length > 0 ? wishes : ["Open to offers"],
        ""
      );
      setNewTitle("");
      setNewDesc("");
      setNewLookingFor("");
      setSelectedSection(0);
    } else {
      showToast("Please enter an item title");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {/* Top Header */}
        <View style={styles.headerWrap}>
          <View style={styles.rowBetween}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={[TYPE.displayMedium, { fontWeight: "700", color: colors.primary, fontSize: 32, lineHeight: 40 }]}>
                Community Exchanges
              </Text>
              <Text style={[TYPE.bodyMedium, { color: colors.onSurfaceVariant }]}>
                Propose and manage your sustainable trades
              </Text>
            </View>
            <TopRightProfileAvatar avatarUrl={userProfile.avatarUrl} onClick={goToProfile} />
          </View>

          <View
            style={[
              styles.segmentedWrap,
              { backgroundColor: colors.surfaceVariant, borderColor: `${colors.outlineVariant}4D`, marginTop: 14 },
            ]}
          >
            <Pressable
              onPress={() => setSelectedSection(0)}
              style={[styles.segmentBtn, { backgroundColor: selectedSection === 0 ? colors.primary : "transparent", flex: 1 }]}
            >
              <Text
                style={{
                  color: selectedSection === 0 ? colors.onPrimary : colors.onSurfaceVariant,
                  fontWeight: "700",
                  fontSize: 12,
                  textAlign: "center",
                  paddingVertical: 10,
                }}
              >
                Active Offers ({tradeOffers.length})
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedSection(1)}
              style={[styles.segmentBtn, { backgroundColor: selectedSection === 1 ? colors.primary : "transparent", flex: 1 }]}
            >
              <Text
                style={{
                  color: selectedSection === 1 ? colors.onPrimary : colors.onSurfaceVariant,
                  fontWeight: "700",
                  fontSize: 12,
                  textAlign: "center",
                  paddingVertical: 10,
                }}
              >
                + List an Item
              </Text>
            </Pressable>
          </View>
        </View>

        {selectedSection === 0 ? (
          tradeOffers.length === 0 ? (
            <View style={styles.emptyWrap}>
              <AppIcon name="swap_horiz" size={48} color={colors.outline} />
              <Text style={[TYPE.titleMedium, { fontWeight: "700", color: colors.onSurface, marginTop: 12 }]}>
                No active trade proposals yet
              </Text>
              <Text style={[TYPE.bodySmall, { color: colors.onSurfaceVariant, marginTop: 6, textAlign: "center" }]}>
                Explore listings on Home or Discover to propose an item trade.
              </Text>
            </View>
          ) : (
            <FlatList
              data={tradeOffers}
              keyExtractor={(offer) => offer.id}
              contentContainerStyle={{ paddingHorizontal: 20, rowGap: 12, paddingBottom: 90 }}
              renderItem={({ item }) => <TradeOfferCard offer={item} />}
            />
          )
        ) : (
          /* List a New Item Form */
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, rowGap: 14 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Photo Placeholder */}
            <Pressable
              onPress={() => showToast("Default item photo selected")}
              style={[styles.photoCard, { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}80` }]}
            >
              <AppIcon name="photo_library" size={32} color={colors.primary} />
              <Text style={{ fontSize: 12, fontWeight: "700", color: colors.primary, marginTop: 6 }}>
                Add Item Photos
              </Text>
              <Text style={{ fontSize: 11, color: colors.onSurfaceVariant, textAlign: "center" }}>
                Clear images with good lighting increase trade interest
              </Text>
            </Pressable>

            {/* Title */}
            <FormField label="Item Title">
              <TextInput
                style={[styles.input, { borderColor: colors.outlineVariant, color: colors.onSurface }]}
                placeholder="e.g. Bamboo Desk Lamp"
                placeholderTextColor={`${colors.onSurfaceVariant}99`}
                value={newTitle}
                onChangeText={setNewTitle}
              />
            </FormField>

            {/* Category Dropdown (simple select) */}
            <FormField label="Category">
              <Pressable
                onPress={() => setIsCategoryDropdownOpen((v) => !v)}
                style={[styles.selectWrap, { borderColor: colors.outlineVariant, backgroundColor: colors.surface }]}
              >
                <Text style={{ color: colors.onSurface }}>{newCategory}</Text>
                <AppIcon name="arrow_forward" size={18} color={colors.outline} style={{ transform: [{ rotate: isCategoryDropdownOpen ? "-90deg" : "90deg" }] }} />
              </Pressable>
              {isCategoryDropdownOpen && (
                <View style={[styles.dropdown, { backgroundColor: colors.surfaceContainerLowest, borderColor: `${colors.outlineVariant}66` }]}>
                  {FORM_CATEGORIES.map((cat) => (
                    <Pressable
                      key={cat}
                      onPress={() => {
                        setNewCategory(cat);
                        setIsCategoryDropdownOpen(false);
                      }}
                      style={styles.dropdownItem}
                    >
                      <Text style={{ color: colors.onSurface }}>{cat}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </FormField>

            {/* Valuation */}
            <FormField label="Valuation (Eco-Points)">
              <TextInput
                style={[styles.input, { borderColor: colors.outlineVariant, color: colors.onSurface }]}
                placeholder="120"
                placeholderTextColor={`${colors.onSurfaceVariant}99`}
                value={newPoints}
                onChangeText={(t) => setNewPoints(t.replace(/[^0-9]/g, ""))}
                keyboardType="number-pad"
              />
            </FormField>

            {/* Brand (optional, kept minimal) */}
            <FormField label="Brand / Artisan (optional)">
              <TextInput
                style={[styles.input, { borderColor: colors.outlineVariant, color: colors.onSurface }]}
                placeholder="e.g. Handcrafted Studio"
                placeholderTextColor={`${colors.onSurfaceVariant}99`}
                value={newBrand}
                onChangeText={setNewBrand}
              />
            </FormField>

            {/* Description */}
            <FormField label="Description & Story">
              <TextInput
                style={[styles.input, styles.multiline, { borderColor: colors.outlineVariant, color: colors.onSurface }]}
                placeholder="Describe the condition, dimensions, and reasons for trading..."
                placeholderTextColor={`${colors.onSurfaceVariant}99`}
                value={newDesc}
                onChangeText={setNewDesc}
                multiline
                textAlignVertical="top"
              />
            </FormField>

            {/* Looking for */}
            <FormField label="What You're Looking For (comma separated)">
              <TextInput
                style={[styles.input, { borderColor: colors.outlineVariant, color: colors.onSurface }]}
                placeholder="Plant pots, Books, Tools..."
                placeholderTextColor={`${colors.onSurfaceVariant}99`}
                value={newLookingFor}
                onChangeText={setNewLookingFor}
              />
            </FormField>

            {/* Publish */}
            <Pressable
              onPress={publish}
              style={[styles.publishBtn, { backgroundColor: colors.tertiary }]}
            >
              <AppIcon name="add_circle" size={20} color={colors.onTertiaryContainer} />
              <Text style={{ color: colors.onTertiaryContainer, fontWeight: "700", fontSize: 16, marginLeft: 8 }}>
                Publish Item for Trade
              </Text>
            </Pressable>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function TradeOfferCard({ offer }: { offer: TradeOffer }) {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.offerCard, { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}66` }]}
    >
      <View style={styles.rowBetween}>
        <View style={[styles.statusPill, { backgroundColor: colors.primaryContainer }]}>
          <Text style={{ fontSize: 11, fontWeight: "700", color: colors.onPrimaryContainer }}>{offer.status}</Text>
        </View>
        <Text style={[TYPE.bodySmall, { color: colors.outline }]}>{offer.timestamp}</Text>
      </View>

      <View style={[styles.rowCenter, { marginTop: 10 }]}>
        <View style={styles.offerImage54}>
          <EcoImage url={offer.listingImageUrl} accessibilityLabel={offer.listingTitle} style={styles.fill} />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[TYPE.titleMedium, { fontWeight: "700", color: colors.onSurface }]}>{offer.listingTitle}</Text>
          <Text style={[TYPE.bodySmall, { color: colors.onSurfaceVariant }]}>Trader: {offer.ownerName}</Text>
        </View>
      </View>

      <View style={[styles.offerDetailBox, { backgroundColor: colors.surfaceVariant, borderColor: `${colors.outlineVariant}4D`, marginTop: 10 }]}>
        <Text style={{ fontSize: 12, fontWeight: "700", color: colors.primary }}>
          Your Offer: {offer.offeredItemTitle} (+{offer.offeredEcoPoints} pts)
        </Text>
        <Text style={[TYPE.bodySmall, { color: colors.onSurfaceVariant, marginTop: 2 }]}>“{offer.message}”</Text>
      </View>
    </View>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={[TYPE.labelMedium, { fontWeight: "700", color: colors.onSurface }]}>{label}</Text>
      <View style={{ height: 4 }} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  fill: { flex: 1, width: "100%", height: "100%" },

  headerWrap: { paddingHorizontal: 20, paddingVertical: 12 },

  segmentedWrap: { flexDirection: "row", borderRadius: 999, borderWidth: 1, padding: 4, gap: 4 },
  segmentBtn: { borderRadius: 999 },

  emptyWrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },

  photoCard: {
    height: 130,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: "transparent",
  },
  multiline: { minHeight: 90 },

  selectWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 4,
    overflow: "hidden",
  },
  dropdownItem: { paddingHorizontal: 14, paddingVertical: 12 },

  publishBtn: {
    height: 52,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  offerCard: { borderRadius: 20, borderWidth: 1, padding: 16 },
  statusPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  offerImage54: { width: 54, height: 54, borderRadius: 12, overflow: "hidden" },
  offerDetailBox: { borderRadius: 14, borderWidth: 1, padding: 12 },
});
