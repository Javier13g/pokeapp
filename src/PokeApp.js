import React, { useState } from "react";
import { AddPokemon } from "./components/AddPokemon";
import { PokeGrid } from "./components/PokeGrid";
const PokeApp = () => {

    const [pokemons, setPokemons] = useState([])

    // function addPoke()
    // {
    //     setPokemons([...pokemons, 'Pikachu']);
    //     console.log(pokemons)
    // }
    return (
        <>
            <h2>PokeApp</h2>
            <AddPokemon setPokemons={setPokemons} />
            <hr />
            <ol>
                {
                    pokemons.map(poke => {
                        //console.log(poke);
                        return <PokeGrid
                        key={poke} 
                        Pokemon={poke.toLowerCase()}/>
                    })
                }
            </ol>
        </>
    )
}

export default PokeApp