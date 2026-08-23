import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
import { ChatConversation, ChatMessage } from "@/models/types";

export default function ChatScreen() {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");

  const { conversations, userProfile, sendChatMessage } = useStore();
  const { colors } = useTheme();

  const activeConv = conversations.find((c) => c.id === activeConversationId) ?? null;
  const listRef = useRef<FlatList<ChatMessage>>(null);

  useEffect(() => {
    if (activeConv && activeConv.messages.length > 0) {
      requestAnimationFrame(() => {
        listRef.current?.scrollToEnd({ animated: false });
      });
    }
  }, [activeConv]);

  const goToProfile = () => router.navigate("/(tabs)/profile");

  if (activeConv != null) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surfaceContainer }} edges={["top", "bottom"]}>
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.background }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          {/* Thread Header */}
          <View style={[styles.threadHeader, { borderBottomColor: `${colors.outlineVariant}66` }]}>
            <Pressable onPress={() => setActiveConversationId(null)} hitSlop={8} testID="chat_back">
              <AppIcon name="arrow_back" size={22} color={colors.onSurface} />
            </Pressable>
            <View
              style={[styles.avatar36, { backgroundColor: colors.secondaryContainer, marginLeft: 12, overflow: "hidden" }]}
            >
              {activeConv.traderAvatarUrl !== "" ? (
                <EcoImage url={activeConv.traderAvatarUrl} accessibilityLabel={activeConv.traderName} style={styles.fill} />
              ) : (
                <AppIcon name="person" size={18} color={colors.onSecondaryContainer} />
              )}
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[TYPE.titleMedium, { fontWeight: "700", color: colors.onSurface }]}>
                {activeConv.traderName}
              </Text>
              <Text style={{ fontSize: 11, color: colors.primary }} numberOfLines={1}>
                Regarding: {activeConv.itemTitle}
              </Text>
            </View>
            <TopRightProfileAvatar avatarUrl={userProfile.avatarUrl} onClick={goToProfile} />
          </View>

          {/* Privacy notice */}
          <View style={[styles.privacyBar, { backgroundColor: `${colors.primaryContainer}26` }]}>
            <AppIcon name="lock" size={14} color={colors.primary} />
            <Text style={{ fontSize: 11, color: colors.primary, marginLeft: 6 }}>
              End-to-end private direct messaging
            </Text>
          </View>

          {/* Messages */}
          <FlatList
            ref={listRef}
            data={activeConv.messages}
            keyExtractor={(msg) => msg.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8, rowGap: 8 }}
            renderItem={({ item: msg }) => (
              <MessageBubble msg={msg} />
            )}
          />

          {/* Input */}
          <View style={[styles.inputBar, { backgroundColor: colors.surfaceContainer, paddingBottom: 75 + 8 }]}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.outlineVariant,
                  backgroundColor: colors.surfaceContainerLowest,
                  color: colors.onSurface,
                },
              ]}
              placeholder="Write a message..."
              placeholderTextColor={`${colors.onSurfaceVariant}99`}
              value={inputMessage}
              onChangeText={setInputMessage}
              onSubmitEditing={() => {
                if (inputMessage.trim()) {
                  sendChatMessage(activeConv.id, inputMessage.trim());
                  setInputMessage("");
                }
              }}
              returnKeyType="send"
            />
            <Pressable
              onPress={() => {
                if (inputMessage.trim()) {
                  sendChatMessage(activeConv.id, inputMessage.trim());
                  setInputMessage("");
                }
              }}
              style={[styles.sendBtn, { backgroundColor: colors.primary }]}
              hitSlop={4}
            >
              <AppIcon name="send" size={18} color={colors.onPrimary} />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 12, backgroundColor: colors.background }}>
        <View style={styles.rowBetween}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={[TYPE.displayMedium, { fontWeight: "700", color: colors.primary, fontSize: 32, lineHeight: 40 }]}>
              Messages
            </Text>
            <Text style={[TYPE.bodyMedium, { color: colors.onSurfaceVariant }]}>
              Direct trade coordination & neighbor chats
            </Text>
          </View>
          <TopRightProfileAvatar avatarUrl={userProfile.avatarUrl} onClick={goToProfile} />
        </View>

        <View style={{ height: 16 }} />

        {conversations.length === 0 ? (
          <View style={styles.emptyWrap}>
            <AppIcon name="chat_bubble_outline" size={48} color={colors.outline} />
            <Text style={[TYPE.titleMedium, { fontWeight: "700", color: colors.onSurface, marginTop: 12 }]}>
              No conversations yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={conversations}
            keyExtractor={(conv) => conv.id}
            contentContainerStyle={{ rowGap: 10, paddingBottom: 90 }}
            renderItem={({ item }) => (
              <ConversationCard conv={item} onOpen={() => setActiveConversationId(item.id)} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const { colors } = useTheme();
  const isMe = msg.isFromMe;
  return (
    <View style={{ flexDirection: "row", justifyContent: isMe ? "flex-end" : "flex-start" }}>
      <View
        style={{
          maxWidth: "80%",
          borderRadius: 16,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderBottomLeftRadius: isMe ? 16 : 4,
          borderBottomRightRadius: isMe ? 4 : 16,
          backgroundColor: isMe ? colors.primary : colors.surfaceContainerHigh,
          padding: 12,
        }}
      >
        <Text style={{ color: isMe ? colors.onPrimary : colors.onSurface }}>{msg.text}</Text>
        <Text
          style={{
            fontSize: 9,
            color: isMe ? `${colors.onPrimary}B3` : colors.outline,
            alignSelf: "flex-end",
            marginTop: 4,
          }}
        >
          {msg.timestamp}
        </Text>
      </View>
    </View>
  );
}

function ConversationCard({ conv, onOpen }: { conv: ChatConversation; onOpen: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onOpen}
      style={[styles.convCard, { backgroundColor: colors.surfaceContainer, borderColor: `${colors.outlineVariant}66` }]}
    >
      <View style={[styles.avatar48, { backgroundColor: colors.surfaceVariant, overflow: "hidden" }]}>
        {conv.traderAvatarUrl !== "" ? (
          <EcoImage url={conv.traderAvatarUrl} accessibilityLabel={conv.traderName} style={styles.fill} />
        ) : (
          <AppIcon name="person" size={24} color={colors.onSecondaryContainer} />
        )}
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <View style={styles.rowBetween}>
          <Text style={[TYPE.titleMedium, { fontWeight: "700", color: colors.onSurface }]}>{conv.traderName}</Text>
          <Text style={{ fontSize: 11, color: colors.outline }}>{conv.lastMessageTime}</Text>
        </View>
        <Text style={{ fontSize: 11, fontWeight: "600", color: colors.primary }}>Item: {conv.itemTitle}</Text>
        <Text style={[TYPE.bodySmall, { color: colors.onSurfaceVariant, marginTop: 2 }]} numberOfLines={1}>
          {conv.lastMessage}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  fill: { flex: 1, width: "100%", height: "100%" },

  threadHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar36: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  avatar48: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  privacyBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
    fontSize: 15,
  },
  sendBtn: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },

  emptyWrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },

  convCard: { borderRadius: 20, borderWidth: 1, padding: 14, flexDirection: "row", alignItems: "center" },
});
