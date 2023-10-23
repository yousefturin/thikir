import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

const NearestMesjedScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestMosques, setNearestMosques] = useState([]);

  useEffect(() => {
    // Get user's location and nearest mosques when the component mounts
    getLocation();
  }, []);
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
  
      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;
      setUserLocation({ latitude, longitude });

      // Fetch the nearest mosques based on user's location
      fetchNearestMosques(latitude, longitude);
    } catch (error) {
      console.error('Error getting location', error);
    }
    
  };


  const fetchNearestMosques = (latitude, longitude) => {
    // Replace 'YOUR_API_KEY' with your Google Places API key
    const apiKey = 'YOUR_API_KEY';
    const radius = 10000; // You can adjust the radius as needed (in meters)
    // Create a URL for the Google Places API to fetch mosques
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=mosque&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          // Extract and set the nearest mosques to state
          setNearestMosques(data.results);
        }
      })
      .catch((error) => {
        console.error("Error fetching mosque data", error);
      });
  };

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          style={styles.map}
          region={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {nearestMosques.map((mosque) => (
            <Marker
              key={mosque.place_id}
              coordinate={{
                latitude: mosque.geometry.location.lat,
                longitude: mosque.geometry.location.lng,
              }}
              title={mosque.name}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default NearestMesjedScreen;