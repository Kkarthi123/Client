import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [userInfo, setUserInfo] = useState(null);

    const login = (info)=>{
        AsyncStorage.setItem("authInfo", JSON.stringify(info));
        setUserInfo(info)
    }

    const logOut = ()=>{
        AsyncStorage.removeItem("authInfo");
        setUserInfo(null)
    }


    return(
        <AuthContext.Provider value={{userInfo, login, logOut}}>{children}</AuthContext.Provider>
    )
}
             
