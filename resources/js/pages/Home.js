import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../components/Container';
import ListSerials from '../components/ListSerials';
import PanelSerials from '../components/PanelSerials';
import { selectAuth } from '../store/auth.slice';
import { getTop50Serials as getTop50SerialsLast, selectSerialsLast } from '../store/serials-last.slice';
import { getTop50Serials, selectSerials } from '../store/serials.slice';

export const Home = () => {
  const { serials, loading, hasErrors } = useSelector(selectSerials);
  const objSeialsLast = useSelector(selectSerialsLast);
  const {isLoggedIn, userId} = useSelector(selectAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTop50SerialsLast(isLoggedIn ? userId : undefined));
    dispatch(getTop50Serials(isLoggedIn ? userId : undefined))
  }, [dispatch]);

  return (
    <Container>
      { objSeialsLast.hasErrors
        ? <p>Произошла ошибка...</p>
        : <>
            <PanelSerials
              title={'Новые сериалы'}
              serials={objSeialsLast.serials}
              loading={objSeialsLast.loading}
              />
          </>
      }
      {
        hasErrors
        ? <p>Произошла ошибка...</p>
        : <>
            <ListSerials
              title={'Наиболее рейтинговые сериалы'}
              serials={serials}
              loading={loading}
              isAuth={isLoggedIn}
            />
          </>
      }
    </Container>
  );
};
