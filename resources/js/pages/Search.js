// страница для отображения результатов поиска

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../components/Container';
import ListSerials from '../components/ListSerials';
import { selectAuth } from '../store/auth.slice';
import { getSearchSerials, selectSearchSerials } from '../store/search.slice';

export const Search = () => {

  const dispatch = useDispatch();
  const { searchSerials, loading, hasErrors } = useSelector(selectSearchSerials);
  const { isLoggedIn, userId } = useSelector(selectAuth);
  const key = localStorage.getItem('keySearch');

  if (key) {
    useEffect(() => {
      dispatch(getSearchSerials({key, userId}));
    }, []);
  }

  return (
    <Container>
      {hasErrors
        ? <p>Произошла ошибка...</p>
        : <ListSerials
          title={'Результаты поиска'}
          serials={searchSerials}
          loading={loading}
          isAuth={isLoggedIn}
        />
      }
    </Container>
  );


};
