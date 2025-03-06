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

const HealthCounter = () => {
  const { health } = usePetInfo();
  return <Text style={styles.text}>{health}%</Text>;
};

export default HealthCounter;
