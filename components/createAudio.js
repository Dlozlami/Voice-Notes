import { View, Text } from 'react-native';
import React from 'react';
import axios from 'axios';

// This files doesn't record audio it creates a database entry for a new file

export default function CreateAudio(lastRecordingURI,recordingDetails){

    const apiEndpoint = 'http://10.255.66.152:8080/api/recordings/';
    const soundObject = new Audio.Sound();

    async function makeSound() {
        try {
          await soundObject.loadAsync({ uri: lastRecordingURI });
        } catch (error) {
          console.error('Failed to make sound object!', error);
        }
      }

    
    return;
}
