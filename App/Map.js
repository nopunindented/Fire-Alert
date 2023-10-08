import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function Map({ lat, lng, fireData }) {
    return (
        <View style={styles.body}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 40,
                        longitudeDelta: 80,
                    }}
                    >
                    <Marker
                        coordinate={{ latitude: lat, longitude: lng }}
                        pinColor="blue"
                    />
                    {fireData.map((point, index) => (
                                <Marker
                                  key={index}
                                  coordinate={{
                                    latitude: parseFloat(point[0]),
                                    longitude: parseFloat(point[1]),
                                  }}
                                  pinColor="red"
                                />
                    ))}
                </MapView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    text: {
        fontSize: 40,
        margin: 10,
    },
    mapContainer: {
        flex: 1,
        width: '100%',
        borderColor: 'red', // Border color (you can change this)
        borderWidth: 2, // Border width (you can change this)
    },
    map: {
        flex: 1,
        width: '100%',
    },
});
