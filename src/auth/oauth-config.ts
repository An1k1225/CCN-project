export const googleOAuth = {
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? "",
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? "",
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ?? "",
};

export function isGoogleConfigured(): boolean {
  return Boolean(googleOAuth.webClientId || googleOAuth.iosClientId || googleOAuth.androidClientId);
}