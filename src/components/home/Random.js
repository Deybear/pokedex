import React, { useState, useEffect } from "react";
import { getRandomPokemon } from "./RandomAPI";
import default_image from "../../pokeball.gif";
import '../../styles/Random.css';

function Random()
{
    const [getRandom, setRandom] = useState([]);
    const [getLoading, setLoading] = useState(true);

    useEffect(() => {

        const fetchRandom = async () => {

            try {

                const randomID = () => Math.floor(Math.random() * 493) + 1;
                const pokemonIds = Array.from({ length: 5 }, randomID);
                var fetchedPokemons = [];

                fetchedPokemons = await Promise.all(

                    pokemonIds.map(async (id) => {

                        const data = await getRandomPokemon(id);
                        return data;
                    })
                );

                setRandom(fetchedPokemons);
                setLoading(false);
            } 
            catch (error)
            {
                setLoading(false);
                console.error("Error fetching random Pokémon data:", error);
            }
        }

        fetchRandom();

    }, []);

    const loadingImage = (event) => {
        
        event.target.src = event.target.dataset.src;
    };

    return(

        <div className="random_container">

            {/* - - - || POKÉMON || - - - */}
            {getRandom.map((pokemon, index) => (

                <div className="random_mask">

                    <img className="random_texture" src={require("../../images/texture.png")}></img>

                    {/* - - - || POKÉMON || - - - */}
                    <div key={index} className="random_pokemon" style={{background: `var(--${pokemon.types[0].type.name})`}}>

                        {/* - - - || LOADING || - - - */}
                        {getLoading ? ( <p>Loading . . .</p> ) : (

                            <>
                            
                            {/* - - - || POKÉMON SPRITE || - - - */}
                            <img className="random_sprite" src={default_image} alt={pokemon.name} data-src={pokemon.sprites.other["official-artwork"]["front_default"]} onLoad={loadingImage} loading="lazy"/>

                            {/* - - - || POKÉMON NAME || - - - */}
                            <p className="random_name">タマザラシ</p>

                            {/* - - - || POKÉMON TYPE || - - - */}
                            <div className="random_type">

                                {/* - - - || ICON || - - - */}
                                {pokemon.types.map((item, index) => { return(<img key={index} src={require(`../../images/${item.type.name}.svg`)} alt={item.type.name}/>); })}

                            </div>

                            </>
                        )}

                    </div>

                </div>
                
            ))}
        
        </div>
    );
}

export default Random;