import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Map from './Map';
import { PermissionsAndroid } from 'react-native';

const apiUrl = 'http://192.168.56.2:5000/api/cluster';

export default function App() {
  const [loadingFirmsData, setLoadingFirmsData] = useState(true);
  const [firmsData, setFirmsData] = useState([]);
  const [lati, setLati] = useState(53.5461);
  const [lngi, setLngi] = useState(-113.4937);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location for geolocation features.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        // You can now call navigator.geolocation.getCurrentPosition
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    console.log('Started Loading Data');
    setLoadingFirmsData(true);
    requestLocationPermission().then(() => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setLoadingFirmsData(false);
          setFirmsData(data);
          console.log('Finished Loading Data');
          console.log(data.length + ' points loaded');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{loadingFirmsData ? 'Data is loading...' : 'Data is loaded'}</Text>
      <StatusBar style='auto' />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: 'darkblue',
          padding: 10,
        }}
      >
        <Text style={{ fontWeight: 'bold', color: 'white' }}>This App Uses FIRMS by </Text>
        <Image style={{ width: 120, height: 100 }} source={require('./assets/NASA.png')} />
      </View>
      {!loadingFirmsData && firmsData && <Map lat={lati} lng={lngi} fireData={firmsData} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
