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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 60,
    height: 60,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 5,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  text: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  characterImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: "#FFD700",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
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

  // Example amounts for health, coins, and happiness
  const health = 75;
  const coins = 120;
  const happiness = 90;

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
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              handleIconPress(
                "Health is your well-being level. It affects your overall performance."
              )
            }
          >
            <Image
              source={require("../assets/images/health-icon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Health: {health}</Text>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              handleIconPress(
                "Coins are used as currency to unlock items and upgrades."
              )
            }
          >
            <Image
              source={require("../assets/images/coin.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Coins: {coins}</Text>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              handleIconPress(
                "Happiness represents your character's emotional state."
              )
            }
          >
            <Image
              source={require("../assets/images/happiness.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Happiness: {happiness}</Text>
        </View>
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

      <Image
        style={styles.characterImage}
        source={require("../assets/images/character.png")}
      />
    </>
  );
};
