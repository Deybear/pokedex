import React, { useState, useEffect } from "react";
import { getRandomPokemonId } from "./poke-api"; 
import defaultImage from "../pokeball.gif";
import shapes from "../images/shapes.svg";
import '../styles/PokemonCard.css';

const Header = () => {
  const [randomPokemons, setRandomPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchRandomPokemons = async () => {
      try {

        const getRandomIds = () => Math.floor(Math.random() * 251) + 1;
        const pokemonIds = Array.from({ length: 1 }, getRandomIds);

        var fetchedPokemons = [];
        
       /* for (const id of pokemonIds) {
            const data = await getRandomPokemonId(id);
         // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        //  const data = await response.json();
          fetchedPokemons.push(data);
        }*/
         fetchedPokemons = await Promise.all(
            pokemonIds.map(async (id) => {
              const data = await getRandomPokemonId(id);
              return data;
            })
          );

        setRandomPokemons(fetchedPokemons);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching random Pokémon data:", error);
      }
    };

    fetchRandomPokemons();
  }, []);
  const handleImageLoad = (event) => {
    event.target.src = event.target.dataset.src;
  };

  return (
      
    <div className="pokemon_container">
      {randomPokemons.map((pokemon) => (

        <div key={pokemon.id} className="pokemon_card" style={{background: `var(--${pokemon.types[0].type.name})`}}>

          {isLoading ? ( <p>Cargando.....</p> ) : (

            <>

            {/* - - - || Pokémon ID || - - - */}
            <p className="pokemon_id">#{pokemon.id.toString().padStart(4,"0")}</p>

            {/* - - - || Pokémon Sprite || - - - */}
            <img className="pokemon_sprite" src={defaultImage} alt={pokemon.name} data-src={pokemon.sprites.other["official-artwork"]["front_default"]} onLoad={handleImageLoad} loading="lazy"/>

            {/* - - - || Content || - - - */}
            <div className="card_content"> 

              {/* - - - || Pokémon Shapes || - - - */}
              <img src={shapes} className="pokemon_shapes"/>
              
              {/* - - - || Pokémon Name || - - - */}
              <p className="pokemon_name">{pokemon.name}</p>
  
            </div>

            {/* - - - || Pokémon Type || - - - */}
            <div className="pokemon_type">

              {/* - - - || v2.0.0 || - - - */}

              {/* {pokemon.types.map((item, index) => {

                  return(<img key={index} src={require(`../images/${item.type.name}.svg`)} alt={item.type.name}/>);

              })} */}

              {pokemon.types[0] ? (<img src={require(`../images/${pokemon.types[0].type.name}.svg`)} alt={pokemon.types[0].type.name}/>) : null}
              {pokemon.types[1] ? (<img src={require(`../images/${pokemon.types[1].type.name}.svg`)} alt={pokemon.types[1].type.name}/>) : null}

            </div>

            {/* - - - || Pokémon Text || - - - */}
            <div className="pokemon_text">

              {/* - - - || Pokémon Lines || - - - */}
              <div className="text_lines"><span></span><span></span><span></span></div>

              {/* - - - || Pokémon Description || - - - */}
              <p>

                <strong>{pokemon.name.toUpperCase()}</strong>
                {pokemon.types[1] ? (<span> is a dual-type </span>) : (<span> is a single-type </span>)}
                {pokemon.types[0] ? (<strong>{pokemon.types[0].type.name.toUpperCase()}</strong>) : null}
                {pokemon.types[1] ? (<span> and <strong>{pokemon.types[1].type.name.toUpperCase()}</strong></span>) : null}
                <span> pokémon introduced in </span>
                {pokemon.id <= 151 ? (<strong>GENERATION I</strong>) : (<strong>GENERATION II</strong>)}.
                If you want to know more about  <strong>{pokemon.name.toUpperCase()}</strong> check out our pokedex.


              </p>

            </div>

            </>
          )
          }       
        </div>

      ))}
      
    </div>
  );
};

export default Header;