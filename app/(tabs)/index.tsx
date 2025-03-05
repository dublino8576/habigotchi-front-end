import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import CreateHabit from "../drawers/create-habit";
import EditHabit from "../drawers/edit-habit";
import OnboardingOne from "../onboarding/onboarding-one";

export default function Habits() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await AsyncStorage.getItem("isOnboarded");
      setIsOnboarded(onboarded === "true");
    };
    checkOnboarding();
  }, []);

  useLayoutEffect(() => {
    if (isOnboarded === false) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [isOnboarded, navigation]);

  if (isOnboarded === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      {!isOnboarded ? (
        <OnboardingOne />
      ) : (
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
          headerImage={
            <IconSymbol
              size={310}
              color="#808080"
              name="list.bullet"
              style={styles.headerImage}
            />
          }
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Habits</ThemedText>
          </ThemedView>
          <CreateHabit />
          <EditHabit />
        </ParallaxScrollView>
      )}
    </>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
