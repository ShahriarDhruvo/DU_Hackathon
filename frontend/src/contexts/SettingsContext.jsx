import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

const SettingsContextProvider = (props) => {
    const [isAnimated, setIsAnimated] = useState(false);

    const changeIsAnimated = () => setIsAnimated(!isAnimated);

    return (
        <SettingsContext.Provider
            value={{ isAnimated, changeIsAnimated }}
        >
            {props.children}
        </SettingsContext.Provider>
    );
};

export default SettingsContextProvider;
