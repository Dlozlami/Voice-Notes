import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

export default function UpdateAudio(){

  const apiEndpoint = 'http://10.255.66.152:8080/api/recordings/';
  
  return (
    <View>
      <FontAwesome name="edit" size={24} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({})