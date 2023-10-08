import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchNASAData } from './util/firmsApi';
import Map from './Map';

export default function App() {
    useEffect(() => {
        setLoadingFirmsData(true)
        fetchNASAData()
          .then(data => {
            setLoadingFirmsData(false);
            setHeaders(data[0]);
            setFirmsData(data[1]);
            console.log("Finished Loading Data")
            console.log(data[1].length)
})
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);

        const [loadingFirmsData, setLoadingFirmsData] = useState(true);
        const [headers, setHeaders] = useState([]);
        const [firmsData, setFirmsData] = useState([]);

  return (
    <View style={styles.container}>
      <Text>This app uses FIRMS! {loadingFirmsData ? ("data is loading...") : ("data is loaded")}</Text>
      <StatusBar style="auto" />
      {!loadingFirmsData && <Map lat={1} lng={1} data={[["1","2"]]} />}
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
