import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const QuranVerseScreen = ({ navigation }) => {
  return (
    <View>
      {/* Navigation bar */}
      {/* Add your navigation bar here */}
      <Text>quraan</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
      </TouchableOpacity>
    </View>
  );
};

export default QuranVerseScreen;
