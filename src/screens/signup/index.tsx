import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Button from "../../components/buttons";
import Input from "../../components/inputs";
import { RootStackParmList } from "../../navigations/rootStackParams";
import firebase from "firebase";
import { Formik } from "formik";
import * as yup from "yup";

type User = {
  email: string;
  password: string;
};
type authScreenProp = StackNavigationProp<RootStackParmList, "SignUp">;

const signUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, ({ min }) => `Passowrd must be at least ${min} characters`),
});

const SignUp = () => {
  const navigation = useNavigation<authScreenProp>();
  const userRegister = (value: User) => {
    console.log("hello");
    if (value.email === "" || value.password === "") {
      console.log("invailed");
      return;
    }

    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.mainBody}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../../assets/Image/logo.png")}
          style={{
            width: "50%",
            height: 60,
            resizeMode: "contain",
            margin: 30,
          }}
        />
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(value: User) => userRegister(value)}
        validationSchema={signUpValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.SectionStyle}>
            <Input
              value={values.email}
              handleChange={handleChange("email")}
              handleBlur={handleBlur("email")}
              placeHolder="Enter Email"
              secureTextEntry={undefined}
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <Input
              value={values.password}
              handleChange={handleChange("password")}
              handleBlur={handleBlur("password")}
              placeHolder="Enter Password"
              secureTextEntry={true}
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Button title="Sign Up" handleSubmitPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
      <Text onPress={() => navigation.navigate("SignIn")} style={styles.text_1}>
        already loggedn in? Login
      </Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#307ecc",
    alignContent: "center",
  },
  SectionStyle: {
    marginTop: 20,
    marginHorizontal: 60,
    marginBottom: 5,
  },
  text_1: {
    fontSize: 12,
    textDecorationLine: "underline",
    color: "red",
    textAlign: "center",
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
});
