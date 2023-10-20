import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import * as Location from 'expo-location';
import { DeviceMotion } from 'expo-sensors';

const QiblaScreen = () => {
  const [location, setLocation] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [compassRotation, setCompassRotation] = useState(0);

  useEffect(() => {
    getLocation();
    startCompass();
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

      setLocation({ latitude, longitude });
      fetchQiblaDirection(latitude, longitude);
    } catch (error) {
      console.error('Error getting location', error);
    }
  };

  const fetchQiblaDirection = (latitude, longitude) => {
    const apiUrl = `http://api.aladhan.com/v1/qibla/${latitude}/${longitude}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setQiblaDirection(data.data.direction);
      })
      .catch((error) => {
        console.error('Error fetching Qibla direction:', error);
      });
  };

  const startCompass = async () => {
    DeviceMotion.addListener((data) => {
      if (data.rotation) {
        const { alpha } = data.rotation;
        updateCompassRotation(alpha || 0);
      }
    });
  };

  const updateCompassRotation = (alpha) => {
    if (qiblaDirection !== null) {
      // Calculate the new rotation of the arrow based on Qibla Direction and Compass Rotation.
      const newRotation = qiblaDirection - alpha; // Note the subtraction here.
      setCompassRotation(newRotation);
    }
  };

  const renderNumbers = () => {
    const numbers = [];
    for (let i = 0; i < 360; i += 15) {
      numbers.push(
        <Text
          key={i}
          style={{
            position: 'absolute',
            top: Dimensions.get('window').height / 2 - 280,
            left: Dimensions.get('window').width / 2 - 85,
            transform: [{ rotate: `${i}deg` },
            { translateY: -120 }]
          }}
        >
          {i}
        </Text>
      );
    }
    return numbers;
  };

  return (
    <View style={styles.container}>
      {qiblaDirection !== null && (
        <Text>
          Qibla Direction: {qiblaDirection} degrees
        </Text>
      )}
      <View style={styles.compassContainer}>
        <Text style={styles.compassText}>
          Compass Rotation: {Math.round(compassRotation)} degrees
        </Text>
        <View style={styles.compass}>
          {renderNumbers()}
          <View style={[styles.triangle, { transform: [{ rotate: `rotate(${compassRotation}deg)` }] }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  compass: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowContainer: {
    justifyContent: 'flex-end', // Adjust the positioning
    alignItems: 'center',
    width: 3,
    height: 120,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    position: "absolute",
    top: 65, // This positions the triangle at the top
    left: '50%', // This centers it horizontally
    marginLeft: -9, // This adjusts the position to center it properly
  },
  compassText: {
    fontSize: 18,
  },
});

export default QiblaScreen;
