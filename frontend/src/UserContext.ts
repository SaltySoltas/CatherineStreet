import React from "react";
import { User } from "./constants/types";

export const UserContext = React.createContext(null as User);
export const UserProvider = UserContext.Provider;