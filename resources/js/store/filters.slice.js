import { createSlice } from '@reduxjs/toolkit';

export const StatusFilters = {
  All: 'Все',
  Active: 'Смотрю',
  Completed: 'Просмотрено',
};

const initialState = {
  status: StatusFilters.All,
  input: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, { payload }) {
      state.status = payload;
    },
    setInput(state, { payload }) {
      state.input = payload;
    },
    clearInput(state) {
      state.input = '';
    },
  },
});

export const { statusFilterChanged, setInput, clearInput } =
  filtersSlice.actions;

export default filtersSlice.reducer;

export const selectFilters = (state) => state.filters;
