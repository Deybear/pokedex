import React, { useState, useEffect } from "react";
import { getRandomPokemonId } from "./poke-api"; 
import defaultImage from "../pokeball.gif";

const Header = () => {
  const [randomPokemons, setRandomPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchRandomPokemons = async () => {
      try {

        const getRandomIds = () => Math.floor(Math.random() * 200) + 1;
        const pokemonIds = Array.from({ length: 4 }, getRandomIds);

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
    <header>
      <h1>Random Pokémon Header</h1>
      <div className="pokemon-container">
        {randomPokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            {isLoading ? (
                <p>Cargando.....</p>
            ): (
                <>
                 <img
                   src={defaultImage}
                   alt={pokemon.name}
                   data-src={pokemon.sprites.other["official-artwork"]["front_default"]} // Almacenar la URL real en un atributo personalizado
                   onLoad={handleImageLoad} // Manejador de carga de imagen
                   loading="lazy" // Agregar atributo "loading" con valor "lazy"
                   style={{ maxWidth: "100px", maxHeight: "100px" }} // Define un tamaño máximo
                    />
                 <p>{pokemon.name}</p>
                </>
            )
            }       
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;