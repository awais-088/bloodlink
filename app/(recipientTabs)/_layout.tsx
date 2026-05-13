import { Tabs } from "expo-router";

import {
    FontAwesome5,
} from "@expo/vector-icons";

const RecipientTabs = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor:
          "#DC2626",

        tabBarStyle: {
          height: 65,

          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <FontAwesome5
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <FontAwesome5
              name="history"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <FontAwesome5
              name="user"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default RecipientTabs;