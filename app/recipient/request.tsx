import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Toast from "react-native-toast-message";
import API from "../api/api";
import socket from "../services/socket";
import { getUser } from "../utils/storage";
const RequestScreen = () => {
  const { donorId, bloodGroup } =
    useLocalSearchParams();

  const [patientName, setPatientName] =
    useState("");

  const [hospitalName, setHospitalName] =
    useState("");

 const handleRequest = async () => {
  if (
  !patientName.trim() ||
  !hospitalName.trim()
) {
  Alert.alert(
    "Validation Error",
    "Please fill all fields"
  );

  return;
}
  console.log("Button pressed");
  try {
    
    const user =
      await getUser();
      console.log("Donor ID:", donorId);
console.log("Blood Group:", bloodGroup);
await API.post(
  "/request/create",
  {
    recipient: user._id,

    donor: String(donorId),

    patientName,

    hospitalName,

    bloodGroup: String(
      bloodGroup
    ),
  }
);
console.log("Request Sent Successfully");
  
    Toast.show({
  type: "success",
  text1: "Request Sent",
  text2:
    "Blood request sent successfully",
});

setTimeout(() => {
  router.back();
}, 2500);

socket.emit(
  "sendRequest",
  {
    donorId,
    message:
      "New Blood Request",
  }
);
  } catch (error: any) {
  console.log("REQUEST ERROR:", error);

  if (error.response) {
    console.log(
      "SERVER ERROR:",
      error.response.data
    );
  }

  Alert.alert(
    "Error",
    "Failed to send request"
  );
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
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={
        false
      }
    >
    
  
    {/* Back Button */}

    <TouchableOpacity
      style={styles.backButton}
      onPress={() =>
        router.back()
      }
    >
      <Ionicons
        name="arrow-back"
        size={28}
        color="#111827"
      />
    </TouchableOpacity>

    {/* Banner */}

    <View style={styles.banner}>
      <Text style={styles.bannerIcon}>
        🩸
      </Text>

      <Text style={styles.bannerTitle}>
        Blood Request
      </Text>

      <Text style={styles.bannerText}>
        Fill in the patient details
        to send a blood request to
        the donor.
      </Text>
    </View>

    {/* Blood Group Card */}

    <View style={styles.groupCard}>
      <Text style={styles.groupLabel}>
        Requested Blood Group
      </Text>

      <Text style={styles.groupValue}>
        {bloodGroup}
      </Text>
    </View>

    {/* Form */}

    <Text style={styles.label}>
      Patient Name
    </Text>

    <TextInput
      placeholder="Enter patient name"
      style={styles.input}
      value={patientName}
      onChangeText={setPatientName}
    />

    <Text style={styles.label}>
      Hospital Name
    </Text>

    <TextInput
      placeholder="Enter hospital name"
      style={styles.input}
      value={hospitalName}
      onChangeText={setHospitalName}
    />

    <TouchableOpacity
      style={styles.button}
      onPress={handleRequest}
    >
      <Ionicons
        name="send"
        size={18}
        color="white"
      />

      <Text
        style={styles.buttonText}
      >
        Send Request
      </Text>
    </TouchableOpacity>
  </ScrollView>
  </KeyboardAvoidingView>
);
};

export default RequestScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,

    paddingHorizontal: 20,

    paddingBottom: 80,

    backgroundColor: "#F9FAFB",
  },

  backButton: {
    marginBottom: 20,
  },

  banner: {
    backgroundColor: "#DC2626",

    borderRadius: 25,

    padding: 25,

    alignItems: "center",

    marginBottom: 20,
  },

  bannerIcon: {
    fontSize: 55,

    marginBottom: 10,
  },

  bannerTitle: {
    color: "#fff",

    fontSize: 28,

    fontWeight: "bold",

    marginBottom: 8,
  },

  bannerText: {
    color: "#fff",

    textAlign: "center",

    fontSize: 15,
  },

  groupCard: {
    backgroundColor: "#fff",

    padding: 20,

    borderRadius: 20,

    marginBottom: 25,

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 10,

    elevation: 4,
  },

  groupLabel: {
    color: "#6B7280",

    marginBottom: 8,
  },

  groupValue: {
    fontSize: 30,

    fontWeight: "bold",

    color: "#DC2626",
  },

  label: {
    fontSize: 15,

    fontWeight: "600",

    color: "#374151",

    marginBottom: 8,
  },

  input: {
    backgroundColor: "#fff",

    padding: 18,

    borderRadius: 16,

    marginBottom: 20,

    fontSize: 16,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 6,

    elevation: 3,
  },

  button: {
    backgroundColor: "#DC2626",

    paddingVertical: 18,

    borderRadius: 18,

    alignItems: "center",

    justifyContent: "center",

    flexDirection: "row",

    gap: 10,

    marginTop: 10,
  },

  buttonText: {
    color: "#fff",

    fontSize: 18,

    fontWeight: "bold",
  },
});