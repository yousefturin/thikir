// GenericPageNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GenericPage from './GenericPage';

const Stack = createStackNavigator();

const GenericPageNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="GenericPage">
      <Stack.Screen
        name="GenericPage"
        component={GenericPage}
        options={{ headerShown: false }} // You can configure header options here
      />
    </Stack.Navigator>
  );
};

export default GenericPageNavigator;
