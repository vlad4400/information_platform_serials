
import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import ListSerials from '../../components/ListSerials';
import { selectAuth } from '../../store/auth.slice';
import { getFavourites, selectFavourites, selectFavouritesByStatus } from '../../store/favourites.slice';
import { selectFilters, statusFilterChanged, StatusFilters } from '../../store/filters.slice';

export const Favourites = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(selectAuth);
  const { favourites, loading, hasErrors } = useSelector(selectFavourites);
  const { status } = useSelector(selectFilters);

  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);

  const onStatusChange = (status) => {
    dispatch(statusFilterChanged(status));
    dispatch(selectFavouritesByStatus(status));
  };

  return (
    <Container>
      <Tabs
          variant='pills'
          activeKey={status}
          onSelect={onStatusChange}
          className='mb-3'
          >
          {Object.keys(StatusFilters).map((key) => {
            const value = StatusFilters[key];
            return (
              <Tab key={key} eventKey={value} title={value}>
                {hasErrors
                  ? <p>Произошла ошибка...</p>
                  : <ListSerials
                    title={'Каталог сериалов'}
                    serials={favourites}
                    loading={loading}
                    showNavigation={true}
                    isAuth={isLoggedIn}
                    hideBtnAdd={true}
                  />
                }
              </Tab>
            );
          })}
        </Tabs>
    </Container>
  );
};