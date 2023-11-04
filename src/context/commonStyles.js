import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get("window");

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
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "ScheherazadeNewBold",
  },
  image: {
    width: 444,
    height: 55,
  },
  icon: {
    opacity: 0.5
  },
  specialIconleft: {
    width: 24,
    height: 24,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "#262626",
    width: 60,
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
    fontFamily: "Montserrat",
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
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonText: {
    color: "#dddddd",
    fontSize: 18,
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
    opacity: 0.5
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "#262626",
  },
  buttonGrid: {
    paddingTop: 10,
    paddingBottom: 20,
    width: "91%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    position:"relative",
  },
  squareButton: {
    width: "48%",
    height: 100,
    backgroundColor: "#262626",
    justifyContent: "flex-end",
    paddingBottom: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonTextTop: {
    color: "#dddddd",
    fontFamily: "ScheherazadeNew",
  },
  iconWrapperTop: {
    alignItems: "flex-end",
    marginBottom: 5,
    position:"absolute",
    top:10
  },
  TextMidWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
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
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#262626",
    width: "91%",
    height: 60,
    paddingHorizontal: 10,
  },
  leftContent: {
    flexDirection: "column",
    flex: 2,
  },
  middleContent: {
    flex: 1,
  },
  rightContent: {
    flex: 1,
  },
  title: {
    color: "#dddddd",
    fontSize: 15,
  },
  time: {
    color: "#777",
    fontSize: 12,
  },
  horizontalLineWrapper: {
    borderBottomWidth: 1,
    borderColor: "#262626",
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
    justifyContent: "center",
    alignContent: "center",
  },
  textcount: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
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
  TranslationDescription: {
    fontSize: 9,
    textAlign: "center",
    color: "#767676",
    fontFamily: "Montserrat",
    paddingVertical: 5,
    paddingBottom: 5,
    textAlign:"left",
    width:"100%"
  },
  InfoReptTimeIndex: {
    fontSize: 11,
    textAlign: "center",
    color: "#767676",
    position: "absolute",
    left: 0,
    bottom: 0,
    padding: 20,
  },
  InfoReptTime: {
    fontSize: 11,
    textAlign: "center",
    color: "#f2b784",
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
  pageContainer: {
    flex: 1,
    backgroundColor: "#151515",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#151515",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 80,
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
    flexDirection:"row",
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
    //paddingLeft: width > 600 ? 560 : 300,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    marginEnd: 15
  },
  textColor: {
    paddingRight: 6
  },
  textColorToggle:{},
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
  togglePadding:{},

  toggleContainer:{
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    height:50
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
  },
  screenshot: {
    padding: 20,
    width: 300,
    height: 250,
    resizeMode: "contain",
  },
});
//#endregion
export const namesOfAllahGenericPageScreenStyle = StyleSheet.create({
  container:{
    flexGrow: 1,
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 120,
  },
  rectangle:{
    backgroundColor: "#262626",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    width: "90%",
    position: "relative",
    paddingHorizontal: 20,
    paddingVertical: 40,
    textAlign: "center",
  },
  nameDisplay:{
    fontSize: 42, 
    fontFamily: "ScheherazadeNew",
    color: "#fff",
  },
  textDescription:{
    fontFamily: "ScheherazadeNew",
    color: "#fff",
    textAlign: "right",
    paddingBottom: 30
  },
  textDescriptionMain:{
    //fontFamily: "ScheherazadeNew",
    color: "#fff",
    textAlign: "right",
    paddingBottom:20
  },
  horizontalLine:{
    borderBottomWidth: 1,
    borderColor: "#151515",
    width: "100%",
  },
  suraNameNumber:{
    fontFamily: "ScheherazadeNew",
    color: "#767676", 
    paddingTop: 10 
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
});
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
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#262626",
    overflow: "hidden",

  },
  thikirNameDispaly: {
    textAlign: "center",
    fontFamily:"ScheherazadeNewBold",
    fontSize: 18,
    paddingHorizontal:10,
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
    marginRight: width > 600 ? 20 : 20,

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



//#region tasbehScreen
export const QablaScreenStyle  = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDirection:{
    color:"#656565",
    position:"absolute",
    top:"10%",
    fontSize:30
  },
  degreeContainer: {
    justifyContent:"center",
    alignItems: 'center',
    position: 'relative',
  },
  degreeText: {
    color: '#fff',
    fontSize: height / 27,
    textAlign: 'center',
  },
  compassImage: {
    position: "absolute",
    height: width - 80,
    resizeMode: 'contain',
  },
  compassImageRed: {
    position: "absolute",
    height: width - 80,
    resizeMode: 'contain',
    width:345,
    height:345,
  },
  triangleContainer: {
    position: 'absolute',
    top: "24.4%",
    left: 0,
    width: width,
    alignItems: 'center',
  },
  triangle: {
    width: 6, 
    height: 55,
    backgroundColor: '#dd3131', 
    position: 'absolute',
    borderBottomWidth: 5, 
    borderBottomColor: '#dd3131',
  },
  
});
//#endregion