import { Link, Outlet, nav } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/auth.slice';

export const Profile = () => {
  const { isLoggedIn } = useSelector(selectAuth);

  return (
    <>
      {isLoggedIn
        ?
        <div>
          < h2 className='my-3' > Профиль пользователя {JSON.parse(localStorage.getItem('user')).username}</h2 >
          <nav className="nav">
            <Link className="nav-link" to={ROUTES.WATCHLIST}>Список просмотра</Link>{' '}
            <Link className="nav-link" to={ROUTES.FAVOURITES}>Избранное</Link>{' '}
            <Link className="nav-link" to={ROUTES.SETTINGS}>Настройки</Link>
          </nav>
          <Outlet />
        </div >
        : <>
          <p>
            Необходима авторизация <Link to='/signin'>Вход</Link>
          </p>
        </>
      }
    </>
  );
};