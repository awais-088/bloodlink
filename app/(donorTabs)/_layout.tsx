import { Tabs } from "expo-router";

import { FontAwesome5 } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const DonorTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#DC2626",

        tabBarStyle: {
          height: 65 + insets.bottom,

          paddingBottom: insets.bottom,

          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",

          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="tint" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="requests"
        options={{
          title: "Requests",

          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="heartbeat" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default DonorTabs;
