import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";
import { TaskContext } from "./_layout";

export default function TaskCalendar() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [newTask, setNewTask] = useState("");
  const [events, setEvents] = useState([]);

  const { tasks, setTasks, loadTasks } = useContext(TaskContext);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  useEffect(() => {
    setEvents(tasks[selectedDate] || []);
  }, [selectedDate, tasks]);

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const updatedTasks = { ...tasks };
      if (!updatedTasks[selectedDate]) {
        updatedTasks[selectedDate] = [];
      }

      updatedTasks[selectedDate].push({ title: newTask });

      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      if (loadTasks) loadTasks();

      setNewTask("");
      setEvents(updatedTasks[selectedDate]);
    } catch (e) {
      console.error("Error saving task", e);
      Alert.alert("Error saving task");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <RNCalendar
        minDate={new Date().toISOString().split("T")[0]}
        maxDate={maxDateStr}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#00adf5" },
        }}
        theme={{
          selectedDayBackgroundColor: "#00adf5",
          todayTextColor: "#00adf5",
          arrowColor: "#00adf5",
          textSectionTitleColor: "#333",
        }}
      />

      <Text style={styles.title}>Tasks for {selectedDate}</Text>

      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.title}</Text>
          </View>
        )}
        style={styles.taskList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Enter a task"
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#2c3e50",
  },
  taskList: {
    maxHeight: 200,
    marginBottom: 15,
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    color: "#2d3436",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#00adf5",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
