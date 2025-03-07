import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";

import HealthCounter from "./HealthCounter";
import HappinessCounter from "./HappinessCounter";
import CoinsCounter from "./CoinsCounter";
import { PetDisplay } from "./PetDisplay";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 28,
    marginTop: 60,
  },
  iconContainer: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    padding: 8,
    gap: 8,
  },
  icon: {
    resizeMode: "contain",
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },
  detailText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    color: "#FFD700",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: "#fff",
  },
});

export const Header: React.FC = () => {
  // State to track the selected icon and modal visibility
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle clicking on an icon
  const handleIconPress = (detail: string) => {
    setSelectedDetail(detail);
    setModalVisible(true); // Show modal when icon is clicked
  };

  // Close modal handler
  const closeModal = () => setModalVisible(false);
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            handleIconPress(
              "Health is your well-being level. It affects your overall performance."
            )
          }
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/images/health-icon.png")}
            style={styles.icon}
          />
          <HealthCounter />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            handleIconPress(
              "Happiness represents your character's emotional state."
            )
          }
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/images/happiness.png")}
            style={styles.icon}
          />
          <HappinessCounter />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            handleIconPress(
              "Coins are used as currency to unlock items and upgrades."
            )
          }
          style={styles.iconContainer}
        >
          <Image
            source={require("../assets/images/coin.png")}
            style={styles.icon}
          />
          <CoinsCounter />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Details</Text>
            <Text style={styles.modalText}>{selectedDetail}</Text>
            <Button title="Close" onPress={closeModal} color="#FFD700" />
          </View>
        </View>
      </Modal>
      <PetDisplay />
    </>
  );
};
