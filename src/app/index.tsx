import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppIcon } from "@/components/app-icon";
import { EcoImage } from "@/components/eco-image";
import { BrandWordmark } from "@/components/common";
import { TYPE, useTheme } from "@/constants/theme";

const ONBOARDING_IMG_1 =
  "https://lh3.googleusercontent.com/aida/AP1WRLudxBTe5lSi9c7ny-wVn8viTEwvDvqASpTKdUXr7AFg6AO30yrOiEaU1OWtPELhRzEqdB12l4NVbWagaQyy8EH-7sMUEpTBHeCyTvhe7tf6_QqB4H4YS0P2rXg-_h7vBDwSbRLMjqU46sP49m46o9EU-XQ9i0Um9yKoRpASF5h7AiDh90wX_lkCL49MuKf7kocBRo_P2hkDIe84O6ZFrFFhL_X5k2e7VHmpV6yFgSjOSPQEBhQoB9aRLMA";
const ONBOARDING_IMG_4 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuClir3F8PZg98ZsZqI3mTp-2cV2N2uuGN-8hOgnCnipcrJaKp6E5NseNxQ8MBqLKm-eH5vwMjPEgnEajW78EZg5w_YoQrlEq2PzbFPs_B5c1aWbzpLVmr49LoPyO8CZRB34UpOOIcxNZbSaxDTOuzpgFTbyJUzIBS1JAk3OmTuhgucJ5TQ99tpptkpGA79Geo17_b8AcADPYJ0cbgohPqp_mtQ4hmksmaBWFDjK_pIh6emCw5U74Fnx";

const PRIVACY_NOTES = [
  "Privacy first: No tracking cookies or data selling.",
  "Eco-rewards are encrypted & tied only to your device.",
  "Environmental impact calculated locally with privacy.",
  "Verified trader safety with fuzzed location coordinates.",
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const { colors } = useTheme();

  const goAuth = () => router.replace("/auth");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top", "bottom"]}>
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <View style={styles.headerRow}>
          {step > 0 ? (
            <Pressable onPress={() => setStep((s) => s - 1)} hitSlop={12}>
              <AppIcon name="arrow_back" size={24} color={colors.onSurfaceVariant} />
            </Pressable>
          ) : (
            <BrandWordmark variant="hero" tagline="SUSTAINABLE TRADE" />
          )}

          <StepIndicator currentStep={step} totalSteps={4} />

          <View style={styles.headerRight}>
            <Pressable onPress={goAuth} hitSlop={8}>
              <Text style={[TYPE.labelLarge, { fontWeight: "600", color: colors.primary }]}>Skip</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.content}>
          {step === 0 && <StepOne />}
          {step === 1 && <StepTwo />}
          {step === 2 && <StepThree />}
          {step === 3 && <StepFour />}
        </View>

        <View style={styles.bottomColumn}>
          <View
            style={[
              styles.privacyNote,
              { backgroundColor: `${colors.surfaceVariant}80` },
            ]}
          >
            <AppIcon name="lock" size={14} color={colors.primary} />
            <Text style={[TYPE.bodySmall, { color: colors.onSurfaceVariant, fontSize: 11, marginLeft: 6, flex: 1, textAlign: "center" }]}>
              {PRIVACY_NOTES[step]}
            </Text>
          </View>

          {step === 3 ? (
            <>
              <PrimaryButton label="Create Account / Get Started" icon="arrow_forward" onPress={goAuth} variant="container" />
              <OutlinedButton label="Already have an account? Log In" onPress={goAuth} />
            </>
          ) : (
            <>
              <PrimaryButton label="Next" icon="arrow_forward" onPress={() => setStep((s) => s + 1)} variant="container" />
              <OutlinedButton label="Skip Intro" onPress={goAuth} />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const { colors } = useTheme();
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <View
          key={i}
          style={{
            height: 8,
            width: i === currentStep ? 28 : 8,
            borderRadius: 4,
            marginRight: 6,
            backgroundColor: i === currentStep ? colors.primary : `${colors.outlineVariant}80`,
          }}
        />
      ))}
    </View>
  );
}

function StepOne() {
  const { colors } = useTheme();
  return (
    <ScrollView contentContainerStyle={styles.stepContent} showsVerticalScrollIndicator={false}>
      <View style={styles.stepImageCard}>
        <EcoImage url={ONBOARDING_IMG_1} accessibilityLabel="Community trading" style={StyleSheet.absoluteFill} />
      </View>
      <Text style={[TYPE.displayMedium, styles.stepTitle, { fontSize: 34, lineHeight: 40, color: colors.primary }]}>
        {"Trade Your Unused Items"}
      </Text>
      <Text style={[TYPE.titleMedium, { fontWeight: "600", textAlign: "center", color: `${colors.primary}D9`, marginTop: 6 }]}>
        Give your items a second life. Trade, don&apos;t toss.
      </Text>
      <Text style={[TYPE.bodyMedium, { textAlign: "center", color: colors.onSurfaceVariant, marginTop: 8, paddingHorizontal: 12 }]}>
        Join a community where household goods find new life. Exchange items easily, save money, and reduce environmental waste.
      </Text>
    </ScrollView>
  );
}

function StepTwo() {
  const { colors } = useTheme();
  return (
    <ScrollView contentContainerStyle={styles.stepContent} showsVerticalScrollIndicator={false}>
      <View style={styles.illustration240}>
        <View
          style={[
            styles.dashedCircle230,
            { borderColor: `${colors.primary}66` },
          ]}
        />
        <View
          style={[
            styles.centerCircle160,
            { backgroundColor: colors.surfaceContainerHigh },
          ]}
        >
          <AppIcon name="loyalty" size={68} color={colors.primary} />
        </View>

        <View style={[styles.floatBadge44, styles.topEnd, { backgroundColor: colors.surfaceContainerLowest }]}>
          <AppIcon name="military_tech" size={24} color={colors.primary} />
        </View>
        <View style={[styles.floatBadge38, styles.bottomStart, { backgroundColor: colors.surfaceContainerLowest }]}>
          <AppIcon name="stars" size={20} color={colors.tertiary} />
        </View>
      </View>

      <Text style={[TYPE.displayMedium, styles.stepTitle, { fontSize: 34, lineHeight: 40, color: colors.onSurface }]}>
        Earn Eco-Points & Rewards
      </Text>
      <Text style={[TYPE.bodyLarge, { textAlign: "center", color: colors.onSurfaceVariant, marginTop: 10, paddingHorizontal: 16 }]}>
        Every trade earns you points. Use them to participate in community auctions and unlock exclusive badges.
      </Text>
    </ScrollView>
  );
}

function StepThree() {
  const { colors } = useTheme();
  return (
    <ScrollView contentContainerStyle={styles.stepContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLow }]}>
        <Text style={[TYPE.labelSmall, { letterSpacing: 2, color: colors.outline, fontWeight: "700" }]}>
          YOUR SUSTAINABILITY JOURNEY
        </Text>

        <View style={[styles.co2Card, { backgroundColor: colors.surfaceContainerLowest }]}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <AppIcon name="eco" size={18} color={colors.primary} />
              <Text style={[TYPE.labelMedium, { color: colors.primary, fontWeight: "700", marginLeft: 4 }]}>
                CO2 PREVENTED
              </Text>
            </View>
            <View style={[styles.monthlyPill, { backgroundColor: colors.surfaceContainer }]}>
              <Text style={[TYPE.labelSmall, { color: colors.outline }]}>Monthly</Text>
            </View>
          </View>

          <View style={[styles.rowAlignEnd, { marginTop: 8 }]}>
            <Text style={[TYPE.displayLarge, { fontWeight: "700", color: colors.primary, fontSize: 48, lineHeight: 54 }]}>
              124
            </Text>
            <Text style={[TYPE.titleMedium, { color: colors.onSurfaceVariant, marginBottom: 6, marginLeft: 4 }]}>kg</Text>
          </View>

          <View style={[styles.rowBetween, { marginTop: 8 }]}>
            <Text style={[TYPE.labelSmall, { color: colors.outline }]}>Progress to Goal</Text>
            <Text style={[TYPE.labelSmall, { color: colors.primary, fontWeight: "700" }]}>85%</Text>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: colors.surfaceContainerHigh }]}>
            <View style={[styles.progressFill, { backgroundColor: colors.primary, width: "85%" }]} />
          </View>
        </View>

        <View style={styles.bentoRow}>
          <View style={[styles.bentoMini, styles.flex1, { backgroundColor: colors.surfaceContainerLowest }]}>
            <View style={[styles.bentoIcon32, { backgroundColor: colors.secondaryContainer }]}>
              <AppIcon name="recycling" size={18} color={colors.onSecondaryContainer} />
            </View>
            <Text style={[TYPE.headlineMedium, { fontWeight: "700", color: colors.onBackground, marginTop: 8 }]}>38</Text>
            <Text style={[TYPE.labelSmall, { color: colors.outline }]}>Items Diverted</Text>
          </View>

          <View style={[styles.bentoMini, styles.flex1, { backgroundColor: colors.surfaceContainerLowest }]}>
            <View style={[styles.bentoIcon32, { backgroundColor: `${colors.tertiaryContainer}33` }]}>
              <AppIcon name="stars" size={18} color={colors.tertiary} />
            </View>
            <Text style={[TYPE.headlineMedium, { fontWeight: "700", color: colors.onBackground, marginTop: 8 }]}>Top 5%</Text>
            <Text style={[TYPE.labelSmall, { color: colors.outline }]}>Community Rank</Text>
          </View>
        </View>
      </View>

      <Text style={[TYPE.displayMedium, styles.stepTitle, { fontSize: 34, lineHeight: 40, color: colors.onBackground }]}>
        Track Your Impact
      </Text>
      <Text style={[TYPE.bodyMedium, { textAlign: "center", color: colors.onSurfaceVariant, marginTop: 8, paddingHorizontal: 16 }]}>
        See how much CO2 you&apos;ve prevented and how many items you&apos;ve diverted from landfills. Your actions make a difference.
      </Text>
    </ScrollView>
  );
}

function StepFour() {
  const { colors } = useTheme();
  return (
    <ScrollView contentContainerStyle={styles.stepContent} showsVerticalScrollIndicator={false}>
      <View style={styles.stepFourImage}>
        <EcoImage url={ONBOARDING_IMG_4} accessibilityLabel="Verified trader" style={StyleSheet.absoluteFill} />
      </View>

      <View style={[styles.trustCard, { backgroundColor: colors.surfaceContainerLowest }]}>
        <View style={[styles.trustBadge48, { backgroundColor: colors.primaryContainer }]}>
          <AppIcon name="verified_user" size={24} color={colors.onPrimaryContainer} />
        </View>
        <Text style={[TYPE.headlineLarge, { fontWeight: "700", color: colors.primary, textAlign: "center", marginTop: 12 }]}>
          Trusted Community
        </Text>
        <Text style={[TYPE.bodyMedium, { color: colors.onSurfaceVariant, textAlign: "center", marginTop: 8 }]}>
          Get verified to unlock more trades and build trust with your neighbors. Safety, privacy, and community are our top priorities.
        </Text>
      </View>
    </ScrollView>
  );
}

function PrimaryButton({
  label,
  icon,
  onPress,
  variant,
}: {
  label: string;
  icon?: any;
  onPress: () => void;
  variant: "primary" | "container";
}) {
  const { colors } = useTheme();
  const bg = variant === "container" ? colors.primaryContainer : colors.primary;
  const fg = variant === "container" ? colors.onPrimaryContainer : colors.onPrimary;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.bigButton52, { backgroundColor: bg, opacity: pressed ? 0.85 : 1 }]}
    >
      <Text style={{ color: fg, fontWeight: "700", fontSize: 16 }}>{label}</Text>
      {icon ? <AppIcon name={icon} size={18} color={fg} /> : null}
    </Pressable>
  );
}

function OutlinedButton({ label, onPress }: { label: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.outlinedButton48,
        { borderColor: `${colors.primary}80`, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={{ color: colors.primary, fontWeight: "600", fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 20, paddingVertical: 12 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 4,
  },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  dotsRow: { flexDirection: "row", alignItems: "center" },

  content: { flex: 1, justifyContent: "center" },
  stepContent: { flexGrow: 1, justifyContent: "center", alignItems: "center", paddingVertical: 16 },

  stepImageCard: {
    width: "85%",
    aspectRatio: 1,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  stepTitle: { fontWeight: "700", textAlign: "center", marginTop: 20 },

  illustration240: { width: 240, height: 240, alignItems: "center", justifyContent: "center" },
  dashedCircle230: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    borderWidth: 2,
  },
  centerCircle160: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  floatBadge44: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  floatBadge38: {
    position: "absolute",
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  topEnd: { top: 8, right: 8 },
  bottomStart: { bottom: 8, left: 8 },

  bentoCard: { width: "100%", borderRadius: 24, padding: 16, alignItems: "center" },
  co2Card: {
    width: "100%",
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  rowAlignEnd: { flexDirection: "row", alignItems: "flex-end" },
  monthlyPill: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  progressTrack: { height: 8, borderRadius: 4, marginTop: 4, overflow: "hidden" },
  progressFill: { height: 8, borderRadius: 4 },
  bentoRow: { flexDirection: "row", gap: 10, marginTop: 10, alignSelf: "stretch" },
  flex1: { flex: 1 },
  bentoMini: { borderRadius: 16, padding: 14 },
  bentoIcon32: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  stepFourImage: { width: "80%", aspectRatio: 1, borderRadius: 24, overflow: "hidden" },
  trustCard: {
    width: "100%",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  trustBadge48: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomColumn: { gap: 10, paddingBottom: 12 },
  privacyNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  bigButton52: {
    height: 52,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  outlinedButton48: {
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
