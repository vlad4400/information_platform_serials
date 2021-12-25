import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Каталог сериалов</Link>
                        <Link className="nav-link" to="favorites">Избранное</Link>
                        <Link className="nav-link" to="profile">Профиль</Link>

                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}