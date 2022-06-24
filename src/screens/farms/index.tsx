import React from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Button from "../../components/buttons";

import { RootStackParmList } from "../../navigations/rootStackParams";

type userScreenProp = StackNavigationProp<RootStackParmList, "Farms">;

const Farms = () => {
  const navigation = useNavigation<userScreenProp>();
  return (
    <View>
      <Button
        title="create Farm"
        handleSubmitPress={() => navigation.navigate("FarmForm")}
      />
    </View>
  );
};

export default Farms;
