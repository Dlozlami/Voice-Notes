import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { storeData } from "./recordsDB";

export default function Recorder({
  recording,
  setRecording,
  audio,
  setAudio,
  setFilename,
  setLastRecordingURI,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filename, setFilenameInternal] = useState("");
  const [duration, setDuration] = useState(0);
  const [audioURL, setAudioURL] = useState("");

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(true);
      setAudio(recording);

      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(false);
    const recordingStatus = await audio.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = audio.getURI();
    setAudioURL(uri);
    setLastRecordingURI(uri);
    setDuration(recordingStatus.durationMillis);
    console.log("Recording stopped and stored at", uri);
    console.log("Duration", recordingStatus.durationMillis);
    setIsModalVisible(true); // Open the modal after stopping the recording
  }

  function handleSave() {
    storeData({ url: audioURL, title: filename, duration: duration });
    console.log("Saving....", {
      url: audioURL,
      title: filename,
      duration: duration,
    });
    setFilename(filename); // Save the filename using setFilename
    setIsModalVisible(false); // Close the modal
    setFilenameInternal(""); // Reset the internal filename state
  }

  function formatDuration(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);

    const remainingMilliseconds = Math.floor(
      milliseconds - (seconds * 1000) / 10
    );

    // Use String.padStart to add leading zeros as needed
    const formattedDuration = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${remainingMilliseconds.toString().padStart(2, "0")}`;

    return formattedDuration;
  }

  return (
    <View id="circle1" style={styles.circle1}>
      <View id="circle2" style={styles.circle2}>
        <View id="circle3" style={styles.circle3}>
          <View style={styles.container}>
            <Pressable onPress={recording ? stopRecording : startRecording}>
              <Text>
                {recording ? (
                  <Ionicons
                    name="stop-circle-outline"
                    size={72}
                    color="white"
                  />
                ) : (
                  <Ionicons name="mic" size={72} color="white" />
                )}
              </Text>
            </Pressable>

            <Modal visible={isModalVisible} animationType="slide" transparent>
              <View style={styles.modalContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter file name"
                  value={filename}
                  onChangeText={(text) => setFilenameInternal(text)}
                />
                <Pressable style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#e63f59",
    borderRadius: 1000,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#e63f59",
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  circle1: {
    borderRadius: 1000,
    padding: 15,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  circle2: {
    borderRadius: 1000,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  circle3: {
    borderRadius: 1000,
    padding: 5,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
});
