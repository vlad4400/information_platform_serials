import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import * as ROUTES from '../../constants/routes';
import {
  removeFromWatchlist,
  setStatus,
  selectWatchlistById,
} from '../../store/watchlist.slice';
import { StatusFilters } from '../../store/filters.slice';

export default function ListItem({ i, id }) {
  const dispatch = useDispatch();
  const watchlistItem = useSelector((state) => selectWatchlistById(state, id));

  const { title, rating, status } = watchlistItem;
  const disabled = status === StatusFilters.Completed;

  return (
    <tr>
      <th scope='row'>{i + 1}</th>
      <td style={{ width: '100%' }}>
        <div className='d-flex justify-content-between'>
          <Link to={`${ROUTES.SERIALS}/${id}`}>{title}</Link>{' '}
          <div>
            <Button
              onClick={() =>
                dispatch(setStatus({ id: id, status: StatusFilters.Completed }))
              }
              disabled={disabled}
            >
              Просмотрено
            </Button>{' '}
            <Button onClick={() => dispatch(removeFromWatchlist(id))}>-</Button>
          </div>
        </div>
      </td>
      {rating ? <td>{rating}/10</td> : null}
    </tr>
  );
}
