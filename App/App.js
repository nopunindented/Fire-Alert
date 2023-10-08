import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchNASAData } from './util/firmsApi';
import Map from './Map';

export default function App() {
        const [loadingFirmsData, setLoadingFirmsData] = useState(true);
        const [headers, setHeaders] = useState([]);
        const [firmsData, setFirmsData] = useState([]);
        const [lati, setLati] = useState(53.5461);
        const [lngi, setLngi] = useState(-113.4937);

    const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });

      useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              setLati(position.coords.latitude);
              setLongi(position.coords.longitude);
            },
            error => console.error(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        } else {
          console.error("Geolocation is not supported by this device.");
        }
      }, []);

    useEffect(() => {
        console.log("Started Loading Data")
        setLoadingFirmsData(true)
        fetchNASAData(lat=lati, lng=lngi).then(data => {
            setLoadingFirmsData(false);
            setHeaders(data[0]);
            setFirmsData(data[1]);
            console.log("Finished Loading Data")
            console.log(data[1].length + " points loaded")
})
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);


  return (
    <View style={styles.container}>
      <Text>This app uses FIRMS! {loadingFirmsData ? ("data is loading...") : ("data is loaded")}</Text>
      <StatusBar style="auto" />
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
