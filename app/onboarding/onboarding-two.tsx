import {
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
export default function OnboardingTwo() {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState("");
  const images = [
    require("../../assets/images/cat.webp"),
    require("../../assets/images/dog.jpg"),
    require("../../assets/images/owl.jpg"),
  ];
  const [character, setCharacter] = React.useState(0);
  const changeCharacter = () => {
    if (character == 2) {
      setCharacter(0);
    } else {
      setCharacter(character + 1);
    }
  };
  return (
    <SafeAreaProvider
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SafeAreaView
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: 600 }}>Habigotchi</Text>
        <Text style={{ margin: 30, fontSize: 15 }}>
          Select and name your pet
        </Text>
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
      </SafeAreaView>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="enter pet name..."
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          placeholder="write a profile status..."
          placeholderTextColor="gray"
        />
        <Button
          title="Save"
          color="#F194FF"
          onPress={() => Alert.alert("Button with adjusted color pressed")}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 160,
    margin: 6,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    alignSelf: "center",
    color: "red",
  },
});
