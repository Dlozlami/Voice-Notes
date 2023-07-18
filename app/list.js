import { StyleSheet, Text, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import ListItem from '../components/listItem';


export default function list(){

  return (
    <ImageBackground
      source={require('../assets/images/timerBG.jpg')}
      style={{width: '100%', height: '100%'}}
    >
    <SafeAreaView style={styles.container}>
        <ListItem/>
    </SafeAreaView>

    </ImageBackground>
  );

}


const styles = StyleSheet.create({})