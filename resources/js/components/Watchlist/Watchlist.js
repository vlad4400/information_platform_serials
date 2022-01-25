import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { removeFromWatchlist } from '../../store/watchlist.slice';
import * as ROUTES from '../../constants/routes';

export default function Watchlist({ list }) {
  return (
    <>
      {list.length > 0 ? (
        <Table hover borderless>
          <thead className='table-light'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Название</th>
              <th scope='col'>Оценка</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, i) => (
              <ListItem
                key={i}
                i={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
              />
            ))}
          </tbody>
        </Table>
      ) : (
        <h3>Нет сериалов в списке</h3>
      )}
    </>
  );
}

const ListItem = ({ i, id, title, rating = '-' }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <th scope='row'>{i + 1}</th>
      <td style={{ width: '100%' }}>
        <div className='d-flex justify-content-between'>
          <Link to={`${ROUTES.SERIALS}/${id}`}>{title}</Link>{' '}
          <Button onClick={() => dispatch(removeFromWatchlist(id))}>---</Button>
        </div>
      </td>
      <td>{rating}/10</td>
    </tr>
  );
};
