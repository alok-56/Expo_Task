import React, { useState, useRef, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TabNavigator from "./navigation/Tabnavigation";
import NotificationModal from "./components/NotificationModal";
import CustomHeaderRight from "./components/CustomHeaderRight";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const notificationListener = useRef();
  const responseListener = useRef();
  const navigationRef = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync();

   
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const newNotif = {
          id: Date.now(),
          title: notification.request.content.title,
          body: notification.request.content.body,
          timestamp: new Date().toLocaleTimeString(),
          read: false,
        };

        setNotifications((prev) => [newNotif, ...prev]);
        setNotificationCount((prev) => prev + 1);
      });

    // When user taps notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (navigationRef.current) {
          navigationRef.current.navigate("Video Player");
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
  };

  // Open modal
  const openNotificationModal = () => {
    setNotificationModalVisible(true);
    setNotificationCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Clear notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setNotificationCount(0);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <TabNavigator
          headerRight={() => (
            <CustomHeaderRight
              notificationCount={notificationCount}
              openNotificationModal={openNotificationModal}
            />
          )}
        />

        <NotificationModal
          notifications={notifications}
          notificationModalVisible={notificationModalVisible}
          clearAllNotifications={clearAllNotifications}
          setNotificationModalVisible={setNotificationModalVisible}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
