import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

export const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Каталог сериалов</Link>
                        <Link className="nav-link" to="/favorites">Избранное</Link>
                        <Link className="nav-link" to="/profile">Профиль</Link>
                        <Link className="nav-link" to="/info">Страница сериала</Link>
                        <Link className="nav-link" to="/signin">Авторизация</Link>
                        <Link className="nav-link" to="/signup">Регистрация</Link>
                        <Link className="nav-link" to="/admin">Страница администратора</Link>
                        <Link className="nav-link" to="/example">Примеры используемых компонентов</Link>
                    </Nav>
                    <Outlet />
                </Container>
            </Navbar>
        </header>
    )
}
