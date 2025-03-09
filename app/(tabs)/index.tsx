import { StyleSheet, View, Text } from "react-native";
import {
  useState,
  useEffect,
  useLayoutEffect,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import CreateHabit from "../drawers/create-habit";
import EditHabit from "../drawers/edit-habit";
import OnboardingOne from "../onboarding/OnboardingOne";
import { Header } from "@/components/Header";
import { usePetInfo } from "@/contexts/UserContext";

export default function Habits() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const navigation = useNavigation();
  const { habits, setHabits } = usePetInfo();

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
          headerBackgroundColor={{ light: "#D0D0D0", dark: "#90D2E4" }}
          headerImage={<Header />}
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Habits</ThemedText>
          </ThemedView>
          <CreateHabit />

          {habits.map(
            (habit: {
              completedTasks: number;

              totalTasks: number;

              name: string;

              description: string;

              currentStreak: number;
            }) => {
              return (
                <View
                  key={habit.name + habit.description}
                  style={[
                    styles.habitContainer,
                    habit.completedTasks == habit.totalTasks &&
                      styles.completedHabitContainer,
                  ]}
                >
                  <EditHabit />
                  <Text style={styles.habitName}>{habit.name}</Text>
                  <Text style={styles.habitDescription}>
                    {habit.description}
                  </Text>
                  <Text style={styles.habitStreak}>
                    Current Streak: {habit.currentStreak} days
                  </Text>
                  <Text style={styles.habitProgress}>
                    Progress: {habit.completedTasks}/{habit.totalTasks}
                  </Text>
                </View>
              );
            }
          )}
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
  habitContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  habitName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  habitDescription: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  habitStreak: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
  },
  habitProgress: {
    fontSize: 16,
    color: "#444",
  },
  completedHabitContainer: {
    backgroundColor: "#bcfd49",
  },
});
