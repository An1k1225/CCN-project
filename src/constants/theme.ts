import { useMemo } from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useStore } from "@/data/store";

// Sleek Interface Brand Palette - Lilac, Obsidian, Violet & Slate
export const LIGHT_COLORS = {
  primary: "#6750A4",
  onPrimary: "#FFFFFF",
  primaryContainer: "#EADDFF",
  onPrimaryContainer: "#21005D",
  primaryFixed: "#EADDFF",
  primaryFixedDim: "#D0BCFF",

  background: "#FEF7FF",
  onBackground: "#1C1B1F",
  surface: "#FEF7FF",
  onSurface: "#1C1B1F",
  surfaceVariant: "#E7E0EC",
  onSurfaceVariant: "#49454E",

  surfaceContainerLowest: "#FFFFFF",
  surfaceContainerLow: "#F7F2FA",
  surfaceContainer: "#F3EDF7",
  surfaceContainerHigh: "#ECE6F0",
  surfaceContainerHighest: "#E6E0E9",

  secondary: "#625B71",
  secondaryContainer: "#E8DEF8",
  onSecondaryContainer: "#1D192B",

  tertiary: "#7D5260",
  tertiaryContainer: "#FFD8E4",
  onTertiaryContainer: "#31111D",
  tertiaryFixed: "#FFD8E4",

  outline: "#79747E",
  outlineVariant: "#CAC4D0",

  starGold: "#FFB800",
  accentLilac: "#D0BCFF",
  deepViolet: "#381E72",
  slateBorder: "#49454F",
  mutedText: "#938F99",
};

// Dark Theme Colors - Obsidian, Sleek Charcoal & Luminous Lilac
export const DARK_COLORS = {
  primary: "#D0BCFF",
  onPrimary: "#381E72",
  primaryContainer: "#4F378B",
  onPrimaryContainer: "#EADDFF",
  primaryFixed: "#EADDFF",
  primaryFixedDim: "#D0BCFF",

  background: "#1C1B1F",
  onBackground: "#E6E1E5",
  surface: "#1C1B1F",
  onSurface: "#E6E1E5",
  surfaceVariant: "#49454F",
  onSurfaceVariant: "#CAC4D0",

  surfaceContainerLowest: "#0F0E11",
  surfaceContainerLow: "#1D1B20",
  surfaceContainer: "#2B2930",
  surfaceContainerHigh: "#36343B",
  surfaceContainerHighest: "#49454F",

  secondary: "#CCC2DC",
  secondaryContainer: "#4A4458",
  onSecondaryContainer: "#E8DEF8",

  tertiary: "#EFB8C8",
  tertiaryContainer: "#633B48",
  onTertiaryContainer: "#FFD8E4",
  tertiaryFixed: "#FFD8E4",

  outline: "#938F99",
  outlineVariant: "#49454F",

  starGold: "#FFB800",
  accentLilac: "#D0BCFF",
  deepViolet: "#381E72",
  slateBorder: "#49454F",
  mutedText: "#938F99",
};

export type Palette = typeof LIGHT_COLORS;

export const RADIUS: Record<string, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export function useTheme() {
  const { isDarkMode } = useStore();
  return useMemo(
    () => ({
      isDark: isDarkMode,
      colors: (isDarkMode ? DARK_COLORS : LIGHT_COLORS) as Palette,
    }),
    [isDarkMode]
  );
}

export function useThemedStyles<T extends Record<string, any>>(
  factory: (colors: Palette) => T
): T {
  const { colors } = useTheme();
  return useMemo(() => StyleSheet.create(factory(colors)), [factory, colors]);
}

const FONT = "System";

// Material 3 typography scale approximated with RN defaults
export const TYPE = StyleSheet.create({
  displayLarge: { fontFamily: FONT, fontSize: 57, lineHeight: 64, fontWeight: "400" },
  displayMedium: { fontFamily: FONT, fontSize: 45, lineHeight: 52, fontWeight: "400" },
  headlineLarge: { fontFamily: FONT, fontSize: 32, lineHeight: 40, fontWeight: "400" },
  headlineMedium: { fontFamily: FONT, fontSize: 28, lineHeight: 36, fontWeight: "400" },
  titleLarge: { fontFamily: FONT, fontSize: 22, lineHeight: 28, fontWeight: "400" },
  titleMedium: { fontFamily: FONT, fontSize: 16, lineHeight: 24, fontWeight: "500", letterSpacing: 0.15 },
  bodyLarge: { fontFamily: FONT, fontSize: 16, lineHeight: 24, letterSpacing: 0.5 },
  bodyMedium: { fontFamily: FONT, fontSize: 14, lineHeight: 20, letterSpacing: 0.25 },
  bodySmall: { fontFamily: FONT, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
  labelLarge: { fontFamily: FONT, fontSize: 14, lineHeight: 20, fontWeight: "500", letterSpacing: 0.1 },
  labelMedium: { fontFamily: FONT, fontSize: 12, lineHeight: 16, fontWeight: "500", letterSpacing: 0.5 },
  labelSmall: { fontFamily: FONT, fontSize: 11, lineHeight: 16, fontWeight: "500", letterSpacing: 0.5 },
} as Record<string, TextStyle>);

export type TypeKey = keyof typeof TYPE;

export const SHADOW: ViewStyle = {
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.12,
  shadowRadius: 6,
  elevation: 3,
};
