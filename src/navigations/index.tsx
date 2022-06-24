import React from "react";
import useAuthentication from "../utils/hooks/useAuthentication";
import AuthStack from "./authStack";
import UserStack from "./userStack";

const RootNavigation = () => {
  const { user } = useAuthentication();
  return <>{user ? <UserStack /> : <AuthStack />}</>;
};

export default RootNavigation;
