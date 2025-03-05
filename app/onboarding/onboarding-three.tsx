import { StyleSheet, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function OnboardingThree() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const completeOnboarding = async () => {
    setLoading(true);
    await AsyncStorage.setItem("isOnboarded", "true");
    setLoading(false);
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habigotchi</Text>
      <Text>Select and name your pet</Text>
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
