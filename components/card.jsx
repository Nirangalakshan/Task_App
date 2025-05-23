import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Text, View } from "react-native";

const Card = ({ title, date }) => {
  const [isChecked, setChecked] = useState(false);

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
        height: 100,
        width: 300,
        alignSelf: "center",
        position: "relative",
        justifyContent: "center",
      }}
    >
      {/* Checkbox in top right corner */}
      <View style={{ position: "absolute", top: 10, right: 10, marginTop: 30 }}>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#4630EB" : undefined}
        />
      </View>

      {/* Main Content */}
      <Text style={{ color: "#888", fontSize: 12 }}>{date}</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2c3e50" }}>
        {title}
      </Text>
    </View>
  );
};

export default Card;
