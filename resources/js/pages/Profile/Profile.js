import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { selectAuth } from '../../store/auth.slice';

export const Profile = () => {
  const { isLoggedIn } = useSelector(selectAuth);

  return (
    <>
        {isLoggedIn
          ? <Outlet />
          : <p> Необходима авторизация <Link to='/signin'>Вход</Link> </p>
        }
    </>
  );
};