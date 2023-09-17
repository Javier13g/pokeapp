import React, { useState } from "react";

export const AddPokemon = ({ setPokemons }) => {

    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log('e', e)
        if(inputValue.trim().length > 2)
        {
            setPokemons([inputValue]);
            setInputValue('')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="webflow-style-input">
                    <input className="" type="text" value={inputValue}
                        onChange={handleInputChange} placeholder="What pokemon are you looking for?"></input>
                </div>
            </div>
        </form>
    )
}