import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routing } from './routing/Routing';
import Navigation from './components/Navigation';
import { selectAuth } from './store/auth.slice';
import { getTop50Serials } from './store/serials.slice';
import { useSelector } from 'react-redux';

export default function App() {
  const dispatch = useDispatch();
  const {isLoggedIn, userId} = useSelector(selectAuth);
  useEffect(() => {
    dispatch(getTop50Serials(isLoggedIn ? userId : undefined));
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
