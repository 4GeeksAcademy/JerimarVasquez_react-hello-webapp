import React, { useContext, useEffect } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadPeople();
        actions.loadPlanets();
        actions.loadVehicles();
    }, []);

    return (
        <div className="container mt-4">

            {/* PEOPLE */}
            <h2 className="text-warning">Characters</h2>
            <div className="scroll-container">
                {store.people?.map((item) => (
                    <Card key={item.uid} item={item} type="people" />
                ))}
            </div>

            {/* PLANETS */}
            <h2 className="text-warning mt-5">Planets</h2>
            <div className="scroll-container">
                {store.planets?.map((item) => (
                    <Card key={item.uid} item={item} type="planets" />
                ))}
            </div>

            {/* VEHICLES */}
            <h2 className="text-warning mt-5">Vehicles</h2>
            <div className="scroll-container">
                {store.vehicles?.map((item) => (
                    <Card key={item.uid} item={item} type="vehicles" />
                ))}
            </div>

        </div>
    );
};
