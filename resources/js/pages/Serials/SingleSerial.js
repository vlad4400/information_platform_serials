import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSerial, selectSerial } from '../../store/serial.slice';
import {
  Row,
  Col,
  Button,
  Badge,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { StatusFilters } from '../../store/filters.slice';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { labels } from '../../constants/labels';
import { useWatchlist } from '../../hooks/useWatchlist';
import Loader from '../../utilities/Loader';

export const SingleSerial = () => {
  const dispatch = useDispatch();
  const { serialId } = useParams();
  const { serial, loading, hasErrors } = useSelector(selectSerial);
  const {
    watchlistItem,
    addToWatchlist,
    removeFromWatchlist,
    setRating,
    setStatus,
  } = useWatchlist(serialId);

  useEffect(() => {
    dispatch(getSerial(serialId));
  }, [dispatch, serialId]);

  const [hover, setHover] = useState(-1);

  const addInFavorites = () => {
    console.log(serialId);
  };

  const onRatingChange = (e, newValue) => {
    setRating({ id: serial.id, rating: newValue });
  };
  const onChangeActive = (e, newHover) => {
    setHover(newHover);
  };

  const onAddToWatchlist = (status) => {
    if (!watchlistItem) {
      const storeSerial = {
        id: serial.id,
        title: serial.title,
        status: status,
        rating: null,
      };
      addToWatchlist(storeSerial);
    } else {
      setStatus({ id: serial.id, status: status });
    }
  };

  const renderRating = () => {
    const { rating: userRating } = watchlistItem
      ? watchlistItem
      : { rating: 0 };

    return (
      watchlistItem && (
        <>
          <div className='text-center'>
            <h6 className='mt-3 mb-2'>Оценка: </h6>
            <Rating
              value={userRating}
              max={10}
              onChange={onRatingChange}
              onChangeActive={onChangeActive}
            />
            <Box>{labels[hover !== -1 ? hover : userRating]}</Box>
          </div>
        </>
      )
    );
  };

  const genres = (serial.genres || ['Без категории']).map((genre) => (
    <span key={genre.toString()}>
      <Badge bg='secondary'>{genre}</Badge>{' '}
    </span>
  ));

  const seasonList = (serial.seasons || ['']).map((season) => (
    <div key={(season.season_number + 1).toString()}>
      <Row>
        <p className='col-sm-1 mb-3 text-center'>{season.season_number}</p>
        <p className='col-sm-7 mb-3'>{season.season_name}</p>
        <p className='col-sm-3 mb-3'>{season.air_date}</p>
        <p className='col-sm-1 mb-3 text-center'>{season.episode_count}</p>
      </Row>
    </div>
  ));

  // if (loading) return <div>Loading...</div>;
  if (loading) return <Loader />;
  if (hasErrors) return <div>Ошибка при загрузке.</div>;

  return (
    <>
      <Row className='py-3 details'>
        <Col lg={3} className='px-0 me-4'>
          <img
            src={serial.poster}
            className='card-img-top shadow'
            alt={serial.title}
          />
              
          <Dropdown as={ButtonGroup} className='w-100 mt-4'>
            <Button
              disabled={!!watchlistItem}
              onClick={() => onAddToWatchlist(StatusFilters.Active)}
            >
              Добавить в список
            </Button>
            <Dropdown.Toggle split />
            <Dropdown.Menu align='end'>
              <Dropdown.Item
                onClick={() => onAddToWatchlist(StatusFilters.Active)}
              >
                Смотрю
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onAddToWatchlist(StatusFilters.Completed)}
              >
                Просмотрено
              </Dropdown.Item>
              <Dropdown.Item onClick={() => removeFromWatchlist(serial.id)}>
                Удалить из списка
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {renderRating()}
        </Col>

        <Col>
          <Row p={1}>
            <Col>
              <h1 className='serial-title'>{serial.title}</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={10} className='mt-3'>
              <p className='text-left mb-5 lh-sm'>{serial.description}</p>
              <table>
                <tbody>
                  <tr>
                    <th scope='row'>Релиз</th>
                    <td>{serial.year}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Рейтинг IMDb</th>
                    <td>{serial.rate}/10</td>
                  </tr>
                </tbody>
              </table>
              <div className='h5 mb-4'>
                Жанры:&nbsp;
                {genres}
              </div>

              <Button
                variant='outline-danger'
                className='mb-5'
                onClick={addInFavorites}
              >
                Добавить в Избранное
              </Button>
              <div className='h5 mb-4 fw-bold'>Сезоны</div>
              <Row>
                <Col sm={12}>
                  <Row>
                    <Col sm={1}>
                      <b>#</b>
                    </Col>
                    <Col sm={7}>
                      <b>Название</b>
                    </Col>
                    <Col sm={3}>
                      <b>Дата выхода</b>
                    </Col>
                    <Col sm={1}>
                      <b>Эпизодов</b>
                    </Col>
                  </Row>
                  {seasonList}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
