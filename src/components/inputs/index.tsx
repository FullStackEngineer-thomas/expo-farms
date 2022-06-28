import React from "react";
import {
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

interface Props {
  value: string;
  handleChange: (value: string) => void;
  handleBlur: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  placeHolder: string;
  secureTextEntry: boolean | undefined;
}

const Input = ({
  handleChange,
  handleBlur,
  placeHolder,
  value,
  secureTextEntry,
}: Props) => {
  return (
    <TextInput
      value={value}
      onChangeText={handleChange}
      onBlur={handleBlur}
      placeholder={placeHolder} //dummy@abc.com
      style={styles.inputStyle}
      placeholderTextColor="#8b9cb5"
      autoCapitalize="none"
      keyboardType="email-address"
      returnKeyType="next"
      underlineColorAndroid="#f000"
      blurOnSubmit={false}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  inputStyle: {
    color: "white",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#dadae8",
  },
});
