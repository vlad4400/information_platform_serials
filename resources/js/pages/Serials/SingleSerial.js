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
import {
  selectWatchlistById,
  addToWatchlist,
  removeFromWatchlist,
  setRating,
  setStatus,
} from '../../store/watchlist.slice';
import { StatusFilters } from '../../store/filters.slice';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { labels } from '../../constants/labels';

export const SingleSerial = () => {
  const dispatch = useDispatch();
  const { serialId } = useParams();
  const { serial, loading, hasErrors } = useSelector(selectSerial);
  const watchlistItem = useSelector((state) =>
    selectWatchlistById(state, serialId)
  );

  useEffect(() => {
    dispatch(getSerial(serialId));
  }, [dispatch, serialId]);

  const [hover, setHover] = useState(-1);

  const addInFavorites = () => {
    console.log(serialId);
  };

  const onRatingChange = (e, newValue) => {
    dispatch(setRating({ id: serial.id, rating: newValue }));
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
      dispatch(addToWatchlist(storeSerial));
    } else {
      dispatch(setStatus({ id: serial.id, status: status }));
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
              <Dropdown.Item
                onClick={() => dispatch(removeFromWatchlist(serial.id))}
              >
                Удалить из списка
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
            variant='outline-danger'
            className='my-2'
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
