import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView
} from "react-native-safe-area-context";

import { router } from "expo-router";

import API from "../api/api";

const RegisterScreen = () => {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [city, setCity] =
    useState("");

  const [bloodGroup, setBloodGroup] =
    useState("");

  const [role, setRole] =
    useState("recipient");

  const handleRegister =
    async () => {
      if (
  role === "donor" &&
  !bloodGroup
) {
  return Alert.alert(
    "Error",
    "Blood group is required for donors"
  );
}
      try {
        await API.post(
          "/auth/register",
          {
            name,
            email,
            password,
            phone,
            city,
            bloodGroup,
            role,
          }
        );

        Alert.alert(
          "Success",
          "Account created"
        );

        router.replace(
          "/auth/login"
        );
      } catch (error: any) {
        Alert.alert(
          "Error",
          error?.response?.data
            ?.message ||
            "Registration failed"
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
      <Image
        source={require("../../assets/images/blood-drop.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        Create Account
      </Text>

      <SafeAreaView style={styles.card}>
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

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

        <TextInput
          placeholder="Phone"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          placeholder="City"
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />

        {role === "donor" && (
  <TextInput
    placeholder="Blood Group"
    style={styles.input}
    value={bloodGroup}
    onChangeText={
      setBloodGroup
    }
  />
)}

        <SafeAreaView style={styles.roleContainer}>
  <Pressable
    style={[
      styles.roleButton,

      role === "recipient" && {
        backgroundColor:
          "#DC2626",
      },
    ]}
    onPress={() =>
      setRole("recipient")
    }
  >
    <Text
      style={[
        styles.roleText,

        role === "recipient" && {
          color: "white",
        },
      ]}
    >
      Recipient
    </Text>
  </Pressable>

  <Pressable
    style={[
      styles.roleButton,

      role === "donor" && {
        backgroundColor:
          "#DC2626",
      },
    ]}
    onPress={() =>
      setRole("donor")
    }
  >
    <Text
      style={[
        styles.roleText,

        role === "donor" && {
          color: "white",
        },
      ]}
    >
      Donor
    </Text>
  </Pressable>
</SafeAreaView>

        <TouchableOpacity
          style={styles.button}
          onPress={
            handleRegister
          }
        >
          <Text
            style={styles.buttonText}
          >
            Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push(
              "/auth/login"
            )
          }
        >
          <Text style={styles.link}>
            Already have an account?
            Login
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    backgroundColor: "#DC2626",

    alignItems: "center",

    padding: 20,

    paddingTop: 60,
  },

  logo: {
    width: 110,

    height: 110,

    marginBottom: 20,
  },

  title: {
    fontSize: 34,

    fontWeight: "bold",

    color: "white",

    marginBottom: 25,
  },
  roleContainer: {
  flexDirection: "row",

  justifyContent:
    "space-between",

  marginBottom: 20,
},

roleButton: {
  width: "48%",

  backgroundColor: "#F3F4F6",

  paddingVertical: 16,

  borderRadius: 14,

  alignItems: "center",
},

roleText: {
  fontSize: 16,

  fontWeight: "bold",

  color: "#111827",
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

    marginBottom: 18,

    fontSize: 16,
  },

  button: {
    backgroundColor: "#DC2626",

    paddingVertical: 16,

    borderRadius: 14,

    alignItems: "center",

    marginTop: 10,

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