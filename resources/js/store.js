import { configureStore } from '@reduxjs/toolkit';
import serialsReducer from './reducers/serials'

export default configureStore({
	reducer: {
        serials: serialsReducer,
    },
});
