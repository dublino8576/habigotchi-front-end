import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { usePetInfo } from "@/contexts/UserContext";

// we can use the usePetInfo / some other global user context to import petName

const petName = "Lil Skibidi";

const styles = StyleSheet.create({
  petName: {
    backgroundColor: "#52ACEF",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    padding: 8,
    marginLeft: 48,
    marginRight: 48,
    marginTop: 24,
    alignSelf: "flex-start",
  },
  comment: {
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    padding: 8,
    marginLeft: 48,
    marginRight: 48,
  },
});

export function PetComment() {
  const { petComment, setPetComment } = usePetInfo();
  return (
    <View>
      <Text style={styles.petName}>{petName}</Text>
      <Text style={styles.comment}>{petComment}</Text>
    </View>
  );
}
