// Список
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Watchlist from '../../components/Watchlist/Watchlist';
import { selectFilteredWatchlist } from '../../store/watchlist.slice';
import {
  StatusFilters,
  selectFilters,
  statusFilterChanged,
  setInput,
  clearInput,
} from '../../store/filters.slice';

export const WatchList = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectFilters);
  const watchlist = useSelector(selectFilteredWatchlist);

  useEffect(() => {
    dispatch(clearInput());
  }, []);

  const debounceFilteredValue = (value) => {
    dispatch(setInput(value));
  };
  const debounced = useCallback(debounce(debounceFilteredValue, 500), []);
  const onInputChange = (e) => {
    debounced(e.target.value);
  };

  const onStatusChange = (status) => dispatch(statusFilterChanged(status));

  return (
    <>
      <Row className='mb-3'>
        <Col>
          <Card body>
            <h3 className='mb-3'>Список сериалов</h3>
            <Form.Control
              type='search'
              placeholder='Поиск по названию..'
              aria-label='Search'
              onChange={onInputChange}
            />
          </Card>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col>
          <Card body>
            <Tabs
              variant='pills'
              activeKey={status}
              onSelect={onStatusChange}
              className='mb-3'
            >
              {Object.keys(StatusFilters).map((key) => {
                const value = StatusFilters[key];
                return (
                  <Tab key={key} eventKey={value} title={value}>
                    <Watchlist list={watchlist} />
                  </Tab>
                );
              })}
            </Tabs>
          </Card>
        </Col>
      </Row>
    </>
  );
};
