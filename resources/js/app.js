import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

// Компоненты
import Header from './components/Header';

// Страницы
import { Home } from './routes/Home';
import { Profile } from './routes/Profile';
import { Favorites } from './routes/Favorites';
import { SignIn } from './routes/SignIn';
import { SignUp } from './routes/SignUp';
import { Adminka } from './routes/Adminka';
import { Example } from './routes/Example';
import { Users } from './routes/Adminka/routes/Users';
import { Serials } from './routes/Adminka/routes/Serials';
import { NotFound } from './routes/NotFound';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="adminka" element={<Adminka />} >
                        <Route path="users" element={<Users />} />
                        <Route path="serials" element={<Serials />} />
                    </Route>
                    <Route path="example" element={<Example />} />
                    <Route path="*" element={<NotFound />} />


                </Routes>
            </BrowserRouter>
        </>
    )
}