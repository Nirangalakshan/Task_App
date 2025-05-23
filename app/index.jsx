import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/card";
import { TaskContext } from "./_layout";

const HomeScreen = () => {
  const { tasks: SaveTasks, loadTasks } = useContext(TaskContext);

  // Reload tasks when this screen gets focus (like after editing/deleting)
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const taskArray = [];
  const today = new Date().toISOString().split("T")[0];
  for (const date in SaveTasks) {
    if (date === today) {
      SaveTasks[date].forEach((task) => {
        taskArray.push({
          date,
          name: task.title,
        });
      });
    }
  }

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning! ";
    if (h < 17) return "Good afternoon! ";
    return "Good evening! ";
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.greeting}>{getGreeting()} Niranga</Text>
      <Text style={styles.subheading}>Today's Tasks</Text>
      <ScrollView>
        {taskArray.length === 0 ? (
          <Text>No tasks for today 🎉</Text>
        ) : (
          taskArray.map((task, index) => (
            <Card key={index} date={task.date} title={task.name} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 10,
    color: "#ff7675",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default HomeScreen;
