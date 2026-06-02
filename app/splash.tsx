import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/blood-drop.png")}
        style={styles.image}
      />

      <Text style={styles.logo}>
        BloodLink
      </Text>

      <Text style={styles.tagline}>
        Smart Blood Donation App
      </Text>

      <ActivityIndicator
        size="large"
        color="white"
        style={styles.loader}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#DC2626",

    justifyContent: "center",

    alignItems: "center",
  },

  image: {
    width: 130,

    height: 130,

    marginBottom: 20,

    resizeMode: "contain",
  },

  logo: {
    color: "white",

    fontSize: 42,

    fontWeight: "bold",

    marginBottom: 10,
  },

  tagline: {
    color: "white",

    fontSize: 18,

    marginBottom: 40,
  },

  loader: {
    marginTop: 10,
  },
});