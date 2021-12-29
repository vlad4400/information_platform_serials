// страница - adminka - страница для администратора
import { Navbar, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';


export const Adminka = () => {

    return (
        <div>
            <h1>Админка</h1>
            <Navbar>
                <Nav className="me-auto">
                    <Link className="nav-link" to="users">Пользователи</Link>
                    <Link className="nav-link" to="serials">Сериалы</Link>
                </Nav>
            </Navbar>
            <Outlet />
        </div >
    );
};
