import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routing } from './routing/Routing';
import Navigation from './components/Navigation';
import { getSerials } from './store/serials.slice';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSerials());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Navigation />
        <Routing />
      </Router>
    </>
  );
}
