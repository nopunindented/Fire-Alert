import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchNASAData } from './util/firmsApi';

export default function App() {
    useEffect(() => {
        setLoadingFirmsData(true)
        fetchNASAData()
          .then(data => {
            setLoadingFirmsData(false);
            setHeaders(data[0]);
            setFirmsData(data[1]);
})
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);

        const [loadingFirmsData, setLoadingFirmsData] = useState(true);
        const [headers, setHeaders] = useState([]);
        const [firmsData, setFirmsData] = useState([]);
        const current = new Date();

  return (
    <View style={styles.container}>
      <Text>This app uses FIRMS! {loadingFirmsData ? ("data is loading...") : ("data is loaded!!!")}</Text>
      <Text>HELLO!{'\n'} {current.getFullYear()}/{current.getMonth()+1}/{current.getDate()} {loadingFirmsData ? ("") : (firmsData.slice(0,10).toString())} </Text>
      <StatusBar style="auto" />
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
