import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

import logo from "../images/dex_logo.svg";

function Navigation()
{
    return (

        <nav className='nav_container'>

            {/* - - - || LOGO || - - - */}
            <div className='nav_logo'><Link to="/"><img src={logo}/></Link></div>

            {/* - - - || ITEM || - - - */}
            <div className='nav_item'><Link to="/">ホーム</Link></div>
            <div className='nav_item'><Link to="/about">について</Link></div>
            <div className='nav_item'><Link to="/pokedex">ポケモン</Link></div>
            
        </nav>

        // <nav className='navigation'>

        //     <ul>

        //         <li className='nav_logo'> <img src={logo}/> </li>

        //         <li className='nav_item'> <Link to="/">Home</Link> </li>
        //         <li className='nav_item'> <Link to="/about">About</Link> </li>
        //         <li className='nav_item'> <Link to="/pokedex">Pokedex</Link> </li>

        //     </ul>

        // </nav>

    );
}

export default Navigation;