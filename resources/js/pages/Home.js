import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../components/Container';
import ListSerials from '../components/ListSerials';
import PanelSerials from '../components/PanelSerials';
import { selectSerials } from '../store/serials.slice';
import { selectAuth } from '../store/auth.slice';

export const Home = () => {
  const { serials, loading, hasErrors } = useSelector(selectSerials);
  const { isLoggedIn } = useSelector(selectAuth);

  return (
    <Container>
      { hasErrors
        ? <p>Произошла ошибка...</p>
        : <>
            <PanelSerials
              title={'Новые сериалы'}
              serials={serials}
              loading={loading}
            />
            <ListSerials
              title={'Найболее рейтинговые сериалы'}
              serials={serials}
              loading={loading}
              isAuth={isLoggedIn}
            />
          </>
      }
    </Container>
  );
};
