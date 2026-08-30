import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import { AppIcon } from "@/components/app-icon";
import { TYPE, useTheme } from "@/constants/theme";
import {
  SearchFilter,
  SORT_BY_LABELS,
  SortBy,
  TradeType,
} from "@/models/types";

const BRANDS = [
  "All",
  "Mid-Century Craft",
  "Danish Modern",
  "Clayworks Studio",
  "Penguin Vintage",
  "Breville Artisanal",
  "Patagonia Vintage",
  "Herman Miller Era",
];
const CONDITIONS = ["All", "Excellent", "Like New", "Good"];
const FILTER_CATEGORIES = ["All", "Furniture", "Garden", "Books", "Kitchenware", "Electronics", "Clothing"];

const TRADE_TYPES: [string, TradeType | null][] = [
  ["All", null],
  ["Direct Trade", "TRADE"],
  ["Free Giveaway", "FREE"],
  ["Eco-Points", "ECO_POINTS"],
];

function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? colors.primary : colors.surfaceVariant,
          borderColor: selected ? colors.primary : `${colors.outlineVariant}66`,
        },
      ]}
    >
      <Text
        style={{
          fontSize: 12,
          color: selected ? colors.onPrimary : colors.onSurfaceVariant,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <Text style={[TYPE.labelLarge, { fontWeight: "700", color: colors.onSurface, marginBottom: 8 }]}>
      {children}
    </Text>
  );
}

export function FilterSheet({
  initialFilter,
  onApplyFilter,
  onDismiss,
}: {
  initialFilter: SearchFilter;
  onApplyFilter: (filter: SearchFilter) => void;
  onDismiss: () => void;
}) {
  const { colors } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialFilter.category);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(initialFilter.brand);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(initialFilter.condition);
  const [selectedTradeType, setSelectedTradeType] = useState<TradeType | null>(initialFilter.tradeType);
  const [maxPrice, setMaxPrice] = useState(initialFilter.maxPrice);
  const [maxDistance, setMaxDistance] = useState(initialFilter.maxDistanceMiles);
  const [onlyInStock, setOnlyInStock] = useState(initialFilter.onlyInStock);
  const [onlyVerified, setOnlyVerified] = useState(initialFilter.onlyVerified);
  const [selectedSortBy, setSelectedSortBy] = useState<SortBy>(initialFilter.sortBy);

  const resetAll = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSelectedCondition(null);
    setSelectedTradeType(null);
    setMaxPrice(250.0);
    setMaxDistance(25.0);
    setOnlyInStock(true);
    setOnlyVerified(false);
    setSelectedSortBy("NEAREST");
  };

  const apply = () => {
    onApplyFilter({
      ...initialFilter,
      category: selectedCategory,
      brand: selectedBrand,
      condition: selectedCondition,
      tradeType: selectedTradeType,
      maxPrice,
      maxDistanceMiles: maxDistance,
      onlyInStock,
      onlyVerified,
      sortBy: selectedSortBy,
    });
    onDismiss();
  };

  return (
    <Modal
      visible
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onDismiss}
    >
      <View style={{ backgroundColor: colors.surfaceContainer, flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.sheetContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.rowBetween}>
            <Text style={[TYPE.titleLarge, { fontWeight: "700", color: colors.onSurface }]}>
              Refine Shopping Results
            </Text>
            <Pressable onPress={onDismiss} hitSlop={10}>
              <AppIcon name="close" size={24} color={colors.outline} />
            </Pressable>
          </View>

          <View style={[styles.divider, { backgroundColor: `${colors.outlineVariant}66` }]} />

          {/* Price / Valuation Range */}
          <SectionLabel>Price / Value Range</SectionLabel>
          <View style={styles.rowBetween}>
            <Text style={[TYPE.labelMedium, { color: colors.primary, fontWeight: "700" }]}>
              ${initialFilter.minPrice.toFixed(0)} — Up to ${maxPrice.toFixed(0)}
            </Text>
          </View>
          <Slider
            style={{ height: 40 }}
            minimumValue={0}
            maximumValue={300}
            step={50}
            value={maxPrice}
            onValueChange={(v) => setMaxPrice(v)}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={`${colors.outlineVariant}66`}
            thumbTintColor={colors.primary}
          />

          <View style={{ height: 14 }} />

          {/* Brand */}
          <SectionLabel>Brand & Artisans</SectionLabel>
          <View style={styles.chipFlow}>
            {BRANDS.map((brand) => (
              <Chip
                key={brand}
                label={brand}
                selected={(brand === "All" && selectedBrand === null) || selectedBrand === brand}
                onPress={() => setSelectedBrand(brand === "All" ? null : brand)}
              />
            ))}
          </View>

          <View style={{ height: 14 }} />

          {/* Condition */}
          <SectionLabel>Condition</SectionLabel>
          <View style={styles.chipFlow}>
            {CONDITIONS.map((cond) => (
              <Chip
                key={cond}
                label={cond}
                selected={(cond === "All" && selectedCondition === null) || selectedCondition === cond}
                onPress={() => setSelectedCondition(cond === "All" ? null : cond)}
              />
            ))}
          </View>

          <View style={{ height: 14 }} />

          {/* Category */}
          <SectionLabel>Category</SectionLabel>
          <View style={styles.chipFlow}>
            {FILTER_CATEGORIES.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                selected={(cat === "All" && selectedCategory === null) || selectedCategory === cat}
                onPress={() => setSelectedCategory(cat === "All" ? null : cat)}
              />
            ))}
          </View>

          <View style={{ height: 14 }} />

          {/* Listing Type */}
          <SectionLabel>Listing Type</SectionLabel>
          <View style={styles.chipFlow}>
            {TRADE_TYPES.map(([label, type]) => (
              <Chip
                key={label}
                label={label}
                selected={selectedTradeType === type}
                onPress={() => setSelectedTradeType(type)}
              />
            ))}
          </View>

          <View style={{ height: 14 }} />

          {/* Sort By */}
          <SectionLabel>Sort By</SectionLabel>
          <View style={styles.chipFlow}>
            {(Object.keys(SORT_BY_LABELS) as SortBy[]).map((key) => (
              <Chip
                key={key}
                label={SORT_BY_LABELS[key]}
                selected={selectedSortBy === key}
                onPress={() => setSelectedSortBy(key)}
              />
            ))}
          </View>

          <View style={{ height: 14 }} />

          {/* Distance */}
          <SectionLabel>Maximum Distance</SectionLabel>
          <View style={styles.rowBetween}>
            <Text style={[TYPE.labelMedium, { color: colors.primary, fontWeight: "700" }]}>
              Up to {maxDistance.toFixed(1)} mi
            </Text>
          </View>
          <Slider
            style={{ height: 40 }}
            minimumValue={1}
            maximumValue={25}
            step={1}
            value={maxDistance}
            onValueChange={(v) => setMaxDistance(v)}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={`${colors.outlineVariant}66`}
            thumbTintColor={colors.primary}
          />

          <View style={{ height: 16 }} />

          {/* Toggles */}
          <View
            style={[
              styles.togglesCard,
              { backgroundColor: colors.surfaceVariant, borderColor: `${colors.outlineVariant}59` },
            ]}
          >
            <View style={styles.toggleRow}>
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={[TYPE.titleMedium, { fontWeight: "600", color: colors.onSurface }]}>
                  Real-time In-Stock Only
                </Text>
                <Text style={[TYPE.bodySmall, { color: colors.onSurfaceVariant }]}>
                  Hide reserved or completed listings
                </Text>
              </View>
              <Switch
                value={onlyInStock}
                onValueChange={setOnlyInStock}
                trackColor={{ false: `${colors.outlineVariant}66`, true: colors.primary }}
                thumbColor={colors.surfaceContainerHighest}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: `${colors.outlineVariant}4D`, marginVertical: 12 }]} />

            <View style={styles.toggleRow}>
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={[TYPE.titleMedium, { fontWeight: "600", color: colors.onSurface }]}>
                  Verified Traders Only
                </Text>
                <Text style={[TYPE.bodySmall, { color: colors.onSurfaceVariant }]}>
                  Show items from ID-verified community members
                </Text>
              </View>
              <Switch
                value={onlyVerified}
                onValueChange={setOnlyVerified}
                trackColor={{ false: `${colors.outlineVariant}66`, true: colors.primary }}
                thumbColor={colors.surfaceContainerHighest}
              />
            </View>
          </View>

          <View style={{ height: 24 }} />

          {/* Actions */}
          <View style={styles.actionsRow}>
            <Pressable onPress={resetAll} style={[styles.actionBtn, styles.resetBtn, { borderColor: colors.outline }]}>
              <Text style={{ color: colors.primary, fontSize: 14 }}>Reset</Text>
            </Pressable>
            <Pressable
              onPress={apply}
              style={[styles.actionBtn, styles.applyBtn, { backgroundColor: colors.primary, borderColor: colors.primary }]}
            >
              <Text style={{ color: colors.onPrimary, fontSize: 14, fontWeight: "700" }}>Apply Filters</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheetContent: { paddingHorizontal: 24, paddingBottom: 32, paddingTop: 8 },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 40,
  },
  divider: { height: StyleSheet.hairlineWidth, marginVertical: 12 },
  chipFlow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  togglesCard: { width: "100%", borderRadius: 20, borderWidth: 1, padding: 16 },
  toggleRow: { flexDirection: "row", alignItems: "center" },

  actionsRow: { flexDirection: "row", gap: 12 },
  actionBtn: {
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resetBtn: { flex: 1 },
  applyBtn: { flex: 1.5 },
});
