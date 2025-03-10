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
      name: "Re-energizer",
      price: "100 coins",
      img_url: require("../../assets/images/plug-square.png"),
      health: "50",
      happiness: "20",
      key: "1",
    },
    {
      id: "2",
      name: "Dog Bone",
      price: "150 coins",
      img_url: require("../../assets/images/dog-bone.png"),
      health: "50",
      happiness: "20",
      key: "2",
    },
    {
      id: "3",
      name: "Doe",
      price: "150 coins",
      img_url: require("../../assets/images/donut-perfect.png"),
      health: "50",
      happiness: "20",
      key: "3",
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
