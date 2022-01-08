import { SET_ERROR_USERS, SET_DATA_USERS, SET_LOADING_USERS } from "./actions";

const initialState = {
    isError: false,
    isLoading: false,
    data: []
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_USERS: {
            return { ...state, isLoading: action.payload };
        }

        case SET_ERROR_USERS: {
            return { ...state, isError: action.payload };
        }

        case SET_DATA_USERS: {
            return { ...state, data: action.payload };
        }

        default: {
            return state;
        }
    }
};
