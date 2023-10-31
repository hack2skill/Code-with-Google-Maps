import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const ChargingStationInfo = ({ location }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>More Info</Text>
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.infoWindow}>
          <Text style={styles.infoTitle}>{location.name}</Text>
          <Text style={styles.infoAddress}>{location.address}</Text>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.infoButtonText}>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.infoButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
  },
  infoWindow: {
    width: "100%",
    height: 50,
    padding: 10,
    backgroundColor: "#fff",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoAddress: {
    fontSize: 16,
  },
  infoButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 30,
    backgroundColor: "#ccc",
    marginTop: 10,
  },
  infoButtonText: {
    fontSize: 16,
  },
});

export default ChargingStationInfo;
