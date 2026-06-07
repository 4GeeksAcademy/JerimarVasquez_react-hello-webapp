import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";

export const Card = ({ item, type }) => {
    const { actions } = useContext(Context);

    return (
        <div className="card bg-dark text-light me-3 card-sw">
            <img
                src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/${type}/${item.uid}.jpg?raw=true`}
                className="card-img-top"
            />

            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>

                <div className="d-flex justify-content-between">
                    <Link to={`/details/${type}/${item.uid}`} className="btn btn-outline-warning">
                        Details
                    </Link>

                    <button
                        className="btn btn-warning"
                        onClick={() =>
                            actions.addFavorite({
                                uid: item.uid,
                                name: item.name,
                                type: type
                            })
                        }
                    >
                        ❤️
                    </button>
                </div>
            </div>
        </div>
    );
};