import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

import { useEffect, useState } from "react";

import API from "../api/api";
import EmptyState from "../components/EmptyState";
import { getUser } from "../utils/storage";

const HistoryScreen = () => {
  const [requests, setRequests] = useState<any[]>([]);

  const fetchHistory = async () => {
    try {
      const user = await getUser();

      const response = await API.get(`/request/recipient/${user._id}`);

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
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Request History</Text>

      <FlatList
        ListEmptyComponent={<EmptyState message="No Blood Requests Yet" />}
        data={requests}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.bloodIcon}>🩸</Text>

            <Text style={styles.name}>{item.donor?.name}</Text>

            <Text style={styles.info}>
              Blood Group: {item.donor?.bloodGroup}
            </Text>

            <Text style={styles.info}>Patient: {item.patientName}</Text>

            <Text style={styles.info}>Hospital: {item.hospitalName}</Text>

            <Text style={styles.info}>Phone: {item.donor?.phone}</Text>

            <Text
              style={[
                styles.statusBadge,
                item.status === "accepted"
                  ? styles.accepted
                  : item.status === "rejected"
                    ? styles.rejected
                    : styles.pending,
              ]}
            >
              {item.status.toUpperCase()}
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
  bloodIcon: {
    fontSize: 42,

    textAlign: "center",

    marginBottom: 10,
  },

  statusBadge: {
    marginTop: 15,

    textAlign: "center",

    paddingVertical: 10,

    borderRadius: 12,

    color: "#FFFFFF",

    fontWeight: "bold",

    overflow: "hidden",
  },

  accepted: {
    backgroundColor: "#16A34A",
  },

  rejected: {
    backgroundColor: "#DC2626",
  },

  pending: {
    backgroundColor: "#F59E0B",
  },

  header: {
    fontSize: 32,

    fontWeight: "bold",

    color: "#111827",

    marginBottom: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",

    padding: 22,

    borderRadius: 24,

    marginBottom: 18,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 12,

    elevation: 5,
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
