import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-dark bg-dark px-4">
            <Link to="/" className="navbar-brand text-warning fw-bold">
                StarWars Blog
            </Link>

            <div className="dropdown">
                <button
                    className="btn btn-warning dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                >
                    Favorites ({store.favorites.length})
                </button>

                <ul className="dropdown-menu dropdown-menu-end p-2" style={{ minWidth: "220px" }}>
                    {store.favorites.length === 0 ? (
                        <li className="dropdown-item text-muted">(empty)</li>
                    ) : (
                        store.favorites.map((fav, index) => (
                            <li
                                key={index}
                                className="dropdown-item d-flex justify-content-between align-items-center"
                            >
                                <Link
                                    to={`/details/${fav.type}/${fav.uid}`}
                                    className="text-decoration-none"
                                >
                                    {fav.name}
                                </Link>

                                <button
                                    className="btn btn-sm btn-outline-danger ms-2"
                                    onClick={() => actions.removeFavorite(fav.uid, fav.type)}
                                >
                                    X
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
};
