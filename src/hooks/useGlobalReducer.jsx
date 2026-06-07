import React, { createContext, useState, useEffect } from "react";
import getState from "../store";

export const Context = createContext(null);

export const StoreProvider = ({ children }) => {
    const [state, setState] = useState({
        store: {},
        actions: {}
    });

    useEffect(() => {
        const initialState = getState({
            getStore: () => state.store,
            getActions: () => state.actions,
            setStore: updatedStore =>
                setState(prev => ({
                    store: { ...prev.store, ...updatedStore },
                    actions: { ...prev.actions }
                }))
        });

        setState(initialState);
    }, []);

    if (!state.store.favorites) return null;

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );
};
