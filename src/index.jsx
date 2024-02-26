import React from 'react';
//import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import './index.scss';
import PokeApp from './PokeApp';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from './ErrorPage'
import PokemonMoves from './components/PokemonMoves'

const router = createBrowserRouter([
    {
        path: "pokeapp/search",
        element: <PokeApp />,
        errorElement: <ErrorPage />,
        // children: [
        //     {
        //         path: "pokemonmoves",
        //         element: <PokemonMoves />,
        //     }
        // ]
    },
    {
        path: "pokeapp/pokemonmoves",
        element: <PokemonMoves />,
        errorElement: <ErrorPage />,
    },
]);

const root = createRoot(document.getElementById('root'));
root.render(
    //<PokeApp />
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
