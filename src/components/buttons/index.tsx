import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

interface Props {
  title: string;
  handleSubmitPress: () => void;
}

const Button = (props: Props) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={props.handleSubmitPress}
      >
        <Text style={styles.buttonTextStyle}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
});
