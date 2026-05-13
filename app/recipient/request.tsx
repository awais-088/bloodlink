import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import socket from "../services/socket";
import { getUser } from "../utils/storage";

import API from "../api/api";

const RequestScreen = () => {
  const { donorId, bloodGroup } =
    useLocalSearchParams();

  const [patientName, setPatientName] =
    useState("");

  const [hospitalName, setHospitalName] =
    useState("");

 const handleRequest = async () => {
  try {
    const user =
      await getUser();
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
  
    Alert.alert(
      "Success",
      "Blood request sent successfully"
      
    );
    socket.emit(
  "sendRequest",
  {
    donorId,
    message:
      "New Blood Request",
  }
);

    router.back();
  } catch (error) {
    Alert.alert(
      "Error",
      "Failed to send request"
    );
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Blood Request
      </Text>

      <TextInput
        placeholder="Patient Name"
        style={styles.input}
        value={patientName}
        onChangeText={setPatientName}
      />

      <TextInput
        placeholder="Hospital Name"
        style={styles.input}
        value={hospitalName}
        onChangeText={setHospitalName}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRequest}
      >
        <Text style={styles.buttonText}>
          Send Request
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F9FAFB",

    paddingTop: 60,

    paddingHorizontal: 20,
  },

  header: {
    fontSize: 30,

    fontWeight: "bold",

    marginBottom: 30,

    color: "#111827",
  },

  input: {
    backgroundColor: "white",

    padding: 16,

    borderRadius: 14,

    marginBottom: 20,

    fontSize: 16,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 5,

    elevation: 3,
  },

  button: {
    backgroundColor: "#DC2626",

    paddingVertical: 18,

    borderRadius: 14,

    alignItems: "center",
  },

  buttonText: {
    color: "white",

    fontWeight: "bold",

    fontSize: 18,
  },
});