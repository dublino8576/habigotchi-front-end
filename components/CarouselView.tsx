import {
  Text,
  View,
  ScrollView,
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
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type Item = {
  img_url: string;
  name: string;
  health: number;
  happiness: number;
  price: number;
  key: string;
};
type CarouselProps = {
  items: Item[];
};

export const CarouselView: React.FC<CarouselProps> = ({ items }) => {
  const [newItems] = useState([
    { key: "spacer-left" },
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
      >
        {newItems.map((item, index) => {
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
            <View key={index} style={{ width: SIZE, marginHorizontal: 10 }}>
              <Animated.View style={styles.imageContainer}>
                <Image
                  source={item.img_url}
                  style={[styles.image, style]}
                ></Image>
                <TouchableOpacity
                  style={styles.buyButtonContainer}
                  onPress={() => handlePress(item)}
                >
                  <Text style={styles.buyButton}>Buy</Text>
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
        onRequestClose={() => setIsModalShown(false)}
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
            <TouchableOpacity style={styles.buyButtonModal}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
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
