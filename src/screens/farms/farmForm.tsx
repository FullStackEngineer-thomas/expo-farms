import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as yup from "yup";
import firebase from "firebase";
import Input from "../../components/inputs";
import Button from "../../components/buttons";
import { RootStackParmList } from "../../navigations/rootStackParams";
import useAuthentication from "../../utils/hooks/useAuthentication";
import { db } from "../../configure/firebase";

type userScreenProp = StackNavigationProp<RootStackParmList, "Farms">;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const FarmForm = () => {
  const [imgUri, setImageUri] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<userScreenProp>();
  const { user } = useAuthentication();
  const uid = user?.uid;
  const farmFormValidationSchema = yup.object().shape({
    displayName: yup.string().required("required"),
    farmName: yup
      .string()
      .required("required")
      .test(
        "FarmNameValidation",
        "Error Message of Farm Name Validation",
        async (item, testContext) => {
          return new Promise((resolve) => {
            if (!item) resolve(false);

            db.collection("farms")
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  if (doc.data().uid === uid && doc.data().farmName === item) {
                    alert(
                      "the FarmName is Existing,Please try as another name"
                    );
                    resolve(false);
                  } else {
                    resolve(true);
                  }
                });
              });
          });
        }
      ),
    phoneNumber: yup.string().matches(phoneRegExp, "Phone number"),
    hours: yup.string(),
  });
  const createFarm = async (value: any) => {
    setLoading(true);
    try {
      const requestBody = { ...value, uid };
      if (!!imgUri) {
        const imgId = await uploadImagetoFirestorage(imgUri);
        requestBody.imgId = imgId;
      }
      db.collection("farms").doc().set(requestBody);
      console.log("values:", value);
      navigation.navigate("Farms");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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

  //upload image to fireStorage

  const uploadImagetoFirestorage = async (uri: string) => {
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log("err", e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const fileRef = firebase.storage().ref().child(uuidv4());

    // await uploadBytes(fileRef, blob);
    const snapshot = await fileRef.put(blob, { contentType: "image/png" });

    const remoteURL = await snapshot.ref.getDownloadURL();

    // We're done with the blob, close and release it
    // blob.close();

    return remoteURL;
  };

  return (
    <SafeAreaView style={styles.mainBody}>
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
        onSubmit={(value) => createFarm(value)}
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
              {loading && <ActivityIndicator size="large" color="white" />}
              {!!imgUri ? (
                <Image
                  source={{ uri: imgUri }}
                  style={{ width: 100, height: 100 }}
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
    </SafeAreaView>
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
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    marginBottom: 10,
  },
});
