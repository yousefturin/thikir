import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getItems } from './db/GetData';

const HomeScreen = ({ navigation }) => {
  const items = getItems();

  const renderBorderRadius = (index) => {
    if (index === 0) {
      // First item, apply top-left and top-right borderRadius
      return {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      };
    } else if (index === items.length - 1) {
      // Last item, apply bottom-left and bottom-right borderRadius
      return {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      };
    }
    // Default style for other items
    return {};
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity
              style={[styles.button, renderBorderRadius(index)]}
              onPress={() =>
                navigation.navigate('GenericPage', {
                  name: item.name,
                  item: item,
                })
              }
              activeOpacity={0.7}
            >
              <View style={styles.iconWraper}>
                <Icon name="angle-left" size={24} color="#d1c9c3" style={styles.icon} />
              </View>
              <View style={styles.nameWraper}>
                <Text style={styles.buttonText}>{item.name}</Text>
              </View>
              <View style={styles.imageWraper}>
                {/* Image component */}
                <Image
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
            {index !== items.length - 1 && (
              <View style={styles.horizontalLine} />
            )}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    paddingBottom: 80, // Add padding to the bottom to push the last item up
    paddingTop: 30, // Add padding to the top to create space from the navigation bar
  },
  iconWraper: {
    width: '10%',
  },
  nameWraper: {
    width: '80%',
  },
  imageWraper: {
    width: '1%',
  },
  button: {
    backgroundColor: '#262626',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'right',
    marginLeft: 30,
  },
  image: {
    width: 44,
    height: 55,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  icon: {
    marginLeft: 20,
  },
  horizontalLine: {
    borderBottomWidth: 1, // Adjust the border width as needed
    borderColor: '#262626', // Adjust the color as needed
    marginLeft: 360, // Adjust the margin as needed
  },
});

export default HomeScreen;
