import AsyncStorage from "@react-native-async-storage/async-storage";

// SAVE USER

export const saveUser = async (user: any) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
};

// GET USER

export const getUser = async () => {
  const user = await AsyncStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

// REMOVE USER

export const removeUser = async () => {
  await AsyncStorage.removeItem("user");
};
