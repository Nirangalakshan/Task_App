import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const Card = ({ title, date }) => {
  const [isChecked, setChecked] = useState(false);
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#6c5ce7" : undefined}
          />
        </View>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#f0f4ff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    width: width - 40,
    alignSelf: "center",
    marginBottom: 16,
    position: "relative",
    justifyContent: "center",
  },
  checkboxContainer: {
    position: "absolute",
    top: 14,
    right: 14,
  },
  date: {
    color: "#8395a7",
    fontSize: 12,
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2d3436",
  },
});

export default Card;
