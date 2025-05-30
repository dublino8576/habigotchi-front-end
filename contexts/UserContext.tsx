import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PetInfoContext = createContext<any>(null);

export function PetInfoProvider({ children }: { children: ReactNode }) {
  const [health, setHealth] = useState(100);
  const [happiness, setHappiness] = useState(100);
  const [coins, setCoins] = useState(200);
  const [petState, setPetState] = useState("neutral");
  const [selectedPet, setSelectedPet] = useState("petOne");
  const [username, setUsername] = useState("");
  const [petName, setPetName] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [character, setCharacter] = useState(0);
  const [petComment, setPetComment] = useState("Hi, nice to meet you!");
  const [habits, setHabits] = useState([]);
  // [
  //   {
  //     name: "Exercise",
  //     description: "Daily workout for 30 minutes",
  //     currentStreak: 5,
  //     completedTasks: 15,
  //     totalTasks: 30,
  //   },
  //   {
  //     name: "Drink Water",
  //     description: "Drink 8 glasses of water daily",
  //     currentStreak: 10,
  //     completedTasks: 8,
  //     totalTasks: 8,
  //   },
  //   {
  //     name: "Read a Book",
  //     description: "Read for 30 minutes every day",
  //     currentStreak: 3,
  //     completedTasks: 20,
  //     totalTasks: 30,
  //   },
  //   {
  //     name: "No Junk Food",
  //     description: "Avoid junk food for better health",
  //     currentStreak: 7,
  //     completedTasks: 0,
  //     totalTasks: 1,
  //   },
  // ]
  const [friends, setFriends] = useState([
    {
      userName: "Pando",
      petName: "Big Skibidi Boss",
      image: require("../assets/pets/petOne/happy.png"),
    },
    {
      userName: "Lil cat",
      petName: "Kitkatking",
      image: require("../assets/pets/petOne/veryHappy.png"),
    },
    {
      userName: "Gorilla353",
      petName: "Monkiii",
      image: require("../assets/pets/petOne/sad.png"),
    },
  ]);

  useEffect(() => {
    const loadData = async () => {
      const savedHealth = await AsyncStorage.getItem("health");
      const savedHappiness = await AsyncStorage.getItem("happiness");
      const savedCoins = await AsyncStorage.getItem("coins");
      const savedPetState = await AsyncStorage.getItem("petState");
      const savedSelectedPet = await AsyncStorage.getItem("selectedPet");
      const savedPetComment = await AsyncStorage.getItem("petComment");
      const savedPetName = await AsyncStorage.getItem("petName");

      if (savedHealth) setHealth(Number(savedHealth));
      if (savedHappiness) setHappiness(Number(savedHappiness));
      if (savedCoins) setCoins(Number(savedCoins));
      if (savedPetState) setPetState(savedPetState);
      if (savedSelectedPet) setSelectedPet(savedSelectedPet);
      if (savedPetComment) setPetComment(savedPetComment);
      if (petName) setPetComment(petName);
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      await AsyncStorage.setItem("health", health.toString());
      await AsyncStorage.setItem("happiness", happiness.toString());
      await AsyncStorage.setItem("coins", coins.toString());
      await AsyncStorage.setItem("petState", petState);
      await AsyncStorage.setItem("selectedPet", selectedPet);
      await AsyncStorage.setItem("petComment", petComment);
      await AsyncStorage.setItem("petName", petName);
    };

    saveData();
  }, [health, happiness, coins, petState, selectedPet, petComment, petName]);

  useEffect(() => {
    const decrementState = () => {
      setHealth((prevHealth) => Math.max(prevHealth - 1, 0));
      setHappiness((prevHappiness) => Math.max(prevHappiness - 1, 0));
    };

    // this will be 3600000 when we want it be an hour per decrement
    const intervalId = setInterval(decrementState, 1200);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const totalHealthHappiness = health + happiness;
    // can delete this let I think
    let newPetState = "neutral";

    if (happiness === 0) {
      newPetState = "disappear";
    } else if (health === 0) {
      newPetState = "hibernate";
    } else {
      if (totalHealthHappiness >= 160) {
        newPetState = "veryHappy";
      } else if (totalHealthHappiness >= 120) {
        newPetState = "happy";
      } else if (totalHealthHappiness >= 80) {
        newPetState = "neutral";
      } else if (totalHealthHappiness >= 40) {
        newPetState = "sad";
      } else if (totalHealthHappiness >= 0) {
        newPetState = "verySad";
      }
    }

    setPetState(newPetState);
  }, [health, happiness]);

  return (
    <PetInfoContext.Provider
      value={{
        health,
        setHealth,
        happiness,
        setHappiness,
        coins,
        setCoins,
        petState,
        setPetState,
        selectedPet,
        setSelectedPet,
        habits,
        setHabits,
        petComment,
        setPetComment,
        name,
        setName,
        username,
        setUsername,
        character,
        setCharacter,
        friends,
        setFriends,
        petName,
        setPetName,
      }}
    >
      {children}
    </PetInfoContext.Provider>
  );
}

export function usePetInfo() {
  return useContext(PetInfoContext);
}
