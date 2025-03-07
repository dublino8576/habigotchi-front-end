import {
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { usePetInfo } from "@/contexts/UserContext";
export default function OnboardingTwo() {
  const router = useRouter();
  const { username, setUsername } = usePetInfo();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habigotchi</Text>
      <Text>Enter a username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter Username"
        placeholderTextColor="#888"
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          if (username.length > 0) {
            router.push("/onboarding/onboarding-three");
          } else {
            Alert.alert("Error", "Username cannot be empty!");
          }
        }}
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
  input: {
    width: "50%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    marginTop: 15,
  },
});
