import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  NativeSyntheticEvent,
  BackHandler,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { usePetInfo } from "@/contexts/UserContext";
import { addUser, addPet, updateUser, getAllUsernames } from "@/API/api";

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
  const animationSize = isKeyboardVisible ? 150 : 300;
  const petSize = isKeyboardVisible ? 50 : 150;
  const { width, height } = Dimensions.get("window");
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
    if (name.length > 4) {
      setIsPetNameValid(true);
    } else {
      setIsPetNameValid(false);
    }
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
    <View style={styles.container}>
      <Onboarding
        containerStyles={{ paddingHorizontal: 15 }}
        showNext={pageIndex === 0 || isUsernameValid}
        showDone={isPetNameValid && username.length > 0 && isUsernameValid}
        showSkip={false}
        nextLabel={"Next"}
        pageIndexCallback={(index: number) => {
          setPageIndex(index);
          Keyboard.dismiss();
        }}
        onDone={handleCompleteOnboarding}
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
                      width: animationSize,
                      height: animationSize,
                    }}
                  />
                </View>
                )
                <View>
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
                  {isFocused && username.length > 0 && username.length < 5 ? (
                    <View>
                      <Text style={{ color: "red" }}>
                        Username must have at least 5 characters!
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
                <View>
                  <View>
                    <LottieView
                      source={require("../../assets/animations/base-for-pet.json")}
                      autoPlay
                      loop
                      style={{
                        width: animationSize,
                        height: animationSize,
                        justifyContent: "center",
                        alignSelf: "center",
                        top: "35%",
                      }}
                    ></LottieView>

                    <LottieView
                      source={require("../../assets/animations/mushroom-gif.json")}
                      autoPlay
                      loop
                      style={{
                        width: petSize,
                        height: petSize,
                        position: "absolute",
                        top: "40%",
                        alignSelf: "center",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    {!!isFocused && !isPetNameValid && (
                      <Text style={{ color: "red" }}>
                        Pet name must have at least 5 characters!
                      </Text>
                    )}
                    <TextInput
                      style={[
                        styles.input,
                        {
                          borderColor:
                            !!isFocused && !isPetNameValid ? "red" : "#ccc",
                        },
                      ]}
                      placeholder="Type the name of your pet"
                      multiline={false}
                      numberOfLines={1}
                      value={name}
                      onChangeText={handlePetName}
                      placeholderTextColor="#999"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </View>
                </View>
              </>
            ),
            title: (
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  paddingBottom: 50,
                }}
              >
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                  Choose your pet!
                </Text>
              </View>
            ),
            subtitle: "Done with React Native Onboarding Swiper",
          },
        ]}
      />
    </View>
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
