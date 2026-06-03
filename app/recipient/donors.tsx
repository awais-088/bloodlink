import {
  useEffect,
  useState,
} from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {
  SafeAreaView
} from "react-native-safe-area-context";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import API from "../api/api";

const DonorsScreen = () => {
  const params =
    useLocalSearchParams();

  const bloodGroup =
    String(params.bloodGroup);

  const [donors, setDonors] =
    useState<any[]>([]);

  const [
    filteredDonors,
    setFilteredDonors,
  ] = useState<any[]>([]);

  const [city, setCity] =
    useState("");

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors =
    async () => {
      try {
        const response =
          await API.get(
            `/donor/blood-group/${bloodGroup}`
          );

        setDonors(
          response.data
        );

        setFilteredDonors(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const searchByCity =
    (text: string) => {
      setCity(text);

      const filtered =
        donors.filter(
          (donor: any) =>
            donor.city
              ?.toLowerCase()
              .includes(
                text.toLowerCase()
              )
        );

      setFilteredDonors(
        filtered
      );
    };

  return (
    <SafeAreaView
      style={{flex:1}}
  
    >
      <TouchableOpacity
        onPress={() =>
          router.back()
        }
      >
        <Text style={styles.back}>
          ← Back
        </Text>
      </TouchableOpacity>

      <View style={styles.topSection}>
        <Image
          source={require("../../assets/images/blood-drop.png")}
          style={styles.logo}
        />

        <Text style={styles.appName}>
          BloodLink
        </Text>

        <Text style={styles.subtitle}>
          Find Available Donors
        </Text>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>
          {bloodGroup} Donors
        </Text>

        <Text style={styles.heroText}>
          Search donors by city
          and request blood
          instantly.
        </Text>
      </View>

      <TextInput
        placeholder="Search by city"
        value={city}
        onChangeText={
          searchByCity
        }
        style={styles.search}
      />

      <FlatList
  data={filteredDonors}
  keyExtractor={(item:any)=>item._id}
  scrollEnabled={false}
  contentContainerStyle={{
    paddingBottom: 140,
  }}
        renderItem={({
          item,
        }: any) => (
          <View style={styles.card}>
            <Image
              source={
                item.profileImage
                  ? {
                      uri:
                        item.profileImage,
                    }
                  : require("../../assets/images/user.png")
              }
              style={styles.image}
            />

            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.info}>
              {item.city}
            </Text>

            <Text style={styles.info}>
              {item.phone}
            </Text>

            <TouchableOpacity
              style={
                styles.requestButton
              }
              onPress={() =>
                router.push({
                  pathname:
                    "/recipient/request",

                  params: {
                    donorId:
                      item._id,

                    bloodGroup:
                      item.bloodGroup,
                  },
                })
              }
            >
              <Text
                style={
                  styles.requestText
                }
              >
                Request Blood
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default DonorsScreen;

const styles = StyleSheet.create({
  container: {
  flex: 1,

  backgroundColor: "#F9FAFB",

  paddingTop: 60,

  paddingHorizontal: 20,

  paddingBottom: 120,
},

  topSection: {
    alignItems: "center",

    marginBottom: 20,
  },

  logo: {
    width: 80,

    height: 80,

    resizeMode: "contain",

    marginBottom: 10,
  },

  appName: {
    fontSize: 36,

    fontWeight: "bold",

    color: "#DC2626",
  },

  subtitle: {
    color: "#6B7280",

    fontSize: 16,
  },

  heroCard: {
    backgroundColor: "#DC2626",

    padding: 25,

    borderRadius: 24,

    marginBottom: 25,
  },

  heroTitle: {
    color: "white",

    fontSize: 28,

    fontWeight: "bold",

    marginBottom: 10,
  },

  heroText: {
    color: "white",

    fontSize: 16,

    lineHeight: 24,
  },

  back: {
    fontSize: 18,

    color: "#DC2626",

    fontWeight: "bold",

    marginBottom: 20,
  },

  search: {
    backgroundColor: "white",

    padding: 16,

    borderRadius: 14,
    borderWidth:2,
    borderColor:'#000000',
    borderStyle:'solid',

    marginBottom: 20,
  },

  card: {
    backgroundColor: "white",

    padding: 20,

    borderRadius: 20,

    marginBottom: 20,

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 5,

    elevation: 3,
  },

  image: {
    width: 90,

    height: 90,

    borderRadius: 45,

    marginBottom: 15,
  },

  name: {
    fontSize: 22,

    fontWeight: "bold",

    marginBottom: 8,
  },

  info: {
    color: "#6B7280",

    marginBottom: 5,
  },

  requestButton: {
    backgroundColor: "#DC2626",

    paddingVertical: 14,

    paddingHorizontal: 30,

    borderRadius: 14,

    marginTop: 15,
  },

  requestText: {
    color: "white",

    fontWeight: "bold",

    fontSize: 16,
  },
});