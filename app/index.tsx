import { router } from "expo-router";

import { useEffect, useRef, } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser } from "./utils/storage";

const WelcomeScreen = () => {
  const scaleAnim =
  useRef(
    new Animated.Value(1)
  ).current;

const fadeAnim =
  useRef(
    new Animated.Value(0)
  ).current;
  const ringAnim =
  useRef(
    new Animated.Value(0)
  ).current;
  const drop1 =
  useRef(
    new Animated.Value(-150)
  ).current;

const drop2 =
  useRef(
    new Animated.Value(-450)
  ).current;

const drop3 =
  useRef(
    new Animated.Value(-750)
  ).current;
  useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(
        scaleAnim,
        {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }
      ),
      Animated.timing(
        scaleAnim,
        {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }
      ),
    ])
  ).start();

  Animated.timing(
    fadeAnim,
    {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }
  ).start();

  Animated.loop(
    Animated.timing(
      ringAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
    )
  ).start();
  Animated.loop(
  Animated.sequence([
    Animated.timing(drop1, {
      toValue: 1000,
      duration: 7000,
      useNativeDriver: true,
    }),
    Animated.timing(drop1, {
      toValue: -150,
      duration: 0,
      useNativeDriver: true,
    }),
  ])
).start();

Animated.loop(
  Animated.sequence([
    Animated.timing(drop2, {
      toValue: 1000,
      duration: 9000,
      useNativeDriver: true,
    }),
    Animated.timing(drop2, {
      toValue: -450,
      duration: 0,
      useNativeDriver: true,
    }),
  ])
).start();

Animated.loop(
  Animated.sequence([
    Animated.timing(drop3, {
      toValue: 1000,
      duration: 11000,
      useNativeDriver: true,
    }),
    Animated.timing(drop3, {
      toValue: -750,
      duration: 0,
      useNativeDriver: true,
    }),
  ])
).start();

}, []);
  useEffect(() => {
  checkUser();
}, []);

const checkUser =
  async () => {
    const user =
      await getUser();

    if (user) {
      if (
        user.role ===
        "donor"
      ) {
        router.replace(
          "/(donorTabs)/dashboard"
        );
      } else {
        router.replace(
          "/(recipientTabs)/home"
        );
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
  style={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Animated.View
  style={[
    styles.drop,
    {
      left: "15%",
      transform: [
        {
          translateY:
            drop1,
        },
      ],
    },
  ]}
/>

<Animated.View
  style={[
    styles.drop,
    {
      left: "55%",
      transform: [
        {
          translateY:
            drop2,
        },
      ],
    },
  ]}
/>

<Animated.View
  style={[
    styles.drop,
    {
      left: "80%",
      transform: [
        {
          translateY:
            drop3,
        },
      ],
    },
  ]}
/>
  <Animated.View
    style={[
      styles.ring,
      {
        opacity:
          ringAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [
              0.6,
              0,
            ],
          }),

        transform: [
          {
            scale:
              ringAnim.interpolate({
                inputRange: [
                  0,
                  1,
                ],
                outputRange: [
                  1,
                  2,
                ],
              }),
          },
        ],
      },
    ]}
  />

  <Animated.Image
    source={require("../assets/images/blood-drop.png")}
    style={[
      styles.logo,
      {
        transform: [
          {
            scale:
              scaleAnim,
          },
        ],
      },
    ]}
  />
</View>

      <Animated.View
  style={{
    opacity: fadeAnim,
  }}
>
  <Text style={styles.title}>
    BloodLink
  </Text>

  <Text style={styles.subtitle}>
    Smart Blood Donation App
  </Text>
</Animated.View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push("/auth/login")
        }
      >
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#B91C1C",

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 20,
  },
  ring: {
  position: "absolute",

  width: 150,

  height: 150,

  borderRadius: 75,

  backgroundColor:
    "rgba(255,255,255,0.25)",
},
drop: {
  position: "absolute",

  width: 8,

  height: 16,

  borderRadius: 20,

  backgroundColor:
    "rgba(255,255,255,0.25)",
},

  logo: {
    width: 140,

    height: 140,

    marginBottom: 25,

    resizeMode: "contain",
  },

  title: {
    fontSize: 42,

    fontWeight: "bold",

    color: "white",

    marginBottom: 10,
  },

  subtitle: {
    color: "white",

    fontSize: 18,

    marginBottom: 40,
  },

  button: {
  backgroundColor: "#FFFFFF",

  paddingVertical: 18,

  paddingHorizontal: 50,

  borderRadius: 18,

  elevation: 6,
},

  buttonText: {
    color: "#B91C1C",

    fontWeight: "bold",

    fontSize: 18,
  },
});