import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PanelSerials from '../components/PanelSerials.js';
import ListSerials from '../components/ListSerials.js';
import Container from '../components/Container.js';
// import serialsAPI from '../api/serialsAPI';
import { getSerials, selectSerials } from '../store/serials.slice';

export const Home = () => {
  const dispatch = useDispatch();
  const { serials, loading, hasErrors } = useSelector(selectSerials);

  useEffect(() => {
    dispatch(getSerials());
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchSerials = async () => {
  //     const res = await serialsAPI.get('serials').catch((err) => console.log);
  //     console.log('API Response', res);
  //     dispatch(setSerials(res.data));
  //   };
  //   fetchSerials();
  // }, [dispatch]);

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
