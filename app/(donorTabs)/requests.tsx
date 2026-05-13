import {
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView
} from "react-native-safe-area-context";
import API from "../api/api";

import { getUser } from "../utils/storage";

const RequestsScreen = () => {
  const [requests, setRequests] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests =
    async () => {
      try {
        const user =
          await getUser();

        console.log(
          "DONOR ID:",
          user._id
        );

        const response =
          await API.get(
            `/request/donor/${user._id}`
          );

        console.log(
          "REQUEST DATA:",
          response.data
        );

        setRequests(response.data);

        setLoading(false);
      } catch (error) {
        console.log(error);

        Alert.alert(
          "Error",
          "Failed to load requests"
        );

        setLoading(false);
      }
    };

  const updateStatus =
    async (
      id: string,
      status: string
    ) => {
      try {
        await API.put(
          `/request/${id}`,
          {
            status,
          }
        );

        Alert.alert(
          "Success",
          `Request ${status}`
        );

        loadRequests();
      } catch (error) {
        Alert.alert(
          "Error",
          "Update failed"
        );
      }
    };

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#DC2626"
        />
      </SafeAreaView>
    );
  }

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
        Blood Requests
      </Text>

      {requests.length === 0 ? (
        <Text style={styles.empty}>
          No requests found
        </Text>
      ) : (
        requests.map((item) => (
          <SafeAreaView
            key={item._id}
            style={styles.card}
          >
            <Text style={styles.name}>
              {
                item.recipient
                  ?.name
              }
            </Text>

            <Text
              style={styles.info}
            >
              Blood Group:
              {" "}
              {item.bloodGroup}
            </Text>

            <Text
              style={styles.info}
            >
              Hospital:
              {" "}
              {
                item.hospitalName
              }
            </Text>

            <Text
              style={styles.info}
            >
              Status:
              {" "}
              {item.status}
            </Text>

            {item.status ===
              "pending" && (
              <SafeAreaView
                style={
                  styles.buttonRow
                }
              >
                <TouchableOpacity
                  style={
                    styles.acceptButton
                  }
                  onPress={() =>
                    updateStatus(
                      item._id,
                      "accepted"
                    )
                  }
                >
                  <Text
                    style={
                      styles.buttonText
                    }
                  >
                    Accept
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    styles.rejectButton
                  }
                  onPress={() =>
                    updateStatus(
                      item._id,
                      "rejected"
                    )
                  }
                >
                  <Text
                    style={
                      styles.buttonText
                    }
                  >
                    Reject
                  </Text>
                </TouchableOpacity>
              </SafeAreaView>
            )}
          </SafeAreaView>
        ))
      )}
    </ScrollView>
  );
};

export default RequestsScreen;

const styles = StyleSheet.create({
  loader: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },

  container: {
    flexGrow: 1,

    backgroundColor: "#F9FAFB",

    paddingTop: 60,

    paddingHorizontal: 20,

    paddingBottom: 40,
  },

  header: {
    fontSize: 30,

    fontWeight: "bold",

    marginBottom: 25,

    color: "#111827",
  },

  empty: {
    fontSize: 18,

    color: "#6B7280",

    textAlign: "center",

    marginTop: 50,
  },

  card: {
    backgroundColor: "white",

    padding: 20,

    borderRadius: 18,

    marginBottom: 20,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 5,

    elevation: 3,
  },

  name: {
    fontSize: 22,

    fontWeight: "bold",

    marginBottom: 10,

    color: "#111827",
  },

  info: {
    fontSize: 16,

    color: "#4B5563",

    marginBottom: 5,
  },

  buttonRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    marginTop: 20,
  },

  acceptButton: {
    backgroundColor: "green",

    paddingVertical: 12,

    paddingHorizontal: 25,

    borderRadius: 10,
  },

  rejectButton: {
    backgroundColor: "#DC2626",

    paddingVertical: 12,

    paddingHorizontal: 25,

    borderRadius: 10,
  },

  buttonText: {
    color: "white",

    fontWeight: "bold",
  },
});