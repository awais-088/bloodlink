import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export const registerForPushNotifications =
  async () => {
    if (!Device.isDevice) return null;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } =
        await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return null;
    }
    if (Device.osName === "Android") {
  await Notifications.setNotificationChannelAsync(
    "default",
    {
      name: "default",
      importance:
        Notifications.AndroidImportance.MAX,
      vibrationPattern: [
        0, 250, 250, 250,
      ],
      lightColor: "#DC2626",
    }
  );
}

    const token =
      (
       await Notifications.getExpoPushTokenAsync({
  projectId:
    "ba4bbb08-58bb-44fa-af10-850293a3f6d5",
})
      ).data;

    return token;
  };