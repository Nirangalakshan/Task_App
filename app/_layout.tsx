import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import React, { createContext, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const TaskContext = createContext({});

const _layout = () => {
  const [tasks, setTasks] = useState({});

  // ✅ Function to load tasks from AsyncStorage
  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem("tasks");
      const parsed = stored ? JSON.parse(stored) : {};
      setTasks(parsed);
    } catch (error) {
      console.error("Error loading tasks in context:", error);
    }
  };

  // ✅ Load tasks on first mount
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: 10 }}>
      <TaskContext.Provider value={{ tasks, setTasks, loadTasks }}>
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="CalendarPage"
            options={{
              title: "Calendar",
              tabBarIcon: () => <EvilIcons name="calendar" size={30} color="black" />,
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="Task"
            options={{
              title: "Task",
              tabBarIcon: () => <FontAwesome5 name="tasks" size={24} color="black" />,
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="Setting"
            options={{
              title: "Setting",
              tabBarIcon: () => <Feather name="settings" size={24} color="black" />,
              headerShown: false,
            }}
          />
        </Tabs>
      </TaskContext.Provider>
    </GestureHandlerRootView>
  );
};

export default _layout;
