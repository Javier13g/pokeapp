import React, {useEffect, useState} from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PokeGrid = ({Pokemon}) => {
    const [dataP, setData] = useState([]);
    const [DataWeaknessesAndStrengths, setDataWeaknessesAndStrengths] = useState([]);
    const [error, setError] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    useEffect(() => {
        getDataPoke();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        WeaknessesAndStrengths(dataP);
    }, [dataP])

    //console.log("DataWeaknessesAndStrengths", DataWeaknessesAndStrengths)

    const handleToggleInfo = () => {
        setShowMoreInfo(!showMoreInfo); // Cambiar el estado
    };

    const handleCardFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const typeColor = {
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

    const getDataPoke = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon/${Pokemon.toLowerCase()}`;
        const resp = await fetch(url);

        if (!resp.ok) {
            const notify = () => toast.error(` Error ${resp.status}!, pokemon not found `, {
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
            setError(true)
            return;
        } else {
            const data = await resp.json();
            //console.log('data', data)
            let dataPoke = {
                id: data.id,
                name: data.name,
                img: (data.sprites.other.dream_world.front_default == null) ? data.sprites.other.home.front_default : data.sprites.other.dream_world.front_default,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                type: data.types[0].type.name,
                type2: (data.types[1] && data.types[1].type.name) ? data.types[1].type.name : null,
                typeColor: typeColor[data.types[0].type.name],
                typeColor2: (data.types[1] && data.types[1].type.name) ? typeColor[data.types[1].type.name] : null
            }
            //alert('se pudo')
            await setData(dataPoke)
            setError(false)
            const notify = () => toast.success(`${data.name} has been captured!`, {
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
        }
    }

    async function WeaknessesAndStrengths(pokemonData) {
        const {type} = pokemonData
        const url = `https://pokeapi.co/api/v2/type/${type}`;
        const resp = await fetch(url);
        const data = await resp.json();
        const {damage_relations} = data ?? {};
        const {double_damage_from} = damage_relations ?? {};
        const {double_damage_to} = damage_relations ?? {};
        const {half_damage_from} = damage_relations ?? {};
        const {half_damage_to} = damage_relations ?? {};
        const {no_damage_from} = damage_relations ?? {};
        const {no_damage_to} = damage_relations ?? {};
        /*console.log("double_damage_from: ", damage_relations);
        console.log("Vulnerable: ", double_damage_from);
        console.log("Eficaz contra: ", double_damage_to);
        console.log("Normal contra: ", half_damage_from);
        console.log("Muy Debil contra: ", half_damage_to);*/

        let dataWeaknessesAndStrengths = {
            doubleDamageFrom: double_damage_from,
            doubleDamageTo: double_damage_to,
            halfDamageFrom: half_damage_from,
            halfDamageTo: half_damage_to,
            noDamageFrom: no_damage_from,
            noDamageTo: no_damage_to
        }
        setDataWeaknessesAndStrengths(dataWeaknessesAndStrengths);
    }

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
                <div id="card" className={isFlipped ? 'flipped' : ''} onClick={handleCardFlip}>
                    {!isFlipped && (
                        <div className="card-front">
                            <p className="hp">
                                <span>HP: </span>
                                {dataP.hp}
                            </p>
                            <img src={dataP.img} alt={`Imagen de ${Pokemon}`}/>
                            <h2 className="poke-name">{Pokemon}</h2>
                            <div className="types">
                                <span style={{backgroundColor: dataP.typeColor}}>{dataP.type}</span>
                                {dataP.type2 && <span style={{backgroundColor: dataP.typeColor2}}>{dataP.type2}</span>}
                            </div>
                            <div className="stats">
                                <div>
                                    <h3>{dataP.attack}</h3>
                                    <p>Attack</p>
                                </div>
                                <div>
                                    <h3>{dataP.defense}</h3>
                                    <p>Defense</p>
                                </div>
                                <div>
                                    <h3>{dataP.speed}</h3>
                                    <p>Speed</p>
                                </div>
                            </div>
                        </div>)}
                    {isFlipped && (
                        <div className="card-back">
                            <div>
                                <h5>Double damage from:</h5>
                                <span>
                                   {DataWeaknessesAndStrengths.doubleDamageFrom.map((type, index) => (
                                       <span key={type.name}>
                                  {index > 0 && ' '}
                                           <span style={{ backgroundColor: typeColor[type.name.toLowerCase()],
                                               borderRadius: "20px", padding: "5px 20px", display: "inline-block",
                                               marginBottom: "5px"}}>
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
                                           <span style={{ backgroundColor: typeColor[type.name.toLowerCase()],
                                               borderRadius: "20px", padding: "5px 20px", display: "inline-block",
                                               marginBottom: "5px"}}>
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
                                           <span style={{ backgroundColor: typeColor[type.name.toLowerCase()],
                                               borderRadius: "20px", padding: "5px 20px", display: "inline-block",
                                               marginBottom: "5px"}}>
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
                                           <span style={{ backgroundColor: typeColor[type.name.toLowerCase()],
                                               borderRadius: "20px", padding: "5px 20px", display: "inline-block",
                                               marginBottom: "5px"}}>
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
                                           <span style={{ backgroundColor: typeColor[type.name.toLowerCase()],
                                               borderRadius: "20px", padding: "5px 20px", display: "inline-block",
                                               marginBottom: "5px"}}>
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
                                   <span style={{ backgroundColor: typeColor[type.name.toLowerCase()],
                                       borderRadius: "20px", padding: "5px 20px"}}>
                                     {type.name}
                                  </span>
                                </span>
                                  ))}
                              </span>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </>
    )
}