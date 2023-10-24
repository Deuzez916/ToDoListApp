import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Todorow from "./Todorow";
import RNCheckboxCard from "react-native-checkbox-card";
import * as Haptics from "expo-haptics";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation, route }) {

  const [addToDoItems, setAddToDoItems] = useState("");

  const [toDoItems, setToDoItems] = useState([
    {
      Task: "Go Shopping",
      isdone: true,
      Deadline: "3 Nov 2023"
      /*, subTasks: ["Buy Groceries", "Buy Clothes"]*/,
    },
    { Task: "Send Packages", isdone: false, Deadline: "15 Dec 2023" },
    { Task: "Print Todays Results", isdone: false, Deadline: "4 Jan 2024" },
  ]);

  useEffect(() => {
    console.log(route.params);

    if (route.params?.taskName) {
      const newlist = [...toDoItems];
      newlist[route.params.rowNumber].Task = route.params.taskName;
      setToDoItems(newlist);
    }

    if (route.params?.deleteRow) {
      console.log("LETS DELETE");
      console.log(route.params.deleteRow);

      setAddToDoItems("");
    }

    if (route.params?.newTask) {
      const newTask = route.params.newTask;

      setToDoItems([...toDoItems, newTask]);
      setAddToDoItems("");
    }

    if (route.params?.deadline) {
      const newDeadline = route.params.deadline;
    }

    /*
    saveTasks([...toDoItems]);
    loadTasks();
    */
  }, [route.params?.taskName, route.params?.deleteRow, route.params?.newTask, route.params?.deadline]);

  function toDoChangeDone(rowNumber) {
    const newList = [...toDoItems];

    if (newList[rowNumber].isdone == true) {
      newList[rowNumber].isdone = false;
    } else {
      newList[rowNumber].isdone = true;
    }
    setAddToDoItems(newList);
  }

  function toDoDelete(rowNumber) {
    const newListStart = [...toDoItems].slice(0, rowNumber);
    const newListEnd = [...toDoItems].slice(rowNumber + 1);

    console.log(newListStart);
    console.log(newListEnd);

    const newList = newListStart.concat(newListEnd);

    setToDoItems(newList);
  }

  /*
  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks: ', error);
    }
  };

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setToDoItems(JSON.parse(savedTasks));
      } 
    }catch (error) {
      console.error('Error loading tasks: ', error);
    }
  };
*/
  return (
    <View style={styles.container}>
      <FlatList
        data={toDoItems}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ margin: 15 }}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.navigate("TaskPage", {
                toDoItems: item,
                rowNumber: index,
                toDoDelete: toDoDelete,
              });
            }}
          >
            <Todorow
              toDoInfo={item}
              toDoChangeDone={() => {
                toDoChangeDone(index);
              }}
              toDoDelete={() => {
                toDoDelete(index);
              }}
            />
          </TouchableOpacity>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01605a",
    alignItems: "center",
  },
});
