import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import fireSrc from "./assets/fire.png"


export default function Map({ lat, lng, fireData }) {
    return (
        <View style={styles.body}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 20,
                        longitudeDelta: 20,
                    }}
                    >

                    {fireData && fireData.map((point, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: (parseFloat(point[0])),
                            longitude: (parseFloat(point[1]))
                            }}
                        pinColor="red"
                        opacity={0.8}
                        >
                        <Image source={fireSrc} style={{ width: 32, height: 32 }} />
                    </Marker>
                    ))}
                    <Marker
                        coordinate={{ latitude: lat, longitude: lng }}
                        pinColor="blue"
                    />
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
