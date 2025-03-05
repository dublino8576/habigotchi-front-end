import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

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
});

export const Header: React.FC = () => {
  // Example amounts for health, coins, and happiness
  const health = 75;
  const coins = 120;
  const happiness = 90;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/images/health-icon.png")}
            style={styles.icon}
          />
          <Text style={styles.text}>Health: {health}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/images/coin.png")}
            style={styles.icon}
          />
          <Text style={styles.text}>Coins: {coins}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/images/happiness.png")}
            style={styles.icon}
          />
          <Text style={styles.text}>Happiness: {happiness}</Text>
        </View>
      </View>
      <Image
        style={styles.characterImage}
        source={require("../assets/images/character.png")}
      />
    </>
  );
};
