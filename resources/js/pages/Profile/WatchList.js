// Список
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Watchlist from '../../components/Watchlist/Watchlist';
import WATCHLIST from './WATCHLIST.json';
import { selectWatchlist } from '../../store/watchlist.slice';

const { watched } = WATCHLIST;
const [watchlistKey, watchedKey] = Object.keys(WATCHLIST);

export const WatchList = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector(selectWatchlist);

  const [input, setInput] = useState('');
  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  // const [key, setKey] = useState(watchlistKey);

  // const filtered = useSelector((state) =>
  //   selectWatchlistFiltered(state, input)
  // );

  return (
    <>
      <Row className='mb-3'>
        <Col>
          <Card body>
            <h3 className='mb-3'>Список сериалов</h3>
            <Form.Control
              placeholder='Поиск по названию..'
              aria-label='Search'
              value={input}
              onChange={onInputChange}
            />
          </Card>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col>
          <Card body>
            <Watchlist list={watchlist} />
            {/* <Tabs
              variant='pills'
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className='mb-3'
            >
              <Tab eventKey={watchlistKey} title='Смотрю'>
                <Watchlist list={filteredList} />
              </Tab>
              <Tab eventKey={watchedKey} title='Просмотрено'>
                <Watchlist list={filteredList} />
              </Tab>
            </Tabs> */}
          </Card>
        </Col>
      </Row>
    </>
  );
};
