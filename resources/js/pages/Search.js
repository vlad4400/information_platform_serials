﻿// страница для отображения результатов поиска

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../components/Container';
import ListSerials from '../components/ListSerials';
import { useSearchParams } from 'react-router-dom';

import { getSearchSerials, selectSearchSerials } from '../store/search.slice';
import { selectAuth } from '../store/auth.slice';

export const Search = () => {

  const dispatch = useDispatch();
  const { searchSerials, loading, hasErrors } = useSelector(selectSearchSerials);
  const { isLoggedIn } = useSelector(selectAuth);

  const [searchParams] = useSearchParams();
  // const key = searchParams.get("key");

  const key = localStorage.getItem('keySearch');
  // console.log(key)


  useEffect(() => {
    dispatch(getSearchSerials(key));
  }, []);
  /*  useEffect(() => {
      dispatch(getSearchSerials(key));
    }, [dispatch]); */


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
