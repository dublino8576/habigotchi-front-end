import React from "react";
import { View, Image } from "react-native";

export const Header: React.FC = () => {
  return (
    <>
      {" "}
      <View
        style={{
          flexDirection: "row",

          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/images/health-icon.png")}
          style={{
            margin: 10,
            width: 40,
            height: 40,
            alignSelf: "center",
            justifyContent: "center",
          }}
        ></Image>

        <Image
          source={require("../assets/images/coin.png")}
          style={{
            margin: 10,
            width: 50,
            height: 50,
            alignSelf: "center",
            justifyContent: "center",
          }}
        ></Image>
        <Image
          source={require("../assets/images/happiness.png")}
          style={{
            margin: 10,
            width: 50,
            height: 50,
            alignSelf: "center",
            justifyContent: "center",
          }}
        ></Image>
      </View>
      <Image
        style={{
          width: 170,
          height: 150,
          alignSelf: "center",
          justifyContent: "center",
        }}
        source={require("../assets/images/character.png")}
      ></Image>
    </>
  );
};
