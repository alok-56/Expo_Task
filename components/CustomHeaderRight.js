import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Bell } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomHeaderRight = ({ notificationCount, openNotificationModal }) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={styles.notificationButton}
      onPress={openNotificationModal}
    >
      <Bell size={24} color="#fff" />
      {notificationCount > 0 && (
        <View style={[styles.badge]}>
          <Text style={styles.badgeText}>
            {notificationCount > 9 ? "9+" : notificationCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationButton: {
    marginRight: 16,
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -4,
    backgroundColor: "#ef4444",
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    lineHeight: 12,
    textAlign: "center",
  },
});

export default CustomHeaderRight;
