import { StyleSheet, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function OnboardingTwo() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habigotchi</Text>
      <Text>Enter a username</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/onboarding/onboarding-three")}
      >
        <Text style={styles.textStyle}>Continue</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/onboarding/onboarding-one")}
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
