import {
  Text,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
} from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import { usePetInfo } from "@/contexts/UserContext";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPets, getUser, updatePet, updateUser } from "@/API/api";

type Item = {
  img_url: any;
  name: string;
  health: string;
  happiness: string;
  price: string;
  key?: string;
};
type Spacer = {
  key: string;
};
type CarouselItem = Item | Spacer;

type CarouselProps = {
  items: CarouselItem[];
};

export const CarouselView: React.FC<CarouselProps> = ({ items }) => {
  const {
    happiness,
    setHappiness,
    coins,
    setCoins,
    health,
    setHealth,
    username,
  } = usePetInfo();
  const [isItemBought, setIsItemBought] = useState(true);
  const [areCoinsEnough, setAreCoinsEnough] = useState(true);
  const [newItems] = useState<CarouselItem[]>([
    ...items,
    { key: "spacer-right" },
  ]);
  const [selectShopItem, setSelectShopItem] = useState<Item | null>(null);
  const [isModalShown, setIsModalShown] = useState(false);
  const { width } = useWindowDimensions();

  const SIZE = width * 0.4;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  const handlePress = (item: any) => {
    setIsModalShown(true);
    setSelectShopItem(item);
  };

  const handleStore = async (selectShopItem: any) => {
    const nameItemBought = selectShopItem.name;
    const regex = /\d+/g;
    const priceItemBoughtNumber = Number(
      selectShopItem.price.match(regex).join("")
    );

    const healthItemBought = Number(selectShopItem.health);
    const happinessItemBought = Number(selectShopItem.happiness);
    if (coins < priceItemBoughtNumber) {
      setIsItemBought(false);
      setAreCoinsEnough(false);
      return;
    }
    setIsItemBought(true);
    setCoins((prevCoins: number) => prevCoins - priceItemBoughtNumber);

    const dataFromStorage = await AsyncStorage.multiGet(["user_id"]);
    const user_id = dataFromStorage[0][1];
    const userProfile = await getUser(user_id);
    const coinsSpent = userProfile.coins_spent;
    const appleBought = userProfile.bought_apple;
    const ballBought = userProfile.bought_ball;
    const strawberryBought = userProfile.bought_strawberry;
    const iceCreamBought = userProfile.bought_ice_cream;
    let requestBody = {};
    if (nameItemBought === "Strawberry") {
      requestBody = {
        bought_strawberry: strawberryBought + 1,
        coins_spent: coinsSpent + priceItemBoughtNumber,
      };
    } else if (nameItemBought === "Ice-cream") {
      requestBody = {
        bought_ice_cream: iceCreamBought + 1,
        coins_spent: coinsSpent + priceItemBoughtNumber,
      };
    } else if (nameItemBought === "Apple") {
      requestBody = {
        bought_apple: appleBought + 1,
        coins_spent: coinsSpent + priceItemBoughtNumber,
      };
    } else if (nameItemBought === "Ball") {
      requestBody = {
        bought_ball: ballBought + 1,
        coins_spent: coinsSpent + priceItemBoughtNumber,
      };
    }
    const updatedUserProof = await updateUser(requestBody, user_id);
    const petProfile = await getPets(username);

    let petCurrentCoins = petProfile.current_coin;

    let requestBodyPet = {};
    const newCoinsBalance = petCurrentCoins - priceItemBoughtNumber;
    if (
      coins >= priceItemBoughtNumber &&
      health + healthItemBought <= 100 &&
      happiness + happinessItemBought <= 100
    ) {
      requestBodyPet = {
        pet_health: health + healthItemBought,
        pet_happiness: happiness + happinessItemBought,
        current_coin: newCoinsBalance === 0 ? -1 : newCoinsBalance,
      };
      const updatedPet = await updatePet(requestBodyPet, username);
      setHealth((prevHealth: number) => prevHealth + healthItemBought);
      setHappiness(
        (prevHappiness: number) => prevHappiness + happinessItemBought
      );
    } else if (
      coins >= priceItemBoughtNumber &&
      health + healthItemBought > 100 &&
      happiness + happinessItemBought > 100
    ) {
      requestBodyPet = {
        pet_health: 100,
        pet_happiness: 100,
        current_coin: newCoinsBalance === 0 ? -1 : newCoinsBalance,
      };
      const updatedPet = await updatePet(requestBodyPet, username);
      setHealth(100);
      setHappiness(100);
    } else if (
      coins >= priceItemBoughtNumber &&
      health + healthItemBought > 100 &&
      happiness + happinessItemBought <= 100
    ) {
      requestBodyPet = {
        pet_health: 100,
        pet_happiness: happiness + healthItemBought,
        current_coin: newCoinsBalance === 0 ? -1 : newCoinsBalance,
      };
      const updatedPet = await updatePet(requestBodyPet, username);

      setHappiness(
        (prevHappiness: number) => prevHappiness + happinessItemBought
      );
      setHealth(100);
    } else if (
      coins >= priceItemBoughtNumber &&
      happiness + happinessItemBought > 100 &&
      health + healthItemBought <= 100
    ) {
      requestBodyPet = {
        pet_health: health + healthItemBought,
        pet_happiness: 100,
        current_coin: newCoinsBalance === 0 ? -1 : newCoinsBalance,
      };
      const updatedPet = await updatePet(requestBodyPet, username);

      setHappiness(100);
      setHealth((prevHealth: number) => prevHealth + healthItemBought);
    }
  };

  return (
    <>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        snapToInterval={SIZE}
        decelerationRate="fast"
        onScroll={onScroll}
        style={{
          width: "160%",
          left: "-30%",
          paddingTop: "5%",
          paddingLeft: "20%",
          transform: [{ translateX: "-10%" }],
        }}
      >
        {newItems.map((item: any, index) => {
          const style = useAnimatedStyle(() => {
            const scale = interpolate(
              x.value,
              [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
              [0.8, 1, 0.8]
            );
            return {
              transform: [{ scale }],
            };
          });
          if (!item.img_url) {
            return <View style={{ width: SPACER }} key={index} />;
          }
          const tapGesture = Gesture.Tap().onEnd(() => handlePress(item));
          return (
            <View key={index} style={{ width: SIZE, marginHorizontal: 5 }}>
              <Animated.View style={styles.imageContainer}>
                <Image
                  source={item.img_url}
                  style={[styles.image, style]}
                ></Image>
                <TouchableOpacity
                  style={styles.buyButtonContainer}
                  onPress={() => handlePress(item)}
                >
                  <Text style={styles.buyButton}>Info</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>

      <Modal
        animationType="slide"
        visible={isModalShown}
        transparent={true}
        onShow={() => {
          setIsItemBought(false);
          setAreCoinsEnough(true);
        }}
        onRequestClose={() => {
          setIsModalShown(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.textModal}>
              {selectShopItem?.name} is worth {selectShopItem?.health} health
              and {selectShopItem?.happiness} happiness
            </Text>
            <Text style={styles.textModal}>
              It costs: {selectShopItem?.price}
            </Text>

            {isItemBought && areCoinsEnough ? (
              <Text style={(styles.buyButtonText, { color: "green" })}>
                Bought
              </Text>
            ) : !isItemBought && areCoinsEnough ? (
              <TouchableOpacity
                style={styles.buyButtonModal}
                onPress={() => handleStore(selectShopItem)}
              >
                <Text style={styles.buyButtonText}>Buy Now</Text>
              </TouchableOpacity>
            ) : (
              <Text style={(styles.buyButtonText, { color: "red" })}>
                Not enough coins
              </Text>
            )}

            <Text
              onPress={() => setIsModalShown(false)}
              style={styles.closeButton}
            >
              Close
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 34,
    overflow: "hidden",
    marginBottom: 100,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  imageText: {
    textAlign: "center",
    position: "relative",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  buyButtonContainer: {
    position: "absolute",
    bottom: 20, // Position the button near the bottom of the image
    left: "50%",
    // Center the button horizontally
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buyButton: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  closeButton: {
    marginTop: 10,
    color: "blue",
    fontWeight: "bold",
  },
  buyButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "900",
  },

  textModal: {
    textAlign: "left",
  },
  buyButtonModal: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
