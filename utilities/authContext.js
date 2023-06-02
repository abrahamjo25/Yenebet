import React from "react";

const AuthContext = React.createContext();

const { Provider } = AuthContext;

export const AuthProvider = ({ children }) => {
    const [privileges, setPrivileges] = React.useState([])
    const [fullname, setFullname] = React.useState();
    const [username, setUsername] = React.useState();
    const [idToken, setIdToken] = React.useState();

    const togglePrivileges = (values) => setPrivileges(values)
    const toggleFullname = (value) => setFullname(value);
    const toggleUsername = (value) => setUsername(value);
    const toggleIdToken = (value) => setIdToken(value);

    return (
        <Provider value={{
            privileges, togglePrivileges,
            fullname, toggleFullname,
            username, toggleUsername,
            idToken, toggleIdToken
        }}>
            {children}
        </Provider>
    )
}

export const toggleAuth = (auth) => {
    auth?.togglePrivileges(localStorage.getItem("roles"))
    auth?.toggleFullname(localStorage.getItem("fullname"));
    auth?.toggleUsername(localStorage.getItem("username"));
    auth?.toggleIdToken(localStorage.getItem("tokenCollection")?.idToken)
}

export const useAuth = () => React.useContext(AuthContext)