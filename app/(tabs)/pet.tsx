import { StyleSheet, TextInput, Pressable, Text, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/Header";
import EditPet from "../drawers/edit-pet";
import DeleteAccount from "../drawers/delete-account";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { usePetInfo } from "@/contexts/UserContext";

const API_KEY = "AIzaSyDfe3eXhYtt-WlEAyUvVReIZhbiI6ZsnoU";
export default function Pet() {
  const { petName } = usePetInfo();
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const askLilPengo = async () => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(
      question + "Please respond in a maximum of three sentences."
    );
    const responseText = result.response.text();

    setResponse(responseText || "No response received.");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#90D2E4" }}
      headerImage={<Header />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{petName}'s Profile 🎮</ThemedText>
      </ThemedView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={`ask ${petName} a question`}
          placeholderTextColor="#bbb"
          value={question}
          onChangeText={setQuestion}
        />
        <Pressable style={styles.askButton} onPress={askLilPengo}>
          <Text style={styles.buttonText}>🗨️ Ask</Text>
        </Pressable>
      </View>

      <View style={styles.responseContainer}>
        <Text style={styles.responseHeader}>Response from {petName}:</Text>
        <Text style={styles.responseText}>{response}</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>
          <Text style={styles.boldText}>🏷️ Name:</Text> {petName}
        </Text>
        <Text style={styles.statText}>
          <Text style={styles.boldText}>📢 Status:</Text> Penguin’s gonna
          penguin
        </Text>
        <Text style={styles.statText}>
          <Text style={styles.boldText}>⏳ Age:</Text> 3 days
        </Text>
        <Text style={styles.statText}>
          <Text style={styles.boldText}>🍽️ Favourite food:</Text> 🍦
        </Text>
      </View>

      <EditPet />
      <DeleteAccount />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 16,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    padding: 10,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
    color: "#fff",
    backgroundColor: "#444",
  },
  askButton: {
    backgroundColor: "#ffcc00",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
  },
  responseContainer: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#555",
  },

  responseHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffcc00",
    marginBottom: 6,
  },

  responseText: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 22,
  },
  statsContainer: {
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#666",
  },
  statText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#fff",
  },
  boldText: {
    fontWeight: "bold",
    color: "#ffcc00",
  },
});
