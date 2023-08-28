import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

import logo from "../images/dex_logo.svg";

function Navigation()
{
    return (

        <nav className='navigation'>

            <ul>

                <li> <img src={logo}/> </li>

                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/about">About</Link> </li>
                <li> <Link to="/pokedex">Pokedex</Link> </li>

            </ul>

        </nav>

    );
}

export default Navigation;