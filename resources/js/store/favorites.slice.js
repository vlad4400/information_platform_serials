import { createSlice } from '@reduxjs/toolkit';
// import favoritesAPI from '../api/favoritesAPI';
import authAxios from '../services/authAxios';
// import { API_FAVORITES } from '../constants/api';

const initialState = {
    favorites: [],
    loading: false,
    hasErrors: false,
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
    setFavorites: (state, {payload}) => {
        state.favorites = payload;
    },
    setLoading: (state) => {
        state.loading = true;
    },
    setLoadingComplete: (state) => {
        state.loading = false;
    },
    setFavoritesFailure: (state) => {
        state.hasErrors = true;
    },
    },
});

// Selectors
export const selectFavorites = (state) => state.favorites;

// Actions
export const { setFavorites, setLoading, setLoadingComplete, setFavoritesFailure } =
    favoritesSlice.actions;
export default favoritesSlice.reducer;

// Thunks
export const getFavorites = () => (dispatch) => {
    dispatch(setLoading());
    return authAxios.get('/favorites')
    .then((res) => {
        console.log('re', res);
        dispatch(setFavorites(res));
    })
    .catch(() => {
        dispatch(setFavoritesFailure());
    })
    .finally(() => {
        dispatch(setLoadingComplete());
    });
}
