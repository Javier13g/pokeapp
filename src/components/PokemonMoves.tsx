import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const PokemonMoves = () => {
    let { state } = useLocation();
    const movements = state.pokeMoves;
    const [pokeMoves, setPokeMoves] = useState([]);
    
    useEffect(() => {
        setPokeMoves(movements)
    }, [movements, state])

    console.log("after set", pokeMoves)
    return (
        <>
            <h1>Hola</h1>
        </>
    )
}

export default PokemonMoves;