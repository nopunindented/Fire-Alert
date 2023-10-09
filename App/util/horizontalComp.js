import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'; // Import Image from 'react-native'
import { fetchNASAData } from './util/firmsApi';
import Map from './Map';
import { PermissionsAndroid } from 'react-native';


function HorizontalBar() {
  return (
    <View style={styles.horizontalBar}>
      <Text style={styles.barText}>Live Data From FIRMS</Text>
      <Image
        source={require('../assets/NASA.png')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    justifyContent: 'center',
  },
  barText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
});
