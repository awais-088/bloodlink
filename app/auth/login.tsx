import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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

    const [showPassword,
  setShowPassword] =
  useState(false);

const [loading,
  setLoading] =
  useState(false);
  const handleLogin =
  async () => {
    setLoading(true);
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
try {
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
} catch (err) {
  console.log(
    "Notification setup skipped"
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

  setLoading(false);

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
       setLoading(false);
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
    
    <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={
    Platform.OS === "ios"
      ? "padding"
      : "height"
  }
>
    <ScrollView
      contentContainerStyle={
        styles.container
      }
      showsVerticalScrollIndicator={
        false
      }
      keyboardShouldPersistTaps="handled"
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

        <View style={styles.passwordContainer}>
 <TextInput
  placeholder="Password"
  style={styles.passwordInput}
  secureTextEntry={!showPassword}
  value={password}
  onChangeText={setPassword}
  autoCorrect={false}
/>

  <TouchableOpacity
    onPress={() =>
      setShowPassword(
        !showPassword
      )
    }
  >
    <Ionicons
  name={
    showPassword
      ? "eye-off-outline"
      : "eye-outline"
  }
  size={22}
  color="#6B7280"
/>
  </TouchableOpacity>
</View>
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
  {loading
    ? "Signing In..."
    : "Login"}
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
    </KeyboardAvoidingView>
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
  passwordContainer: {
  backgroundColor: "#F3F4F6",
  borderRadius: 14,
  paddingHorizontal: 16,
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 20,
  overflow: "hidden",
},

passwordInput: {
  flex: 1,
  paddingVertical: 16,
  fontSize: 16,
  borderWidth: 0,
  backgroundColor: "transparent",
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

  backgroundColor:
    "rgba(255,255,255,0.95)",

  borderRadius: 28,

  padding: 25,

  shadowColor: "#000",

  shadowOpacity: 0.12,

  shadowRadius: 20,

  elevation: 8,
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