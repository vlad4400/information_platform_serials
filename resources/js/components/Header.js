import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

export const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Каталог сериалов</Nav.Link>
                        <Nav.Link as={NavLink} to="/favorites">Избранное</Nav.Link>
                        <Nav.Link as={NavLink} to="/profile">Профиль</Nav.Link>
                        <Nav.Link as={NavLink} to="/signin">Авторизация</Nav.Link>
                        <Nav.Link as={NavLink} to="/signup">Регистрация</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin">Страница администратора</Nav.Link>
                        <Nav.Link as={NavLink} to="/example">Примеры используемых компонентов</Nav.Link>
                        <Nav.Link as={NavLink} to="/logout">LogOUT</Nav.Link>
                    </Nav>
                    <Outlet />
                </Container>
            </Navbar>
        </header>
    )
}
