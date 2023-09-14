import React, {useState, useEffect} from 'react';

function Evolution(url)
{
    const [getEvolution, setEvolution] = useState('');

    useEffect (() => {

        fetch(url.url)
        .then(response => response.json())
        .then(data => setEvolution(data))
        .catch(error => console.error('Error fetching data . . .', error))

    }, []);

    return(

        <div>

            {getEvolution ? (

            <div>

                {/* - - - || POKEMON STAGE #001 ||  - - - */}
                <p>{getEvolution.chain.species.name}</p>

                {/* - - - || CHECK EVOLUTION ||  - - - */}
                {getEvolution.chain['evolves_to'].hasOwnProperty(0)
                ? 
                (
                    //* - - - || POKEMON STAGE #002 ||  - - - *//
                    <p>{getEvolution.chain['evolves_to'][0].species.name}</p>

                    //* - - - || POKEMON STAGE #003 ||  - - - *//
                    // getEvolution.chain['evolves_to'][0].hasOwnProperty('evolves_to') ? (<p>{getEvolution.chain['evolves_to'][0]['evolves_to'][0].species.name}</p>) : ('NO EXISTE')
                )
                :
                (
                    //* - - - || POKEMON STAGE #003 ||  - - - *//
                    "THIS POKÉMON DOESN'T EVOLVE"
                )}
                
            </div>

            ) : ( <p>Loading data . . .</p>)}

        </div>

    );
}

export default Evolution;
