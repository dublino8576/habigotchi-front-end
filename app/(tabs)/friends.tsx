import { StyleSheet, View, Text, Image, Platform } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AddFriend from "../drawers/add-friend";
import ViewFriend from "../drawers/view-friend";
import { Header } from "@/components/Header";
import { usePetInfo } from "@/contexts/UserContext";

export default function Friends() {
  const { friends, setFriends } = usePetInfo();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#90D2E4" }}
      headerImage={<Header />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Friends</ThemedText>
      </ThemedView>
      <AddFriend />
      {friends.map(
        (friend: { userName: string; petName: string; image: string }) => {
          return (
            <View key={friend.userName} style={[styles.friendContainer]}>
              <ViewFriend />
              <View style={styles.friendInfoContainer}>
                <Image source={friend.image} style={styles.friendImage}></Image>
                <View style={styles.textContainer}>
                  <Text style={styles.friendName}>{friend.userName}</Text>
                  <Text style={styles.petName}>{friend.petName}</Text>
                </View>
              </View>
            </View>
          );
        }
      )}
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
  friendContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  friendInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    justifyContent: "center",
  },
  friendName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  petName: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
});
