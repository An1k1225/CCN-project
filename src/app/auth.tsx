import React, { useState } from "react";
import {
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
import { ThemeModeToggleButton } from "@/components/common";
import { TYPE, useTheme } from "@/constants/theme";
import { useStore } from "@/data/store";
import { isGoogleConfigured } from "@/auth/oauth-config";
import { fetchGoogleUserInfo, signInWithApple, useGoogleAuth } from "@/auth/social-login";

export default function AuthScreen() {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [emailOrUsername, setEmailOrUsername] = useState("alex.green@example.com");
  const [password, setPassword] = useState("password123");
  const [fullName, setFullName] = useState("Alex Green");
  const [username, setUsername] = useState("alex_green");
  const [confirmPassword, setConfirmPassword] = useState("password123");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [oauthBusy, setOauthBusy] = useState(false);
  const { promptAsync: googlePromptAsync } = useGoogleAuth();

  const { colors } = useTheme();
  const { isDarkMode, toggleDarkMode, login, loginWithProvider, signup, continueAsGuest, showToast } = useStore();

  const handleLogin = (email: string, pwd: string) => {
    login(email, pwd);
    showToast(`Welcome back! Signed in as ${email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`);
    router.replace("/(tabs)");
  };

  const handleSignup = (name: string, email: string, uname: string, pwd: string) => {
    const ok = signup(name, email, uname, pwd);
    if (!ok) {
      setErrorMessage("Please fill in all required fields");
      return;
    }
    showToast(`Account created successfully! Welcome, ${name}`);
    router.replace("/(tabs)");
  };

  const handleGoogleSignIn = async () => {
    if (!isGoogleConfigured()) {
      showToast("Google isn't configured. Add EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID to .env");
      return;
    }
    setOauthBusy(true);
    setErrorMessage(null);
    try {
      const result = await googlePromptAsync();
      if (result?.type !== "success") {
        showToast(result?.type === "error" ? "Google sign-in failed" : "Google sign-in was cancelled");
        return;
      }
      const accessToken = result.authentication?.accessToken ?? result.params?.access_token;
      if (!accessToken) {
        showToast("Google sign-in returned no access token");
        return;
      }
      const user = await fetchGoogleUserInfo(accessToken);
      if (!user) {
        showToast("Could not fetch your Google profile");
        return;
      }
      loginWithProvider("google", user.name, user.email);
      showToast(`Welcome, ${user.name}!`);
      router.replace("/(tabs)");
    } catch {
      showToast("Google sign-in failed");
    } finally {
      setOauthBusy(false);
    }
  };

  const handleAppleSignIn = async () => {
    if (Platform.OS !== "ios") return;
    setOauthBusy(true);
    setErrorMessage(null);
    try {
      const user = await signInWithApple();
      if (!user) {
        showToast("Apple sign-in failed or was cancelled");
        return;
      }
      loginWithProvider("apple", user.name, user.email);
      showToast(`Welcome, ${user.name}!`);
      router.replace("/(tabs)");
    } catch {
      showToast("Apple sign-in failed or was cancelled");
    } finally {
      setOauthBusy(false);
    }
  };

  const submit = () => {
    if (isLoginTab) {
      if (!emailOrUsername.trim() || !password.trim()) {
        setErrorMessage("Please enter email/username and password");
        return;
      }
      handleLogin(emailOrUsername.trim(), password);
    } else {
      if (!fullName.trim() || !emailOrUsername.trim() || !password.trim()) {
        setErrorMessage("Please fill in all fields to create your account");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }
      handleSignup(fullName.trim(), emailOrUsername.trim(), username.trim(), password);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={[styles.topBar, { backgroundColor: colors.background }]}>
          <View style={styles.logoRow}>
            <AppIcon name="eco" size={24} color={colors.primary} />
            <Text style={[TYPE.titleMedium, { fontWeight: "700", color: colors.primary, marginLeft: 6 }]}>
              EcoTrade
            </Text>
          </View>
          <ThemeModeToggleButton isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.authCard, { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}66` }]}>
            <View style={[styles.headerIcon60, { backgroundColor: `${colors.primary}1F` }]}>
              <AppIcon name="swap_horiz" size={32} color={colors.primary} />
            </View>

            <Text style={[TYPE.headlineMedium, { fontWeight: "700", color: colors.onSurface, textAlign: "center", marginTop: 12 }]}>
              {isLoginTab ? "Welcome Back" : "Create Your Account"}
            </Text>
            <Text style={[TYPE.bodyMedium, { color: colors.onSurfaceVariant, textAlign: "center", marginTop: 4 }]}>
              {isLoginTab
                ? "Sign in to manage your sustainable trades"
                : "Join thousands reducing carbon footprint through trade"}
            </Text>

            {/* Segmented Tabs */}
            <View
              style={[
                styles.segmentedWrap,
                { backgroundColor: colors.surfaceVariant, borderColor: `${colors.outlineVariant}4D`, marginTop: 20 },
              ]}
            >
              <SegmentButton
                label="Log In"
                active={isLoginTab}
                onPress={() => {
                  setIsLoginTab(true);
                  setErrorMessage(null);
                }}
              />
              <SegmentButton
                label="Sign Up"
                active={!isLoginTab}
                onPress={() => {
                  setIsLoginTab(false);
                  setErrorMessage(null);
                }}
              />
            </View>

            {errorMessage && (
              <View style={[styles.errorBox, { backgroundColor: "#FCE8E6" }, isDarkMode && { backgroundColor: "#5C1A17" }]}>
                <Text style={{ fontSize: 12, color: isDarkMode ? "#F9DEDC" : "#8C1D18", textAlign: "center" }}>
                  {errorMessage}
                </Text>
              </View>
            )}

            {isLoginTab ? (
              <View style={{ gap: 14 }}>
                <AuthField
                  label="Username or Email"
                  icon="mail"
                  placeholder="you@example.com"
                  value={emailOrUsername}
                  onChangeText={(t) => {
                    setEmailOrUsername(t);
                    setErrorMessage(null);
                  }}
                />
                <View>
                  <View style={styles.rowBetween}>
                    <Text style={[TYPE.labelMedium, { color: colors.onSurface }]}>Password</Text>
                    <Pressable onPress={() => setErrorMessage("Password reset link sent to registered email")}>
                      <Text style={[TYPE.labelSmall, { color: colors.primary, fontWeight: "600" }]}>
                        Forgot Password?
                      </Text>
                    </Pressable>
                  </View>
                  <AuthField
                    icon="lock"
                    placeholder="••••••••"
                    value={password}
                    secureTextEntry={!passwordVisible}
                    onChangeText={(t) => {
                      setPassword(t);
                      setErrorMessage(null);
                    }}
                    trailing={
                      <Pressable onPress={() => setPasswordVisible((v) => !v)} hitSlop={8}>
                        <AppIcon
                          name={passwordVisible ? "visibility" : "visibility_off"}
                          size={22}
                          color={colors.outline}
                        />
                      </Pressable>
                    }
                    containerStyle={{ marginTop: 6 }}
                  />
                </View>
              </View>
            ) : (
              <View style={{ gap: 12 }}>
                <AuthField
                  label="Full Name"
                  icon="person"
                  placeholder="Alex Green"
                  value={fullName}
                  onChangeText={(t) => {
                    setFullName(t);
                    setErrorMessage(null);
                  }}
                />
                <AuthField
                  label="Username"
                  icon="alternate_email"
                  placeholder="alex_green"
                  value={username}
                  onChangeText={(t) => {
                    setUsername(t);
                    setErrorMessage(null);
                  }}
                />
                <AuthField
                  label="Email Address"
                  icon="mail"
                  placeholder="you@example.com"
                  value={emailOrUsername}
                  onChangeText={(t) => {
                    setEmailOrUsername(t);
                    setErrorMessage(null);
                  }}
                />
                <AuthField
                  label="Password"
                  icon="lock"
                  placeholder="••••••••"
                  value={password}
                  secureTextEntry={!passwordVisible}
                  onChangeText={(t) => {
                    setPassword(t);
                    setErrorMessage(null);
                  }}
                  trailing={
                    <Pressable onPress={() => setPasswordVisible((v) => !v)} hitSlop={8}>
                      <AppIcon
                        name={passwordVisible ? "visibility" : "visibility_off"}
                        size={22}
                        color={colors.outline}
                      />
                    </Pressable>
                  }
                />
                <AuthField
                  label="Confirm Password"
                  icon="lock"
                  placeholder="••••••••"
                  value={confirmPassword}
                  secureTextEntry
                  onChangeText={(t) => {
                    setConfirmPassword(t);
                    setErrorMessage(null);
                  }}
                />
              </View>
            )}

            <Pressable onPress={submit} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, styles.submitBtn, { backgroundColor: colors.primary, marginTop: 20 }]}>
              <AppIcon name={isLoginTab ? "swap_horiz" : "check_circle"} size={18} color={colors.onPrimary} />
              <Text style={{ color: colors.onPrimary, fontWeight: "700", fontSize: 16, marginLeft: 8 }}>
                {isLoginTab ? "Log In to EcoTrade" : "Create EcoTrade Account"}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setIsLoginTab(true);
                setEmailOrUsername("alex.green@example.com");
                setPassword("password123");
                setErrorMessage(null);
              }}
              style={[styles.demoFillBtn, { backgroundColor: `${colors.surfaceVariant}99`, borderColor: `${colors.outlineVariant}4D` }]}
            >
              <Text style={[TYPE.labelSmall, { color: colors.primary, fontWeight: "600" }]}>
                ⚡ Fill Demo Account (Alex Green)
              </Text>
            </Pressable>

            <View style={styles.dividerRow}>
              <View style={[styles.dividerLine, { backgroundColor: `${colors.outlineVariant}66` }]} />
              <Text style={[TYPE.labelSmall, { color: colors.onSurfaceVariant, marginHorizontal: 12 }]}>Or continue with</Text>
              <View style={[styles.dividerLine, { backgroundColor: `${colors.outlineVariant}66` }]} />
            </View>

            <View style={styles.oauthRow}>
              <Pressable
                onPress={handleGoogleSignIn}
                disabled={oauthBusy}
                style={[styles.oauthBtn, { borderColor: `${colors.outlineVariant}80`, opacity: oauthBusy ? 0.6 : 1 }]}
              >
                <Text style={{ fontWeight: "700", fontSize: 12, color: colors.onSurface }}>
                  {oauthBusy ? "Connecting…" : "Continue with Google"}
                </Text>
              </Pressable>
              {Platform.OS === "ios" && (
                <Pressable
                  onPress={handleAppleSignIn}
                  disabled={oauthBusy}
                  style={[styles.oauthBtn, { borderColor: `${colors.outlineVariant}80`, opacity: oauthBusy ? 0.6 : 1 }]}
                >
                  <Text style={{ fontWeight: "700", fontSize: 12, color: colors.onSurface }}>
                    {oauthBusy ? "Connecting…" : "Sign in with Apple"}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>

          <Pressable onPress={() => { continueAsGuest(); showToast("Browsing in guest mode"); router.replace("/(tabs)"); }} style={styles.guestBtn}>
            <Text style={[TYPE.labelLarge, { color: colors.primary, fontWeight: "600" }]}>
              Explore as Guest (No Account Required) →
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SegmentButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.segmentBtn,
        { backgroundColor: active ? colors.primary : "transparent", flex: 1 },
      ]}
    >
      <Text
        style={{
          color: active ? colors.onPrimary : colors.onSurfaceVariant,
          fontWeight: "700",
          fontSize: 14,
          textAlign: "center",
          paddingVertical: 10,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function AuthField({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  trailing,
  containerStyle,
}: {
  label?: string;
  icon: any;
  placeholder?: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
  trailing?: React.ReactNode;
  containerStyle?: any;
}) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  return (
    <View style={containerStyle}>
      {!!label && (
        <Text style={[TYPE.labelMedium, { color: colors.onSurface, marginBottom: 6 }]}>{label}</Text>
      )}
      <View
        style={[
          styles.fieldWrap,
          {
            backgroundColor: focused ? colors.surfaceContainerLowest : colors.surfaceVariant,
            borderColor: focused ? colors.primary : "transparent",
          },
        ]}
      >
        <AppIcon name={icon} size={20} color={colors.outline} />
        <TextInput
          style={[styles.input, { color: colors.onSurface }]}
          placeholder={placeholder}
          placeholderTextColor={`${colors.onSurfaceVariant}99`}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCapitalize="none"
          keyboardType="default"
        />
        {trailing}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  logoRow: { flexDirection: "row", alignItems: "center" },
  scrollContent: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 20, paddingBottom: 28 },

  authCard: {
    width: "100%",
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    alignItems: "center",
  },
  headerIcon60: { width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center" },

  segmentedWrap: { flexDirection: "row", borderRadius: 999, borderWidth: 1, padding: 4, gap: 4, alignSelf: "stretch" },
  segmentBtn: { borderRadius: 999 },

  errorBox: {
    alignSelf: "stretch",
    borderRadius: 12,
    padding: 10,
    marginTop: 12,
  },

  fieldWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    minHeight: 52,
    gap: 10,
  },
  input: { flex: 1, fontSize: 15, paddingVertical: 14 },

  submitBtn: {
    height: 52,
    width: "100%",
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  demoFillBtn: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 16,
  },

  dividerRow: { flexDirection: "row", alignItems: "center", alignSelf: "stretch", marginTop: 16 },
  dividerLine: { flex: 1, height: StyleSheet.hairlineWidth },

  oauthRow: { flexDirection: "row", gap: 10, alignSelf: "stretch", marginTop: 14 },
  oauthBtn: {
    flex: 1,
    height: 46,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  guestBtn: { marginTop: 16, paddingHorizontal: 16, paddingVertical: 8 },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
});
