import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CardTask = ({ title, date, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
            <Feather name="edit-2" size={20} color="#0984e3" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
            <Feather name="trash-2" size={20} color="#d63031" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    width: "95%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    color: "#636e72",
    fontSize: 14,
    fontWeight: "500",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3436",
    marginTop: 8,
  },
});

export default CardTask;
