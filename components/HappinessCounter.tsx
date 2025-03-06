import React from "react";
import { Text, StyleSheet } from "react-native";
import { usePetInfo } from "@/contexts/UserContext";

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
});

const HappinessCounter = () => {
  const { happiness } = usePetInfo();
  return <Text style={styles.text}>{happiness}%</Text>;
};

export default HappinessCounter;
