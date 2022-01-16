import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { selectSerials } from '../../store/serials.slice';

export const Serials = () => {
  const { serials, loading, hasErrors } = useSelector(selectSerials);

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
