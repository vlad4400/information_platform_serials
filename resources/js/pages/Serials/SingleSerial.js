import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getSerial, selectSerial} from '../../store/serial.slice';
import {Row, Col, Button, Badge} from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';

export const SingleSerial = () => {
    const dispatch = useDispatch();
    const {serialId} = useParams();
    const {serial, loading, hasErrors} = useSelector(selectSerial);

    useEffect(() => {
        dispatch(getSerial(serialId));
    }, [dispatch, serialId]);

    if (loading) return <div>Loading...</div>;
    if (hasErrors) return <div>Ошибка при загрузке.</div>;
    const separator = ' ';
    const genres = (serial.genres || ["Без категории"]).map(
        (genre) => <span key={genre.toString()}><Badge bg="secondary">{genre}</Badge>{' '}</span>
    );

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
                    <img src={serial.poster} className="card-img-top" alt={serial.title}/>
                    <Button variant="primary" className="w-100 mt-4">Добавить в список</Button>
                    <Button variant="success" className="w-100 mt-4">Просмотрено</Button>
                    <div className="text-center">
                        <h6 className="mt-3 mb-0">Оценка: {serial.rate}/10</h6>
                        <Rating
                            iconsCount={10}
                            initialValue={Number(serial.rate)}
                            fillColor="#fa0"
                            size="1.2em"
                        />
                    </div>
                </Col>

                <Col lg={7} pl={4}>

                    <Row>
                        <h4 className="col-lg-10 mb-3">Информация</h4>
                        <h6 className="col-lg-2 px-2 py-0 m-0 text-center"> IMDb RATING:</h6>
                    </Row>

                    <div className="h5">Эпизоды:</div>
                    <div className="h5">Статус:</div>
                    <div className="h5 mb-4">Жанры:&nbsp;
                        {genres}
                    </div>

                    <div className="h4 mb-3">Сюжет</div>
                    <p className="text-left mb-4">{serial.description}</p>

                    <div className="h4 mb-3">Кадры</div>
                </Col>

                <Col sm={1}></Col>
            </Row>
        </>
    );
};
