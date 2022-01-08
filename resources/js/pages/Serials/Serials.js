import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

// @TODO перенести в компонент
const SerialLink = ({ serial }) => (
  <>
    <h2>{serial.title}</h2>
    <Link to={`${ROUTES.SERIALS}/${serial.id}`}>
      перейти на страницу сериала
    </Link>
  </>
);

export const Serials = ({ serials }) => {
  return (
    <div>
      <h2>Каталог сериалов</h2>
      <p>Здесь будет список всех сериалов</p>
      <Link to='filminfo'>Пример страницы</Link>

      {serials.map((serial) => (
        <SerialLink key={serial.id} serial={serial} />
      ))}
    </div>
  );
};
