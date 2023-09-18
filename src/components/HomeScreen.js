import React from 'react';
import { View, Text, TouchableOpacity, FlatList,StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getItems} from './db/GetData'


const HomeScreen = ({ navigation }) => {

  const items = getItems();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('GenericPage', {
                name: item.name,
                item: item, 
              })
            }
          >
          <View style={styles.iconWraper}>
            <Icon name="bookmark" size={24} color="white" style={styles.icon} />
          </View>
          <View style={styles.nameWraper}>
            <Text style={styles.buttonText}>{item.name}</Text>
          </View>
          <View style={styles.imageWraper}>
            {/* Image component */}
            <Image
              source={require('../../assets/LeftDecorationForButton.png')}
              style={styles.image}
            />
          </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#E2F0F4",
  },
  iconWraper:{
    width:'10%',
  },
  nameWraper:{
    width:'75%',
  },
  imageWraper:{
    width:'9%',
  },
  button: {
    backgroundColor: '#023B4F', // Background of the button
    borderRadius: 10, // Adjust the border radius as needed
    marginVertical: 10,
    flexDirection: 'row', // Reverse the direction to place the image on the right
    alignItems: 'center', // Align text and image vertically
    justifyContent:'space-evenly'
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'right',
    marginLeft:30,
  },
  image: {
    width: 44, // Set the width of the image
    height: 55, // Set the height of the image
    borderBottomRightRadius: 10,
    borderTopRightRadius:10, // Adjust the border radius as needed
  },
  icon: {
    marginLeft:20
  },
});


export default HomeScreen;
