import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

//#region MainStyles
export const MainStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 80,
    paddingTop: 30,
  },
  iconWrapperLeft: {
    width: "10%",
  },
  iconWrapper: {
    width: "8%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#454545",
    borderRadius: 10,
    padding: 5,
    marginRight: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  nameWrapper: {
    width: "70%",
  },
  imageWrapper: {
    width: "1%",
  },
  button: {
    backgroundColor: "#262626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "right",
    marginRight: 20,
    fontFamily: "ScheherazadeNewBold",
  },
  image: {
    width: 444,
    height: 55,
  },
  icon: {
    marginLeft: 20,
    opacity: 0.5
  },
  iconleft: {},
  specialIconleft: {
    width: 24,
    height: 24,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "#262626",
    width: 13,
    marginLeft: 360,
  },
});
//#endregion

//#region AboutStyles
export const AboutStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#151515",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 80,
    paddingTop: 50,
  },
  appNameText: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "ScheherazadeNewBold",
    marginTop: 10,
  },
  appVersionText: {
    color: "#454545",
    fontSize: 12,
  },
  rectangleWrapper: {
    marginTop: 30,
    height: 230,
    borderRadius: 10,
    backgroundColor: "#262626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    paddingVertical: 20
  },
  scrollContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    minHeight: 170,
    maxHeight: 2070,
  },
  rectangleText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "right",
    marginHorizontal: 5,
    fontFamily: "ScheherazadeNew",
  },
  appLogoIcon: {
    width: 126,
    height: 126,
    borderRadius: 27,
    shadowColor: "black", // For iOS
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 12,
    shadowRadius: 6,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "#262626",
    marginLeft: 360,
  },
});
//#endregion

//#region DuaVerseStyles
export const DuaVerseStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 120,
  },
  rectangle: {
    backgroundColor: "#262626",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    width: "90%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    position: "relative",
  },
  scrollContainer: {
    justifyContent: 'center',
    paddingBottom: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    minHeight: 170,
    maxHeight: 2070,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontFamily: "ScheherazadeNew",
    marginTop: 20,
  },
  translation: {
    marginTop: 10,
    marginBottom: 30,
    fontSize: 15,
    textAlign: "center",
    color: "#767676",
    fontFamily: "AmiriFont",
  },
  description: {
    fontSize: 11,
    textAlign: "center",
    color: "#767676",
    fontFamily: "AmiriFont",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -5,
    alignItems: 'center', // Horizontal centering
  },
  shareButton: {
    position: "absolute",
    top: 10,
    left: 13,
  },
  dotContainer: {
    flexDirection: "row",
  },
  dot: {
    position: "absolute",
    top: 7,
    left: 10,
  },
  dotContainer: {
    flexDirection: "row",
  },
  dot: {
    color: "#f2b784",
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 1,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "#151515",
    width: "100%",
    marginBottom: 5,
  },
});
//#endregion

//#region QuranVerseStyles
export const QuranVerseStyles = StyleSheet.create({
  // this is a common between VERSE and HADITH!
  container: {
    flexGrow: 1,
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 120,
  },
  rectangle: {
    backgroundColor: "#262626",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    width: "90%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    position: "relative",
  },
  scrollContainer: {
    justifyContent: 'center',
    paddingBottom: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    minHeight: 170,
    maxHeight: 2070,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontFamily: "ScheherazadeNew",
  },
  description: {
    fontSize: 11,
    textAlign: "center",
    color: "#767676",
    fontFamily: "AmiriFont",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -5,
    alignItems: 'center', // Horizontal centering
  },
  tafsirStyle: {
    fontSize: 15,
    textAlign: "center",
    color: "#767676",
    fontFamily: "AmiriFont",
    paddingTop: 20,
    marginBottom: 20,
  },
  shareButton: {
    position: "absolute",
    top: 10,
    left: 13,
  },
  dotContainer: {
    flexDirection: "row",
  },
  dot: {
    position: "absolute",
    top: 7,
    left: 10,
  },
  dotContainer: {
    flexDirection: "row",
  },
  dot: {
    color: "#f2b784",
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 1,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "#151515",
    width: "100%",
    marginBottom: 5,
  },

});
//#endregion

//#region HomeStyles
export const HomeStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#151515",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
    paddingTop: 20,
  },
  containerSearchMode: {
    flexGrow: 1,
    backgroundColor: "#151515",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 300,
    paddingTop: 20,
  },
  searchBarContainer: {

    paddingHorizontal: 10,
    backgroundColor: "#151515",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchBarInputContainer: {
    backgroundColor: "#262626",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  searchBarInput: {
    backgroundColor: "#262626",
    color: "#dddddd",
  },
  searchBarInputContainerTop: {
    justifyContent: "flex-start",
    alignContent: "flex-start",
    zIndex: 1,
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
    shadowColor: "#262626",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: "#dddddd",
    fontSize: 18,
    textAlign: "right",
    marginLeft: 30,
    fontFamily: "ScheherazadeNew",
  },
  emptyMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.3
  },
  emptyMessageText: {
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
    opacity: 0.5
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "#262626",
    marginLeft: windowWidth > 600 ? 610 : 350,
  },
  buttonGrid: {
    paddingTop: 10,
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
    fontSize: 18,
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
    width: "100%",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginRight: windowWidth > 600 ? 60 : 35,
  },
  TextMid: {
    color: "white",
    fontSize: 22,
    paddingBottom: 10,
    fontFamily: "ScheherazadeNewBold",
  },
  iconTop: {
    color: "#fff",
  },
});
//#endregion

//#region ThikirAlarmStyles
export const ThikirAlarmStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#151515",
    paddingTop: 40,
    alignItems: "center",
  },
  notificationContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#262626",
    shadowColor: "#262626",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    width: "91%",
    height: 60,
    paddingHorizontal: 10,
  },
  leftContent: {
    flexDirection: "column",
    flex: 2,
    alignItems: "flex-end",
  },
  middleContent: {
    flex: 1,
  },
  rightContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  title: {
    color: "#dddddd",
    textAlign: "right",
    fontSize: 15,
    marginRight: 10,
    fontFamily: "ScheherazadeNewBold",
  },
  time: {
    color: "#777",
    marginRight: 10,
    textAlign: "right",
    fontSize: 12,
  },
  horizontalLineWrapper: {
    borderBottomWidth: 1,
    borderColor: "#262626",
    marginLeft: windowWidth > 600 ? 610 : 350,
  },
});
//#endregion

//#region GenericStyles
export const GenericStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    padding: 20,
  },
  containerforshare: {
    backgroundColor: "#151515",
    height: 500,
  },
  controlPan: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 40,
    margin: -20,
  },
  circularButton: {
    width: 70,
    height: 70,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#151515",
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: "50%",
    width: "35%",
    padding: 14,
    backgroundColor: "#262626",
    borderRadius: 10,
    borderWidth: 0.9,
    borderColor: "#151515",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  },
  textcount: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontFamily: "ScheherazadeNew",
    justifyContent: "center",
  },
  icon: {
    marginTop: 2,
  },
  rectangle: {
    backgroundColor: "#262626",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 20,
    padding: 50,
    marginTop: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    position: "relative",

  },
  scrollContainer: {
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
    minHeight: 170,
    maxHeight: 2070,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontFamily: "ScheherazadeNew",
  },
  description: {
    fontSize: 9,
    textAlign: "center",
    color: "#767676",
    fontFamily: "AmiriFont",
    paddingVertical: 30,
    paddingBottom: 40,
  },
  InfoReptTimeIndex: {
    fontSize: 11,
    textAlign: "center",
    color: "#767676",
    fontFamily: "AmiriFont",
    position: "absolute",
    left: 0,
    bottom: 0,
    padding: 20,
  },
  InfoReptTime: {
    fontSize: 11,
    textAlign: "center",
    color: "#f2b784",
    fontFamily: "AmiriFont",
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 20,
  },
  FavButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    alignItems: 'center', // Horizontal centering
  },
  ControlPaneBackground: {
    flexDirection: "row",
    height: 130,
    resizeMode: "cover",
    justifyContent: "space-evenly",
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
  shareButton: {
    position: "absolute",
    top: 7,
    left: 10,
  },
  dotContainer: {
    flexDirection: "row",
  },
  dot: {
    color: "#f2b784",
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 1,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "#151515",
    width: "100%",
  },
});
//#endregion

//#region settingStyles
export const SettingStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#151515",
    justifyContent: "flex-start",
    paddingTop: 20,
    alignItems: "center",
  },
  themeOptionsContainer: {
    flexDirection: "row-reverse",
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  themeOption: {
    
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4
  },
  themeCircle: {
    width: 24, // Set the size of the circle container
    height: 24,
    borderRadius: 12, // Make it a circle
    borderWidth: 1, // Add a border
    borderColor: '#f2b784', // Border color
    marginRight: 10, // Spacing between the circle and text
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  selectedCircle: {
    width: 12, // Set the size of the filled circle
    height: 12,
    borderRadius: 6, // Make it a circle
    backgroundColor: '#f2b784', // Color of the filled circle
  },
  fontOptionsContainer: {
    flexDirection: "row-reverse",
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  rectangle: {
    backgroundColor: "#fefffe",
    borderRadius: 10,
    marginTop: 10,
    width: "90%",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  wrapHeaderText: {
    width: '90%',
    justifyContent: 'center',
    textAlign: 'right',
    paddingRight:10
  },
  HeadertextColor: {
    color: '#767676',
    paddingTop: 15,
    //paddingLeft: windowWidth > 600 ? 560 : 300,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    marginEnd: 15
  },
  textColor: {
    paddingRight: 6
  },
  colorOption: {
    margin: 10,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 30, // Make it a circle
    borderWidth: 1,
    borderColor: 'transparent', // Default border color
  },
  selectedColorCircle: {
    borderColor: '#EBEAEA',
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  checkIcon: {
    position: 'absolute',
    top: '32%', 
    left: '32%', 
  },
  colorOptionsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
//#endregion


//#region ReportProblemStyles
export const ReportProblemStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#151515",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#fff",
  },
  input: {
    color: "#fff",
    backgroundColor: "#262626",
    borderRadius: 10,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    height: 120,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  inputScreenshot: {
    flex: 0.5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#262626",
    borderRadius: 10,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    height: 220,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  screenshot: {
    padding: 20,
    width: 300,
    height: 250,
    resizeMode: "contain",
  },
});
//#endregion

//#region tasbehScreen
export const TasbehScreenStyle = StyleSheet.create({
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
  wrapercountValue: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262626',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  duplica: {
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    position: 'absolute', 
    opacity: 0.5
  },
  countValue: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 72,
  },
  thikirNameDispalyBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#262626",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
    overflow: "hidden",

  },
  thikirNameDispaly: {
    textAlign: "center",
    fontFamily:"ScheherazadeNewBold",
    fontSize: 18,
  },
  pickThikirText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontFamily:"ScheherazadeNewBold",
  },
  ModalTopNotch: {
    height: 5,
    width: 40,
    backgroundColor: "#262626",
    borderRadius: 10,
    position: "absolute",
    top: 7,
    left: "50%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  ThikirNewText: {
    color: "#007AFF",
    fontSize: 20,
    paddingRight: 5,
    },
  addNewThikirModalContainer: {
    backgroundColor: "#151515",
    width: 350,
    height: 130,
    borderRadius: 10,
    alignItems: "center", 
    justifyContent: "space-between",
  },
  buttonThikirDisplayInModal: {
    flexDirection: "row-reverse",
    flex: 1,
    alignItems: "center",
    height: 45,
    backgroundColor: "#262626",
  },
  newThikirTextInModal: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 20,
    color: "white",
    borderRadius: 10,
    fontFamily:"ScheherazadeNewBold",
  },
  inputTextContainerInModa: {
    width: "91%",
    paddingVertical: 20,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    color: "white",
    backgroundColor: "#262626",
    borderRadius: 10,
  },
  modaldisplay: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  rectangle: {
    backgroundColor: "#151515",
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  separator: {
    borderBottomWidth: 1,
    marginRight: windowWidth > 600 ? 20 : 20,

    borderColor: "#262626",
  },
  itemText: {
    width: "82%",
    textAlign: "right",
    fontSize: 20,
    color: "#fff",
    paddingRight: 20,
    fontFamily:"ScheherazadeNew",
  },
  itemCount: {
    width: "20%",
    textAlign: "left",
    fontSize: 20,
    color: "#6682C3",
    paddingLeft: 20,
  },
});
//#endregion