import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { deleteRecord } from "./recordsDB";

export default function DeleteAudio({ recordID }) {
  return (
    <TouchableOpacity onPress={() => deleteRecord(recordID)}>
      <MaterialIcons name="delete-forever" size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
