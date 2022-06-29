import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import firebase from "firebase";
import Button from "../../components/buttons";
import { db } from "../../configure/firebase";
import { FarmFormValues } from "../../utils/types";

interface Props {
  uid: string | undefined;
}

const Empty = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "red" }}>No Farms, Create Farms</Text>
    </View>
  );
};

const FarmLists = (props: Props) => {
  const [farmData, setFarmData] = useState<FarmFormValues[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const uid = props.uid;

  useEffect(() => {
    const getFarms = () => {
      setLoading(true);
      console.log("uid_???", uid);
      // get Data from firebase no real time
      // db.collection("farms")
      //   .get()
      //   .then((querySnapshot) => {
      //     let temp: any = [];
      //     querySnapshot.forEach((doc) => {
      //       if (doc.data().uid === uid) temp.push(doc.data() as FarmFormValues);
      //     });
      //     setFarmData(temp);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
      db.collection("farms").onSnapshot((querySnapshot) => {
        // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        let temp: any = [];
        querySnapshot.forEach((doc) => {
          console.log("docdata:", doc.data());
          if (doc.data().uid === uid) temp.push(doc.data() as FarmFormValues);
        });
        setFarmData(temp);
      });
      setLoading(false);
    };
    if (isFocused) {
      getFarms();
    }
  }, [isFocused]);
  const _renderItem = ({ item }: { item: FarmFormValues }) => {
    return (
      <View style={styles.itemBody}>
        <View style={{ flex: 1 }}>
          {item.imgId ? (
            <Image
              source={{ uri: item.imgId }}
              resizeMode="stretch"
              style={{ width: 80, height: 80 }}
            />
          ) : (
            <Image
              source={require("../../../assets/Image/noImage.png")}
              resizeMode="cover"
              style={{ width: 80, height: 80 }}
            />
          )}
        </View>

        <View style={{ flex: 2, justifyContent: "center" }}>
          <Text>DisplayName: {item.displayName}</Text>
          <Text>FarmName: {item.farmName}</Text>
          <Text>PhoneNumber: {item.phoneNumber}</Text>
          <Text>Hours: {item.hours}</Text>
        </View>
      </View>
    );
  };
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("You are logged out");
      })
      .catch((e) => console.log(e));
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      {loading && <ActivityIndicator size="large" />}
      {farmData.length > 0 ? (
        <FlatList data={farmData} renderItem={_renderItem} />
      ) : (
        <Empty />
      )}
      <Button
        testId="click_signout"
        title="Sign Out"
        handleSubmitPress={() => signOut()}
      />
    </SafeAreaView>
  );
};

export default FarmLists;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    marginTop: 20,
  },
  itemBody: {
    flex: 1,
    flexDirection: "row",

    borderColor: "#7DE24E",
    borderWidth: 1,
  },
});
