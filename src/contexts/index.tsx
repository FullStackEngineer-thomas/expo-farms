import { createContext } from "react";

type UserContextType = {
  uid: string;
};

const UserContext = createContext<UserContextType | null>(null);
export default UserContext;
