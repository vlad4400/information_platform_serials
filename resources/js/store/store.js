import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import serialsReducer from './serials.slice';
import serialReducer from './serial.slice';
import authReducer from './auth.slice';

export const store = configureStore({
  reducer: {
    serials: serialsReducer,
    serial: serialReducer,
    auth: authReducer,
  },
  // подключайте кому нужен логгер
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
