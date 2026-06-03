import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
const RootLayout = () => {
  return (
    <>
    <StatusBar style="dark"/>
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
    <Toast />
    </>
    
  );
};

export default RootLayout;