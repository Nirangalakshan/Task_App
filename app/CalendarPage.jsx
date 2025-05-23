import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
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

  const { tasks, setTasks, loadTasks } = useContext(TaskContext); // ⬅️ added loadTasks

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

      // Save to AsyncStorage
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));

      // Update context (global)
      setTasks(updatedTasks);

      // Reload context from storage so all screens sync
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
      style={{ flex: 1, padding: 15 }}
    >
      <RNCalendar
        minDate={new Date().toISOString().split("T")[0]}
        maxDate={maxDateStr}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#00adf5" },
        }}
      />

      <Text style={{ fontWeight: "bold", fontSize: 16, marginVertical: 10 }}>
        Tasks for {selectedDate}
      </Text>

      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
            }}
          >
            <Text>{item.title}</Text>
          </View>
        )}
        style={{ maxHeight: 200 }}
      />

      <TextInput
        value={newTask}
        onChangeText={setNewTask}
        placeholder="Enter task"
        style={{
          borderWidth: 1,
          borderColor: "#aaa",
          borderRadius: 5,
          padding: 10,
          marginVertical: 10,
        }}
      />
      <Button title="Add Task" onPress={addTask} />
    </KeyboardAvoidingView>
  );
}
