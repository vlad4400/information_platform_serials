import { Link, Outlet } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export const Profile = () => {
  return (
    <div>
      <h1>Профиль</h1>
      <p>Здесь будет профиль пользователя и список просмотра</p>
      <Link to={ROUTES.WATCHLIST}>Список просмотра</Link>{' '}
      <Link to={ROUTES.FAVOURITES}>Избранное</Link>{' '}
      <Link to={ROUTES.SETTINGS}>Настройки</Link>
      <Outlet />
    </div>
  );
};
