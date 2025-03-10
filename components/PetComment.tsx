import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { usePetInfo } from "@/contexts/UserContext";

// we can use the usePetInfo / some other global user context to import petName

const styles = StyleSheet.create({
  petName: {
    backgroundColor: "#000",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    padding: 8,
    marginLeft: 40,
    marginRight: 48,
    marginTop: 8,
    alignSelf: "flex-start",
    /*  boxShadow: `
    0px 4px 0 black,
    4px 0px 0 black,
    -4px 0px 0 black,
    0px -4px 0 black,
    -2px -2px 0 rgba(0,0,0,0),
    2px -2px 0 rgba(0,0,0,0),
    -2px 2px 0 rgba(0,0,0,0),
    2px 2px 0 rgba(0,0,0,0)
  `, */
  },
  comment: {
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    padding: 8,
    marginTop: 4,
    marginLeft: 32,
    marginRight: 32,
    /*  boxShadow: `
    0px 4px 0 black,
    4px 0px 0 black,
    -4px 0px 0 black,
    0px -4px 0 black,
    -2px -2px 0 rgba(0,0,0,0),
    2px -2px 0 rgba(0,0,0,0),
    -2px 2px 0 rgba(0,0,0,0),
    2px 2px 0 rgba(0,0,0,0)
  `, */
  },
});

export function PetComment() {
  const { petComment, setPetComment, petName } = usePetInfo();
  return (
    <View>
      <Text style={styles.petName}>{petName}</Text>
      <Text style={styles.comment}>{petComment}</Text>
    </View>
  );
}
