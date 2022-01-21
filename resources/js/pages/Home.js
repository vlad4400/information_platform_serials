import React from 'react';
import { useSelector } from 'react-redux';
import PanelSerials from '../components/PanelSerials';
import ListSerialsTable from '../components/ListSerialsTable';
import Container from '../components/Container';
import { selectSerials } from '../store/serials.slice';

export const Home = () => {
  const { serials, loading, hasErrors } = useSelector(selectSerials);

  return (
    <Container>
      <PanelSerials
        title={'Новые сериалы'}
        serials={serials}
        loading={loading}
      />
      <ListSerialsTable
        title={'Найболее рейтинговые сериалы'}
        serials={serials}
        loading={loading}
      /> 
    </Container>
  );
};
