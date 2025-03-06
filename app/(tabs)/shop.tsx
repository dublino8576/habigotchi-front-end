import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  ScrollView,
} from "react-native";
import { Header } from "@/components/Header";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { CarouselView } from "@/components/CarouselView";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Shop() {
  const items = [
    {
      id: "1",
      name: "Re-energizer",
      price: "100 coins",
      img_url: require("../../assets/images/plug-square.png"),
      health: "50",
      happiness: "20",
    },
    {
      id: "2",
      name: "Dog Bone",
      price: "150 coins",
      img_url: require("../../assets/images/dog-bone.png"),
      health: "50",
      happiness: "20",
    },
    {
      id: "3",
      name: "Doe",
      price: "150 coins",
      img_url: require("../../assets/images/donut-perfect.png"),
      health: "50",
      happiness: "20",
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
