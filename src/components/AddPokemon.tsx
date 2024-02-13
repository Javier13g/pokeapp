import * as React from "react";
import { useState } from "react";

export const AddPokemon = ({ setPokemons }: { setPokemons: any }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim().length > 2) {
            setPokemons((prevPokemons: string[]) => [...prevPokemons, inputValue]);
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="webflow-style-input">
                    <input
                        className=""
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="What pokemon are you looking for?"
                    />
                </div>
            </div>
        </form>
    );
};