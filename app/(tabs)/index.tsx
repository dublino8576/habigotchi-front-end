import { StyleSheet, View, Text } from "react-native";
import {
  useState,
  useEffect,
  useLayoutEffect,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import CreateHabit from "../drawers/create-habit";
import EditHabit from "../drawers/edit-habit";
import OnboardingOne from "../onboarding/OnboardingOne";
import { Header } from "@/components/Header";
import { usePetInfo } from "@/contexts/UserContext";
import { getHabits } from "@/API/api";
import { all } from "axios";

export default function Habits() {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(true);
  const navigation = useNavigation();
  const { habits, setHabits } = usePetInfo();
  const [updatedHabits, setUpdatedHabits] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      const checkOnboarding = async () => {
        const onboarded = await AsyncStorage.getItem("isOnboarded");

        const user_id = await AsyncStorage.getItem("user_id");
        console.log("Fetched isOnboarded value from AsyncStorage:", onboarded);
        setIsOnboarded(onboarded === "true"); // Ensures re-check on screen focus

        getHabits(user_id).then((allHabits) => {
          console.log(allHabits, "<-------");
          setHabits(allHabits);
        });
      };

      checkOnboarding();

    }, [updatedHabits])
  );

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
        <OnboardingOne
          isOnboarded={isOnboarded}
          setIsOnboarded={setIsOnboarded}
        />
      ) : (
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#D0D0D0", dark: "#90D2E4" }}
          headerImage={<Header />}
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Habits</ThemedText>
          </ThemedView>
          <CreateHabit
            setUpdatedHabits={setUpdatedHabits}
            updatedHabits={updatedHabits}
          />

          {habits.map(
            (habit: {
              //PROPERTIS FROM BACKEND
              habit_added: string;
              habit_category: string;
              habit_frequency: string;
              habit_id: number;
              habit_name: string;
              habit_status: string;
              user_id: number;
              habit_description: string;

              // completedTasks: number;

              // totalTasks: number;

              // currentStreak: number;
            }) => {
              return (
                <View
                  key={habit.habit_id}
                  style={[
                    styles.habitContainer,
                    habit.habit_status == "Completed"
                      ? styles.completedHabitContainer
                      : null,
                  ]}
                >
                  <Text style={styles.habitFrequency}>
                    {habit.habit_frequency}
                  </Text>
                  <EditHabit
                    habitId={habit.habit_id}
                    setUpdatedHabits={setUpdatedHabits}
                    updatedHabits={updatedHabits}
                  />
                  <Text style={styles.habitName}>{habit.habit_name}</Text>
                  <Text style={styles.habitDescription}>
                    {habit.habit_description}
                  </Text>
                  <Text style={styles.habitStreak}>{habit.habit_category}</Text>
                  <Text style={styles.habitProgress}>
                    Progress: {habit.habit_status}
                  </Text>

                  {/* <Text style={styles.habitStreak}>
                    Current Streak: {habit.currentStreak} days
                  </Text>
                  <Text style={styles.habitProgress}>
                    Progress: {habit.completedTasks}/{habit.totalTasks}
                  </Text> */}
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
    /*   shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5, */
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
    fontSize: 14,
    color: "#444",
  },

  habitFrequency: {
    fontSize: 16,
    color: "#556b2f",
    fontWeight: "bold",
  },
  completedHabitContainer: {
    backgroundColor: "#bcfd49",
    // backgroundColor: "#212121",
  },
});
