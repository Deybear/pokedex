import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Pokedex from '../pages/Pokedex';
import Navigation from '../components/Navigation';

function AppRouter()
{
    return (

        <>

        <Navigation/>
        <Routes>

            <Route path="/" element={ <Home/> }></Route>
            <Route path="/about" element={ <About/> }></Route>
            <Route path="/pokedex" element={ <Pokedex/> }></Route>

        </Routes>

        </>

    );
}

export default AppRouter;