import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PlayAudio from "./playAudio";
import UpdateAudio from "./updateAudio";
import DeleteAudio from "./deleteAudio";


export default function ListItem() {
  
  return (
    <View style={styles.container}>
      <PlayAudio />
      <View style={styles.details}>
        <Text style={styles.text}>Voice note</Text>
        <Text>00:00:00</Text>
      </View>

      <UpdateAudio />
      <DeleteAudio />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    alignItems: "flex-start",
  },
});
