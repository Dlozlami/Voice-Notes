import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome5 } from '@expo/vector-icons';

export default function PlayAudio({ soundObject }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = async () => {
    try {
      await soundObject.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to play the audio', error);
    }
  };

  const stopAudio = async () => {
    try {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      setIsPlaying(false);
    } catch (error) {
      console.error('Failed to stop the audio', error);
    }
  };

  return (
    <View>
      {isPlaying ? (
        <Pressable onPress={stopAudio}>
          <FontAwesome5 name="stop-circle" size={24} color="black" />
        </Pressable>
      ) : (
        <Pressable onPress={playAudio}>
          <FontAwesome5 name="play-circle" size={24} color="black" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
