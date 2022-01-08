export const getUsersFromStore = (state) => state.users;
export const getUsers = (state) => getUsersFromStore(state).data || [];
export const getUsersLoading = (state) => getUsersFromStore(state).loading;
export const getUsersError = (state) => getUsersFromStore(state).error;