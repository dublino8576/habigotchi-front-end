import { getAllUsernames } from "@/API/api";
import { usePetInfo } from "@/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  BackHandler,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginPage = () => {
  const navigation = useNavigation();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const router = useRouter();
  const { username, setUsername } = usePetInfo();
  const { name, setName, character, setCharacter } = usePetInfo();
  const {
    setHealth,
    setHappiness,
    setCoins,
    setPetState,
    setSelectedPet,
    setPetName,
  } = usePetInfo();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>();
  const textInputPosition = isKeyboardVisible ? "40%" : "70%";

  useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });

    return () => {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation]);

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

  const handleUsername = (text: string) => {
    setUsername(text);
    if (text.length > 3) {
      getAllUsernames().then((result: any) => {
        const usernameArray = result.map((user: any) => user.user_name);
        if (usernameArray.includes(text)) {
          setIsUsernameValid(true);
        } else {
          setIsUsernameValid(false);
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Onboarding
        showDone={true}
        showSkip={true}
        skipLabel={"Sign-in"}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <LottieView
                source={require("../../assets/animations/login.json")}
                autoPlay
                loop
                style={{ height: 600, width: 600 }}
              ></LottieView>
            ),
            title: (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: "90%",
                  left: "10%",
                  backgroundColor: "blue",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 20,
                  flex: 1,
                }}
                onPress={() => {
                  router.push("/");
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Back</Text>
              </TouchableOpacity>
            ),
            subtitle: (
              <View style={{ position: "absolute", top: textInputPosition }}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: "white",
                      borderColor:
                        isFocused && username.length > 0 && username.length < 4
                          ? "red"
                          : isFocused && username.length >= 4 && isUsernameValid
                          ? "green"
                          : isFocused &&
                            username.length >= 4 &&
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
            ),
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default LoginPage;
