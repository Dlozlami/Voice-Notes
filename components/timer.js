import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function Timer({ recording, setDuration }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let intervalId;

    if (recording) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 10);
    } else {
      clearInterval(intervalId);
      setTimer(0); // Reset timer to 0
      setDuration(timer);
    }

    return () => clearInterval(intervalId);
  }, [recording, setDuration, timer]);

  function formatTime(time) {
    const minutes = Math.floor(time / 6000)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((time / 100) % 60)
      .toString()
      .padStart(2, '0');
    const milliseconds = (time % 100).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <ImageBackground
      source={require('../assets/images/timerBG.jpg')}
      style={{width: '100%', height: '100%'}}
    >
        <View style={styles.container}>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
        </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  timer: {
    color: '#FFF', // White text color
    fontSize: 48, // Adjust the font size as needed
  },
});
