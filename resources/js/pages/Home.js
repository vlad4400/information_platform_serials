import React from 'react';
import { useSelector } from 'react-redux';
import PanelSerials from '../components/PanelSerials.js';
import ListSerials from '../components/ListSerials.js';
import Container from '../components/Container.js';
import { selectSerials } from '../store/serials.slice';

export const Home = () => {
  const { serials, loading, hasErrors } = useSelector(selectSerials);

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <PanelSerials title={'Новые сериалы'} serials={serials} />
          <ListSerials
            title={'Найболее рейтинговые сериалы'}
            serials={serials}
          />
        </>
      )}
    </Container>
  );
};
