// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container">
      <ul className="list-group">
        {/* Map over the 'todos' array from the store and render each item as a list element */}
        {store && store.todos?.map((item) => {
          // Check whether this item is already saved as a favorite.
          const isFavorite = store.favorites?.some((fav) => fav.id === item.id);

          return (
            <li
              key={item.id}  // React key for list items.
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ background: item.background }}>

              {/* Link to the detail page of this todo. */}
              <Link to={"/single/" + item.id}>Link to: {item.title} </Link>

              <p>Open file ./store.js to see the global store that contains and updates the list of colors</p>

              <div className="d-flex gap-2">
                <button className="btn btn-success"
                  onClick={() => dispatch({
                    type: "add_task",
                    payload: { id: item.id, color: '#ffa500' }
                  })}>
                  Change Color
                </button>

                {/* Toggle this item in/out of the favorites list. */}
                <button
                  className={isFavorite ? "btn btn-warning" : "btn btn-outline-warning"}
                  onClick={() => dispatch({
                    type: "toggle_favorite",
                    payload: { id: item.id, title: item.title }
                  })}>
                  <i className={isFavorite ? "fas fa-star" : "far fa-star"} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <br />

      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
