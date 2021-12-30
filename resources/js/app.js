import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

// Компоненты
import { Header } from './components/Header';
import { Routing } from './components/Routing';


export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routing />
            </BrowserRouter>
        </>
    )
}