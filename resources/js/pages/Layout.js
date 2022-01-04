import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Container fluid='sm'>
      <Outlet />
    </Container>
  );
};
