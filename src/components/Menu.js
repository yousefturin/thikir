import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your icon library

const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('الأذكار المفضلة')}
      >
        <Text style={styles.buttonText}>الأذكار المفضلة</Text>
        <Icon name="bookmark" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('الاعدادات')}
      >
        <Text style={styles.buttonText}>الاعدادات</Text>
        <Icon name="cog" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('عن البرنامج')}
      >
        <Text style={styles.buttonText}>عن البرنامج</Text>
        <Icon name="info-circle" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white', // Background of the entire screen
    paddingTop: 40,
  },
  button: {
    width: '80%', // 80% of screen width
    backgroundColor: '#023B4F', // Background of the button
    padding: 30,
    borderRadius: 10, // Adjust the border radius as needed
    marginVertical: 10,
    flexDirection: 'row', // Arrange text and icon side by side
    justifyContent:'flex-end', // Space between text and icon
    alignItems: 'center', // Align text and icon vertically
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 28,
    fontWeight:'700',
    textAlign: 'center',
  },
  icon: {
    marginLeft: 10, // Add some spacing between text and icon
  },
});

export default Menu;
