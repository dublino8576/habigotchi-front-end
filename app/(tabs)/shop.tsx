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
      <CarouselView items={items}/>
      {/* <ScrollView contentContainerStyle={{ paddingBottom: 0 }}>
        {items.map((item) => {
          return (
            <View
              key={item.id}
              style={{
                display: "flex",

                alignItems: "center",
                margin: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
                {item.name}
              </Text>
              <Image
                style={{ width: 80, height: 80 }}
                source={item.img_url}
              ></Image>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/health-icon.png")}
                    style={{
                      margin: 10,
                      width: 30,
                      height: 30,
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  ></Image>
                  <Text style={{ color: "white" }}>{item.health}</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/coin.png")}
                    style={{
                      margin: 10,
                      width: 30,
                      height: 30,
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  ></Image>
                  <Text style={{ color: "white" }}>{item.price}</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/happiness.png")}
                    style={{
                      margin: 10,
                      width: 30,
                      height: 30,
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  ></Image>
                  <Text style={{ color: "white" }}>{item.happiness}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView> */}
    </SafeAreaView>
  );
}
