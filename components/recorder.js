import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export default function Recorder({ recording,setRecording,audio,setAudio,setLastRecordingURI }) {

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(true);
      setAudio(recording);
      
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
    console.log('Recording stopped and stored at', uri);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={recording ? stopRecording : startRecording}>
        <Text>
          {recording ? (
            <Ionicons name="stop-circle-outline" size={48} color="white" />
          ) : (
            <Ionicons name="mic" size={72} color="white" />
          )}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
