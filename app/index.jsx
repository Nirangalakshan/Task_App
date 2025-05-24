import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "../components/card";
import { TaskContext } from "./_layout";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const { tasks: SaveTasks, loadTasks } = useContext(TaskContext);

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
    if (h < 12) return "Good morning 🌤️";
    if (h < 17) return "Good afternoon ☀️";
    return "Good evening 🌙";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{getGreeting()}, Niranga!</Text>
      <Text style={styles.subheading}>Today's Tasks</Text>
      <ScrollView contentContainerStyle={styles.taskContainer}>
        {taskArray.length === 0 ? (
          <Text style={styles.noTasksText}>No tasks for today 🎉</Text>
        ) : (
          taskArray.map((task, index) => (
            <View style={styles.cardWrapper} key={index}>
              <Card date={task.date} title={task.name} />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
  },
  greeting: {
    fontSize: 30,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#636e72",
    marginBottom: 20,
  },
  taskContainer: {
    paddingBottom: 20,
  },
  noTasksText: {
    fontSize: 16,
    color: "#b2bec3",
    textAlign: "center",
    marginTop: 50,
  },
  cardWrapper: {
    marginBottom: 15,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: width - 40,
    alignSelf: "center",
  },
});

export default HomeScreen;
