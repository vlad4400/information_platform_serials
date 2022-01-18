import { createSlice } from '@reduxjs/toolkit';
import serialsAPI from '../api/serialsAPI';

const initialState = {
  serials: [],
  loading: false,
  hasErrors: false,
};

const serialsSlice = createSlice({
  name: 'serials',
  initialState,
  reducers: {
    setSerials: (state, { payload }) => {
      state.serials = payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setLoadingComplete: (state) => {
      state.loading = false;
    },
    setSerialsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Selectors
export const selectSerials = (state) => state.serials;

// Actions
export const { setSerials, setLoading, setLoadingComplete, setSerialsFailure } =
  serialsSlice.actions;
export default serialsSlice.reducer;

// Thunks
export const getSerials = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await serialsAPI.get('serials');
    dispatch(setSerials(data));
  } catch (e) {
    dispatch(setSerialsFailure());
  } finally {
    dispatch(setLoadingComplete());
  }
};
