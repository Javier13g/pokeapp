//import React, { useEffect, useState } from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { PokemonData, TypeColor, WeaknessesAndStrengthsData } from "../interfaces/interfaces";
import { Button } from "@mui/material";

export const PokeGrid = ({ Pokemon }: { Pokemon: any }) => {
    const [dataP, setData] = useState<PokemonData | null>(null);

    const [DataWeaknessesAndStrengths, setDataWeaknessesAndStrengths] = useState<WeaknessesAndStrengthsData>({
        doubleDamageFrom: [],
        doubleDamageTo: [],
        halfDamageFrom: [],
        halfDamageTo: [],
        noDamageFrom: [],
        noDamageTo: []
    });
    const [error, setError] = useState(false);

    const [isFlipped, setIsFlipped] = useState(false);

    const [pokeMoves, setPokeMoves] = useState([]);
    console.log("set", pokeMoves)

    const typeColor: TypeColor = {
        bug: "#26de81",
        dragon: "#ffeaa7",
        electric: "#fed330",
        fairy: "#FF0069",
        fighting: "#30336b",
        fire: "#f0932b",
        flying: "#81ecec",
        grass: "#00b894",
        ground: "#EFB549",
        ghost: "#a55eea",
        ice: "#74b9ff",
        normal: "#95afc0",
        poison: "#6c5ce7",
        psychic: "#a29bfe",
        rock: "#2d3436",
        water: "#0190FF",
        dark: "#21232a",
        steel: "#e3e4e5"
    };

    useEffect(() => {
        getDataPoke();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Pokemon])

    useEffect(() => {
        async function WeaknessesAndStrengths(pokemonData: PokemonData | null) {
            if (!pokemonData) {
                return;
            }

            const { type } = pokemonData;
            const url = `https://pokeapi.co/api/v2/type/${type}`;
            const resp = await fetch(url);
            const data = await resp.json();
            const { damage_relations } = data ?? {};
            const { double_damage_from } = damage_relations ?? {};
            const { double_damage_to } = damage_relations ?? {};
            const { half_damage_from } = damage_relations ?? {};
            const { half_damage_to } = damage_relations ?? {};
            const { no_damage_from } = damage_relations ?? {};
            const { no_damage_to } = damage_relations ?? {};

            let dataWeaknessesAndStrengths = {
                doubleDamageFrom: double_damage_from,
                doubleDamageTo: double_damage_to,
                halfDamageFrom: half_damage_from,
                halfDamageTo: half_damage_to,
                noDamageFrom: no_damage_from,
                noDamageTo: no_damage_to
            };

            setDataWeaknessesAndStrengths(dataWeaknessesAndStrengths);
        }

        WeaknessesAndStrengths(dataP);
    }, [dataP]);


    const handleCardFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const getTypeColor = (type: string): string => {
        const lowercaseType = type.toLowerCase();
        return typeColor[lowercaseType] || '#000000'; // Si el tipo no está definido, devuelve negro
    };

    const getDataPoke = async () => {
        const urlMain = `https://pokeapi.co/api/v2/pokemon-species/${Pokemon.toLowerCase()}`;
        try {
            const respMain = await axios.get(urlMain);
            const { varieties } = respMain.data;

            const urlDataPokeMain = varieties[0].pokemon.url;
            const respDataPokeMain = await axios.get(urlDataPokeMain);
            const dataPokeMain = respDataPokeMain.data;

            const dataPoke = {
                id: dataPokeMain.id,
                name: dataPokeMain.name,
                img: (dataPokeMain.sprites.other.showdown.front_default == null) ? dataPokeMain.sprites.other.home.front_default : dataPokeMain.sprites.other.showdown.front_default,
                hp: dataPokeMain.stats[0].base_stat,
                attack: dataPokeMain.stats[1].base_stat,
                defense: dataPokeMain.stats[2].base_stat,
                speed: dataPokeMain.stats[5].base_stat,
                type: dataPokeMain.types[0].type.name,
                type2: (dataPokeMain.types[1] && dataPokeMain.types[1].type.name) ? dataPokeMain.types[1].type.name : null,
                //typeColor: typeColor[dataPokeMain.types[0].type.name], getTypeColor
                typeColor: getTypeColor(dataPokeMain.types[0].type.name),
                typeColor2: (dataPokeMain.types[1] && dataPokeMain.types[1].type.name) ? getTypeColor(dataPokeMain.types[1].type.name) : null

            };
            await setData(dataPoke);
            await setPokeMoves(dataPokeMain.moves)

            setError(false);
            const notify = () => toast.success(`${dataPokeMain.name} has been captured!`, {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            notify();
        } catch (error) {
            const notify = () => toast.error(`${error}`, {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            notify();
            setError(true);
        }
    };

    if (error) {
        return (<>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>);
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div id="container">
                <div id="card" className={isFlipped ? 'flipped' : ''}>
                    <div>
                        {!isFlipped && (
                            <div className="card-front">
                                <p className="hp">
                                    <span>HP: </span>
                                    {dataP?.hp}
                                </p>
                                <img src={dataP?.img} alt={`Imagen de ${Pokemon}`} />
                                <h2 className="poke-name">{Pokemon}</h2>
                                <div className="types">
                                    <span style={{ backgroundColor: dataP?.typeColor ?? 'transparent' }}>{dataP?.type}</span>
                                    {dataP?.type2 && <span style={{ backgroundColor: dataP?.typeColor2 ?? 'transparent' }}>{dataP?.type2}</span>}
                                </div>

                                <div className="stats">
                                    <div>
                                        <h3>{dataP?.attack}</h3>
                                        <p>Attack</p>
                                    </div>
                                    <div>
                                        <h3>{dataP?.defense}</h3>
                                        <p>Defense</p>
                                    </div>
                                    <div>
                                        <h3>{dataP?.speed}</h3>
                                        <p>Speed</p>
                                    </div>
                                </div>
                                <div>
                                    <Button variant="contained" sx={{ marginRight: '10px' }}>
                                        <Link to={"/pokeapp/pokemonmoves"} state={{ pokeMoves: pokeMoves }} style={{ color: 'white' }}>Moves</Link>
                                    </Button>
                                    {/* <button onClick={() => handleCardFlip()}>Voltear</button> */}
                                    <Button variant="contained" onClick={() => handleCardFlip()}>Flip</Button>
                                </div>
                            </div>)}
                    </div>

                    {isFlipped && (
                        <div className="card-back">
                            <div>
                                <h5>Double damage from:</h5>
                                <span>
                                    {DataWeaknessesAndStrengths.doubleDamageFrom.map((type, index) => (
                                        <span key={type.name}>
                                            {index > 0 && ' '}
                                            <span style={{
                                                backgroundColor: getTypeColor(type.name.toLowerCase()),
                                                borderRadius: "20px", padding: "5px 20px", display: "inline-block",
                                                marginBottom: "5px"
                                            }}>
                                                {type.name}
                                            </span>
                                        </span>
                                    ))}
                                </span>
                            </div>
                            <div>
                                <h5>Double damage to:</h5>
                                <span>
                                    {DataWeaknessesAndStrengths.doubleDamageTo.map((type, index) => (
                                        <span key={type.name}>
                                            {index > 0 && ' '}
                                            <span style={{
                                                backgroundColor: getTypeColor(type.name.toLowerCase()),
                                                borderRadius: "20px", padding: "5px 20px", display: "inline-block",
                                                marginBottom: "5px"
                                            }}>
                                                {type.name}
                                            </span>
                                        </span>
                                    ))}
                                </span>
                            </div>
                            <div>
                                <h5>Half damage from:</h5>
                                <span>
                                    {DataWeaknessesAndStrengths.halfDamageFrom.map((type, index) => (
                                        <span key={type.name}>
                                            {index > 0 && ' '}
                                            <span style={{
                                                backgroundColor: getTypeColor(type.name.toLowerCase()),
                                                borderRadius: "20px", padding: "5px 20px", display: "inline-block",
                                                marginBottom: "5px"
                                            }}>
                                                {type.name}
                                            </span>
                                        </span>
                                    ))}
                                </span>
                            </div>
                            <div>
                                <h5>Half damage to:</h5>
                                <span>
                                    {DataWeaknessesAndStrengths.halfDamageTo.map((type, index) => (
                                        <span key={type.name}>
                                            {index > 0 && ' '}
                                            <span style={{
                                                backgroundColor: getTypeColor(type.name.toLowerCase()),
                                                borderRadius: "20px", padding: "5px 20px", display: "inline-block",
                                                marginBottom: "5px"
                                            }}>
                                                {type.name}
                                            </span>
                                        </span>
                                    ))}
                                </span>
                            </div>
                            <div>
                                <h5>No damage from:</h5>
                                <span>
                                    {DataWeaknessesAndStrengths.noDamageFrom.map((type, index) => (
                                        <span key={type.name}>
                                            {index > 0 && ' '}
                                            <span style={{
                                                backgroundColor: getTypeColor(type.name.toLowerCase()),
                                                borderRadius: "20px", padding: "5px 20px", display: "inline-block",
                                                marginBottom: "5px"
                                            }}>
                                                {type.name}
                                            </span>
                                        </span>
                                    ))}
                                </span>
                            </div>

                            <div>
                                <h5>No damage to:</h5>
                                <span>
                                    {DataWeaknessesAndStrengths.noDamageTo.map((type, index) => (
                                        <span key={type.name}>
                                            {index > 0 && ', '}
                                            <span style={{
                                                backgroundColor: getTypeColor(type.name.toLowerCase()),
                                                borderRadius: "20px", padding: "5px 20px"
                                            }}>
                                                {type.name}
                                            </span>
                                        </span>
                                    ))}
                                </span>
                            </div>
                            <div>
                                <Button variant="contained" sx={{ marginRight: '10px' }}>
                                    <Link to={"/pokeapp/pokemonmoves"} state={{ pokeMoves: pokeMoves }} style={{ color: 'white' }}>Moves</Link>
                                </Button>
                                {/* <button onClick={() => handleCardFlip()}>Voltear</button> */}
                                <Button variant="contained" onClick={() => handleCardFlip()}>Flip</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}