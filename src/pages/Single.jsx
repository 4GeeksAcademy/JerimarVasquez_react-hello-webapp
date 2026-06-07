import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Single = () => {
    const { type, uid } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadDetails = async () => {
            const resp = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
            const json = await resp.json();
            setData(json.result);
        };
        loadDetails();
    }, [type, uid]);

    if (!data) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
        <div className="container mt-5">
            <div className="row">

                {/* IMAGE */}
                <div className="col-md-4">
                    <img
                        className="img-fluid rounded"
                        src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/${type}/${uid}.jpg?raw=true`}
                    />
                </div>

                {/* DETAILS */}
                <div className="col-md-8">
                    <h1 className="text-warning">{data.properties.name}</h1>
                    <p className="text-light">{data.description}</p>

                    <ul className="list-group mt-4">
                        {Object.entries(data.properties).map(([key, value]) => (
                            <li key={key} className="list-group-item bg-dark text-light">
                                <strong>{key}: </strong> {value}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};
