import { useEffect, useState } from "react";
import firebase from "firebase";

const useAuthentication = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user,
  };
};

export default useAuthentication;
