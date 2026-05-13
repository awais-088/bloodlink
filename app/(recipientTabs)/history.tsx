import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import API from "../api/api";
import EmptyState from "../components/EmptyState";
import { getUser } from "../utils/storage";

const HistoryScreen = () => {
  const [requests, setRequests] =
    useState<any[]>([]);

  const fetchHistory =
    async () => {
      try {
        const user =
          await getUser();

        const response =
          await API.get(
            `/request/recipient/${user._id}`
          );

        setRequests(response.data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <ScrollView
    contentContainerStyle={
      styles.container
    }
    showsVerticalScrollIndicator={
      false
    }>
      <Text style={styles.header}>
        Request History
      </Text>

      <FlatList
      ListEmptyComponent={
  <EmptyState
    message="No requests found"
  />
}
        data={requests}
        keyExtractor={(item: any) =>
          item._id
        }
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {
                item.donor
                  ?.name
              }
            </Text>

            <Text style={styles.info}>
              Blood Group:
              {" "}
              {
                item.donor
                  ?.bloodGroup
              }
            </Text>

            <Text style={styles.info}>
              Hospital:
              {" "}
              {item.hospitalName}
            </Text>

            <Text style={styles.info}>
              Patient:
              {" "}
              {item.patientName}
            </Text>

            <Text
              style={[
                styles.status,
                {
                  color:
                    item.status ===
                    "accepted"
                      ? "green"
                      : item.status ===
                          "rejected"
                        ? "red"
                        : "#DC2626",
                },
              ]}
            >
              Status:
              {" "}
              {item.status}
            </Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default HistoryScreen;

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

    marginBottom: 20,

    color: "#111827",
  },

  card: {
    backgroundColor: "white",

    padding: 20,

    borderRadius: 18,

    marginBottom: 15,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 5,

    elevation: 3,
  },

  name: {
    fontSize: 20,

    fontWeight: "bold",

    marginBottom: 10,

    color: "#111827",
  },

  info: {
    marginBottom: 5,

    color: "#4B5563",
  },

  status: {
    marginTop: 10,

    fontWeight: "bold",
  },
});