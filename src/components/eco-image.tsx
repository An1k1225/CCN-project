import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { AppIcon } from "@/components/app-icon";
import { useTheme } from "@/constants/theme";

interface EcoImageProps {
  url: string;
  accessibilityLabel?: string | null;
  style?: any;
}

export function EcoImage({ url, accessibilityLabel, style }: EcoImageProps) {
  const { colors } = useTheme();
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  if (!url) {
    return (
      <View
        style={[styles.fallback, { backgroundColor: colors.surfaceContainerHigh }, style]}
      >
        <AppIcon name="eco" size={32} color={`${colors.primary}80`} />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: url }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        accessibilityLabel={accessibilityLabel ?? undefined}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        recyclingKey={url}
      />
      {status === "loading" && (
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.loading,
            { backgroundColor: colors.surfaceVariant },
          ]}
        >
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}
      {status === "error" && (
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.loading,
            { backgroundColor: colors.surfaceContainerHigh },
          ]}
        >
          <AppIcon name="eco" size={32} color={`${colors.primary}80`} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: "hidden" },
  loading: { alignItems: "center", justifyContent: "center" },
  fallback: { alignItems: "center", justifyContent: "center" },
});
