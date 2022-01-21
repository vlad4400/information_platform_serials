import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routing } from './routing/Routing';
import Navigation from './components/Navigation';
import { getSerials } from './store/serials.slice';
import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000";//prefixPAth;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';


axios.defaults.withCredentials = true;


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
