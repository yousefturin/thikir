// import React, { useState, useEffect } from "react";
// import { View, Text, Button, StyleSheet, TextInput } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import { useTheme } from "../context/ThemeContext";
// import { ReportProblemStyles } from "../Styles/commonStyles";
// import { Appearance } from "react-native";


// const BarCodeScreen = () => {
//     const { selectedTheme } = useTheme();
//     const systemTheme = selectedTheme === "system";
//     //#region LightTheme
//     const lightTheme = StyleSheet.create({
//         container: {
//             backgroundColor: "#f2f2f6",
//         },
//         heading: {
//             color: "#000",
//         },
//         input: {
//             color: "#000",
//             backgroundColor: "#fefffe",
//         },
//         inputScreenshot: {
//             color: "#000",
//             backgroundColor: "#fefffe",
//         },
//     });
//     //#endregion

//     //#region DarkTheme
//     const darkTheme = StyleSheet.create({
//         container: {
//             backgroundColor: "#050505",
//         },
//         heading: {
//             color: "#fff",
//         },
//         input: {
//             color: "#fff",
//             backgroundColor: "#1C1C1E",
//         },
//         inputScreenshot: {
//             color: "#fff",
//             backgroundColor: "#1C1C1E",
//         },
//     });
//     //#endregion
//     const themeStyles = systemTheme
//         ? Appearance.getColorScheme() === "dark"
//             ? darkTheme
//             : lightTheme
//         : selectedTheme === "dark"
//             ? darkTheme
//             : lightTheme;
//     //#region StyleMapping
//     const styles = {
//         ...ReportProblemStyles,
//         container: {
//             ...ReportProblemStyles.container,
//             ...(selectedTheme === "dark"
//                 ? themeStyles.container
//                 : themeStyles.container),
//         },
//         heading: {
//             ...ReportProblemStyles.heading,
//             ...(selectedTheme === "dark" ? themeStyles.heading : themeStyles.heading),
//         },
//         input: {
//             ...ReportProblemStyles.input,
//             ...(selectedTheme === "dark" ? themeStyles.input : themeStyles.input),
//         },
//         inputScreenshot: {
//             ...ReportProblemStyles.inputScreenshot,
//             ...(selectedTheme === "dark"
//                 ? themeStyles.inputScreenshot
//                 : themeStyles.inputScreenshot),
//         },
//     };
//     const [hasPermission, setHasPermission] = useState(null);
//     const [scanned, setScanned] = useState(false);
//     const [scannedData, setScannedData] = useState(null);
//     const [barcodeInfo, setBarcodeInfo] = useState([]);
//     const [jsonContent, setJsonContent] = useState([]);

//     const [inputBarCode, setInputBarCode] = useState("");
//     const [inputCategory, setInputCategory] = useState("");
//     const [inputCompany, setInputCompany] = useState("");
//     const [inputMotherCompany, setInputMotherCompany] = useState("");
//     const [inputBoyCottStatus, setInputBoyCottStatus] = useState("");
//     const [inputReplacment, setInputReplacment] = useState("");
//     const [inputBarCodeReplacement, setInputBarCodeReplacement] = useState("");

//     // Check and request camera permissions
//     useEffect(() => {
//         (async () => {
//             const { status } = await BarCodeScanner.requestPermissionsAsync();
//             setHasPermission(status === "granted");
//         })();
//     }, []);

//     useEffect(() => {
//         const loadJsonContent = async () => {
//             try {
//                 const jsonData = require("../db/db_Boycott.json");
//                 console.log("Loaded JSON data:", jsonData); // Debug: Log loaded data
//                 setJsonContent(jsonData);
//             } catch (error) {
//                 console.error("Error loading JSON data:", error);
//             }
//         };

//         loadJsonContent();
//     }, []);

//     // Update barcodeInfo when jsonContent changes
//     useEffect(() => {
//         console.log("jsonContent:", jsonContent); // Debug: Log jsonContent
//         console.log("scannedData:", scannedData); // Debug: Log scannedData

//         if (jsonContent.length > 0 && scannedData) {
//             const scannedBarcode = parseInt(scannedData, 10); // Convert scannedData to a number
//             const barcodeMatch = jsonContent.find(
//                 (item) => item.BarCode === scannedBarcode
//             );
//             console.log("barcodeMatch:", barcodeMatch); // Debug: Log barcodeMatch
//             setBarcodeInfo(barcodeMatch);
//         }
//     }, [jsonContent, scannedData]);

//     const handleBarCodeScanned = ({ type, data }) => {
//         setScanned(true);
//         setScannedData(data);
//     };
//     const handleSaveData = () => {
//         if (!barcodeInfo) {
//             // No barcode info available, handle it as needed.
//             const exileData = {
//                 BarCode: inputBarCode,
//                 Category: inputCategory,
//                 Company: inputCompany,
//                 MotherCompany: inputMotherCompany,
//                 BoyCottStatus: inputBoyCottStatus,
//                 Replacment: inputReplacment,
//                 BarCodereplacment: inputBarCodeReplacement,
//             };

//             // Save exileData to a file or handle it as needed
//             console.log("Exiled Data:", exileData);

//             // Clear the input values
//             setInputBarCode("");
//             setInputCategory("");
//             setInputCompany("");
//             setInputMotherCompany("");
//             setInputBoyCottStatus("");
//             setInputReplacment("");
//             setInputBarCodeReplacement("");
//         }

//         setScanned(false); // Reset scanned flag
//     };

//     return (
//         <View style={styles.container}>
//             {hasPermission === null ? (
//                 <Text>Loading...</Text>
//             ) : hasPermission === false ? (
//                 <Text>No access to the camera</Text>
//             ) : (
//                 <View style={styles.cameraContainer}>
//                     <View style={[styles.cameraView, { borderRadius: 10 }]}>
//                         <BarCodeScanner
//                             onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//                             style={StyleSheet.absoluteFillObject}
//                         />
//                     </View>

//                     {scanned && (
//                         <View style={styles.cameraContainer}>
//                             {barcodeInfo && (
//                                 <View style={styles.barcodeInfoContainer}>
//                                     <Text style={styles.inputField}>
//                                         Scanned Data: {scannedData}
//                                     </Text>
//                                     <Text style={styles.inputField}>
//                                         BarCode: {barcodeInfo.BarCode}
//                                     </Text>
//                                     <Text style={styles.inputField}>
//                                         Category: {barcodeInfo.Category}
//                                     </Text>
//                                     <Text style={styles.inputField}>
//                                         Company: {barcodeInfo.Company}
//                                     </Text>
//                                     <Text style={styles.inputField}>
//                                         MotherCompany: {barcodeInfo.MotherCompany}
//                                     </Text>
//                                     <Text style={styles.inputField}>
//                                         BoyCottStatus: {barcodeInfo.BoyCottStatus}
//                                     </Text>
//                                     <Text style={styles.inputField}>
//                                         Replacment: {barcodeInfo.Replacment}
//                                     </Text>
//                                     <Text style={styles.inputField}>
//                                         BarCodereplacment: {barcodeInfo.BarCodereplacment}
//                                     </Text>
//                                 </View>
//                             )}
//                             {!barcodeInfo && (
//                                 <View style={[{ paddingTop: 30 }]}>
//                                     {/* Add input fields for capturing data */}
//                                     <TextInput
//                                         style={styles.inputField}
//                                         placeholder="BarCode"
//                                         placeholderTextColor="#c1c1c9"
//                                         value={scannedData}
//                                         onChangeText={(text) => setInputBarCode(text)}
//                                     />
//                                     <TextInput
//                                         style={styles.inputField}
//                                         placeholder="Category"
//                                         placeholderTextColor="#c1c1c9"
//                                         value={inputCategory}
//                                         onChangeText={(text) => setInputCategory(text)}
//                                     />
//                                     <TextInput
//                                         style={styles.inputField}
//                                         placeholder="Company"
//                                         placeholderTextColor="#c1c1c9"
//                                         value={inputCompany}
//                                         onChangeText={(text) => setInputCompany(text)}
//                                     />
//                                     <TextInput
//                                         style={styles.inputField}
//                                         placeholder="MotherCompany"
//                                         placeholderTextColor="#c1c1c9"
//                                         value={inputMotherCompany}
//                                         onChangeText={(text) => setInputMotherCompany(text)}
//                                     />
//                                     <TextInput
//                                         style={styles.inputField}
//                                         placeholder="BoyCottStatus"
//                                         placeholderTextColor="#c1c1c9"
//                                         value={inputBoyCottStatus}
//                                         onChangeText={(text) => setInputBoyCottStatus(text)}
//                                     />
//                                     <TextInput
//                                         style={styles.inputField}
//                                         placeholder="Replacment"
//                                         placeholderTextColor="#c1c1c9"
//                                         value={inputReplacment}
//                                         onChangeText={(text) => setInputReplacment(text)}
//                                     />
//                                     <TextInput
//                                         style={styles.inputField}
//                                         placeholder="BarCodeReplacement"
//                                         placeholderTextColor="#c1c1c9"
//                                         value={inputBarCodeReplacement}
//                                         onChangeText={(text) => setInputBarCodeReplacement(text)}
//                                     />
//                                     <Button title="Save Data" onPress={handleSaveData} />
//                                 </View>
//                             )}
//                             <Button title="Scan Again" onPress={() => setScanned(false)} />
//                         </View>
//                     )}
//                 </View>
//             )}
//         </View>
//     );
// };

// export default BarCodeScreen;
