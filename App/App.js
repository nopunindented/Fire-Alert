import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { fetchNASAData } from './util/firmsApi';
import Map from './Map';
import { PermissionsAndroid } from 'react-native';

export default function App() {
        const [loadingFirmsData, setLoadingFirmsData] = useState(true);
        const [headers, setHeaders] = useState([]);
        const [firmsData, setFirmsData] = useState([]);
        const [lati, setLati] = useState(53.5461);
        const [lngi, setLngi] = useState(-113.4937);

    const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });

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


     async function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              setLati(position.coords.latitude);
              setLngi(position.coords.longitude);
            },
            error => console.error(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        } else {
          console.error("Geolocation is not supported by this device.");
        }
     };

    useEffect(() => {
        console.log("Started Loading Data")
        setLoadingFirmsData(true)
        requestLocationPermission().then(
        fetchNASAData(lat=lati, lng=lngi).then(data => {
            setLoadingFirmsData(false);
            setHeaders(data[0]);
            setFirmsData(data[1]);
            console.log("Finished Loading Data")
            console.log(data[1].length + " points loaded")
        })
          .catch(error => {
            console.error('Error:', error);
          }));
      }, []);


  return (
    <View style={styles.container}>
      <Text>{loadingFirmsData ? ("data is loading...") : ("data is loaded")}</Text>
      <StatusBar style="auto" />
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'darkblue', padding: 10 }}>
        <Text style={{ fontWeight: 'bold', color: 'white' }}>This App Uses FIRMS by </Text>
        <Image
          style={{ width: 120, height: 100 }}
          source={require('./assets/NASA.png')}
        />
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
  }
});
