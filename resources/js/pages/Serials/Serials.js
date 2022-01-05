import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export const Serials = () => {
  return (
    <div>
      <h1>Каталог сериалов</h1>
      <p>Здесь будет список всех сериалов</p>
      <Link to='filminfo'>Пример страницы</Link>
    </div>
  );
};
