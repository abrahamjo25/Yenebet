import React, { createContext, useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';

export const MyContext = createContext({});
export const YenebetContextProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [exp, setExp] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [invite, setInvite] = useState('');
    useEffect(() => {
        setUsername(JSON.parse(secureLocalStorage.getItem('user'))?.username || '');
        setToken(JSON.parse(secureLocalStorage.getItem('user'))?.token || '');
        setExp(JSON.parse(secureLocalStorage.getItem('user'))?.expiration || '');
        setIsAuthenticated(secureLocalStorage.getItem('isAuthenticated') || false);
        setInvite(secureLocalStorage.getItem('inviteCode') || '');
    }, [username, token, exp, isAuthenticated, invite]);
    return <MyContext.Provider value={{ username, token, exp, isAuthenticated, invite }}>{children}</MyContext.Provider>;
};
