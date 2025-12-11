import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Globe, Film } from "lucide-react-native";

import WebViewScreen from "../screens/WebViewScreen";
import VideoPlayerScreen from "../screens/VideoPlayerScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ headerRight }) {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "WebView") {
            return <Globe size={size} color={color} />;
          }
          if (route.name === "Video Player") {
            return <Film size={size} color={color} />;
          }
          return null;
        },

        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "#94a3b8",

        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e2e8f0",
          paddingBottom: insets.bottom + 8,
          paddingTop: 8,
          height: 60 + insets.bottom,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        headerStyle: {
          backgroundColor: "#6366f1",
          height: Platform.OS === "android" ? 56 + insets.top : 44 + insets.top,
        },

        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 18,
        },

       
        ...(headerRight && { headerRight }),
      })}
    >
      <Tab.Screen
        name="WebView"
        component={WebViewScreen}
        options={{ title: "WebView Demo", headerShown: true }}
      />
      <Tab.Screen
        name="Video Player"
        component={VideoPlayerScreen}
        options={{ title: "Video Player", headerShown: true }}
      />
    </Tab.Navigator>
  );
}
