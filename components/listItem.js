import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PlayAudio from "./playAudio";
import UpdateAudio from "./updateAudio";
import DeleteAudio from "./deleteAudio";

export default function ListItem({ record }) {
  return (
    <View style={styles.container}>
      <PlayAudio audioURL={record.url}/>
      <View style={styles.details}>
        <Text style={styles.text}>{record.title}</Text>
        <Text>{record.duration}</Text>
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
