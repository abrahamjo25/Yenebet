import React, { createContext } from 'react';
import secureLocalStorage from 'react-secure-storage';

export const MyContext = createContext({});
export const YenebetContextProvider = ({ children }) => {

    const username = JSON.parse(secureLocalStorage.getItem('user'))?.username || '';
    const token = JSON.parse(secureLocalStorage.getItem('user'))?.token || '';
    const exp = JSON.parse(secureLocalStorage.getItem('user'))?.expiration || '';
    
    return <MyContext.Provider value={{ username, token, exp }}>{children}</MyContext.Provider>;
};
