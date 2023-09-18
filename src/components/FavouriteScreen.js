import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const FavouriteScreen = ({ navigation }) => {
  return (
    <View>
      {/* Navigation bar */}
      {/* Add your navigation bar here */}
      <Text>Fav Athkar Page</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
      </TouchableOpacity>
    </View>
  );
};

export default FavouriteScreen;
