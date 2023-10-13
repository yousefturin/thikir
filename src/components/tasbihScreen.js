import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Modal,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import * as Haptics from "expo-haptics";
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Svg, Path } from "react-native-svg";

const defaultNames = [
    { name: 'سبحان الله وبحمده', count: 0, thikir: [] },
    { name: 'اللهم صل على نبينا محمد', count: 0, thikir: [] },
    { name: 'استغفر الله واتوب اليه', count: 0, thikir: [] },
];

const TasbihScreen = () => {
    const [count, setCount] = useState(0);
    const [names, setNames] = useState([]);
    const [isNameListVisible, setIsNameListVisible] = useState(false);
    const [newName, setNewName] = useState('');
    const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(true);
    const [isLongPress, setIsLongPress] = useState(false);

    const [selectedNameIndex, setSelectedNameIndex] = useState(0);

    useEffect(() => {
        // Load data from AsyncStorage when the component mounts
        const loadAsyncData = async () => {
            try {
                const savedNames = await AsyncStorage.getItem('names');
                if (savedNames) {
                    setNames(JSON.parse(savedNames));
                } else {
                    setNames(defaultNames);
                }

                const savedCount = await AsyncStorage.getItem('count');
                if (savedCount) {
                    setCount(parseInt(savedCount));
                } else {
                    setCount(0);
                }

                const savedSelectedNameIndex = await AsyncStorage.getItem('selectedNameIndex');
                if (savedSelectedNameIndex) {
                    setSelectedNameIndex(parseInt(savedSelectedNameIndex));
                } else {
                    setSelectedNameIndex(0);
                }
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        loadAsyncData();
    }, []);

    useEffect(() => {
        // Save data to AsyncStorage whenever names, count, or selectedNameIndex change
        const saveAsyncData = async () => {
            try {
                await AsyncStorage.setItem('names', JSON.stringify(names));
                await AsyncStorage.setItem('count', count.toString());
                await AsyncStorage.setItem('selectedNameIndex', selectedNameIndex.toString());
            } catch (error) {
                console.error('Error saving data:', error);
            }
        };

        saveAsyncData();
    }, [names, count, selectedNameIndex]);

    const handleIncrement = () => {
        if (!isLongPress) {
            const updatedNames = [...names];
            updatedNames[selectedNameIndex].count++;
            setNames(updatedNames);
            setCount(updatedNames[selectedNameIndex].count);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
    };

    const handleReset = () => {
        const updatedNames = [...names];
        updatedNames[selectedNameIndex].count = 0;
        setNames(updatedNames);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setCount(0);
    };

    const openNameList = () => {
        setIsNameListVisible(true);
    };

    const selectName = (index) => {
        if (names.length === 1 && selectedNameIndex === 0) {
            return; // Prevent swiping when there's only one original name
        }

        setSelectedNameIndex(index);
        setCount(names[index].count);
        setIsNameListVisible(false);
    };

    const [isContainerVisible, setContainerVisible] = useState(false);

    const toggleContainer = () => {
        setContainerVisible(!isContainerVisible);
    };

    const addName = () => {
        if (newName) {
            const updatedNames = [...names, { name: newName, count: 0, thikir: [] }];
            setNames(updatedNames);
            setSelectedNameIndex(updatedNames.length - 1);
            setNewName('');
            setIsDeleteButtonVisible(true);
            toggleContainer(); // Hide the container after adding the name
        }
    };

    const deleteName = (index) => {
        const updatedNames = [...names];
        updatedNames.splice(index, 1);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Medium);
        if (updatedNames.length === 1) {
            // Only one name left, enable swipe and set selected index to 0
            setSelectedNameIndex(0);
            setIsDeleteButtonVisible(true);
            setCount(updatedNames[0].count);
        } else {
            // Check if the selected index needs to be updated
            if (index === selectedNameIndex) {
                setSelectedNameIndex(0);
                setCount(updatedNames[0].count);
            }
        }

        setNames(updatedNames);
    };
    let pressTimeout;
    let startX = 0; // Initial X-coordinate of the touch
    let startY = 0; // Initial Y-coordinate of the touch
    let isSwiping = false; // Track if a swipe occurred

    //#region pressControl for long/short
    const handleContainerPressIn = (e) => {
        pressTimeout = setTimeout(() => {
            setIsLongPress(true); // Detect long press
        }, 1000);
        startX = e.nativeEvent.pageX; // Store the initial X-coordinate
        startY = e.nativeEvent.pageY; // Store the initial Y-coordinate
    };

    const handleContainerPressOut = (e) => {
        clearTimeout(pressTimeout); // Clear the timeout on release
        const endX = e.nativeEvent.pageX; // Get the final X-coordinate
        const endY = e.nativeEvent.pageY; // Get the final Y-coordinate
        const swipeDistanceX = Math.abs(endX - startX); // Calculate the horizontal distance moved
        const swipeDistanceY = Math.abs(endY - startY); // Calculate the vertical distance moved

        if (!isSwiping && swipeDistanceX < 10 && swipeDistanceY < 10) {
            // Only increment the count if it's not a swipe (adjust the threshold as needed)
            handleIncrement();
        }

        setIsLongPress(false); // Reset the long press flag
        isSwiping = false; // Reset the swipe flag
    };
    const Separator = () => (
        <View style={styles.separator} />
    );

    const handleSwipe = () => {
        isSwiping = true;
    };
    //#endregion
    return (
        <TouchableWithoutFeedback
            onPressIn={handleContainerPressIn}
            onPressOut={handleContainerPressOut}
            onResponderMove={handleSwipe}
        >
            <View style={styles.container}>
                <View style={styles.resetBtn}>
                    <TouchableOpacity onPress={handleReset}>
                        <Svg height="24" viewBox="0 0 21 21" width="24">
                            <Path d="m12.5 1.5c2.4138473 1.37729434 4 4.02194088 4 7 0 4.418278-3.581722 8-8 8s-8-3.581722-8-8 3.581722-8 8-8"
                                fill="none" fill-rule="evenodd" strokeWidth={2} stroke="#6682C3" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)"
                            />
                            <Path d="m12.5 5.5v-4h4"
                                fill="none" fill-rule="evenodd" stroke="#6682C3" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View style={styles.wrapercountVlaue}>
                    <View style={styles.circle}>
                        <Text allowFontScaling={false} style={styles.countVlaue} >{count}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.thikirNameDispalyBtn}
                    onPress={() => {
                                openNameList();
                                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                            }}
                >
                    <Text style={styles.thikirNameDispaly} numberOfLines={1} ellipsizeMode="tail">
                        {names[selectedNameIndex] && names[selectedNameIndex].name
                            ? names[selectedNameIndex].name
                            : 'اختر الذكر'}
                    </Text>
                </TouchableOpacity>
                <Modal
                    visible={isNameListVisible}
                    animationType="slide"
                    transparent={false}
                    presentationStyle="formSheet"
                    statusBarTranslucent={false}
                    onRequestClose={() => {
                        setIsNameListVisible(false);
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                    }}
                    >
                    <View style={styles.container}>
                        <Button title="Add Name" onPress={toggleContainer} />
                        <View style={styles.rectangle}>
                            <View style={styles.modaldisplay}>

                                <FlatList
                                    style={[{ borderRadius: 10 }]}
                                    data={names}
                                    keyExtractor={(index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <Swipeable
                                            renderRightActions={(dragX) =>
                                                isDeleteButtonVisible ? (
                                                    <DeleteButton
                                                        onDelete={() => deleteName(index)}
                                                        dragX={dragX}
                                                    />
                                                ) : null
                                            }
                                            containerStyle={{ backgroundColor: '#ff453a' }}
                                            overshootRight={false}
                                            onSwipeableWillOpen={() => {
                                                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                                            }}
                                            onSwipeableWillClose={() => {
                                                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                                            }}
                                        >
                                            <RectButton onPress={() => selectName(index)} activeOpacity={0}>
                                                <View style={{ flexDirection: 'row-reverse', flex: 1 }}>
                                                    <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                                                    <Text style={styles.itemCount} numberOfLines={1} ellipsizeMode="tail">{item.count}</Text>
                                                </View>
                                            </RectButton>
                                        </Swipeable>
                                    )}
                                    ItemSeparatorComponent={Separator} // Add separator
                                />
                            </View>
                            <View>
                                <Modal
                                    transparent={true}
                                    animationType="slide"
                                    visible={isContainerVisible}
                                    onRequestClose={toggleContainer}
                                >
                                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <View
                                                style={{
                                                    backgroundColor: '#252525',
                                                    width: 250,
                                                    height: 200,
                                                    borderRadius: 10,
                                                    zIndex: 50, // Center content vertically
                                                    alignItems: 'center', // Center content horizontally
                                                    position: "relative",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <TouchableOpacity onPress={toggleContainer} style={{ position: 'absolute', top: 0, right: 0, paddingLeft: 40 }}>
                                                    <Svg width="30" height="30" viewBox="0 0 24 24" fill="none"
                                                    >
                                                        <Path
                                                            d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                                                            fill="black"
                                                        />
                                                    </Svg>
                                                </TouchableOpacity>
                                                <TextInput
                                                    placeholder="ادخل ذكراََ جديداََ"
                                                    value={newName}
                                                    onChangeText={setNewName}
                                                    style={{ width: '100%', textAlign: 'center', padding: 40, paddingTop: 60, fontSize: 20, color: 'white' }}
                                                />
                                                <Button title="Add" onPress={addName} />
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                            <Button title="Close" onPress={() => {
                                setIsNameListVisible(false);
                                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                            }}/>
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

const DeleteButton = ({ onDelete, dragX }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDelete = () => {
        onDelete();
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#ff453a',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'left',
            }}
            activeOpacity={0.2}
            onPress={handleDelete}
        >
            <Text style={{ padding: 10, color: '#fff' }}>
                حذف
            </Text>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#151515",
        padding: 20,
        paddingTop: 40,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    resetBtn: {
        width: "100%",
        alignItems: "flex-end",
    },
    wrapercountVlaue: {
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#262626',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    countVlaue: {
        color: '#fff',
        textAlign: "center",
        fontSize: 72
    },
    thikirNameDispalyBtn: {
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#262626',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
        overflow: 'hidden',
        padding: 10,
    },
    thikirNameDispaly: {
        textAlign: "center",
        color: "#6682C3",
        fontSize: 20,

    },
    modaldisplay: {
        flexDirection: "row-reverse",
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginVertical: 5,

    },
    rectangle: {
        backgroundColor: "#151515",
        borderRadius: 10,
        marginTop: 10,
        width: "90%",
    },
    separator: {
        borderBottomWidth: 1,
        marginStart: 320,
        borderColor: "#262626"
    },
    itemText: {
        width: "82%",
        textAlign: "right",
        height: 50,
        backgroundColor: "#262626",
        fontSize: 24,
        padding: 10,
        color: "#fff",
        paddingRight: 15,
        paddingLeft: 10,
    },
    itemCount: {
        width: "20%",
        textAlign: "left",
        height: 50,
        backgroundColor: "#262626",
        fontSize: 24,
        padding: 10,
        color: "#6682C3",
        paddingLeft: 25,
    },
});

export default TasbihScreen;