import React, { createContext, useState, useEffect } from "react";

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState("");

    useEffect(() => {
        const currentAuth = localStorage.getItem("isAuthenticated");

        if (currentAuth !== isAuthenticated) setIsAuthenticated(currentAuth);
    }, [isAuthenticated]);

    const handleAuthentication = (isAuthenticated) => {
        setIsAuthenticated(isAuthenticated);
        localStorage.setItem("isAuthenticated", isAuthenticated);
    };

    const handleLogOut = async () => {
        const API_URL = "/api/v1/accounts/logout/";

        const response = await fetch(API_URL, {
            method: "POST",
        });

        if (response.ok) {
            localStorage.clear();
            window.location.replace("/");
        }
    };

    return (
        <AuthenticationContext.Provider
            value={{ isAuthenticated, handleAuthentication, handleLogOut }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationContextProvider;
