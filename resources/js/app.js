import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

// Компоненты
import Header from './components/Header';

// Страницы
import { Home } from './routes/Home';
import { Profile } from './routes/Profile';
import { Favorites } from './routes/Favorites';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}