import * as AppleAuthentication from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest as useGoogleAuthRequest } from "expo-auth-session/providers/google";
import { Platform } from "react-native";
import { googleOAuth } from "@/auth/oauth-config";

WebBrowser.maybeCompleteAuthSession();

export interface ProviderUser {
  name: string;
  email: string;
  provider: "google" | "apple";
}

export function useGoogleAuth() {
  const [request, response, promptAsync] = useGoogleAuthRequest({
    webClientId: googleOAuth.webClientId,
    iosClientId: googleOAuth.iosClientId,
    androidClientId: googleOAuth.androidClientId,
    scopes: ["openid", "profile", "email"],
    selectAccount: true,
  });

  return { request, response, promptAsync };
}

export async function fetchGoogleUserInfo(accessToken: string): Promise<ProviderUser | null> {
  try {
    const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      name: data.name ?? data.given_name ?? "Google User",
      email: data.email ?? "",
      provider: "google",
    };
  } catch {
    return null;
  }
}

export async function signInWithApple(): Promise<ProviderUser | null> {
  if (Platform.OS !== "ios") return null;
  const available = await AppleAuthentication.isAvailableAsync();
  if (!available) return null;

  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  const fullName = credential.fullName;
  const name = fullName
    ? [fullName.givenName, fullName.middleName, fullName.familyName]
        .filter(Boolean)
        .join(" ")
        .trim()
    : "";

  return {
    name: name || "Apple User",
    email: credential.email ?? "",
    provider: "apple",
  };
}