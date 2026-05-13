import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useState } from "react";

import { router } from "expo-router";

import API from "../api/api";

const ForgotPasswordScreen = () => {
  const [email, setEmail] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const handleReset =
    async () => {
      try {
        await API.put(
          "/auth/reset-password",
          {
            email,
            newPassword,
          }
        );

        Alert.alert(
          "Success",
          "Password updated successfully"
        );

        router.replace(
          "/auth/login"
        );
      } catch (error) {
        Alert.alert(
          "Error",
          "Reset failed"
        );
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
      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          router.back()
        }
      >
        <Text style={styles.backText}>
          ← Back
        </Text>
      </TouchableOpacity>

      <Image
        source={require("../../assets/images/blood-drop.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        Forgot Password
      </Text>

      <Text style={styles.subtitle}>
        Reset your account password
      </Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="New Password"
          secureTextEntry
          style={styles.input}
          value={newPassword}
          onChangeText={
            setNewPassword
          }
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleReset}
        >
          <Text
            style={styles.buttonText}
          >
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    backgroundColor: "#DC2626",

    justifyContent: "center",

    padding: 20,
  },

  backButton: {
    marginBottom: 20,
  },

  backText: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },

  logo: {
    width: 120,

    height: 120,

    alignSelf: "center",

    marginBottom: 20,
  },

  title: {
    fontSize: 36,

    fontWeight: "bold",

    color: "white",

    textAlign: "center",
  },

  subtitle: {
    color: "white",

    textAlign: "center",

    marginBottom: 30,

    fontSize: 16,
  },

  card: {
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
  },

  buttonText: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },
});