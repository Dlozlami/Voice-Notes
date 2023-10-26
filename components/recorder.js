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
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("voice-notes-db", value);
    } catch (e) {
      // saving error
      console.log("Error storing data in async: ", e);
    }
  };

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
    await audio.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = audio.getURI();
    const duration = audio.
    setLastRecordingURI(uri);

    console.log("Recording stopped and stored at", uri);

    setIsModalVisible(true); // Open the modal after stopping the recording
  }

  function handleSave() {
    setFilename(filename); // Save the filename using setFilename
    setIsModalVisible(false); // Close the modal
    setFilenameInternal(""); // Reset the internal filename state
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
