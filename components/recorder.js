import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export default function Recorder({
  recording,
  setRecording,
  audio,
  setAudio,
  setFilename,
  setLastRecordingURI
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filename, setFilenameInternal] = useState('');
  const circle1Ref = useRef();
  const circle2Ref = useRef();
  const circle3Ref = useRef();

  useEffect(() => {
    if (recording) {
      // Change border styles to #e63f59 when recording starts
      circle1Ref.current.style.border = '1px #e63f59 solid';
      circle2Ref.current.style.border = '1px #e63f59 solid';
      circle3Ref.current.style.border = '1px #e63f59 solid';
    } else {
      // Reset border styles to #f2f2f2 when recording stops
      circle1Ref.current.style.border = '1px #f2f2f2 solid';
      circle2Ref.current.style.border = '1px #f2f2f2 solid';
      circle3Ref.current.style.border = '1px #f2f2f2 solid';
    }
  }, [recording]);

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(true);
      setAudio(recording);

      // Change border styles to #e63f59
      circle1Ref.current.style.border = '1px #e63f59 solid';
      circle2Ref.current.style.border = '1px #e63f59 solid';
      circle3Ref.current.style.border = '1px #e63f59 solid';

      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(false);
    await audio.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = audio.getURI();
    setLastRecordingURI(uri);

    // Reset border styles to #f2f2f2
    circle1Ref.current.style.border = '1px #f2f2f2 solid';
    circle2Ref.current.style.border = '1px #f2f2f2 solid';
    circle3Ref.current.style.border = '1px #f2f2f2 solid';

    console.log('Recording stopped and stored at', uri);

    setIsModalVisible(true); // Open the modal after stopping the recording
  }

  function handleSave() {
    setFilename(filename); // Save the filename using setFilename
    setIsModalVisible(false); // Close the modal
    setFilenameInternal(''); // Reset the internal filename state
  }

  return (
    <View id="circle1" ref={circle1Ref} style={styles.circle1}>
      <View id="circle2" ref={circle2Ref} style={styles.circle2}>
        <View id="circle3" ref={circle3Ref} style={styles.circle3}>
          <View style={styles.container}>
            <Pressable onPress={recording ? stopRecording : startRecording}>
              <Text>
                {recording ? (
                  <Ionicons name="stop-circle-outline" size={72} color="white" />
                ) : (
                  <Ionicons name="mic" size={72} color="white" />
                )}
              </Text>
            </Pressable>

            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#e63f59',
    borderRadius: 1000,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#e63f59',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  circle1: {
    borderRadius: '50%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle2: {
    borderRadius: '50%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle3: {
    borderRadius: '50%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
