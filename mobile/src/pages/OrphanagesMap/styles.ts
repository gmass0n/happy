import { Dimensions, StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    justifyContent: "center",
  },

  calloutText: {
    color: "#15c3d6",
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: getBottomSpace(),

    backgroundColor: "#fff",
    borderRadius: 20,
    height: 50,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      height: 10,
      width: 10,
    },
  },

  footerText: {
    color: "#8fa7b3",
    fontFamily: "Nunito_700Bold",
  },

  createOrphanageButton: {
    width: 50,
    height: 50,
    backgroundColor: "#15c3d6",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
