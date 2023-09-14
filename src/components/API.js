//* - - - - - - - - - - || POKÉMON || - - - - - - - - - - *//

//* - - - || GET POKÉMON || - - - *//
export async function getPokemon(url)
{
    var pokemonData = [];
    var result = {};

    try
    {
        const response = await fetch(url);
        const data = await response.json();
        if(data.results && data.results.length)
        {
            for(const pokemon of data.results)
            {
                const url = pokemon.url;
                const pokemonDetail = await getPokemonData(url);
                pokemonData.push(pokemonDetail);
            }
        }
        result = { count: data.count, previous: data.previous, next: data.next, array: pokemonData };
    }
    catch(error)
    {
        console.error("Error catching data", error);
        return null;
    }
    return result;
}

//* - - - || DATA || - - - *//
async function getPokemonData(url)
{
    try
    {
        const response = await fetch(url);
        const data = await response.json();

        return {
            id: data.id,
            name: data.name,
            type: data.types,
            image: data.sprites.other["official-artwork"]["front_default"]
        }
    }
    catch(error)
    {
        console.error("Error catching data", error);
        throw error;
    }
}

//* - - - || SPECIES || - - - *//
export async function getSpecies(id=5)
{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const species = await response.json();

    return {

        evolution:species.evolution_chain.url,
        description:species.flavor_text_entries[0].flavor_text
    }
}

//* - - - - - - - - - - || MOCKAPI || - - - - - - - - - - *//

//* - - - || GET FAVORITE || - - - *//
export async function getFavorite()
{
    try
    {
        const requiere = await fetch("https://65021745736d26322f5cbabd.mockapi.io/favorite/favorite_pokemon");
        const getPokemon = await requiere.json();

        return getPokemon;
    }
    catch(error)
    {
        console.error("Error setting data", error);
        throw error;
    }
}

//* - - - || SET FAVORITE || - - - *//
export async function setFavorite(name, id)
{
    try
    {
        return fetch('https://65021745736d26322f5cbabd.mockapi.io/favorite/favorite_pokemon',
        {
            method: "POST",
            headers: {

                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name, id: id}),
        })

        .then((response) => { 
            
            if(response.ok)
            {
                console.log("Setting data correctly");
                return response.json()
            }
            else
            {
                throw "error";
            }
        })
    }
    catch(error)
    {
        console.error("Error setting data", error);
        throw error;
    }
}

//* - - - || DELETE FAVORITE || - - - *//
export async function deleteFavorite(nameP)
{
    try
    {
        const getPokemon = await getFavorite();
        let deleteID = '';

        const verification = getPokemon.some(({name, id}) => {

            if(name === nameP)
            {
                deleteID = id;
            }

        })

        return fetch(`https://65021745736d26322f5cbabd.mockapi.io/favorite/favorite_pokemon/${deleteID}`,
        {
            method: "DELETE",
            headers: {

                'Content-Type': 'application/json',
            },
        })

        .then((response) => { 
            
            if(response.ok)
            {
                console.log("Data was correctly deleted");
                return response.json()
            }
            else
            {
                throw "error";
            }
        })
    }
    catch(error)
    {
        console.error("Error deleting data", error);
        throw error;
    }
}


