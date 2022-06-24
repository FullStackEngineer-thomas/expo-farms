import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, StyleSheet, Image } from "react-native";
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
type authScreenProp = StackNavigationProp<RootStackParmList, "SignIn">;

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

const SignIn = () => {
  const navigation = useNavigation<authScreenProp>();
  const userLogin = (value: User) => {
    try {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password);
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
        onSubmit={(value: User) => userLogin(value)}
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
              placeHolder="Enter Email"
              handleChange={() => console.log()}
              handleBlur={handleBlur("email")}
              secureTextEntry={undefined}
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <Input
              value={values.password}
              placeHolder="Enter Password"
              handleChange={() => console.log()}
              handleBlur={handleBlur("email")}
              secureTextEntry={undefined}
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <Button title="Sign In" handleSubmitPress={handleSubmit} />
          </View>
        )}
      </Formik>

      <Text onPress={() => navigation.navigate("SignUp")} style={styles.text_1}>
        New Here? Register
      </Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#236ab1",
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
