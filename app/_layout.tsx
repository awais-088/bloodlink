import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
const RootLayout = () => {
  return (
    <>
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