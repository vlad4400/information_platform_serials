
export const getUserReducer = (state) => state.user;
export const getUserId = (state) => getUserReducer(state)?.user.uid;

