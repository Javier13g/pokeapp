import * as React from "react";
import { useState } from "react";
import { AddPokemon } from "./components/AddPokemon";
import { PokeGrid } from "./components/PokeGrid";

const PokeApp = () => {
    const [pokemons, setPokemons] = useState<string[]>([]);
    console.log("const", pokemons)

    return (
        <>
            <h2>PokeApp</h2>
            <AddPokemon setPokemons={setPokemons} />
            <hr />
            <ol>
                {pokemons.map((poke, index) => (
                    <PokeGrid
                        key={index} 
                        Pokemon={poke.toLowerCase()}
                    />
                ))}
            </ol>
        </>
    )
}

export default PokeApp;