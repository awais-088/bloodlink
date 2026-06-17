import { StyleSheet, Text, View } from "react-native";

interface Props {
  message: string;
}

const EmptyState = ({ message }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,

    alignItems: "center",
  },

  text: {
    fontSize: 18,

    color: "#6B7280",
  },
});
