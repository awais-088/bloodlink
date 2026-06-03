import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { registerForPushNotifications } from "../utils/notifications";

import API from "../api/api";

import { saveUser } from "../utils/storage";

const LoginScreen = () => {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
  async () => {
    try {
      const response =
        await API.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      const user =
        response.data.user;

      await saveUser(user);
const pushToken =
  await registerForPushNotifications();
  if (pushToken) {
  await API.put(
    "/auth/save-token",
    {
      userId: user._id,
      pushToken,
    }
  );
}
      Toast.show({
        type: "success",
        text1:
          "Login Successful",
        text2:
          "Welcome back 👋",
        visibilityTime: 2000,
      });

      setTimeout(() => {
        if (
          user.role ===
          "donor"
        ) {
          router.replace(
            "/(donorTabs)/dashboard"
          );
        } else {
          router.replace(
            "/(recipientTabs)/home"
          );
        }
      }, 2000);
    } catch (error: any) {
      console.log(
        error.response?.data
      );

      console.log(
        error.message
      );

      Toast.show({
        type: "error",
        text1:
          "Login Failed",
        text2:
          "Invalid email or password",
      });
    }
  };

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
        Welcome Back
      </Text>

      <Text style={styles.subtitle}>
        Login to continue
      </Text>

      <SafeAreaView style={styles.card}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={
            setPassword
          }
        />
        <TouchableOpacity
  onPress={() =>
    router.push(
      "/auth/forgot-password"
    )
  }
>
  <Text style={styles.forgotText}>
    Forgot Password?
  </Text>
</TouchableOpacity>


        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text
            style={styles.buttonText}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push(
              "/auth/register"
            )
          }
        >
          <Text style={styles.link}>
            Don't have an account?
            Register
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    backgroundColor: "#DC2626",

    justifyContent: "center",

    alignItems: "center",

    padding: 20,
  },

  logo: {
    width: 120,

    height: 120,

    marginBottom: 20,
  },

  title: {
    fontSize: 36,

    fontWeight: "bold",

    color: "white",
  },

  subtitle: {
    color: "white",

    fontSize: 16,

    marginBottom: 30,
  },
  forgotText: {
  textAlign: "right",

  color: "#DC2626",

  marginBottom: 20,

  fontWeight: "600",
},

  card: {
    width: "100%",

    backgroundColor: "white",

    borderRadius: 24,

    padding: 25,
  },

  input: {
    backgroundColor: "#F3F4F6",

    padding: 16,

    borderRadius: 14,

    marginBottom: 20,

    fontSize: 16,
  },

  button: {
    backgroundColor: "#DC2626",

    paddingVertical: 16,

    borderRadius: 14,

    alignItems: "center",

    marginBottom: 20,
  },

  buttonText: {
    color: "white",

    fontWeight: "bold",

    fontSize: 18,
  },

  link: {
    textAlign: "center",

    color: "#DC2626",

    fontWeight: "600",
  },
});