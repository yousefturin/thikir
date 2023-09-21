import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const NavBar = ({ navigation, route }) => {
  return (
    <View >
      {/* Left Icon (Menu Icon) */}
      <TouchableOpacity onPress={() => navigation.navigate('الفائمة')} >
        <Text >Menu</Text>
      </TouchableOpacity>

      {/* Center Logo */}
      {/* Add your logo here */}

      {/* Right Icon (Back Icon) */}
      {route.name !== 'الأذكار' && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text >Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NavBar;
