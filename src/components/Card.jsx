import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";

export const Card = ({ item, type }) => {
    const { store, actions } = useContext(Context);

    const isFavorite = store.favorites?.some(
        f => f.uid === item.uid && f.type === type
    );

    const handleToggleFavorite = () => {
        if (isFavorite) {
            actions.removeFavorite(item.uid, type);
        } else {
            actions.addFavorite({
                uid: item.uid,
                name: item.name,
                type: type
            });
        }
    };

    return (
        <div className="card bg-dark text-light me-3 card-sw">
            <div className="card-img-wrapper">
                <img
                    src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/${type}/${item.uid}.jpg?raw=true`}
                    className="card-img-top"
                />

                <button
                    className="favorite-heart"
                    onClick={handleToggleFavorite}
                    aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                    <i className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-heart`}></i>
                </button>
            </div>

            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>

                <Link to={`/details/${type}/${item.uid}`} className="btn btn-outline-warning">
                    Details
                </Link>
            </div>
        </div>
    );
};
