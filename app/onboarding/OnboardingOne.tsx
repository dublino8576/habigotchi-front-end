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

interface OnboardingOneProps {
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
}

const OnboardingOne: React.FC<OnboardingOneProps> = ({
  isOnboarded,
  setIsOnboarded,
}) => {
  const router = useRouter();

  const { username, setUsername } = usePetInfo();
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const animationSize = isKeyboardVisible ? 150 : 300;
  const { width, height } = Dimensions.get("window");

  const handleUsername = (text: string): void => {
    setUsername(text);
    if (text.length > 4) {
      setIsUsernameValid(true);
    } else {
      setIsUsernameValid(false);
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

  const handleCompleteOnboarding = async () => {
    // Mark user as onboarded and logged in
    setIsOnboarded(true);
    router.push("/");
    console.log("success");
  };

  return (
    <View style={styles.container}>
      <Onboarding
        containerStyles={{ paddingHorizontal: 15 }}
        showNext={pageIndex === 0 || isUsernameValid}
        showDone={isUsernameValid}
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
                          isFocused && !isUsernameValid ? "red" : "#ccc",
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
                  {isFocused && !isUsernameValid && (
                    <Text style={{ color: "red" }}>
                      Username must have at least 5 characters!
                    </Text>
                  )}
                </View>
              </>
            ),
            title: "Time to play with your pet!!",
            subtitle: "Choose your username to start playing",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View>
                <LottieView
                  source={require("../../assets/animations/base-for-pet.json")}
                  autoPlay
                  loop
                  style={{
                    width: animationSize,
                    height: animationSize,
                    justifyContent: "center",
                    alignItems: "center",
                    top: "35%",
                  }}
                ></LottieView>

                <LottieView
                  source={require("../../assets/animations/mushroom-gif.json")}
                  autoPlay
                  loop
                  style={{
                    width: 100,
                    height: 100,
                    position: "absolute",
                    top: "60%",
                    left: width / 4,
                  }}
                />
              </View>
            ),
            title: (
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end", // Push title down
                  alignItems: "center",
                  paddingBottom: 50, // Adjust space from bottom
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
