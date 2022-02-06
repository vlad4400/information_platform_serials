//страница сериала
import Rating from '@mui/material/Rating';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { labels } from '../../constants/labels';
import * as ROUTES from '../../constants/routes';
import AuthService from '../../services/AuthService';
import { updateFavouriteRating } from '../../services/FavouritesService';
import { switchFavorite } from '../../services/SerialsService';
import { selectAuth } from '../../store/auth.slice';
import { deleteFavourite, setLoadingFavouriteStatus, setLoadingFavouriteStatusComplete } from '../../store/favourites.slice';
import { startLoadingOne as search_startLoadingOne, stopLoadingOne as search_stopLoadingOne, switchFavorite as search_switchFavoriteOne } from '../../store/search.slice';
import { getSerial, selectSerial, setLoadingRating, setLoadingRatingComplete, setLoadingStatus as serial_setLoadingStatus, setLoadingStatusComplete as serial_setLoadingStatusComplete, setSerialRating } from '../../store/serial.slice';
import { setLoadingSerialStatus, setLoadingSerialStatusComplete, switchSerialIsFavoriteById } from '../../store/serials.slice';
import Loader from '../../utilities/Loader';

export const SingleSerial = () => {
  const dispatch = useDispatch();
  const { serialId } = useParams();
  const { serial, loading, hasErrors, loadingState, loadingRating } = useSelector(selectSerial);
  const { isLoggedIn } = useSelector(selectAuth);

  const user = AuthService.getCurrentUser();
  let userId = 0;
  if (user) {
    userId = user.user_id;
    var fav = serial?.favorite?.find(fav => fav.user_id == userId);
  }

  useEffect(() => {
    dispatch(getSerial(serialId));
  }, [dispatch, serialId]);

  const [hover, setHover] = useState(-1);
  const [inFavourites, setinFavourites] = useState(false);
  const [evaluation, setEvaluation] = useState(0);

  var changeRating = -1;

  useEffect(() => {
    if (serial.favorite) {
      const findId = serial.favorite.find(item => item.user_id === userId)
      if (findId) {
        setinFavourites(true);
        if (findId.eval) {
          setEvaluation(findId.eval);
        } else {
          setEvaluation(0);
        }
      } else {
        setinFavourites(false);
        setEvaluation(0);
      }
    } else {
      setinFavourites(false);
      setEvaluation(0);
    };
  }, [serial.favorite]);

  const addInFavourites = () => {
    dispatch(setLoadingSerialStatus(serialId));
    dispatch(setLoadingFavouriteStatus(serialId));
    dispatch(search_startLoadingOne(serialId));
    dispatch(serial_setLoadingStatus());

    switchFavorite(serialId)
      .then(() => {
          dispatch(switchSerialIsFavoriteById(serialId));
          dispatch(deleteFavourite(serialId));
          dispatch(search_switchFavoriteOne(serialId));
          setinFavourites(!inFavourites);
      })
      .finally(() => {
          dispatch(setLoadingSerialStatusComplete(serialId));
          dispatch(setLoadingFavouriteStatusComplete(serialId));
          dispatch(search_stopLoadingOne(serialId));
          dispatch(serial_setLoadingStatusComplete());
      });
  };

  const onRatingChange = (e, newRating) => {
    dispatch(setLoadingRating());
    updateFavouriteRating({id: serialId, rating: newRating})
      .then(success => dispatch(setSerialRating({userId, rating: newRating})))
      .finally(() => dispatch(setLoadingRatingComplete()));
  };

  const renderRating = () => {
    const userRating = fav?.eval ? +fav.eval : 0;
    return <>
      <div className='text-center'>
        <h6
          className='mt-3 mb-2'
          style={{color: 'grey', fontSize: '12px'}}
        >Моя оценка: {
          !loadingRating
            ? labels[changeRating === -1 ? userRating : changeRating]
            : <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
        }</h6>
        <Rating
          value={userRating}
          max={10}
          onChange={onRatingChange}
          style={{fontSize: '1.35rem'}}
          disabled={loadingRating}
        />
      </div>
    </>;
  }

  const genres = (serial.genres || ['Без категории']).map((genre) => (
    <span key={genre.toString()}>
      <Badge className='mx-1' bg='secondary'>{genre}</Badge>{' '}
    </span>
  ));

  const seasonList = (serial.seasons || ['']).map((season) => (
    <div key={(season.season_number + 1).toString()}>
      <Row style={{ fontSize: 12 }}>
        <Col xs={1}>{season.season_number}</Col>
        <Col xs={7}>{season.season_name}</Col>
        <Col xs={3}>{season.air_date}</Col>
        <Col xs={1}>{season.episode_count}</Col>
      </Row>
    </div>
  ));

  if (loading) return <Loader />;
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
          {isLoggedIn
            ? <>
                <Button
                  variant={inFavourites ? 'outline-danger' : 'primary'}
                  className='w-100 mt-4'
                  onClick={addInFavourites}
                  disabled={loadingState}
                  style={{paddingLeft: '0', paddingRight: '0'}}
                  size="sm"
                  >
                  {loadingState
                    ? <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                    : <></>
                  }
                  {!inFavourites
                    ? `Добавить в Избранное`
                    : `Удалить из Избранного`
                  }
                </Button>
                {inFavourites && renderRating()}
                <Link to={`${ROUTES.PROFILE}/${ROUTES.FAVOURITES}`}>
                  <Button
                    variant={'primary'}
                    className='w-100 mt-4'
                    style={{paddingLeft: '0', paddingRight: '0'}}
                    size="sm"
                  >Мои Избранные</Button>
                </Link>
              </>
              : <></>
          }
        </Col>
        <Col lg={7} pl={4}>
          <Row>
            <h4 className="col-lg-8 mb-3">Информация</h4>
            <h6 className="col-lg-4 px-2 py-0 m-0 text-center"> IMDb рейтинг: {serial.rate}/10</h6>
          </Row>
          <div className='h5 mb-4 d-flex align-items-center'>
            Жанры:&nbsp;
            {genres}
          </div>
          <div className='h5 mb-3'>Сюжет</div>
          <p className='text-left mb-4'>{serial.description}</p>
          <div className='h5 mb-4 d-none d-sm-block'>Сезоны</div>
          <Row className='d-none d-sm-block'>
            <Col xs={10}>
              <Row style={{ fontSize: 12 }}>
                <Col xs={1}><b>#</b></Col>
                <Col xs={7}><b>Название</b></Col>
                <Col xs={3}><b>Дата выхода</b></Col>
                <Col xs={1}><b>Эпизодов</b></Col>
              </Row>
              {seasonList}
            </Col>
          </Row>
        </Col>
      </Row>
    </>

  );
};
