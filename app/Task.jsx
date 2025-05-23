import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CardTask from "../components/cardTask";

const TaskListScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const loadTasksFromStorage = async () => {
    try {
      const stored = await AsyncStorage.getItem("tasks");
      const allTasks = stored ? JSON.parse(stored) : {};
      const updatedTasks = {};
      const flatList = [];

      for (const date in allTasks) {
        if (date >= today) {
          updatedTasks[date] = allTasks[date];
          allTasks[date].forEach((task, index) => {
            flatList.push({ date, name: task.title, index });
          });
        }
      }

      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(flatList);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasksFromStorage();
    }, [])
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleDateString();
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setNewTitle(task.name);
    setEditModalVisible(true);
  };

  const saveEditedTask = async () => {
    try {
      const stored = await AsyncStorage.getItem("tasks");
      const allTasks = stored ? JSON.parse(stored) : {};

      const tasksForDate = allTasks[editingTask.date];
      tasksForDate[editingTask.index].title = newTitle;

      await AsyncStorage.setItem("tasks", JSON.stringify(allTasks));
      setEditModalVisible(false);
      setEditingTask(null);
      loadTasksFromStorage();
    } catch (error) {
      Alert.alert("Error saving edited task.");
    }
  };

  const deleteTask = async (taskToDelete) => {
    try {
      const stored = await AsyncStorage.getItem("tasks");
      const allTasks = stored ? JSON.parse(stored) : {};

      allTasks[taskToDelete.date].splice(taskToDelete.index, 1);

      if (allTasks[taskToDelete.date].length === 0) {
        delete allTasks[taskToDelete.date];
      }

      await AsyncStorage.setItem("tasks", JSON.stringify(allTasks));
      loadTasksFromStorage();
    } catch (error) {
      Alert.alert("Error deleting task.");
    }
  };

  const confirmDelete = (task) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteTask(task),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => `${item.date}-${index}`}
        renderItem={({ item }) => (
          <CardTask
            title={item.name}
            date={formatDate(item.date)}
            onEdit={() => openEditModal(item)}
            onDelete={() => confirmDelete(item)}
          />
        )}
      />

      {/* Edit Modal */}
      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.input}
              placeholder="New task title"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={saveEditedTask}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#ccc" }]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#00adf5",
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
