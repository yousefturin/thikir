import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { getItems } from "../db/GetData";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  const items = getItems();

  const renderBorderRadius = (index) => {
    if (index === 0) {
      return {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      };
    } else if (index === items.length - 1) {
      return {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      };
    }
    return {};
  };

  // Extract the first 4 items for the new layout
  const topItems = items.slice(0, 4);
  const topItemIcons = ["moon", "partly-sunny", "notifications", "bed"];

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.buttonGrid}>
          {topItems.map((item, index) => (
            <TouchableOpacity
              key={item.name}
              style={[styles.squareButton, renderBorderRadius(index)]}
              onPress={() =>
                navigation.navigate("GenericPage", {
                  name: item.name,
                  item: item,
                })
              }
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapperTop}>
                <Ionicons
                  name={topItemIcons[index]}
                  size={35}
                  color="#fff"
                  style={styles.iconTop}
                />
              </View>
              <View style={styles.nameWrapper}>
                <Text style={styles.buttonTextTop}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.TextMidWrapper}>
          <Text style={styles.TextMid}>الفهرس</Text>
        </View>
        {items.map((item, index) => (
          <View key={item.name}>
            <TouchableOpacity
              style={[styles.button, renderBorderRadius(index)]}
              onPress={() =>
                navigation.navigate("GenericPage", {
                  name: item.name,
                  item: item,
                })
              }
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>
                <FontAwesomeIcon
                  name="angle-left"
                  size={24}
                  color="#454545"
                  style={styles.icon}
                />
              </View>
              <View style={styles.nameWrapper}>
                <Text style={styles.buttonText}>{item.name}</Text>
              </View>
              <View style={styles.imageWrapper}>
                {/* Image component */}
                <Image style={styles.image} />
              </View>
            </TouchableOpacity>
            {index !== items.length - 1 && (
              <View style={styles.horizontalLine} />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#151515", // Background color for the entire page
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
    paddingTop: 30,
  },
  iconWrapper: {
    width: "10%",
  },
  nameWrapper: {
    width: "80%",
  },
  imageWrapper: {
    width: "1%",
  },
  button: {
    backgroundColor: "#262626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonText: {
    color: "#dddddd",
    fontSize: 18,
    fontWeight: "300",
    textAlign: "right",
    marginLeft: 30,
    fontFamily: "ScheherazadeNew",
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
    borderBottomWidth: 1,
    borderColor: "#262626",
    marginLeft: windowWidth > 600 ? 610 : 350, // Adjust the value based on screen width
  },
  buttonGrid: {
    paddingTop: 30,
    paddingBottom: 20,
    width: "91%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  squareButton: {
    width: "48%",
    height: 100,
    backgroundColor: "#262626",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingBottom: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonTextTop: {
    color: "#dddddd",
    fontSize: 20,
    fontWeight: "300",
    textAlign: "right",
    marginRight: 10,
    fontFamily: "ScheherazadeNew",
  },
  iconWrapperTop: {
    alignItems: "flex-end",
    marginRight: 10,
    marginBottom: 5,
  },
  TextMidWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-end', // Change alignItems to 'flex-start'
    marginRight: windowWidth > 600 ? 60 : 35, // Adjust the value based on screen width

  },
  
  TextMid: {
    color: 'white',
    fontSize: 22,
    paddingBottom: 10,
    fontFamily: 'ScheherazadeNewBold',
  },
});

export default HomeScreen;
