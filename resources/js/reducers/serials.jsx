import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_SERIALS } from '../constants/api';


export const getTodosAsync = createAsyncThunk(
  'serials/getTodosAsync',
  async () => {
    const resp = await fetch(API_SERIALS);

    if (resp.ok) {
      const serials = await resp.json();
      return { serials };
    }
  }
);

export const serials = createSlice({
  name: 'serials',
  initialState: [],
  reducers: {
    showSerials: (state, action) => {
      const serials = {
        id: new Date(),
        title: action.payload.title,
        completed: false,
      };
      console.log('showSerials [serials]', serials);
    },
  },
  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.serials.data
        .map((serial) => {
          const lastChar = serial.title.slice(-1);
          let title = serial.title;

          if (lastChar === '.') {
            title = title.slice(0, -1);
          }

          return {
            ...serial,
            title,
            url: 'https://fwcdn.pl/fpo/08/05/840805/7929564.3.jpg',
            rating: '9.3',
          };
        })
        .filter((serial, ri) => ri < 8);
    },
  },
});

export const { showSerials } = serials.actions;

export default serials.reducer;
