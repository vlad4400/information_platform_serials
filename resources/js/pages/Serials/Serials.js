import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { getSerials, selectSerials } from '../../store/serials.slice';

export const Serials = () => {
  const dispatch = useDispatch();
  const { serials, loading, hasErrors } = useSelector(selectSerials);

  useEffect(() => {
    dispatch(getSerials());
  }, [dispatch]);

  const renderSerials = () => {
    if (loading) return <div>Loading...</div>;
    if (hasErrors) return <div>Ошибка при загрузке.</div>;
    return serials.map((serial) => (
      <SerialLink key={serial.id} serial={serial} />
    ));
  };

  return (
    <div>
      <h2>Каталог сериалов</h2>
      <p>Здесь будет список всех сериалов</p>
      <Link to='filminfo'>Пример страницы</Link>
      {renderSerials()}
    </div>
  );
};

// @TODO перенести в компонент
const SerialLink = ({ serial }) => (
  <>
    <h2>{serial.title}</h2>
    <Link to={`${ROUTES.SERIALS}/${serial.id}`}>
      перейти на страницу сериала
    </Link>
  </>
);
