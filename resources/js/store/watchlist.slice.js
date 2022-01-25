import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, { payload }) => {
      state.entities[payload.id] = payload;
    },
    removeFromWatchlist: (state, { payload }) => {
      delete state.entities[payload];
    },
    setRating: (state, { payload }) => {
      const { id, rating } = payload;
      state.entities[id].rating = rating;
    },
  },
});

// Actions
export const { addToWatchlist, removeFromWatchlist, setRating } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;

// Selectors
export const selectWatchlistEntities = (state) => state.watchlist.entities;

export const selectWatchlist = createSelector(
  selectWatchlistEntities,
  (entities) => Object.values(entities)
);

export const selectWatchlistById = (state, id) => {
  return selectWatchlistEntities(state)[id];
};

// export const selectWatchlistFiltered = (state, input) => {
//   const { watchlist } = state.watchlist;
//   if (!input) {
//     return watchlist;
//   } else {
//     return watchlist.filter((item) =>
//       item.title.toLowerCase().includes(input.toLowerCase())
//     );
//   }
// };
