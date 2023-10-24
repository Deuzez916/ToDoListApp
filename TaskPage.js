import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { MaterialIcons } from "@expo/vector-icons";

export default function TaskPage({ navigation, route, props }) {
  const [taskTitle, setTaskTitle] = useState(route.params.toDoItems.Task);
  const [date, setDate] = useState(new Date());
  const [dateMode, setDateMode] = useState("date");
  const [timeMode, setTimeMode] = useState("time");

  const deleteTask = () => {
    const rowNumber = route.params.rowNumber;
    route.params.toDoDelete(rowNumber);
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={{ flexDirection: "column" }}>
            <AntDesign
              style={{ alignSelf: "center", marginTop: 10 }}
              name="delete"
              size={40}
              color="#f00"
              onPress={() => {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                );
                deleteTask();
              }}
            />
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Delete
            </Text>
          </View>
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <Entypo
              name="save"
              size={40}
              color="#01605a"
              onPress={() => {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                );
                navigation.navigate({
                  name: "HomeScreen",
                  params: {
                    taskName: taskTitle,
                    rowNumber: route.params.rowNumber,
                  },
                  merge: true,
                });
              }}
            />
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Save{" "}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01605a",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#a98f76",
    width: "85%",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
    padding: 20,
    marginTop: 30,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#ffd0a8",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    fontSize: 22,
    marginLeft: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  NotesInput: {
    fontSize: 18,
    fontWeight: "bold",
    height: '30%',
    width: '100%',
    textAlignVertical: 'bottom'
  },
  dateTimeContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: "#ffd0a8",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

/* 
<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 10}}>Task:</Text>
        <MaterialIcons 
          name="playlist-add" 
          size={40} 
          color="black" 
          onPress={() => {

          }}
        />
        </View>


        <DateTimePicker
            testID="DeadlineTime"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={timeMode}
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setDate(currentDate);
              setEstimatedTime(currentDate);
            }}
          />


          <View style={styles.dateTimeContainer}>
          <Text style={styles.label}>Estimated Time:</Text>
          <DateTimePicker
            style={styles.dateTimePicker}
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={timeMode}
            is24Hour={true}
            display="default"
          />
          <Text style={styles.label}> hr : min</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.NotesInput} placeholder="Notes" multiline={true} />
        </View>

        <View style={styles.dateTimeContainer}>
          <Text style={styles.label}>Deadline:</Text>
          <DateTimePicker
            testID="DeadlineDate"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={dateMode}
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setDate(currentDate);
              setDeadlineDate(currentDate);
            }}
          />
        </View>
        */
