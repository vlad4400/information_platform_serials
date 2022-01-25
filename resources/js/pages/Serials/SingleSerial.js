import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSerial, selectSerial } from '../../store/serial.slice';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import {
  selectWatchlist,
  selectWatchlistById,
  addToWatchlist,
  setRating,
} from '../../store/watchlist.slice';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { labels } from '../../constants/labels';
import axios from 'axios';

export const SingleSerial = () => {
  const dispatch = useDispatch();
  const { serialId } = useParams();
  const { serial, loading, hasErrors } = useSelector(selectSerial);
  const watchlist = useSelector(selectWatchlist);
  const watchlistItem = useSelector((state) =>
    selectWatchlistById(state, serialId)
  );

  useEffect(() => {
    dispatch(getSerial(serialId));
  }, [dispatch, serialId]);

  const [hover, setHover] = useState(-1);

  const addInFavorites = () => {
    console.log(serialId);

    // authAxios
    axios.interceptors.request.use(function (config) {
      const token = localStorage.getItem('auth_token');
      console.log('app.js');
      console.log(token);
      config.headers.Authorisation = token ? `Bearer ${token}` : '';
      return config;
    });

    try {
      const response = axios.post(
        '/api/serials/' + serialId.toString() + '/favorite',
        { serial_id: serialId }
      );
      /* const token = localStorage.getItem('auth_token');
            const response = axios.post('/api/serials/' + serialId.toString() + '/favorite',
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        serial_id: serialId
                    }
                }); */
      console.log('Returned data:', response);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  const onRatingChange = (e, newValue) => {
    dispatch(setRating({ id: serial.id, rating: newValue }));
  };
  const onChangeActive = (e, newHover) => {
    setHover(newHover);
  };
  const onAddToWatchlist = () => {
    const storeSerial = {
      id: serial.id,
      title: serial.title,
      rating: null,
    };
    dispatch(addToWatchlist(storeSerial));
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
            {userRating !== null && (
              <Box sx={{ ml: 2 }}>
                {labels[hover !== -1 ? hover : userRating]}
              </Box>
            )}
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

  if (loading) return <div>Loading...</div>;
  if (hasErrors) return <div>Ошибка при загрузке.</div>;

  return (
    <>
      <Row p={1}>
        <Col sm={1} mw={100}></Col>
        <Col lg={10} px={0}>
          <h1 className='mt-4'>
            {serial.title} ({serial.year})
          </h1>
        </Col>
        <Col sm={1}></Col>
      </Row>
      <Row className='py-3 px-0'>
        <Col sm={1}></Col>
        <Col lg={3} px={0}>
          <img
            src={serial.poster}
            className='card-img-top'
            alt={serial.title}
          />
          <Button
            className='w-100 mt-4'
            disabled={!!watchlistItem}
            onClick={onAddToWatchlist}
          >
            Добавить в список
          </Button>
          {renderRating()}
        </Col>
        <Col lg={7} pl={4}>
          <Row>
            <h4 className='col-lg-10 mb-3'>Информация</h4>
            <h6 className='col-lg-2 px-2 py-0 m-0 text-center'>
              {' '}
              IMDb RATING: {serial.rate}/10
            </h6>
          </Row>
          {/* <div className='h5'>Эпизоды:</div>
          <div className='h5'>Статус:</div> */}
          <div className='h5 mb-4'>
            Жанры:&nbsp;
            {genres}
          </div>
          <div className='h4 mb-3'>Сюжет</div>
          <p className='text-left mb-4'>{serial.description}</p>
          <Button
            variant='danger'
            className='w-100 mt-4'
            onClick={addInFavorites}
          >
            Добавить в Избранное
          </Button>
          <div className='h5 mb-4'>Сезоны</div>
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
    </>
  );
};
