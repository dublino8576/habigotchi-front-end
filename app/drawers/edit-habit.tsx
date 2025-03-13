import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Alert, Modal, Text, Pressable, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { deleteHabit, getUser, updateUser, updateHabit } from "@/API/api";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface EditHabitPage {
  setUpdatedHabits: React.Dispatch<React.SetStateAction<boolean>>;
  updatedHabits: boolean;
  habitId: number;
}

interface userStats {
  user_name: string;
  isOnboarded: boolean;
  user_id: number;
  highest_streak: number;
  habits_tracked: 0;
  total_tasks_completed: 0;
  pet_id: number;
  coins_spent: number;
  coins_earned: number;
  bought_strawberry: number;
  bought_ice_cream: number;
  bought_ball: number;
  bought_apple: number;
}

export default function EditHabit({
  habitId,
  setUpdatedHabits,
  updatedHabits,
}: EditHabitPage) {
  const [modalVisible, setModalVisible] = useState(false);
  const [habitName, setHabitName] = useState<string>();
  const [habitCategory, setHabitCategory] = useState<string>();
  const [openCategory, setOpenCategory] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [user_id, setUser_id] = useState(1);
  const [userStats, setUserStats] = useState<userStats | null>(null);
  const [categoryItems, setCategoryItems] = useState([
    { label: "Health & Wellness", value: "Health & Wellness" },
    { label: "Technology", value: "Technology" },
    { label: "Nutrition", value: "Nutrition" },
    { label: "Work", value: "Work" },
    { label: "Finance", value: "Finance" },
    { label: "Creativity", value: "Creativity" },
    { label: "Music", value: "Music" },
  ]);
  const [openFrequency, setOpenFrequency] = useState(false);
  const [frequency, setFrequency] = useState(null);
  const [frequencyItems, setFrequencyItems] = useState([
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
  ]);

  const [openHabitStatus, setOpenHabitStatus] = useState(false);
  const [habitStatus, setHabitStatus] = useState(null);
  const [habitStatusItems, setHabitStatusItems] = useState([
    { label: "Pending", value: "Pending" },
    { label: "Started", value: "Started" },
    { label: "Completed", value: "Completed" },
  ]);

  console.log("EDIT HABIT", habitId);
  console.log("HABIT INFO", habitName, habitCategory);

  useEffect(() => {
    if (modalVisible) {
      console.log("MODALVISIBLE", modalVisible);
      const getUserId = async function () {
        const tempUserId: any = await AsyncStorage.getItem("user_id");
        setUser_id(tempUserId);
        getUser(tempUserId).then((userData) => {
          setUserStats(userData);
        });
      };

      getUserId();
    }
  }, [updatedHabits, modalVisible]);

  function updateUserStats() {
    if (habitStatus === "Completed") {
      const updateTotalCompleted = {
        total_tasks_completed: (userStats?.total_tasks_completed ?? 0) + 1,
      };
      updateUser(updateTotalCompleted, user_id);
    }
  }

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
              <Text style={styles.modalText}>Edit habit</Text>
              <TextInput
                style={styles.input}
                placeholder="Update Habit Name"
                value={habitName}
                onChangeText={setHabitName}
              ></TextInput>

              <TextInput
                style={styles.input}
                placeholder="Update Description"
                value={description}
                onChangeText={setDescription}
              ></TextInput>

              <View style={styles.container}>
                <Text style={styles.label}>Category</Text>

                <DropDownPicker
                  open={openCategory}
                  value={category}
                  items={categoryItems}
                  setOpen={setOpenCategory}
                  setValue={setCategory}
                  setItems={setCategoryItems}
                  containerStyle={[styles.dropdownContainer, { zIndex: 3000 }]}
                  style={styles.dropdown}
                  dropDownContainerStyle={[
                    styles.dropDownContainerStyle,
                    { zIndex: 3000 },
                  ]}
                  placeholder="Update Habit Category"
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
                  containerStyle={[styles.dropdownContainer, { zIndex: 2000 }]}
                  dropDownContainerStyle={[
                    styles.dropDownContainerStyle,
                    { zIndex: 2000 },
                  ]}
                  placeholder="Select a Frequency"
                />
              </View>

              <View style={styles.container}>
                <Text style={styles.label}>Status</Text>

                <DropDownPicker
                  open={openHabitStatus}
                  value={habitStatus}
                  items={habitStatusItems}
                  setOpen={setOpenHabitStatus}
                  setValue={setHabitStatus}
                  setItems={setHabitStatusItems}
                  containerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
                  style={styles.dropdown}
                  dropDownContainerStyle={[
                    styles.dropDownContainerStyle,
                    { zIndex: 1000 },
                  ]}
                  placeholder="Update Habit Status"
                />
              </View>
              <View style={styles.mainNavButtonContainer}>
                <View style={styles.navButtonContainer}>
                  <Pressable
                    style={styles.navBackButton}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Back</Text>
                  </Pressable>

                  <Pressable
                    style={styles.navSaveButton}
                    onPress={() => {
                      const updateHabitBody = {
                        habit_name: habitName,
                        habit_category: category,
                        habit_frequency: frequency,
                        habit_description: description,
                        habit_status: habitStatus,
                      };
                      updateHabit(updateHabitBody, habitId);
                      updateUserStats();
                      setUpdatedHabits(!updatedHabits);
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Save</Text>
                  </Pressable>
                </View>

                <Pressable
                  style={styles.navDeleteButton}
                  onPress={() => {
                    const updateUserBody = {
                      habits_tracked: (userStats?.habits_tracked ?? 0) - 1,
                    };
                    updateUser(updateUserBody, user_id);
                    deleteHabit(habitId);
                    setUpdatedHabits(!updatedHabits);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Delete</Text>
                </Pressable>
              </View>
              {/* <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => UPDATE HABITS HERE setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Freeze</Text>
              </Pressable>*/}
            </View>
          </View>
        </Modal>

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Edit habit</Text>
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    height: 38,
  },
  input: {
    width: 210,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 8,
    marginTop: 15,
    overflow: "hidden",
  },
  buttonOpen: {
    backgroundColor: "#0099FF",
  },
  buttonClose: {
    backgroundColor: "#0099FF",
    marginBottom: 15,
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
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    // paddingLeft: 20,
    // paddingRight: 20,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 20,
  },
  dropdownContainer: {
    width: "80%",
  },
  dropdown: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  dropDownContainerStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  navButtonContainer: {
    flex: 1,
    flexDirection: "row",
    columnGap: 10,
  },

  navBackButton: {
    borderRadius: 13,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    elevation: 2,
    height: 38,
    backgroundColor: "#0099FF",
  },
  navSaveButton: {
    borderRadius: 13,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    elevation: 2,
    height: 38,
    backgroundColor: "#0099FF",
  },
  navDeleteButton: {
    borderRadius: 13,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    elevation: 2,
    height: 38,
    backgroundColor: "red",
  },
  mainNavButtonContainer: {
    flex: 1,
    flexDirection: "column",
    columnGap: 1,
    justifyContent: "flex-start",
  },
});
