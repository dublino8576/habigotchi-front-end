import { Text, StyleSheet } from "react-native";
import { usePetInfo } from "@/contexts/UserContext";

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
});

const CoinsCounter = () => {
  const { coins } = usePetInfo();
  return <Text style={styles.text}>{coins}</Text>;
};

export default CoinsCounter;
