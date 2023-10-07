import Geocoder from 'react-native-geocoding';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import GOOGLE_MAPS_KEY from '@env';

Geocoder.init();

export default function GoogleMaps({ data }) {
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKeyValue = await GOOGLE_MAPS_KEY;
        setApiKey(apiKeyValue);
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (center) {
      setLoading(false);
    } else {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 20000,
      })
        .then((location) => {
          const { latitude, longitude } = location;
          setCenter({ latitude, longitude });
        })
        .catch((error) => {
          console.error('Error getting location:', error);
          setLoading(false);
        });
    }
  }, []);

  if (loading || !center || !apiKey) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{ ...center, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        provider={MapView.PROVIDER_GOOGLE}
        apiKey={apiKey}
      >
        <Marker coordinate={center} />
        {data &&
          data.map((item, index) => {
              const latitude = item[0];
              const longitude = item[1];
              return <Marker key={index} coordinate={{ latitude, longitude }} />;
          })}
        </MapView>
      </MapView>
    </View>
  );
}