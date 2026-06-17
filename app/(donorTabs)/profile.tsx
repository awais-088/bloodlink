import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { getUser, removeUser, saveUser } from "../utils/storage";

import { router } from "expo-router";

import API from "../api/api";

const DonorProfile = () => {
  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [city, setCity] = useState("");

  const [image, setImage] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const loggedInUser = await getUser();

    setUser(loggedInUser);

    setName(loggedInUser.name);

    setPhone(loggedInUser.phone);

    setCity(loggedInUser.city);

    setImage(loggedInUser.profileImage);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      allowsEditing: true,

      aspect: [1, 1],

      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await API.put(`/auth/profile/${user._id}`, {
        name,
        phone,
        city,
        profileImage: image,
      });

      await saveUser(response.data.user);

      Alert.alert("Success", "Profile Updated");
    } catch {
      Alert.alert("Error", "Update Failed");
    }
  };

  const handleLogout = async () => {
    await removeUser();

    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={{
            marginBottom: 20,
          }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.header}>Donor Profile</Text>

        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          <Image
            source={
              image ? { uri: image } : require("../../assets/images/user.png")
            }
            style={styles.image}
          />

          <Text style={styles.changeText}>Change Photo</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />

        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
        />

        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="City"
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DonorProfile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    backgroundColor: "#F9FAFB",

    paddingTop: 60,

    paddingHorizontal: 20,

    paddingBottom: 100,
  },

  header: {
    fontSize: 32,

    fontWeight: "bold",

    marginBottom: 25,

    color: "#111827",
  },

  imageContainer: {
    alignItems: "center",

    marginBottom: 25,
  },

  image: {
    width: 130,

    height: 130,

    borderRadius: 65,

    marginBottom: 10,
  },

  changeText: {
    color: "#DC2626",

    fontWeight: "bold",
  },

  input: {
    backgroundColor: "white",

    padding: 18,

    borderRadius: 16,

    marginBottom: 18,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 5,

    elevation: 3,
  },
  back: {
    color: "#DC2626",

    fontSize: 18,

    fontWeight: "bold",

    marginBottom: 20,
  },

  updateButton: {
    backgroundColor: "#DC2626",

    paddingVertical: 18,

    borderRadius: 16,

    alignItems: "center",

    marginTop: 10,

    marginBottom: 15,
  },

  logoutButton: {
    backgroundColor: "#111827",

    paddingVertical: 18,

    borderRadius: 16,

    alignItems: "center",
  },

  buttonText: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },
});
