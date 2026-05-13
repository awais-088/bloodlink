import {
  useEffect,
  useState,
} from "react";
import {
  Alert,
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

import * as ImagePicker from "expo-image-picker";

import {
  getUser,
  removeUser,
  saveUser,
} from "../utils/storage";

import { router } from "expo-router";

import API from "../api/api";

const ProfileScreen = () => {
  const [user, setUser] =
    useState<any>(null);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [city, setCity] =
    useState("");

  const [image, setImage] =
    useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const loggedInUser =
      await getUser();

    setUser(loggedInUser);

    setName(loggedInUser.name);

    setPhone(loggedInUser.phone);

    setCity(loggedInUser.city);

    setImage(
      loggedInUser.profileImage
    );
  };

  const pickImage =
    async () => {
      const result =
        await ImagePicker.launchImageLibraryAsync(
          {
            mediaTypes:
              ImagePicker.MediaTypeOptions.Images,

            allowsEditing: true,

            aspect: [1, 1],

            quality: 1,
          }
        );

      if (!result.canceled) {
        setImage(
          result.assets[0].uri
        );
      }
    };

  const handleUpdate =
    async () => {
      try {
        const response =
          await API.put(
            `/auth/profile/${user._id}`,
            {
              name,
              phone,
              city,
              profileImage:
                image,
            }
          );

        const updatedUser =
          response.data.user;

        setUser(updatedUser);

        await saveUser(
          updatedUser
        );

        Alert.alert(
          "Success",
          "Profile updated successfully"
        );
      } catch (error) {
        Alert.alert(
          "Error",
          "Update failed"
        );
      }
    };

  const handleLogout =
    async () => {
      await removeUser();

      router.replace("/");
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
      <Text style={styles.header}>
        My Profile
      </Text>

      <TouchableOpacity
        onPress={pickImage}
        style={styles.imageContainer}
      >
        <Image
          source={
             require("../../assets/images/user.png")
          }
          style={styles.image}
        />

        <Text style={styles.changePhoto}>
          Change Photo
        </Text>
      </TouchableOpacity>

      <SafeAreaView style={styles.card}>
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

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdate}
        >
          <Text style={styles.buttonText}>
            Update Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    backgroundColor: "#F9FAFB",

    paddingTop: 60,

    paddingHorizontal: 20,

    paddingBottom: 50,
  },

  header: {
    fontSize: 32,

    fontWeight: "bold",

    marginBottom: 25,
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

  changePhoto: {
    color: "#DC2626",

    fontWeight: "600",
  },

  card: {
    backgroundColor: "white",

    borderRadius: 24,

    padding: 20,
  },

  input: {
    backgroundColor: "#F3F4F6",

    padding: 16,

    borderRadius: 14,

    marginBottom: 20,
  },

  updateButton: {
    backgroundColor: "#DC2626",

    paddingVertical: 18,

    borderRadius: 14,

    alignItems: "center",

    marginBottom: 15,
  },

  logoutButton: {
    backgroundColor: "#111827",

    paddingVertical: 18,

    borderRadius: 14,

    alignItems: "center",
  },

  buttonText: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },
});