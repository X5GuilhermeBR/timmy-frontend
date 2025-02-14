import { createContext, useEffect, useState } from "react";
import { AuthContextProps, AuthProviderProps } from "./types";

export const AuthContext = createContext<AuthContextProps>({
    authenticated: false,
    logout: () => { },
    checkAuth: () => { },
    login: () => false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [authenticated, setAuthenticated] = useState<boolean>(JSON.parse(localStorage.getItem('authenticated') || 'false'));

    const login = (user: string, password: string) => {

        if (user === import.meta.env.VITE_USER && password === import.meta.env.VITE_PASSWORD) {
            localStorage.setItem("authenticated", JSON.stringify(true));
            setAuthenticated(true);
            return true;
        }

        return false;
    }

    const logout = () => {
        localStorage.removeItem('authenticated');
        setAuthenticated(false);
    }

    const checkAuth = () => {
        const storedAuth = localStorage.getItem('authenticated');

        if (storedAuth) {
            setAuthenticated(JSON.parse(storedAuth));
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    return (<AuthContext.Provider value={{ authenticated, login, logout, checkAuth }}>
        {children}
    </AuthContext.Provider>)
}
