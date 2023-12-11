// Det her screen skal bruges til funktionaliteten hvor brugerne skal kunne finde virksomhederne fra platformen på kortet.
// Det er ikke udviklet færdigt, men alle virksomhedere skal registreres med en adresse så de kan findes her.

// Importerer nødvendige komponenter og biblioteker fra React Native-pakken
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Accuracy } from 'expo-location';
import * as React from 'react';
import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// MapScreen komponenten, der viser kortet og håndterer lokationsdata og markører
const MapScreen = ({}) => {
  // Her instantieres alle anvendte statevariabler
  const [hasLocationPermission, setLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [userMarkerCoordinates, setUserMarkerCoordinates] = useState([]);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Funktion til at anmode om tilladelse til at få adgang til enhedens lokation
  const getLocationPermission = async () => {
    await Location.requestForegroundPermissionsAsync().then((item) => {
      setLocationPermission(item.granted);
    });
  };

  // Bruges til at opdatere brugerens aktuelle lokation
  const updateLocation = async () => {
    await Location.getCurrentPositionAsync({ accuracy: Accuracy.Balanced }).then((item) => {
      setCurrentLocation(item.coords);
    });
  };

  // Funktion til at håndtere langt tryk på kortet og tilføje markører
  const handleLongPress = (event) => {
    const coordinate = event.nativeEvent.coordinate;
    setUserMarkerCoordinates((oldArray) => [...oldArray, coordinate]);
  };

  // Funktion til at håndtere valg af markør og vise tilsvarende adresseinformation
  const handleSelectMarker = async (coordinate) => {
    setSelectedCoordinate(coordinate);
    await Location.reverseGeocodeAsync(coordinate).then((data) => {
      setSelectedAddress(data);
    });
  };

  // Funktion til at lukke info-boksen med markørinformation
  const closeInfoBox = () => setSelectedCoordinate(null) && setSelectedAddress(null);

  // Renderer komponenten og viser forskelligt indhold baseret på lokationstilladelse og data
  {
    return (
      <SafeAreaView style={styles.container}>
        {/* Viser brugerens aktuelle lokation og opdateringsknap */}
        <RenderCurrentLocation props={{ hasLocationPermission: hasLocationPermission, currentLocation: currentLocation }} />
        {/* Viser kortet og håndterer markører og info-boks */}
        <MapView
          provider="google"
          style={styles.map}
          showsUserLocation
          onLongPress={handleLongPress}>
          {/* Forskellige hardcodede markører på kortet */}
          <Marker coordinate={{ latitude: 55.67786858377586, longitude: 12.534665084911873 }} title="Buka" description="Bageri" />
          {/* Viser brugerens tilføjede markører */}
          {userMarkerCoordinates.map((coordinate, index) => (
            <Marker coordinate={coordinate} key={index.toString()} onPress={() => handleSelectMarker(coordinate)} />
          ))}
        </MapView>
        {/* Viser info-boksen med markørinformation */}
        {selectedCoordinate && selectedAddress && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              {selectedCoordinate.latitude}, {selectedCoordinate.longitude}
            </Text>
            <Text style={styles.infoText}>
              Name: {selectedAddress[0].name}, Region: {selectedAddress[0].region}
            </Text>
            <Button title="Close" onPress={closeInfoBox} />
          </View>
        )}
      </SafeAreaView>
    );
  }
};

// Funktion til at vise brugerens aktuelle lokation og håndtere manglende lokationstilladelse
const RenderCurrentLocation = (props) => {
  if (props.hasLocationPermission === null) {
    return null;
  }
  if (props.hasLocationPermission === false) {
    return <Text>No location access. Go to settings to change</Text>;
  }

};

// Lokal styling til brug i komponenten
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  map: { flex: 1 },
  infoBox: {
    height: 200,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: 15,
  },
});

// Eksporterer MapScreen komponenten som standard eksport
export default MapScreen;
