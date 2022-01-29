import { createSlice } from '@reduxjs/toolkit';

export const StatusFilters = {
  All: 'Все',
  Active: 'Смотрю',
  Completed: 'Просмотрено',
};

const initialState = {
  status: StatusFilters.All,
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, { payload }) {
      state.status = payload;
    },
    setQuery(state, { payload }) {
      state.searchQuery = payload;
    },
    clearQuery(state) {
      state.searchQuery = '';
    },
  },
});

export const { statusFilterChanged, setQuery, clearQuery } =
  filtersSlice.actions;

export default filtersSlice.reducer;

export const selectFilters = (state) => state.filters;
