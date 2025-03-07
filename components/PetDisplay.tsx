import { StyleSheet, Image } from "react-native";
import { usePetInfo } from "@/contexts/UserContext";
import { View } from "react-native";
import { PetComment } from "./PetComment";
import { useEffect } from "react";

const styles = StyleSheet.create({
  characterImage: {
    width: 128,
    height: 128,
    alignSelf: "center",
    marginTop: 58,
    // shadowColor: "#FFD700",
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.5,
    // shadowRadius: 15,
  },
});

export function PetDisplay() {
  const {
    health,
    happiness,
    petState,
    selectedPet,
    petComment,
    setPetComment,
  } = usePetInfo();

  // not needed v
  // const totalHealthHappiness = health + happiness;
  // console.log(totalHealthHappiness);
  // console.log(petState);
  // console.log(selectedPet);

  useEffect(() => {
    //typescript safety on line 38
    const comments: { [key: string]: string } = {
      veryHappy: "I'm very happy we're friends!",
      happy: "I am haapppy!",
      neutral: "I feel pretty gooood.",
      sad: "Sad vibes..",
      verySad: "I am very sad tbh...",
      hibernate: "ZzZZZZzzzzZzZZz",
      default: "*tumbleweed*",
    };

    setPetComment(comments[petState] || comments.default);
  }, [petState, setPetComment]);

  const image = (() => {
    switch (selectedPet) {
      case "petOne":
        switch (petState) {
          case "veryHappy":
            return require("../assets/pets/petOne/veryHappy.png");
          case "happy":
            return require("../assets/pets/petOne/happy.png");
          case "neutral":
            return require("../assets/pets/petOne/neutral.png");
          case "sad":
            return require("../assets/pets/petOne/sad.png");
          case "verySad":
            return require("../assets/pets/petOne/verySad.png");
          case "disappear":
            return require("../assets/pets/petOne/disappear.png");
          default:
            return require("../assets/pets/petOne/hibernate.png");
        }
      default:
        return require("../assets/pets/MissingNo.png");
    }
  })();

  return (
    <View>
      <Image style={styles.characterImage} source={image} />
      <PetComment />
    </View>
  );
}
