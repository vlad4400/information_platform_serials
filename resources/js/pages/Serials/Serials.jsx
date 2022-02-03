import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import ListSerials from '../../components/ListSerials';
import { getSerialsByRateTop50Asc, getSerialsByRateTop50Desc, getSerialsByYearTop50Asc, getSerialsByYearTop50Desc } from '../../services/SerialsService';
import { selectAuth } from '../../store/auth.slice';
import { selectSerials, setLoading, setLoadingComplete, setSerials, setSerialsFailure } from '../../store/serials.slice';

export const Serials = () => {
  const { serials, loading, hasErrors } = useSelector(selectSerials);
  const { isLoggedIn, userId } = useSelector(selectAuth);
  const dispatch = useDispatch();
  
  // let titleOrder = 'от наиболее нового';
  
  const handleSort = (e) => {
    switch(e) {
      case '1':
        // titleOrder = 'от наиболее нового';
        var sorterSerials = getSerialsByYearTop50Desc;
        break;
      case '2':
        // titleOrder = 'от наиболее старого';
        var sorterSerials = getSerialsByYearTop50Asc;
        break;
      case '3':
        // titleOrder = 'от наибольшего рейтинга';
        var sorterSerials = getSerialsByRateTop50Desc;
        break;
        case '4':
        // titleOrder = 'От наименьшего рейтинга';
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
                  <Dropdown.Item eventKey="1">от наиболее нового</Dropdown.Item>
                  <Dropdown.Item eventKey="2">от наиболее старого</Dropdown.Item>
                  <Dropdown.Item eventKey="3">от наибольшего рейтинга</Dropdown.Item>
                  <Dropdown.Item eventKey="4">от наименьшего рейтинга</Dropdown.Item>
              </DropdownButton>
              {/* todo */}
              {/* <ButtonGroup className="me-2" aria-label="First group">
                  <Button variant="secondary">1</Button>{' '}
                  <Button variant="secondary">2</Button>{' '}
                  <Button variant="secondary">3</Button>{' '}
                  <Button variant="secondary">4</Button>{' '}
                  <Button variant="secondary">5</Button>
              </ButtonGroup> */}
            </div>
            <ListSerials
              title={`Каталог сериалов`}
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
