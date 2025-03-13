import {
  StyleSheet,
  Pressable,
  Text,
  Button,
  Image,
  Platform,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

import EditPet from "../drawers/edit-pet";
import DeleteAccount from "../drawers/delete-account";
import { Header } from "@/components/Header";
import { useEffect, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getPetByUsername } from "@/API/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Pet() {
  interface PetInfo {
    pet_name: string | null;
    current_coin: number | null;
    pet_birthday: string | null;
    pet_happiness: string | null;
    pet_health: string | null;
    pet_id: number | null;
    pet_status: string | null;
  }

  const [petinfo, setPetInfo] = useState<PetInfo>();
  let username: any;

  useFocusEffect(
    useCallback(() => {
      console.log("PET", petinfo);
      const fetchUsername = async () => {
        username = await AsyncStorage.getItem("user_name");
      };
      fetchUsername();
      getPetByUsername(username).then((returnedPet) => {
        setPetInfo(returnedPet);
      });
    }, [])
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#90D2E4" }}
      headerImage={<Header />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pet</ThemedText>
      </ThemedView>
      <EditPet />
      <DeleteAccount />
      {petinfo ? (
        <View>
          <Text>Name:{petinfo.pet_name}</Text>
          <Text>Status:{petinfo.pet_name}</Text>
          <Text>Age:{petinfo.pet_birthday}</Text>
        </View>
      ) : null}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonDelete: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
