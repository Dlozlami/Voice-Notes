import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

export default function DeleteAudio(){
  
  const apiEndpoint = 'http://10.255.66.152:8080/api/recordings/';

  return (
    <View>
      <MaterialIcons name="delete-forever" size={24} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({})