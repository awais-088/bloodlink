import { router } from "expo-router";

import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser, removeUser, saveUser } from "../utils/storage";

import API from "../api/api";

const DonorDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [available, setAvailable] = useState(true);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const loggedInUser = await getUser();

      setUser(loggedInUser);

      setAvailable(loggedInUser?.available);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvailability = async (value: boolean) => {
    try {
      setAvailable(value);

      await API.put(`/auth/availability/${user._id}`, {
        available: value,
      });

      const updatedUser = {
        ...user,
        available: value,
      };

      setUser(updatedUser);

      await saveUser(updatedUser);

      Alert.alert("Success", "Availability updated");
    } catch {
      Alert.alert("Error", "Failed to update");
    }
  };

  const handleLogout = async () => {
    await removeUser();

    Alert.alert("Success", "Logged out successfully");

    router.replace("/");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" color="#DC2626" />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Donor Dashboard</Text>

      <SafeAreaView style={styles.profileCard}>
        <Image
          source={
            user?.profileImage
              ? {
                  uri: user.profileImage,
                }
              : require("../../assets/images/user.png")
          }
          style={styles.avatar}
        />

        <Text style={styles.name}>{user?.name}</Text>

        <Text style={styles.info}>Blood Group: {user?.bloodGroup}</Text>

        <Text style={styles.info}>City: {user?.city}</Text>
      </SafeAreaView>

      <SafeAreaView style={styles.availabilityCard}>
        <Text style={styles.availabilityText}>Availability Status</Text>

        <Switch
          value={available}
          onValueChange={handleAvailability}
          trackColor={{
            false: "#9CA3AF",
            true: "#DC2626",
          }}
        />
      </SafeAreaView>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => router.push("/(donorTabs)/profile")}
      >
        <Text style={styles.requestText}>Open Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.requestText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DonorDashboard;

const styles = StyleSheet.create({
  loader: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },

  container: {
    flexGrow: 1,

    backgroundColor: "#F9FAFB",

    paddingTop: 60,

    paddingHorizontal: 20,

    paddingBottom: 40,
  },

  header: {
    fontSize: 30,

    fontWeight: "bold",

    marginBottom: 25,

    color: "#111827",
  },

  profileCard: {
    backgroundColor: "#DC2626",

    padding: 25,

    borderRadius: 20,

    marginBottom: 20,

    alignItems: "center",
  },

  avatar: {
    width: 100,

    height: 100,

    borderRadius: 50,

    marginBottom: 15,
  },

  name: {
    color: "white",

    fontSize: 26,

    fontWeight: "bold",

    marginBottom: 10,
  },

  info: {
    color: "white",

    fontSize: 16,

    marginBottom: 5,
  },

  availabilityCard: {
    backgroundColor: "white",

    padding: 20,

    borderRadius: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 20,
  },

  availabilityText: {
    fontSize: 18,

    fontWeight: "600",

    color: "#111827",
  },

  profileButton: {
    backgroundColor: "#DC2626",

    paddingVertical: 18,

    borderRadius: 14,

    alignItems: "center",

    marginBottom: 15,
  },

  logoutButton: {
    backgroundColor: "#111827",

    paddingVertical: 18,

    borderRadius: 14,

    alignItems: "center",
  },

  requestText: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },
});
