import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Alert, Modal, Text, Pressable, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import { usePetInfo } from "@/contexts/UserContext";

export default function LogOut() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const { setHealth, setHappiness, setCoins, setPetState, setSelectedPet } =
    usePetInfo();

  const resetOnboarding = async () => {
    await AsyncStorage.setItem("isOnboarded", "false");
    console.log("heelo");
    router.replace("/");
  };

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
              <Text style={styles.modalText}>Log Out</Text>
              <Text>
                Are you sure you want to log out?
              </Text>
              <Pressable
                style={[styles.button, styles.buttonDelete]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  resetOnboarding();
                }}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  /*delete request*/ setModalVisible(!modalVisible)
                }
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Pressable
          style={[styles.button, styles.buttonDelete]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Log Out</Text>
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
    /*  shadowColor: "#000",
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
  },
  buttonDelete: {
    backgroundColor: "orange",
    marginTop: 15,
    marginBottom: 15,
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
});
