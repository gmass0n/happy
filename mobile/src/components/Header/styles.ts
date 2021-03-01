import { StyleSheet, Platform } from "react-native";
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : 20;

const styles = StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: "#f9fafc",
      borderBottomWidth: 1,
      borderColor: "#dde3f0",
      paddingTop: 24 + STATUS_BAR_HEIGHT,
  
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  
    title: {
      fontFamily: "Nunito_600SemiBold",
      color: "#8fa7b3",
      fontSize: 16,
    },
  });

  export default styles;