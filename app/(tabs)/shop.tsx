import { StyleSheet, Text } from "react-native";
import { Header } from "@/components/Header";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { CarouselView } from "@/components/CarouselView";

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
    <SafeAreaView style={{ flex: 1 }}>
      {" "}
      <Header></Header>
      <Text
        style={{ margin: 30, fontSize: 55, fontWeight: 600, color: "white" }}
      >
        SHOP
      </Text>
      <CarouselView items={items} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
