import React, { useState } from "react";
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

export default function CreateHabit() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [totalTasks, setTotalTasks] = useState("");
  const { setHabits } = usePetInfo();
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
                  setHabits((prev: any) => [
                    ...prev,
                    {
                      name: name,
                      description: description,
                      totalTasks: totalTasks,
                      currentStreak: 0,
                      completedTasks: 0,
                    },
                  ]);
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
          onPress={() => setModalVisible(true)}
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
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
