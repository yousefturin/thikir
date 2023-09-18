import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const AboutScreen = ({ navigation }) => {
  return (
    <View>
      {/* Navigation bar */}
      {/* Add your navigation bar here */}
      <Text>About Page</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;
