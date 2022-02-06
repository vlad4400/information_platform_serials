import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import ListSerials from '../../components/ListSerials';
import { getSerialsByRateTop50Asc, getSerialsByRateTop50Desc, getSerialsByYearTop50Asc, getSerialsByYearTop50Desc } from '../../services/SerialsService';
import { selectAuth } from '../../store/auth.slice';
import { selectSerials, setLoading, setLoadingComplete, setOrderTitle, setSerials, setSerialsFailure } from '../../store/serials.slice';

export const Serials = () => {
  const dispatch = useDispatch();
  const { serials, loading, hasErrors, orderTitle } = useSelector(selectSerials);
  const { isLoggedIn, userId } = useSelector(selectAuth);
  dispatch(setOrderTitle('От наибольшего рейтинга'));
  
  const handleSort = (e) => {
    switch(e) {
      case '1':
        dispatch(setOrderTitle('От наиболее новых'));
        var sorterSerials = getSerialsByYearTop50Desc;
        break;
      case '2':
        dispatch(setOrderTitle('От наиболее старых'));
        var sorterSerials = getSerialsByYearTop50Asc;
        break;
      case '3':
        dispatch(setOrderTitle('От наибольшего рейтинга'));
        var sorterSerials = getSerialsByRateTop50Desc;
        break;
        case '4':
        dispatch(setOrderTitle('От наименьшего рейтинга'));
        var sorterSerials = getSerialsByRateTop50Asc;
        break;
    }

    dispatch(setLoading());
    sorterSerials().then(({data}) => {
      dispatch(setSerials({serials: data, userId}));
    })
    .catch(() => {
        dispatch(setSerialsFailure);
    })
    .finally(() => {
        dispatch(setLoadingComplete());
    });
  };

  return (
    <Container>
      { hasErrors
        ? <p>Произошла ошибка...</p>
        : 
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '15px',
              }}>
              <DropdownButton disabled={loading} onSelect={handleSort} title="Отобразить" id="bg-nested-dropdown">
                  <Dropdown.Item eventKey="1">от наиболее новых</Dropdown.Item>
                  <Dropdown.Item eventKey="2">от наиболее старых</Dropdown.Item>
                  <Dropdown.Item eventKey="3">от наибольшего рейтинга</Dropdown.Item>
                  <Dropdown.Item eventKey="4">от наименьшего рейтинга</Dropdown.Item>
              </DropdownButton>
            </div>
            <ListSerials
              title={`Каталог сериалов (${orderTitle})`}
              serials={serials}
              loading={loading}
              showNavigation={true}
              isAuth={isLoggedIn}
            />
        </>
      }
    </Container>
  );
};
