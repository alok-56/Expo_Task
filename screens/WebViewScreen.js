import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import { Bell, Film } from "lucide-react-native";
import { scheduleNotification } from "../utils/notificationHelper";

export default function WebViewScreen() {
  const [webViewLoaded, setWebViewLoaded] = useState(false);
  const hasLoadedOnce = useRef(false);

  const handleWebViewLoaded = () => {
    if (!hasLoadedOnce.current) {
      setWebViewLoaded(true);
      hasLoadedOnce.current = true;
      scheduleNotification(
        "✅ WebView Loaded",
        "Website has finished loading successfully!",
        2
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: "https://houseofedtech.in" }}
        onLoadEnd={handleWebViewLoaded}
        style={styles.webview}
        startInLoadingState={true}
      />

      <View style={styles.overlayContainer}>
        {webViewLoaded && (
          <View style={styles.loadedContainer}>
            <Text style={styles.loadedText}>✓ Website loaded successfully</Text>
          </View>
        )}

        <View style={styles.notificationSection}>
          <Text style={styles.sectionTitle}>Send Notifications</Text>
          <Text style={styles.sectionDescription}>
            Tap the buttons below to schedule notifications with a delay
          </Text>

          <View style={styles.buttonGrid}>
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={() =>
                scheduleNotification(
                  "🎉 Welcome Notification",
                  "Thanks for exploring the WebView feature!",
                  2
                )
              }
            >
              <Bell size={20} color="#fff" />
              <Text style={styles.buttonText}>Send Welcome</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={() =>
                scheduleNotification(
                  "🎬 Video Available",
                  "Tap to watch our featured video content!",
                  3
                )
              }
            >
              <Film size={20} color="#fff" />
              <Text style={styles.buttonText}>Video Alert</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  overlayContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  loadedContainer: {
    backgroundColor: "#10b981",
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  loadedText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  notificationSection: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 16,
  },
  buttonGrid: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 6,
  },
  buttonPrimary: {
    backgroundColor: "#6366f1",
  },
  buttonSecondary: {
    backgroundColor: "#8b5cf6",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
