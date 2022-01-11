import { configureStore } from '@reduxjs/toolkit';
import serialsReducer from './Serials/reducer';

export default configureStore({
	reducer: {
        serials: serialsReducer,
    },
});
