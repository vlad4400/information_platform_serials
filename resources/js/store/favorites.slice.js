import { createSlice } from '@reduxjs/toolkit';

import authAxios from '../services/authAxios';

const initialState = {
    favorites: [],
    loading: false,
    hasErrors: false,
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites: (state, { payload }) => {
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
export const getFavorites = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const token = localStorage.getItem('token');
        const { res } = await authAxios.get('/favorites');

        //     console.log('re', res);

        dispatch(setFavorites(res));
    } catch {
        dispatch(setFavoritesFailure());

    } finally {
        dispatch(setLoadingComplete());
    }
}
