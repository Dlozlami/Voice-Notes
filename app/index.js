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
      <View style={styles.topScreen}>
      <Timer recording={recording} setDuration={setDuration} />
      </View>
      <View style={styles.bottomScreen}>
      <Recorder recording={recording} audio={audio} setAudio={setAudio} setRecording={setRecording} setLastRecordingURI={setLastRecordingURI}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topScreen: {
    justifyContent: "flex-start",
    backgroundColor: "#FFF", 
    height: Dimensions.get("window").height / 2,
  },
  bottomScreen: {
    justifyContent: "flex-end",
    backgroundColor: "#eeeee", 
    height: Dimensions.get("window").height / 2,
  },
});
