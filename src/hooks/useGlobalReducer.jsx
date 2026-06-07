import React, { createContext, useState, useRef, useEffect } from "react";
import getState from "../store";

export const Context = createContext(null);

const STORAGE_KEY = "swStore";

const getInitialStore = () => {
    const base = {
        people: [],
        planets: [],
        vehicles: [],
        favorites: []
    };

    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? { ...base, ...JSON.parse(saved) } : base;
    } catch {
        return base;
    }
};

export const StoreProvider = ({ children }) => {
    const [store, setStore] = useState(getInitialStore);

    // Guardamos el store en localStorage para no volver a pedir la API al recargar.
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }, [store]);

    // Guardamos siempre el store actual en un ref para que las acciones
    // lean el valor más reciente y no una versión "congelada".
    const storeRef = useRef(store);
    storeRef.current = store;

    const actionsRef = useRef(null);
    if (!actionsRef.current) {
        actionsRef.current = getState({
            getStore: () => storeRef.current,
            getActions: () => actionsRef.current,
            setStore: updatedStore =>
                setStore(prev => ({ ...prev, ...updatedStore }))
        }).actions;
    }

    return (
        <Context.Provider value={{ store, actions: actionsRef.current }}>
            {children}
        </Context.Provider>
    );
};
