import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Button,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { usePetInfo } from "@/contexts/UserContext";

export default function OnboardingThree() {
  const images = [
    require("../../assets/pets/petOne/happy.png"),
    require("../../assets/pets/petOne/neutral.png"),
    require("../../assets/pets/petOne/sad.png"),
  ];

  const changeCharacter = () => {
    if (character == 2) {
      setCharacter(0);
    } else {
      setCharacter(character + 1);
    }
  };
  const [loading, setLoading] = useState(false);
  const { name, setName, character, setCharacter } = usePetInfo();
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
      <SafeAreaView
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          title="<----  "
          color="#F194FF"
          onPress={() => {
            changeCharacter();
          }}
        />
        <Image
          id="character-image"
          source={images[character]}
          style={{ width: 170, height: 170 }}
        ></Image>
        <Button
          title="---->"
          color="#F194FF"
          onPress={() => {
            changeCharacter();
          }}
        />
      </SafeAreaView>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter pet name"
        placeholderTextColor="#888"
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          if (name.length > 0) {
            completeOnboarding();
          } else {
            Alert.alert("Error", "Pet name cannot be empty!");
          }
        }}
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
  image: {
    marginTop: 10,
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
