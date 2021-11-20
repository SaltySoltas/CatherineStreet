import {createContext} from "react";
import { User } from "./constants/types";

export const UserContext = createContext(null as User);
export const UserProvider = UserContext.Provider;