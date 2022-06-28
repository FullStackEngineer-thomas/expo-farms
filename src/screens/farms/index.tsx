import React, { useContext } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Button from "../../components/buttons";

import { RootStackParmList } from "../../navigations/rootStackParams";
import FarmLists from "./farmLists";

import UserContext from "../../contexts";

type userScreenProp = StackNavigationProp<RootStackParmList, "Farms">;

const Farms = () => {
  const navigation = useNavigation<userScreenProp>();
  const uid = useContext(UserContext);
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 10, marginHorizontal: 20 }}>
      <Button
        title="create Farm"
        handleSubmitPress={() => navigation.navigate("FarmForm")}
      />
      <FarmLists uid={uid?.uid} />
    </SafeAreaView>
  );
};

export default Farms;
