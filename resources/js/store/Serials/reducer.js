import { createSlice } from '@reduxjs/toolkit';
import { getAllSerials, GET_ALL_SERIALS } from './actions';

export const serials = createSlice({
  name: GET_ALL_SERIALS,
  initialState: [],
  reducers: {},
  extraReducers: {
    [getAllSerials.fulfilled]: (state, action) => {
      return action.payload.serials
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
            // url: serial.poster,
            rating: serial.rate,
          };
        })
    },
  },
});

export default serials.reducer;
