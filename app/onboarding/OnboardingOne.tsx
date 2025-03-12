import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  BackHandler,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { usePetInfo } from "@/contexts/UserContext";
import { addUser, addPet, updateUser, getAllUsernames } from "@/API/api";
import LoginPage from "../(tabs)/login-page";
import { SafeAreaView } from "react-native-safe-area-context";

interface OnboardingOneProps {
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
}
interface NewUserInput {
  username: string;
}
const OnboardingOne: React.FC<OnboardingOneProps> = ({
  isOnboarded,
  setIsOnboarded,
}) => {
  const router = useRouter();

  const { username, setUsername } = usePetInfo();
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const animationPosition = isKeyboardVisible ? "-30%" : "10%";
  const basePosition = isKeyboardVisible ? "-80%" : "0%";
  const textInputPosition = isKeyboardVisible ? "-30%" : "0%";
  const textPetPosition = isKeyboardVisible ? "-40%" : "-120%";
  const [loading, setLoading] = useState(false);
  const { name, setName, character, setCharacter } = usePetInfo();
  const {
    setHealth,
    setHappiness,
    setCoins,
    setPetState,
    setSelectedPet,
    setPetName,
  } = usePetInfo();
  const [isPetNameValid, setIsPetNameValid] = useState(false);

  const handleUsername = (text: string): void => {
    setUsername(text);

    if (text.length > 4) {
      getAllUsernames().then((result: any) => {
        console.log(result)
        const usernameArray = result.map((user: any) => user.user_name);
        if (usernameArray.includes(text)) {
          setIsUsernameValid(false);
        } else {
          setIsUsernameValid(true);
        }
      });
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  //REMEMBER: whilst Lottie animations are on, the keyboard cannot open if input field is not positioned on top of keyboard as image property is always re-rendering and it is too big. I left the animation on but smaller when the keyboard is active so that the text input has space over the keyboard.

  //USE keyboard module for animations with keyboard transitions below

  useEffect(() => {
    // Listen for keyboard show event
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true); // Keyboard is visible
      }
    );

    // Listen for keyboard hide event
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false); // Keyboard is hidden
      }
    );

    // Handle back button press to simulate blur when keyboard is visible
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isFocused) {
          setIsFocused(false); // Simulate blur when back button is pressed
          Keyboard.dismiss(); // Dismiss keyboard
          return true; // Prevent default back button behavior (exit app)
        }
        return false; // Allow default back button behavior if not focused
      }
    );

    // Cleanup listeners on unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      backHandler.remove();
    };
  }, [isFocused]);
  const changeCharacter = () => {
    if (character == 2) {
      setCharacter(0);
    } else {
      setCharacter(character + 1);
    }
  };
  const handlePetName = (text: string): void => {
    setName(text);
    if (name.length > 3) {
      setIsPetNameValid(true);
    } else {
      setIsPetNameValid(false);
    }
  };

  const sendToLoginPage = () => {
    router.push("/(tabs)/login-page");
  };

  const handleCompleteOnboarding = async () => {
    setLoading(true);
    // Mark user as onboarded and logged in
    const addUserBody = { user_name: username };
    const addPetBody = { pet_name: name, pet_status: "TEST PET STATUS" };

    const createdUser = await addUser(addUserBody);
    const createdPet = await addPet(addPetBody);
    const pet_id = createdPet.pet_id;
    const updateUserBody = { pet_id: createdPet.pet_id, user_onboarded: true };
    const user_id = createdUser.user_id;

    const updatedUser = await updateUser(updateUserBody, user_id);

    await AsyncStorage.multiSet([
      ["isOnboarded", "true"],
      ["user_id", JSON.stringify(user_id)],
      ["pet_id", JSON.stringify(pet_id)],
      ["user_name", JSON.stringify(username)],
    ]);

    setLoading(false);
    setHealth(80);
    setHappiness(100);
    setCoins(200);
    // setSelectedPet = the one in the carousel center when pressing done
    setSelectedPet("petOne");
    setPetName(name.charAt(0).toUpperCase() + name.slice(1));
    setIsOnboarded(true);
    router.push("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Onboarding
        containerStyles={{ paddingHorizontal: 15 }}
        showNext={pageIndex === 0 || isUsernameValid}
        showDone={isPetNameValid && username.length > 0 && isUsernameValid}
        showSkip={pageIndex === 0}
        nextLabel={"Next"}
        skipLabel={"Login"}
        pageIndexCallback={(index: number) => {
          setPageIndex(index);
          Keyboard.dismiss();
        }}
        onDone={handleCompleteOnboarding}
        onSkip={sendToLoginPage}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <View>
                <LottieView
                  source={require("../../assets/animations/dog-walking.json")}
                  autoPlay
                  loop
                  style={{ width: 300, height: 300 }}
                />
              </View>
            ),
            title: "Habigotchi",
            subtitle: "Boost your productivity whilst having fun!",
          },
          {
            backgroundColor: "#fff",
            image: (
              <>
                (
                <View>
                  <LottieView
                    source={require("../../assets/animations/pet-and-owner.json")}
                    autoPlay
                    loop
                    style={{
                      width: 300,
                      height: 300,
                      top: animationPosition,
                    }}
                  />
                </View>
                )
                <View style={{ top: textInputPosition }}>
                  {isFocused && username.length > 0 && username.length < 5 ? (
                    <View>
                      <Text style={{ color: "red", alignSelf: "center" }}>
                        Must be at least 5 characters!
                      </Text>
                    </View>
                  ) : null}
                  {isFocused && username.length >= 5 && isUsernameValid ? (
                    <View>
                      <Text style={{ color: "green" }}>Username is valid!</Text>
                    </View>
                  ) : isFocused && username.length >= 5 && !isUsernameValid ? (
                    <View>
                      <Text style={{ color: "red" }}>
                        Username has been taken!
                      </Text>
                    </View>
                  ) : null}
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor:
                          isFocused &&
                          username.length > 0 &&
                          username.length < 5
                            ? "red"
                            : isFocused &&
                              username.length >= 5 &&
                              isUsernameValid
                            ? "green"
                            : isFocused &&
                              username.length >= 5 &&
                              !isUsernameValid
                            ? "red"
                            : "#ccc",
                      },
                    ]}
                    placeholder="Type your username"
                    multiline={false}
                    numberOfLines={1}
                    value={username}
                    onChangeText={handleUsername}
                    placeholderTextColor="#999"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </View>
              </>
            ),
            title: "Time to play with your pet!!",
            subtitle: "Choose your username to start playing",
          },
          {
            backgroundColor: "#fff",
            image: (
              <>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    top: basePosition,
                  }}
                >
                  <LottieView
                    source={require("../../assets/animations/base-for-pet.json")}
                    autoPlay
                    loop
                    style={{
                      width: 300,
                      height: 300,
                      top: animationPosition, // Adjust this value as needed
                    }}
                  />
                </View>

                <View style={{ bottom: textPetPosition }}>
                  {isFocused && name.length < 5 ? (
                    <Text style={{ color: "red", textAlign: "center" }}>
                      Must be at least 5 characters!
                    </Text>
                  ) : null}
                  {isFocused && name.length >= 5 ? (
                    <Text style={{ color: "green", textAlign: "center" }}>
                      Pet name is valid!
                    </Text>
                  ) : null}

                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor:
                          isFocused && name.length < 5
                            ? "red"
                            : isFocused && name.length > 4
                            ? "green"
                            : "#ccc",
                      },
                    ]}
                    placeholder="Type your username"
                    multiline={false}
                    numberOfLines={1}
                    value={name}
                    onChangeText={handlePetName}
                    placeholderTextColor="#999"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </View>
              </>
            ),
            title: "",
            subtitle: "",
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: 200,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    marginTop: 15,
    overflow: "hidden",
  },
});

export default OnboardingOne;
