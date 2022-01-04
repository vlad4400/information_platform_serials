import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routing } from './routing/Routing';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routing />
      </BrowserRouter>
    </>
  );
}
