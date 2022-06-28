import React from "react";
import UserContext from "../contexts";
import useAuthentication from "../utils/hooks/useAuthentication";
import AuthStack from "./authStack";
import UserStack from "./userStack";

const RootNavigation = () => {
  const { user } = useAuthentication();
  console.log("userddd", user);
  // if (user === null) return <></>;
  return (
    <UserContext.Provider value={{ uid: user?.uid || "" }}>
      {user ? <UserStack /> : <AuthStack />}
    </UserContext.Provider>
  );
};

export default RootNavigation;
