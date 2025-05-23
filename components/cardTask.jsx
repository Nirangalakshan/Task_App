// components/cardTask.js
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const CardTask = ({ title, date, onEdit, onDelete }) => {
  return (
    <View
      style={{
        marginTop: 20,
        padding: 20,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: 300,
        alignSelf: "center",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{date}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={onEdit}>
            <Feather name="edit" size={20} color="blue" style={{ marginRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Feather name="trash-2" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2c3e50", marginTop: 5 }}>
        {title}
      </Text>
    </View>
  );
};

export default CardTask;
