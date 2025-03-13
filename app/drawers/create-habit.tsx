import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  TextInput,
  Button,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { usePetInfo } from "@/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addHabit, updateUser, getUser } from "@/API/api";
import DropDownPicker from "react-native-dropdown-picker";

interface CreateHabitProps {
  setUpdatedHabits: React.Dispatch<React.SetStateAction<boolean>>;
  updatedHabits: boolean;
}

interface userStats {
  user_name: string;
  isOnboarded: boolean;
  user_id: number;
  highest_streak: number;
  habits_tracked: 0;
  pet_id: number;
  coins_spent: number;
  coins_earned: number;
  bought_strawberry: number;
  bought_ice_cream: number;
  bought_ball: number;
  bought_apple: number;
}

export default function CreateHabit({
  setUpdatedHabits,
  updatedHabits,
}: CreateHabitProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [totalTasks, setTotalTasks] = useState("");
  const [userStats, setUserStats] = useState<userStats | null>(null);
  const [user_id, setUser_id] = useState(1);
  const [openCategory, setOpenCategory] = useState(false);
  const [openFrequency, setOpenFrequency] = useState(false);
  const [category, setCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([
    { label: "Health & Wellness", value: "Health & Wellness" },
    { label: "Technology", value: "Technology" },
    { label: "Nutrition", value: "Nutrition" },
    { label: "Work", value: "Work" },
    { label: "Finance", value: "Finance" },
    { label: "Creativity", value: "Creativity" },
    { label: "Music", value: "Music" },
  ]);

  const [frequency, setFrequency] = useState(null);
  const [frequencyItems, setFrequencyItems] = useState([
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
  ]);


  useEffect(() => {
    if (modalVisible) {
      console.log("MODALVISIBLE", modalVisible);
      setCategory(null);
      setName("");
      setDescription("");
      setTotalTasks("");
    }
    const getUserId = async function () {
      const tempUserId: any = await AsyncStorage.getItem("user_id");
      setUser_id(tempUserId);
      getUser(tempUserId).then((userData) => {
        console.log("UPDATED USER", userData);
        setUserStats(userData);
      });
    };


    getUserId();
  }, [updatedHabits]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Create habit</Text>
              <Text style={styles.label}>Habit Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter habit name"
              />

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter habit description"
              />

              <View style={styles.container}>
                <Text style={styles.label}>Category</Text>

                <DropDownPicker
                  open={openCategory}
                  value={category}
                  items={categoryItems}
                  setOpen={setOpenCategory}
                  setValue={setCategory}
                  style={styles.dropdown}
                  setItems={setCategoryItems}
                  containerStyle={[styles.dropdownContainer, { zIndex: 2000 }]}
                  dropDownContainerStyle={[
                    styles.dropDownContainerStyle,
                    { zIndex: 2000 },
                  ]}
                  placeholder="Select a Category"
                />
              </View>

              <View style={styles.container}>
                <Text style={styles.label}>Frequency</Text>

                <DropDownPicker
                  open={openFrequency}
                  value={frequency}
                  items={frequencyItems}
                  setOpen={setOpenFrequency}
                  setValue={setFrequency}
                  setItems={setFrequencyItems}
                  style={styles.dropdown}
                  containerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
                  dropDownContainerStyle={[
                    styles.dropDownContainerStyle,
                    { zIndex: 2000 },
                  ]}
                  placeholder="Select a Frequency"
                />
              </View>

              <Text style={styles.label}>Total Tasks</Text>
              <TextInput
                style={styles.input}
                value={totalTasks}
                onChangeText={setTotalTasks}
                placeholder="Enter total tasks"
                keyboardType="numeric"
              />

              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  const reqBody = {
                    habit_name: name,
                    habit_category: category,
                    habit_description: description,
                    habit_status: "pending",
                    habit_frequency: frequency,
                  };
                  addHabit(reqBody, user_id);
                  // setHabits((prev: any) => [
                  //   ...prev,
                  //   {
                  //     name: name,
                  //     description: description,
                  //     totalTasks: totalTasks,
                  //     currentStreak: 0,
                  //     completedTasks: 0,
                  //   },
                  // ]);
                  const updateUserBody = {
                    habits_tracked: (userStats?.habits_tracked ?? 0) + 1,
                  };
                  updateUser(updateUserBody, user_id);
                  setUpdatedHabits(!updatedHabits);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Back</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            setCategory(null);
            setName("");
            setDescription("");
            setTotalTasks("");
            setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Create habit</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalView: {
    width: "100%",
    height: "90%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: "center",
    /* shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, */
  },
  button: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOpen: {
    marginBottom: 10,
    backgroundColor: "#0099FF",
    /* shadowColor: "#0077CC",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10, */
  },
  buttonClose: {
    backgroundColor: "#FF5733",
    /*   shadowColor: "#CC4C2D",
    shadowOffset: {
      width: 0,
      height: 5, 
    },
    shadowOpacity: 0.3,
    shadowRadius: 10, */
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 20,
  },
  dropdownContainer: {
    width: "100%",
  },
  dropdown: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
