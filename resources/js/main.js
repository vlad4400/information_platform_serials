import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

import { Home } from './routes/Home';
import { Profile } from './routes/Profile';
import { Favorites } from './routes/Favorites';
import 'bootstrap/dist/css/bootstrap.min.css';



export function Main() {

    return (
        <div>

            <BrowserRouter>
                <>
                    <Navbar bg="dark" variant="dark">
                        <Container>

                            <Nav className="me-auto">
                                <Link className="nav-link" to="/">Каталог сериалов</Link>
                                <Link className="nav-link" to="favorites">Избранное</Link>
                                <Link className="nav-link" to="profile">Профиль</Link>

                            </Nav>
                        </Container>
                    </Navbar>              </>

                <Routes>
                    <Route element={<Favorites />} path="/favorites" />
                    <Route element={<Profile />} path="/profile" />
                    <Route element={<Home />} path="/" />
                </Routes>
            </BrowserRouter>

        </div >
    )
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}


