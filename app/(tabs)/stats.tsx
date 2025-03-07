import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Header } from "@/components/Header";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Stats() {
  const trackerData = {
    habitsTracked: 5,
    tasksCompleted: 12,
    coinsEarned: 120,
    coinsSpent: 70,
    mostBoughtFood: "🍎",
    highestStreak: 15,
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#90D2E4" }}
      headerImage={<Header />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Stats</ThemedText>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Habits Tracked</Text>
            <Text style={styles.statValue}>{trackerData.habitsTracked}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Total Tasks Completed</Text>
            <Text style={styles.statValue}>{trackerData.tasksCompleted}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Coins Earned</Text>
            <View style={styles.statIconRow}>
              <Image
                source={require("../../assets/images/coin.png")}
                style={styles.statIcon}
              />
              <Text style={styles.statValue}>{trackerData.coinsEarned}</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Coins Spent</Text>
            <View style={styles.statIconRow}>
              <Image
                source={require("../../assets/images/coin.png")}
                style={styles.statIcon}
              />
              <Text style={styles.statValue}>{trackerData.coinsSpent}</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Most Bought Food</Text>
            <Text style={styles.statValue}>{trackerData.mostBoughtFood}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Highest Streak</Text>
            <View style={styles.statIconRow}>
              <Text style={styles.statValue}>
                ⚡{trackerData.highestStreak}x
              </Text>
            </View>
          </View>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 30,
  },
  statsContainer: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
  },
  statCard: {
    backgroundColor: "#212121",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  statTitle: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
  statIconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
