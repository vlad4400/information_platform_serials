import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  FormControl,
  Button,
} from 'react-bootstrap';
import * as ROUTES from '../constants/routes';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, login, logout } from '../store/auth.slice';

export default function Navigation() {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(selectAuth);

  const [testUser, set_testUser] = useState({
    email: 'test@mail.com',
    username: 'testUser',
  });

  const logOut = () => {
    console.log('logout');
    dispatch(logout());
  };

  const logIn = () => {
    console.log('login');
    dispatch(login(testUser));
  };

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
      className='py-3'
    >
      <Container fluid='sm'>
        <Navbar.Brand as={NavLink} to='/'>
          Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse>
          <Nav className='mr-auto'>
            <NavDropdown className='me-2' title='Меню'>
              <NavDropdown.Item as={NavLink} to={ROUTES.HOME}>
                Главная
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={ROUTES.SERIALS}>
                Каталог сериалов
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to={`${ROUTES.PROFILE}/${ROUTES.FAVOURITES}`}
              >
                Избранное
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to='/example'>
                Пример компонентов
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={ROUTES.ADMIN}>
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
          {isLoggedIn ? (
            <LoggedInView logOut={logOut} />
          ) : (
            <LoggedOutView logIn={logIn} />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const LoggedInView = ({ logOut }) => (
  <Nav>
    <NavDropdown className='me-2' title='Профиль'>
      <NavDropdown.Item as={NavLink} to={ROUTES.PROFILE}>
        Профиль
      </NavDropdown.Item>
      <NavDropdown.Item as={Button} onClick={logOut}>
        Выход
      </NavDropdown.Item>
    </NavDropdown>
  </Nav>
);

const LoggedOutView = ({ logIn }) => (
  <Nav>
    <Nav.Link as={NavLink} to={ROUTES.SIGN_IN} onClick={logIn}>
      Вход
    </Nav.Link>
    <Button as={NavLink} to={ROUTES.SIGN_UP}>
      Регистрация
    </Button>
  </Nav>
);
