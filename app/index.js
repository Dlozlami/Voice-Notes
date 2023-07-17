import React, { useState } from "react";
import { StyleSheet, Dimensions , View } from "react-native";
import Timer from "../components/timer";
import Recorder from "../components/recorder";


export default function Page() {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audio,setAudio] = useState();
  const [lastRecordingURI, setLastRecordingURI] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.halfScreen}>
      <Timer recording={recording} setDuration={setDuration} />
      <Recorder audio={audio} setAudio={setAudio} setRecording={setRecording} setLastRecordingURI={setLastRecordingURI}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  halfScreen: {
    justifyContent: "flex-start",
    backgroundColor: "#FFF", 
    height: Dimensions.get("window").height / 2,
  },
});
