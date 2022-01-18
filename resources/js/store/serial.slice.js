import { createSlice } from '@reduxjs/toolkit';
import serialsAPI from '../api/serialsAPI';

const initialState = {
  serial: {},
  loading: false,
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
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Selectors
export const selectSerial = (state) => state.serial;

// Actions
export const { setSerial, setLoading, setLoadingComplete, setSerialFailure } =
  serialSlice.actions;
export default serialSlice.reducer;

// Thunks
export const getSerial = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await serialsAPI.get(`serials/${id}`);
    dispatch(setSerial(data));
  } catch (e) {
    dispatch(setSerialFailure());
  } finally {
    dispatch(setLoadingComplete());
  }
};
