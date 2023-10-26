import { StyleSheet, Text, ImageBackground, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import ListItem from "../components/listItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function list() {
  let recordings =[]

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("voice-notes-db");
      if (value !== null) {
        // value previously stored
        recordings = value;
      }
    } catch (e) {
      // error reading value
      console.log("Error getting data in async: ", e);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <ImageBackground
      source={require("../assets/images/timerBG.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView style={styles.container}>
        <ListItem />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
