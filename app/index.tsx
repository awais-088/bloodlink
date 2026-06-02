import { router } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/blood-drop.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        BloodLink
      </Text>

      <Text style={styles.subtitle}>
        Smart Blood Donation App
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push("/auth/login")
        }
      >
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#DC2626",

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 20,
  },

  logo: {
    width: 140,

    height: 140,

    marginBottom: 25,

    resizeMode: "contain",
  },

  title: {
    fontSize: 42,

    fontWeight: "bold",

    color: "white",

    marginBottom: 10,
  },

  subtitle: {
    color: "white",

    fontSize: 18,

    marginBottom: 40,
  },

  button: {
    backgroundColor: "white",

    paddingVertical: 16,

    paddingHorizontal: 40,

    borderRadius: 14,
  },

  buttonText: {
    color: "#DC2626",

    fontWeight: "bold",

    fontSize: 18,
  },
});