import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSerial, selectSerial } from '../../store/serial.slice';
import { Row, Col, Button, Badge } from 'react-bootstrap';
//import { Rating } from 'react-simple-star-rating';

export const SingleSerial = () => {
    const dispatch = useDispatch();
    const { serialId } = useParams();
    const { serial, loading, hasErrors } = useSelector(selectSerial);

    useEffect(() => {
        dispatch(getSerial(serialId));
    }, [dispatch, serialId]);

    if (loading) return <div>Loading...</div>;
    if (hasErrors) return <div>Ошибка при загрузке.</div>;

    const genres = (serial.genres || ["Без категории"]).map(
        (genre) => <span key={genre.toString()}><Badge bg="secondary">{genre}</Badge>{' '}</span>
    );
    const seasonList = (serial.seasons || [""]).map(
        (season) => <div key={(season.season_number + 1).toString()}>
            <Row>
                <Col xs={1}>{season.season_number}</Col>
                <Col xs={7}>{season.season_name}</Col>
                <Col xs={3}>{season.air_date}</Col>
                <Col xs={1}>{season.episode_count}</Col>
            </Row>
        </div>
    );

    const addInFavorites = () => {
        try {
            const token = localStorage.getItem('token');
            const path = '/api/favorites/' + serialId.toString();
            console.log(path);
            const response = axios.put(path,
                { serial_id: serialId },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });
            console.log('Returned data:', response);
        } catch (e) {
            console.log(`Axios request failed: ${e}`);
        }
    };

    return (
        <>
            <Row p={1}>
                <Col sm={1} mw={100}></Col>
                <Col lg={10} px={0}>
                    <h1 className="mt-4">{serial.title} ({serial.year})</h1>
                </Col>
                <Col sm={1}></Col>
            </Row>
            <Row className="py-3 px-0">
                <Col sm={1}></Col>

                <Col lg={3} px={0}>
                    <img src={serial.poster} className="card-img-top" alt={serial.title} />
                    <Button variant="primary" className="w-100 mt-4" onClick={addInFavorites}>Добавить в Избранное</Button>
                </Col>

                <Col lg={7} pl={4}>

                    <Row>
                        <h4 className="col-lg-8 mb-3">Информация</h4>
                        <h6 className="col-lg-4 px-2 py-0 m-0 text-center"> IMDb рейтинг: {serial.rate}/10</h6>
                    </Row>

                    <div className="h5 mb-4">Жанры:&nbsp;
                        {genres}
                    </div>

                    <div className="h5 mb-4">Сюжет</div>
                    <p className="text-left mb-4">{serial.description}</p>
                    <div className="h5 mb-4">Сезоны</div>
                    <Row>
                        <Col xs={8}>
                            <Row>
                                <Col xs={1}><b>#</b></Col>
                                <Col xs={7}><b>Название</b></Col>
                                <Col xs={3}><b>Дата выхода</b></Col>
                                <Col xs={1}><b>Эпизодов</b></Col>
                            </Row>
                            {seasonList}
                        </Col>
                    </Row>

                </Col>

                <Col sm={1}></Col>
            </Row>
        </>
    );
};

/*
    <Rating
        iconsCount={10}
        initialValue={Number(serial.rate)}
        fillColor="#fa0"
        size="1.2em"
    />
        
    <div className="h5">Статус:</div> 
    
    <div className="h4 mb-3">Кадры</div>
        
        */
