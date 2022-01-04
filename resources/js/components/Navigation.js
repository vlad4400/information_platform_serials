import { NavLink } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  FormControl,
  Button,
} from 'react-bootstrap';

export default function Navigation(props) {
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
      className='py-3'
    >
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse>
          <Nav className='mr-auto'>
            <NavDropdown className='me-2' title='Меню'>
              <NavDropdown.Item as={NavLink} to='/catalog'>
                Каталог сериалов
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/favourites'>
                Избранное
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/profile'>
                Профиль
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to='/admin'>
                Админка
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <FormControl
            className='me-2'
            type='search'
            placeholder='Поиск'
            aria-label='Search'
          />
          <Nav>
            <Nav.Link as={NavLink} to='/signin'>
              Вход
            </Nav.Link>
            <Button as={NavLink} to='/signup'>
              Регистрация
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
