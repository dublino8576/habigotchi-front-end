import { StyleSheet, Pressable, Text, View, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { usePetInfo } from "@/contexts/UserContext";

export default function OnboardingThree() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setHealth, setHappiness, setCoins, setPetState, setSelectedPet } =
    usePetInfo();

  const completeOnboarding = async () => {
    setLoading(true);
    await AsyncStorage.setItem("isOnboarded", "true");
    setLoading(false);
    setHealth(80);
    setHappiness(100);
    setCoins(200);
    setPetState("neutral");
    setSelectedPet("petOne");
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habigotchi</Text>
      <Text>Select and name your pet</Text>
      <Image source={require("../../assets/pets/petOne/happy.png")} />
      <Pressable
        style={styles.button}
        onPress={completeOnboarding}
        disabled={loading}
      >
        <Text style={styles.textStyle}>{loading ? "Loading..." : "Done"}</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/onboarding/onboarding-two")}
      >
        <Text style={styles.textStyle}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0099FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
