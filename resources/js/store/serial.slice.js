import { createSlice } from '@reduxjs/toolkit';
import serialsAPI from '../api/serialsAPI';

const initialState = {
  serial: {},
  loading: false,
  loadingState: false,
  loadingRating: false,
  hasErrors: false,
};

const serialSlice = createSlice({
  name: 'serial',
  initialState,
  reducers: {
    setSerial: (state, { payload }) => {
      state.serial = payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setLoadingComplete: (state) => {
      state.loading = false;
    },
    setSerialFailure: (state) => {
      state.hasErrors = true;
    },
    setLoadingStatus: (state) => {
      state.loadingState = true;
    },
    setLoadingStatusComplete: (state) => {
      state.loadingState = false;
    },
    setLoadingRating: (state) => {
      state.loadingRating = true;
    },
    setLoadingRatingComplete: (state) => {
      state.loadingRating = false;
    },
    setSerialRating: (state, {payload: {userId, rating}}) => {
      const serial = state.serial?.favorite?.find(fav => fav.user_id === userId);
      if (serial) {
        serial.eval = rating;
      }
    }
  },
});

// Selectors
export const selectSerial = (state) => state.serial;

// Actions
export const {
  setSerial,
  setLoading,
  setLoadingComplete,
  setSerialFailure,
  setLoadingStatus,
  setLoadingStatusComplete,
  setLoadingRating,
  setLoadingRatingComplete,
  setSerialRating,
} = serialSlice.actions;
export default serialSlice.reducer;

// Thunks
export const getSerial = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await serialsAPI.get(`serials/${id}`);
    dispatch(setSerial(data));
  } catch (err) {
    dispatch(setSerialFailure());
  } finally {
    dispatch(setLoadingComplete());
  }
};
