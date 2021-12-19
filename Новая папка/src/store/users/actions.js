export const SET_ERROR_USERS = "SET_ERROR_USERS";
export const SET_LOADING_USERS = "SET_LOADING_USERS";
export const SET_DATA_USERS = "SET_DATA_USERS";

export const setLoading = (status) => ({
    type: SET_LOADING_USERS,
    payload: status
});

export const setError = (status) => ({
    type: SET_ERROR_USERS,
    payload: status
});

export const setData = (todos) => ({
    type: SET_DATA_USERS,
    payload: todos
});

const USERS_API = "https://jsonplaceholder.typicode.com/users";

export const getUsersWithThunk = async (dispatch) => {

    dispatch(setLoading(true));
    dispatch(setError(false));
    // dispatch(setData([]));

    try {
        const response = await fetch(USERS_API);

        if (!response.ok) {
            throw new Error('Error!!!!!!!!!!!!!');
        }

        const result = await response.json();

        dispatch(setData(result));
    } catch (e) {
        console.error(e);
        dispatch(setError(true));
    }

    dispatch(setLoading(false));
};
