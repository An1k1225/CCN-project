import React from "react";
import { Redirect, Tabs } from "expo-router";
import { useStore } from "@/data/store";
import { AppTabBar } from "@/components/app-tab-bar";

export default function TabsLayout() {
  const { isLoggedIn } = useStore();

  if (!isLoggedIn) {
    return <Redirect href="/auth" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <AppTabBar {...props} />}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="trade" />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
