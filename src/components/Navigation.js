import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

import logo from "../images/dex_logo.svg";

function Navigation()
{
    return (

        <nav className='navigation'>

            <ul>

                <li className='nav_logo'> <img src={logo}/> </li>

                <li className='nav_item'> <Link to="/">Home</Link> </li>
                <li className='nav_item'> <Link to="/about">About</Link> </li>
                <li className='nav_item'> <Link to="/pokedex">Pokedex</Link> </li>

            </ul>

        </nav>

    );
}

export default Navigation;