import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome5 } from '@expo/vector-icons';

export default function PlayAudio({ audioURL }) {
  const [sound, setSound] = useState(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = async () => {
    try {
      if (sound._loaded) {
        await sound.replayAsync();
      } else {
        await sound.loadAsync({ uri: audioURL });
        await sound.playAsync();
      }
      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to play the audio', error);
    }
  };

  const stopAudio = async () => {
    try {
      await sound.stopAsync();
      setIsPlaying(false);
    } catch (error) {
      console.error('Failed to stop the audio', error);
    }
  };

  useEffect(() => {
    const playbackStatusSubscription = sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        // Audio has finished playing
        setIsPlaying(false);
      }
    });

    return () => {
      sound.unloadAsync();
      playbackStatusSubscription.remove();
    };
  }, [sound]);

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
