import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { DonorType } from "../types/user";

interface Props {
  donor: DonorType;

  onRequest: () => void;
}

const DonorCard = ({ donor, onRequest }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{donor.name}</Text>

      <Text style={styles.info}>Blood Group: {donor.bloodGroup}</Text>

      <Text style={styles.info}>City: {donor.city}</Text>

      <Text style={styles.info}>Phone: {donor.phone}</Text>

      <Text
        style={[
          styles.status,
          {
            color: donor.available ? "green" : "red",
          },
        ]}
      >
        {donor.available ? "Available" : "Unavailable"}
      </Text>

      <TouchableOpacity style={styles.button} onPress={onRequest}>
        <Text style={styles.buttonText}>Send Request</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DonorCard;

const styles = StyleSheet.create({
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
    fontSize: 22,

    fontWeight: "bold",

    color: "#111827",

    marginBottom: 10,
  },

  info: {
    color: "#4B5563",

    marginBottom: 5,

    fontSize: 15,
  },

  status: {
    marginTop: 5,

    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#DC2626",

    paddingVertical: 14,

    borderRadius: 12,

    alignItems: "center",

    marginTop: 15,
  },

  buttonText: {
    color: "white",

    fontWeight: "bold",

    fontSize: 16,
  },
});
