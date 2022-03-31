import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    icon: {
        width: "80%",
        height: "80%"
      },
      container: {
        flex: 1,
        justifyContent: 'center',
      },
      camera: {
        width: "100%",
        height: "100%",
      },
      buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row"
      },
      buttonFlip: {
        position: "absolute",
        bottom: 50,
        left: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
      },
      buttonTake: {
        position: "absolute",
        bottom: 50,
        right: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
      },
      contentPhoto: {
        flex: 1,
        margin: 10,
      },
      contentPhotoButton: {
        flex: 1,
        flexDirection: "row"
      },
      img: {
        width: "100%",
        height: "80%"
      },
      buttonClose: {
        position: "absolute",
        bottom: 50,
        right: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        margin: 20,
        width: 90,
        height: 50,
        borderRadius: 20,
      },
      buttonConfirm: {
        position: "absolute",
        bottom: 50,
        left: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        margin: 20,
        width: 90,
        height: 50,
        borderRadius: 20,
      }

});

export default styles;