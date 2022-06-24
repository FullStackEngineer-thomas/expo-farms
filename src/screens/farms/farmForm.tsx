import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../components/inputs";
import Button from "../../components/buttons";
import { RootStackParmList } from "../../navigations/rootStackParams";

type userScreenProp = StackNavigationProp<RootStackParmList, "Farms">;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const farmFormValidationSchema = yup.object().shape({
  displayName: yup.string().required("required"),
  farmName: yup.string().required("required"),
  phoneNumber: yup.string().matches(phoneRegExp, "Phone number"),
  hours: yup.string(),
});
const FarmForm = () => {
  const [imgUri, setImageUri] = useState("");
  const navigation = useNavigation<userScreenProp>();
  const createFarm = () => {
    navigation.navigate("Farms");
  };
  const selectImagePicker = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImageUri(result.uri);
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
        <Text style={{ color: "yellow", fontSize: 25 }}>Create Farm</Text>
      </View>
      <Formik
        initialValues={{
          displayName: "",
          farmName: "",
          phoneNumber: "",
          hours: "",
        }}
        onSubmit={() => createFarm()}
        validationSchema={farmFormValidationSchema}
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
              value={values.displayName}
              placeHolder="Enter displayName"
              handleChange={handleChange("displayName")}
              handleBlur={handleBlur("displayName")}
              secureTextEntry={undefined}
            />
            {errors.displayName && touched.displayName && (
              <Text style={styles.errorText}>{errors.displayName}</Text>
            )}
            <Input
              value={values.farmName}
              placeHolder="Enter farmName"
              handleChange={handleChange("farmName")}
              handleBlur={handleBlur("farmName")}
              secureTextEntry={undefined}
            />
            {errors.farmName && touched.farmName && (
              <Text style={styles.errorText}>{errors.farmName}</Text>
            )}
            <Input
              value={values.phoneNumber}
              placeHolder="Enter phoneNumber(optional)"
              handleChange={handleChange("phoneNumber")}
              handleBlur={handleBlur("phoneNumber")}
              secureTextEntry={undefined}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
            <Input
              value={values.hours}
              placeHolder="Enter hours(optional)"
              handleChange={handleChange("hours")}
              handleBlur={handleBlur("hours")}
              secureTextEntry={undefined}
            />
            {errors.hours && touched.hours && (
              <Text style={styles.errorText}>{errors.hours}</Text>
            )}
            <View style={styles.imageContainer}>
              {!!imgUri ? (
                <Image
                  source={{ uri: imgUri }}
                  style={{ width: 100, height: 100, resizeMode: "center" }}
                />
              ) : (
                <Button
                  title="Upload Image"
                  handleSubmitPress={() => selectImagePicker()}
                />
              )}
            </View>
            <Button title="Add" handleSubmitPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default FarmForm;

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
  imageContainer: {
    flex: 1,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    marginBottom: 10,
  },
});
