import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { deleteFavorite, getFavorite, getPokemon, getSpecies, setFavorite } from '../API';

import favorite_v1 from '../../images/favorite_v1.svg';
import favorite_v2 from '../../images/favorite_v2.svg';

import '../../styles/Pokemon.css';
import '../../fonts/Gisshiri.ttf';

function Pokemon()
{
    //* - - - || POKÉMON || - - - *//
    const [getData, setData] = useState([]);
    // const [getSearch, setSearch] = useState([]);

    let pokemonArray = [];
    // let pokemonSearch = [];

    //* - - - || UPDATE || - - - *//
    const [getUpdate, setUpdate] = useState(false);

    //* - - - || LOADING || - - - *//
    const [getLoading, setLoading] = useState(true);

    //* - - - || LINK || - - - *//
    const [getURL, setURL] = useState(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);

    //* - - - || LAST PAGE || - - - *//
    const [getPrevious, setPrevious] = useState('');

    //* - - - || NEXT PAGE || - - - *//
    const [getNext, setNext] = useState('');

    //* - - - || FAVORITE || - - - *//
    const [getStatus, setStatus] = useState(false);
    const [getFavoritePokemon, setFavoritePokemon] = useState([]);
    
    useEffect (() => {
        
        const fetchPokemon = async () => {
            
            try
            {
                //* - - - || POKÉMON || - - - *//
                const setPokemon = await getPokemon(getURL);
                pokemonArray = [];
                setPokemon.array.map((pokemon) => (pokemonArray.push(pokemon)));

                //* - - - || FAVORITE || - - - *//
                const favoritePokemon = await getFavorite();
                setFavoritePokemon(favoritePokemon);

                //* - - - || SEARCH || - - - *//
                // const setResult = await getPokemon('https://pokeapi.co/api/v2/pokemon?limit=1015&offset=0');
                // pokemonSearch = [];
                // setResult.array.map((pokemon) => (pokemonSearch.push(pokemon)));

                //* - - - || PAGINATION || - - - *//
                setPrevious(setPokemon.previous);
                setNext(setPokemon.next);

                //* - - - || SET DATA || - - - *//
                setLoading(false);
                setData(pokemonArray);
                // setSearch(pokemonSearch);
            }
            catch (error)
            {
                setLoading(false);
                console.error("Error fetching Pokémon data:", error);
            }
        }
        fetchPokemon();

    }, [getUpdate]);

    //* - - - || SEARCH || - - - *//
    function searchPokemon(e) 
    {
        let pokemonName = new RegExp(e.target.value.toLowerCase());

        if (e.target.value !=="")
        {
            // const pokemon = getSearch.filter(({ name }) => pokemonName.test(name));
            const pokemon = [...getData].filter(({ name }) => pokemonName.test(name));
            setData(pokemon);
        }
        else
        {
            setUpdate(!getUpdate);
        }
    }

    //* - - - || LAST PAGE || - - - *//
    const lastPage = () => {
        
        if(getPrevious !== null)
        {
            setURL(getPrevious);
            setUpdate(!getUpdate);
        }
    }

    //* - - - || NEXT PAGE || - - - *//
    const nextPage = () => {
        
        if(getNext !== null)
        {
            setURL(getNext);
            setUpdate(!getUpdate);
        }
    }

    //* - - - || FAVORITE || - - - *//
    async function favorite(name, id)
    {
        const pokemon = getFavoritePokemon.map((item) => (item.name));

        if(getFavoritePokemon.hasOwnProperty(0) === false)
        {
            if(pokemon.includes(name))
            {
                console.log("The pokémon already exist. . .");
            }
            else
            {
                console.log("Adding favorite. . .");
                await setFavorite(name, id);
                setStatus(!getStatus);
                setUpdate(!getUpdate);
            }
        }
        else
        {
            if(pokemon.includes(name))
            {
                console.log("Deleting favorite. . .");
                await deleteFavorite(name);
                setStatus(!getStatus);
                setUpdate(!getUpdate);
            }
        }
    }

    //* - - - || ADD || - - - *//
    // async function addFavorite(name, id)
    // {
    //     await setFavorite(name, id);
    //     console.log("Adding favorite . . ");
    //     setUpdate(!getUpdate);
    // }

    //* - - - || DELETE || - - - *//
    // async function deleteFavoriteP(name)
    // {
    //     await deleteFavorite(name);
    //     console.log("Deleting favorite . . ");
    //     setUpdate(!getUpdate);
    // }

    return (

        <div className='pokemon_container'>
            
            {/* - - - || POKÉMON || - - - */}
            {getData.map((pokemon, index) => (

                <div key={index} className='pokemon_card' style={{background: `var(--${pokemon.type[0].type.name})`}}>

                    {/* - - - || TEXTURE || - - - */}
                    <img className='pokemon_texture' src={require('../../images/texture.png')}/>

                    {/* - - - || LOADING POKÉMON || - - - */}
                    {getLoading ? ( <p>Cargando.....</p> ) : (

                        <>

                        {/* - - - || POKÉMON NAME || - - - */}
                        <p className='pokemon_name'>タマザラシ</p>

                        {/* - - - || POKÉMON SPRITE || - - - */}
                        <Link to={`/pokedex/${pokemon.name}`}><img className='pokemon_image' src={pokemon.image}/></Link>

                        {/* - - - || POKÉMON TYPE || - - - */}
                        <div className='pokemon_types'>

                            {pokemon.type.map((item, index) => {
                                
                                return(<img key={index} src={require(`../../images/${item.type.name}.svg`)} alt={item.type.name}/>);

                            })}

                        </div>

                        {/* - - - || POKÉMON FAVORITE || - - - */}
                        <img className='pokemon_favorite' src={favorite_v2} onClick={() => favorite(pokemon.name, pokemon.id)}/>

                        </>

                    )}

                </div>

            ))}

            {/* - - - || NAVEGATION || - - - */}
            <div className='pokemon_navigation'>

                {/* - - - || ITEM || - - - */}
                <div className='navigation_item'><p onClick={lastPage}>前のページ</p></div>

                {/* - - - || SEARCH || - - - */}
                <div className='navigation_item'><input type='text' onChange={searchPokemon} placeholder='ポケモンを探す'/></div>

                {/* - - - || ITEM || - - - */}
                <div className='navigation_item'><p onClick={nextPage}>次のページ</p></div>

            </div>

        </div>
    );
}

export default Pokemon;