import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSerials } from '../store/Serials/actions';
import { getSerials } from '../store/Serials/selectors'
import PanelSerials from '../components/PanelSerials.js';
import ListSerialsTable from '../components/ListSerialsTable';
import Container from '../components/Container.js';

export const Home = () => {
  const dispatch = useDispatch();
  const serials = useSelector(getSerials);

  useEffect(() => {
    dispatch(getAllSerials());
  }, [dispatch]);

  return (
    <Container>
      <PanelSerials title={'Новые сериалы'} serials={serials} />
      <ListSerialsTable title={'Найболее рейтинговые сериалы'} serials={serials} />
    </Container>
  );
};
