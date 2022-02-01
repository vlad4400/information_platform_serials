﻿
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import ListSerials from '../../components/ListSerials';
import { selectAuth } from '../../store/auth.slice';
import { getFavorites, selectFavorites } from '../../store/favorites.slice';

export const Favourites = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  const { favorites, loading, hasErrors } = useSelector(selectFavorites);
  const { isLoggedIn } = useSelector(selectAuth);
  //console.log('favorites', favorites);

  return (
    <Container>
      {hasErrors
        ? <p>Произошла ошибка...</p>
        : <ListSerials
          title={'Каталог сериалов'}
          serials={favorites}
          loading={loading}
          showNavigation={true}
          // isAuth={isLoggedIn}
          isAuth={isLoggedIn}
          hideBtnAdd={true}
        />

      }
    </Container>
  );
};