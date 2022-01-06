import { Link, Outlet, Navigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export const Profile = () => {
  const user = true;
  if (user) {
    //если авторизован
    return (
      <div>
        <h1>Профиль</h1>
        <p>Здесь будет профиль пользователя и избранное</p>
        <Link to={ROUTES.FAVOURITES}>Избранное</Link>
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to='/' />;
    //либо перейти на страницу авторизации/регистрации
  }
};
