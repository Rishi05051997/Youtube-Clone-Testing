import { createContext, useContext, useReducer, useState } from "react";
import { AuthReducer } from "../Reducer/AuthReducer";

const intialStateVal = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

const authContext = createContext(intialStateVal);

const AuthProvider = ({ children }) => {
    const [userState, userDispatch] = useReducer(AuthReducer, intialStateVal);

    const [login, setLogin] = useState(JSON.parse(localStorage.getItem("login")) || false);
    const [showMsg, setShowMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    return (
        <authContext.Provider value={{ userState, userDispatch, login, setLogin, showMsg, setShowMsg, errorMsg, setErrorMsg }}>
            {
                children
            }
        </authContext.Provider>)
}

const useAuth = () => useContext(authContext);

export { intialStateVal, useAuth, AuthProvider }