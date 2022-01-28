import Table from 'react-bootstrap/Table';
import ListItem from './ListItem';

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
              <ListItem key={i} i={i} id={item.id} />
            ))}
          </tbody>
        </Table>
      ) : (
        <h3>Нет сериалов в списке</h3>
      )}
    </>
  );
}
