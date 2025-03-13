import { StyleSheet, Text, View } from "react-native";
import { Header } from "@/components/Header";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { CarouselView } from "@/components/CarouselView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Shop() {
  const items = [
    {
      id: "1",
      name: "Apple",
      price: "35 coins",
      img_url: require("../../assets/images/apple.png"),
      health: "30",
      happiness: "20",
      key: "1",
    },
    {
      id: "2",
      name: "Ice-cream",
      price: "30 coins",
      img_url: require("../../assets/images/ice-cream.png"),
      health: "20",
      happiness: "30",
      key: "2",
    },
    {
      id: "3",
      name: "Strawberry",
      price: "35 coins",
      img_url: require("../../assets/images/strawberry.png"),
      health: "30",
      happiness: "20",
      key: "3",
    },
    {
      id: "4",
      name: "Ball",
      price: "50 coins",
      img_url: require("../../assets/images/ball.png"),
      health: "10",
      happiness: "70",
      key: "4",
    },
  ];
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#90D2E4" }}
      headerImage={<Header />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          <Text>Shop</Text>
        </ThemedText>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "center", marginTop: "40%" }}>
            <CarouselView items={items} />
          </View>
        </SafeAreaView>
      </ThemedView>
    </ParallaxScrollView>
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonDelete: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
