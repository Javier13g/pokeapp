import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PokeGrid = ({ Pokemon }) => {
    const [dataP, setData] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        getDataPoke();
    }, [])

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
        dark: "#21232a"
      };

    const getDataPoke = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon/${Pokemon.toLowerCase()}`;
        const resp = await fetch(url);
        
        if(!resp.ok) {
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
            //alert(`Error en la solicitud: Código de estado ${resp.status}`);
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
    
    if (error) {
        return null;
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
            <div id="card">
                {/* <h3> {Pokemon}</h3>
            <img src={dataP.img} /> */}

                <p className="hp">
                    <span>HP: </span>
                    {dataP.hp}
                </p>
                <img src={dataP.img} />
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
        </div>
        </div>
        </>
    )
}