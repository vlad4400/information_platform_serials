import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../../components/Container';
import ListSerials from '../../components/ListSerials';
import { selectSerials } from '../../store/serials.slice';
import { selectAuth } from '../../store/auth.slice';

export const Serials = () => {
  const { serials, loading, hasErrors } = useSelector(selectSerials);
  const { isLoggedIn } = useSelector(selectAuth);

  return (
    <Container>
      { hasErrors
        ? <p>Произошла ошибка...</p>
        : <ListSerials
            title={'Каталог сериалов'}
            serials={serials}
            loading={loading}
            showNavigation={true}
            isAuth={isLoggedIn}
          />
      }
    </Container>
  );
};
