import {
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  NativeSyntheticEvent,
  BackHandler,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { usePetInfo } from "@/contexts/UserContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function OnboardingOne() {
  const router = useRouter();
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const { username, setUsername } = usePetInfo();
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

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

  return (
    <View style={styles.container}>
      <Onboarding
        containerStyles={{ paddingHorizontal: 15 }}
        showNext={pageIndex === 0 || isUsernameValid}
        showDone={false}
        showSkip={false}
        nextLabel={"Next"}
        pageIndexCallback={(index: number) => {
          setPageIndex(index);
          Keyboard.dismiss();
        }}
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
                {!isKeyboardVisible && (
                  <View>
                    <LottieView
                      source={require("../../assets/animations/pet-and-owner.json")}
                      autoPlay
                      loop
                      style={{
                        width: 300,
                        height: 300,
                      }}
                    />
                  </View>
                )}

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
                <Text>Hello world</Text>
              </View>
            ),
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
        ]}
      />
    </View>
  );
}

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
