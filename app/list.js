import React, { useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import ListItem from "../components/listItem";
import { getAllRecords } from "../components/recordsDB";


export default function List() {
  const [listOfRecordings, setListOfRecordings] = useState([]);

  const getData = async () => {
    try {
      // Retrieve the list of recordings from the database
      getAllRecords((recordings) => {
        setListOfRecordings(recordings);
      });
      console.log("list.js line 16 listOfRecordings: ", listOfRecordings);

    } catch (e) {
      // Error reading value
      console.log("Error getting recording data in async: ", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/timerBG.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView style={styles.container}>
        {listOfRecordings.map((record) => (
          <ListItem key={record.id} record={record} />
        ))}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:30
  },
});
