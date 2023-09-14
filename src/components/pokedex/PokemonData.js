import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import '../../styles/PokemonData.css';
import '../../fonts/Gisshiri.ttf';

import brush_bg from '../../images/brush_bg.svg';

function PokemonData()
{
    const [getData, setData] = useState(null);
    const {name} = useParams();

    useEffect (() => {

        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data . . .', error))

    }, []);

    return (

        <div className='data_container'>

            {/* - - - || TEXTURE || - - - */}
            <img className='data_texture' src={require("../../images/data_texture.png")}/>
            
            {getData ? (

                <div>

                    {/* - - - || POKÉMON TYPE || - - - */}
                    <div className='data_type'>

                        {/* - - - || TYPE || - - - */}
                        {getData.types.map((item, index) => ( <img key={index} src={require(`../../images/${item.type.name}.svg`)}/> ))}

                    </div>

                    {/* - - - || POKÉMON SPRITE || - - - */}
                    <img className='data_sprite' src={getData.sprites.other["official-artwork"]["front_default"]}/>

                    {/* - - - || POKÉMON INFO || - - - */}
                    <div className='info_container'>

                        {/* - - - || POKÉMON ID || - - - */}
                        <p className='data_id' style={{color: `var(--${getData.types[0].type.name})`}}>#{getData.id.toString().padStart(4,"0")}</p>

                        {/* - - - || POKÉMON NAME || - - - */}
                        <p className='data_name'>タマザラシ</p>

                    </div>

                    {/* - - - || POKÉMON STATS || - - - */}
                    <div className='stats_container'>

                        {getData.stats.map((item, index) => (

                            <div key={index} className='stats_data' style={{background: `var(--${getData.types[0].type.name})`}}>

                                {/* - - - || STATS || - - - */}
                                <p className='stats_name'>

                                    {/* - - - || HEALT || - - - */}
                                    {item.stat.name === 'hp' ? ('HP') : (null)}

                                    {/* - - - || ATTACK || - - - */}
                                    {item.stat.name === 'attack' ? ('AT') : (null)}

                                    {/* - - - || DEFENSE || - - - */}
                                    {item.stat.name === 'defense' ? ('DF') : (null)}

                                    {/* - - - || SP. ATTACK || - - - */}
                                    {item.stat.name === 'special-attack' ? ('SA') : (null)}

                                    {/* - - - || SP. DEFENSE || - - - */}
                                    {item.stat.name === 'special-defense' ? ('SD') : (null)}

                                    {/* - - - || SPEED || - - - */}
                                    {item.stat.name === 'speed' ? ('SP') : (null)}

                                </p>

                                {/* - - - || BASE STATS || - - - */}
                                <p className='stats_base'>{item['base_stat']}</p>

                            </div>

                        ))}

                    </div>

                    {/* - - - || POKÉMON BACK || - - - */}
                    <img className='data_background' src={brush_bg}/>

                </div>

            ) : (<p>Loading data . . .</p>)}

        </div>

    );
}

export default PokemonData;