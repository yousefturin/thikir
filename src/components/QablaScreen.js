import React, { useState, useEffect } from "react";
import { Image, View, Text, Dimensions, StyleSheet } from "react-native";
import { Magnetometer} from "expo-sensors";
import * as Location from 'expo-location';


const { height, width } = Dimensions.get("window");

const QiblaScreen = () => {
  const [location, setLocation] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(null);

  const [subscription, setSubscription] = useState(null);
  const [magnetometerData, setMagnetometerData] = useState([]);
  const [movingAverage, setMovingAverage] = useState(0);

  
  const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };
  
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
      calculateQiblaDirection(latitude, longitude);
    } catch (error) {
      console.error('Error getting location', error);
    }
  };
  
  const calculateQiblaDirection = (currentLatitude, currentLongitude) => {
    const destLatitude = 21.4225; // Destination latitude
    const destLongitude = 39.8262; // Destination longitude
  
    currentLatitude = degreesToRadians(currentLatitude);
    currentLongitude = degreesToRadians(currentLongitude);
    const destLat = degreesToRadians(destLatitude);
    const destLon = degreesToRadians(destLongitude);
  
    const y = Math.sin(destLon - currentLongitude);
    const x =
      Math.cos(currentLatitude) * Math.sin(destLat) -
      Math.sin(currentLatitude) * Math.cos(destLat) * Math.cos(destLon - currentLongitude);
  
    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180) / Math.PI;
    bearing = (bearing + 360) % 360; // Ensure the bearing is in the range [0, 360]
  
    setQiblaDirection(bearing);
    console.log(`The direction to your destination is ${bearing} degrees`);
  };

  useEffect(() => {
    getLocation();
    toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      subscripe();
    }
  };

  const subscripe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometerData((prevData) => {
          // Keep only the last 10 data points
          const newData = [...prevData, angle(data)];
          if (newData.length > 10) {
            newData.shift();
          }
          // Calculate the moving average
          const avg = newData.reduce((acc, val) => acc + val, 0) / newData.length;
          setMovingAverage(avg);
          return newData;
        });
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const angle = (magnetometer) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  const degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  return (
<View style={styles.container}>
  {qiblaDirection !== null ? (
    <Text style={styles.textDirection}> اتجاه القبلة : {Math.round(qiblaDirection)}</Text>
  ) : null}
  <View style={styles.degreeContainer}>
  <Image
      x="0"
      y="0"
      source={require("../../assets/compass.png")}
      style={[
        styles.compassImage,
        {
          transform: [{ rotate: 360 - Math.round(movingAverage) + "deg" }],
        },
      ]}
    />
    {qiblaDirection !== null ? (
    <Image
      x="0"
      y="0"
      source={require("../../assets/compassQablePointer.png")}
      style={[
        styles.compassImageRed,
        {
          transform: 
            [{ rotate: 90 + qiblaDirection - Math.round(movingAverage) + "deg" }]
          
        },
        
      ]}
    />
    ) : null}
    <Text style={styles.degreeText}>
      {degree(Math.round(movingAverage))}°
    </Text>
  </View>
      
  <View style={styles.triangleContainer}>
    <View style={styles.triangle}></View>
  </View>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDirection:{
    color:"#656565",
    position:"absolute",
    top:"10%",
    fontFamily:"AmiriFont",
    fontSize:30
  },
  degreeContainer: {
    justifyContent:"center",
    alignItems: 'center',
    position: 'relative',
  },
  degreeText: {
    color: '#fff',
    fontSize: height / 27,
    textAlign: 'center',
  },
  compassImage: {
    position: "absolute",
    height: width - 80,
    resizeMode: 'contain',
  },
  compassImageRed: {
    position: "absolute",
    height: width - 80,
    resizeMode: 'contain',
    width:350,
    height:350,
  },
  triangleContainer: {
    position: 'absolute',
    top: "24.4%",
    left: 0,
    width: width,
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red', // Change this to your desired color
    borderLeftColor: 'transparent',
    position: 'absolute', // Added position absolute
  }
});
export default QiblaScreen;