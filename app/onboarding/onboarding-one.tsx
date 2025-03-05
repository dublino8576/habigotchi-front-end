import { StyleSheet, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function OnboardingOne() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habigotchi</Text>
      <Text>Complete your habit goals to take care of your pet</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/onboarding/onboarding-two")}
      >
        <Text style={styles.textStyle}>Continue</Text>
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
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
