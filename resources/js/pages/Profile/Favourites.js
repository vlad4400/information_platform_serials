
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import ListSerials from '../../components/ListSerials';
import { selectAuth } from '../../store/auth.slice';
import { getFavourites, selectFavourites } from '../../store/favourites.slice';

export const Favourites = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);

  const { favourites, loading, hasErrors } = useSelector(selectFavourites);

  return (
    <Container>
      {hasErrors
        ? <p>Произошла ошибка...</p>
        : <ListSerials
          title={'Каталог сериалов'}
          serials={favourites}
          loading={loading}
          showNavigation={true}
          isAuth={isLoggedIn}
          hideBtnAdd={true}
        />
      }
    </Container>
  );
};