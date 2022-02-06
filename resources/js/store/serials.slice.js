import { createSlice } from '@reduxjs/toolkit';
import serialsAPI from '../api/serialsAPI';
import { getSerialsByRateTop50Desc } from '../services/SerialsService';

const initialState = {
  serials: [],
  loading: false,
  hasErrors: false,
  orderTitle: '',
};

const serialsSlice = createSlice({
  name: 'serials',
  initialState,
  reducers: {
    setSerials: (state, {payload}) => {
      state.serials = payload.serials.map(
        serial => {
          if (serial.favorite) {
            return {
              ...serial,
              isFavorite: !!serial.favorite.find(({user_id}) => user_id == payload.userId),
              isLoading: false,
            }
          } else {
            return serial;
          }
        }
      );
    },
    switchSerialIsFavoriteById: (state, {payload}) => {
      const id = payload;
      state.serials.forEach((serial, ri) => {
        if (serial.id == id) {
          state.serials[ri] = {...serial, isFavorite: !serial.isFavorite}
        }
      })
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setLoadingComplete: (state) => {
      state.loading = false;
    },
    setSerialsFailure: (state) => {
      state.hasErrors = true;
    },
    setLoadingSerialStatus: (state, {payload: id}) => {
      let serial = state.serials.find(serial => serial.id === id);
      if (serial) {
        serial.isLoading = true;
      }
    },
    setLoadingSerialStatusComplete: (state, {payload: id}) => {
      let serial = state.serials.find(serial => serial.id === id);
      if (serial) {
        serial.isLoading = false;
      }
    },
    setOrderTitle: (state, {payload: title}) => {
      state.orderTitle = title;
    }
  },
});

// Selectors
export const selectSerials = (state) => state.serials;
export const getSerialById = (state, id) => {
  return state.serials.find(serial => serial.id == 714);
}

// Actions
export const {
  setSerials,
  switchSerialIsFavoriteById,
  setLoading,
  setLoadingComplete,
  setSerialsFailure,
  setLoadingSerialStatus,
  setLoadingSerialStatusComplete,
  setOrderTitle,
} = serialsSlice.actions;
export default serialsSlice.reducer;

// Thunks
export const getSerials = (userId) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await serialsAPI.get('serials');
    dispatch(setSerials({data, userId}));
  } catch (err) {
    dispatch(setSerialsFailure());
  } finally {
    dispatch(setLoadingComplete());
  }
}

export const getTop50Serials = (userId) => async (dispatch) => {
  dispatch(setLoading());
  getSerialsByRateTop50Desc()
  .then(({data}) => {
    dispatch(setSerials({serials: data, userId}));
  })
  .catch(() => {
    dispatch(setSerialsFailure());
  })
  .finally(() => {
    dispatch(setLoadingComplete());
  });
}
