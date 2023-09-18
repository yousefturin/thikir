import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SettingScreen = ({ navigation }) => {
  return (
    <View>
      {/* Navigation bar */}
      {/* Add your navigation bar here */}
      <Text>Setting Page</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;
