import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchNASAData } from './util/firmsApi';

export default function App() {
    useEffect(() => {
        // Call the function to fetch NASA data when the component mounts
        fetchNASAData()
          .then(data => {
            // Handle the data as needed (e.g., update state or display it)
            console.log('Response data:', data);
            setDa(data);
          })
          .catch(error => {
            // Handle errors here (e.g., show an error message)
            console.error('Error:', error);
            setDa("failed")
          });
      }, []);

      const (da, setDa) = useState("null" as any);
      const da2 = "boom"

  return (
    <View style={styles.container}>
      <Text>This app uses FIRMS! ??A {da2}</Text>
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
  },
  map-container {
    width: '47.5vh',
    height: '74vh'.
    top: '21vh',
    left: '54.5vw',
    border-radius: '6px'
  }
});
