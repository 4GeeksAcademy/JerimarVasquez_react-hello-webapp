// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "details/:type/:uid",
                element: <Single />
            },
            {
                path: "*",
                element: <h1>Not found</h1>
            }
        ]
    }
]);
