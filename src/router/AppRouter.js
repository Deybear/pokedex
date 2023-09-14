import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Pokedex from '../pages/Pokedex';
import Navigation from '../components/Navigation';
import PokemonData from '../components/pokedex/PokemonData';

function AppRouter()
{
    return (

        <>

        <Navigation/>
        <Routes>

            <Route path="/" element={ <Home/> }></Route>
            <Route path="/about" element={ <About/> }></Route>
            <Route path="/pokedex" element={ <Pokedex/> }></Route>
            <Route path="/pokedex/:name" element={ <PokemonData/> }></Route>

        </Routes>

        </>

    );
}

export default AppRouter;