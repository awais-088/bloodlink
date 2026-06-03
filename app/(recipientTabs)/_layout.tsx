import {
  FontAwesome5,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";

const RecipientTabs = () => {
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