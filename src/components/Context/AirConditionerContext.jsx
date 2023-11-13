// AirConditionerContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AirConditionerContext = createContext();

export function useAirConditioner() {
    return useContext(AirConditionerContext);
}

export function AirConditionerProvider({ children }) {
    const [airConditionerSettings, setAirConditionerSettings] = useState({
        desiredTemp: 24,
        fanSpeed: 1,
    });

    return (
        <AirConditionerContext.Provider value={{ airConditionerSettings, setAirConditionerSettings }}>
            {children}
        </AirConditionerContext.Provider>
    );
}
