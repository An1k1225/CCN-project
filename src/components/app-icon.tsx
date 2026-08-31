import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleProp, TextStyle } from "react-native";

export type AppIconName =
  | "explore"
  | "verified"
  | "chair"
  | "local_florist"
  | "menu_book"
  | "restaurant"
  | "devices"
  | "checkroom"
  | "eco"
  | "swap_horiz"
  | "home"
  | "search"
  | "person"
  | "star"
  | "favorite"
  | "favorite_border"
  | "location_on"
  | "chat_bubble"
  | "history"
  | "close"
  | "dark_mode"
  | "light_mode"
  | "lock"
  | "loyalty"
  | "military_tech"
  | "stars"
  | "recycling"
  | "shield"
  | "verified_user"
  | "arrow_back"
  | "arrow_forward"
  | "send"
  | "tune"
  | "mic"
  | "more_vert"
  | "share"
  | "logout"
  | "visibility"
  | "visibility_off"
  | "mail"
  | "alternate_email"
  | "add_circle"
  | "person_add"
  | "photo_library"
  | "sync_alt"
  | "notifications"
  | "chat_bubble_outline"
  | "security"
  | "check_circle";

const GLYPHS: Record<AppIconName, string> = {
  explore: "explore",
  verified: "verified",
  chair: "chair",
  local_florist: "local-florist",
  menu_book: "menu-book",
  restaurant: "restaurant",
  devices: "devices",
  checkroom: "checkroom",
  eco: "eco",
  swap_horiz: "swap-horiz",
  home: "home",
  search: "search",
  person: "person",
  star: "star",
  favorite: "favorite",
  favorite_border: "favorite-border",
  location_on: "location-on",
  chat_bubble: "chat-bubble",
  history: "history",
  close: "close",
  dark_mode: "dark-mode",
  light_mode: "light-mode",
  lock: "lock",
  loyalty: "loyalty",
  military_tech: "military-tech",
  stars: "stars",
  recycling: "recycling",
  shield: "shield",
  verified_user: "verified-user",
  arrow_back: "arrow-back",
  arrow_forward: "arrow-forward",
  send: "send",
  tune: "tune",
  mic: "mic",
  more_vert: "more-vert",
  share: "share",
  logout: "logout",
  visibility: "visibility",
  visibility_off: "visibility-off",
  mail: "mail",
  alternate_email: "alternate-email",
  add_circle: "add-circle",
  person_add: "person-add",
  photo_library: "photo-library",
  sync_alt: "sync-alt",
  notifications: "notifications",
  chat_bubble_outline: "chat-bubble-outline",
  security: "security",
  check_circle: "check-circle",
};

interface AppIconProps {
  name: AppIconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export function AppIcon({ name, size = 24, color, style }: AppIconProps) {
  return (
    <MaterialIcons
      name={GLYPHS[name] as any}
      size={size}
      color={color}
      style={style as any}
    />
  );
}

export function getCategoryIconName(iconName: string): AppIconName {
  switch (iconName.toLowerCase()) {
    case "chair":
      return "chair";
    case "local_florist":
    case "yard":
      return "local_florist";
    case "menu_book":
      return "menu_book";
    case "restaurant":
    case "kitchen":
      return "restaurant";
    case "devices":
      return "devices";
    case "checkroom":
      return "checkroom";
    case "verified":
      return "verified";
    default:
      return "eco";
  }
}
