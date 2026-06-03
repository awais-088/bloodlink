import { Tabs } from "expo-router";

import {
  FontAwesome5,
} from "@expo/vector-icons";

const DonorTabs = () => {
  return (
    <Tabs
  screenOptions={{
    headerShown: false,

    tabBarActiveTintColor:
      "#DC2626",

    tabBarInactiveTintColor:
      "#9CA3AF",

    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "600",
    },

    tabBarStyle: {
      height: 80,

      paddingBottom: 12,

      paddingTop: 8,

      borderTopWidth: 0,

      elevation: 10,
    },
  }}
>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <FontAwesome5
              name="tint"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="requests"
        options={{
          title: "Requests",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <FontAwesome5
              name="heartbeat"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default DonorTabs;