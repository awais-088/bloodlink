import { router } from "expo-router";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView
} from "react-native-safe-area-context";
import { bloodGroups } from "../constants/bloodGroups";

const RecipientHome = () => {
  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <Image
        source={require("../../assets/images/blood-drop.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        BloodLink
      </Text>

      <Text style={styles.subtitle}>
        Find Blood Donors
      </Text>

      <SafeAreaView style={styles.banner}>
        <Text style={styles.bannerTitle}>
          Need Blood?
        </Text>

        <Text style={styles.bannerText}>
          Select a blood group to
          find donors near you.
        </Text>
      </SafeAreaView>

      <SafeAreaView style={styles.groupContainer}>
        {bloodGroups.map(
          (group) => (
            <TouchableOpacity
              key={group}
              style={
                styles.groupCard
              }
              onPress={() =>
                router.push({
                  pathname:
                    "/recipient/donors",

                  params: {
                    bloodGroup:
                      group,
                  },
                })
              }
            >
              <Image
                source={require("../../assets/images/blood-drop.png")}
                style={
                  styles.groupIcon
                }
              />

              <Text
                style={
                  styles.groupText
                }
              >
                {group}
              </Text>
            </TouchableOpacity>
          )
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default RecipientHome;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,

    paddingHorizontal: 20,

    paddingBottom: 100,

    backgroundColor: "#F9FAFB",
  },

  logo: {
    width: 90,

    height: 90,

    alignSelf: "center",

    marginBottom: 10,

    resizeMode: "contain",
  },

  title: {
    fontSize: 36,

    fontWeight: "bold",

    textAlign: "center",

    color: "#DC2626",
  },

  subtitle: {
    textAlign: "center",

    color: "#6B7280",

    marginBottom: 25,

    fontSize: 16,
  },

  banner: {
    backgroundColor: "#DC2626",

    padding: 22,

    borderRadius: 20,

    marginBottom: 25,
  },

  bannerTitle: {
    color: "white",

    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 8,
  },

  bannerText: {
    color: "white",

    fontSize: 15,
  },

  groupContainer: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent:
      "space-between",
  },

  groupCard: {
    width: "48%",

    backgroundColor: "white",

    borderRadius: 18,

    paddingVertical: 22,

    alignItems: "center",

    marginBottom: 15,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 5,

    elevation: 3,
  },

  groupIcon: {
    width: 32,

    height: 32,

    marginBottom: 10,
  },

  groupText: {
    fontSize: 22,

    fontWeight: "bold",

    color: "#111827",
  },
});